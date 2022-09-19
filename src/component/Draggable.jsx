import React from 'react'
import { useCallback, useState, useRef, useMemo } from 'react'
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet'

export default function Draggable() {
  const center = {
  lat: -6.23363948370361,
  lng: 106.8215857154487
  }

  const dataGeo = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          106.79375,
          -6.1625
        ]
      },
      "properties": {
        "objectid": 1,
        "liquidity": 0.0453797593904,
        "meshcode3": "6009061693",
        "type": "Point",
        "longitude": "106.79375000026249",
        "latitude": "-6.162500000174703"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          106.83125,
          -6.329166665
        ]
      },
      "properties": {
        "objectid": 2,
        "liquidity": 0.0327870562585,
        "meshcode3": "6009063696",
        "type": "Point",
        "longitude": "106.83125000018754",
        "latitude": "-6.3291666650094385"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          106.84375,
          -6.229166665
        ]
      },
      "properties": {
        "objectid": 3,
        "liquidity": 0.0352258957937,
        "meshcode3": "6009062677",
        "type": "Point",
        "longitude": "106.84375000016257",
        "latitude": "-6.229166665209277"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          106.80625,
          -6.2875
        ]
      }}]}

  const [draggable, setDraggable] = useState(false)
  const [position, setPosition] = useState(dataGeo)
  const markerRef = useRef(null)
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current
        if (marker != null) {
          setPosition(marker.getLatLng())
        }
      },
    }),
    [],
  )
  const toggleDraggable = useCallback(() => {
    setDraggable((d) => !d)
  }, [])

  const geo = dataGeo.features.length

	return (
		<MapContainer center={center} zoom={11} scrollWheelZoom={true}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <GeoJSON
        draggable={draggable}
        eventHandlers={eventHandlers}
        data={position}
        // position={position}
        ref={markerRef} >
        <Popup minWidth={90}>
          <span onClick={toggleDraggable}>
            {draggable
            ? 'Marker is draggable'
              : 'Click here to make marker draggable'}
          </span>
        </Popup>
			</GeoJSON>
		</MapContainer>
  )
}
