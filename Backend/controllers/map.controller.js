const mapService = require('../Services/maps.service')
const {validationResult} = require('express-validator');
const axios = require('axios');
module.exports.getCoordinates = async(req,res,next)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array()});
    }

    const { address } = req.query
    try{
        const coordinates = await mapService.getAddressCoordinate(address)
        res.status(200).json(coordinates);
    } catch (error) {
        res.status(404).json({ message: 'Coordinates not found' })
    }
}

async function geocodeLocation(locationName) {
  const apiKey = process.env.OPENROUTESERVICE_API;
  const url = `https://api.openrouteservice.org/geocode/search?api_key=${apiKey}&text=${encodeURIComponent(locationName)}`;

  const res = await axios.get(url);
  const coords = res.data.features[0].geometry.coordinates; // [lng, lat]

  return {
    lat: coords[1],
    lng: coords[0]
  };
}

module.exports.geocodeLocation = geocodeLocation;
module.exports.getDistanceTime = async (req, res) => {
  try {
    const { origin, destination } = req.query||{};

    if (!origin || !destination) {
      return res.status(400).json({ error: 'Origin and Destination are required' });
    }

    const originCoords = await geocodeLocation(origin);
    const destinationCoords = await geocodeLocation(destination);

    const distanceTime = await mapService.getDistanceTime(originCoords, destinationCoords);
    res.status(200).json(distanceTime);
  } catch (err) {
    console.error('Controller Error:', err.message);
    res.status(500).json({ error: 'Something went wrong' });
  }
};


module.exports.getAutoCompleteSuggestions = async(req, res, next)=>{
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array()});
        }
        const { input } = req.query;
        const suggestions = await mapService.getAutoCompleteSuggestions(input);
        res.status(200).json(suggestions);
    }catch(err){
        console.error(err);
        res.status(500).json({ message: 'Error fetching suggestions' });
    }
}
