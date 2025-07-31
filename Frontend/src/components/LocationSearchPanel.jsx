import React from 'react'

const LocationSearchPanel = (props) => {
  const { suggestions = [], setPanelOpen, setVehiclePanel, setPickup, setDestination, activeField, setActiveField } = props

  return (
    <div>
      {suggestions.length === 0 && (
        <div className="text-gray-400 text-center py-4">No suggestions found</div>
      )}
      {suggestions.map((elem, index) => (
        <div
          onClick={() => {
            if (activeField === 'pickup') setPickup(elem.name)
            else if (activeField === 'destination') setDestination(elem.name)
            // setPanelOpen(false)
            // setVehiclePanel(true)
            // setActiveField(null)
          }}
          key={index}
          className='flex border-2 p-3 border-gray-200 active:border-black rounded-xl  items-center my-2 justify-start gap-4 '
        >
          <h2 className='bg-[#eee] h-7 w-8 flex items-center justify-center rounded-full'><i className="ri-map-pin-fill"></i></h2>
          <h4 className='font-medium'>{elem.name}</h4>
        </div>
      ))}
    </div>
  )
}

export default LocationSearchPanel
