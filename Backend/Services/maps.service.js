const axios = require('axios');
const captainModel = require('../models/captains.models');
// 1. Convert address to coordinates using Nominatim
module.exports.getAddressCoordinate = async (address) => {
   const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&limit=1`;

   try {
      const response = await axios.get(url, {
         headers: {
            'User-Agent': 'uber-clone-app'
         }
      });

      if (response.data.length > 0) {
         const location = response.data[0];
         return {
            ltd: parseFloat(location.lat),
            lng: parseFloat(location.lon)
         };
      } else {
         throw new Error('Unable to fetch coordinates');
      }
   } catch (error) {
      console.error(error);
      throw error;
   }
};

// 2. Get Distance and Time using OSRM


module.exports.getDistanceTime = async (originCoords, destinationCoords) => {
  try {
    if (
      !originCoords || !destinationCoords ||
      typeof originCoords.lat !== 'number' || typeof originCoords.lng !== 'number' ||
      typeof destinationCoords.lat !== 'number' || typeof destinationCoords.lng !== 'number'
    ) {
      throw new Error('Valid origin and destination coordinates are required');
    }

    const url = `https://router.project-osrm.org/route/v1/driving/${originCoords.lng},${originCoords.lat};${destinationCoords.lng},${destinationCoords.lat}?overview=false`;

    const response = await axios.get(url);

    if (response.data.code === 'Ok') {
      const route = response.data.routes[0];
      return {
        distance: (route.distance / 1000).toFixed(2), // in km
        duration: Math.round(route.duration / 60)     // in minutes
      };
    } else {
      throw new Error('No route found');
    }
  } catch (err) {
    console.error('OSRM Error:', err.message);
    throw new Error('Failed to fetch distance and duration');
  }
};

// 3. Get Autocomplete suggestions using Photon (OSM)
module.exports.getAutoCompleteSuggestions = async (input) => {
   if (!input) {
      throw new Error('Query is required');
   }

   const url = `https://photon.komoot.io/api/?q=${encodeURIComponent(input)}&limit=5`;

   try {
      const response = await axios.get(url);
      return response.data.features.map(f => ({
         name: f.properties.name,
         fullAddress: f.properties.label
      }));
   } catch (err) {
      console.log(err);
      throw err;
   }
};

module.exports.getCaptainInTheRadius = async (lng, lat, radius) => {
   const captains = await captainModel.find({
      location: {
         $geoWithin: {
            $centerSphere: [[lng, lat], radius / 6371] // Note: lng, lat
         }
      }
   });

   return captains;
};

