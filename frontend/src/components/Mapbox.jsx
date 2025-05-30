import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

const position = [23.8103, 90.4125]; // Dhaka

const Mapbox = () => {
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: "400px", width: "100%", borderRadius: "12px" }}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>You are here!</Popup>
        </Marker>
      </MapContainer>
    </div>
  )
}

export default Mapbox
