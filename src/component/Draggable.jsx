import React, { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import { GeoJSON, LayersControl, useMapEvents } from 'react-leaflet'
import * as L from 'leaflet'
import markerClusterGroup from 'react-leaflet-cluster'
import 'leaflet-path-drag';
import * as turf from '@turf/turf'

export default function Draggable() {
  const [features, setFeatures] = useState([])

	const axiosData = () => {
		const url = 'http://localhost:4000/liquidity-rent/api'
		axios.get(url).then(res => {
			setFeatures(res.data)
		}).catch(err => {
			console.log(err.message)
		})
	}

	const geoJsonLayerRef = useRef(null)
	const isMountRef = useRef(true)

	useEffect(() => {
		if (isMountRef.current) {
			axiosData()
			isMountRef.current = false
		}
	}, [])

	useEffect(() => {
		const layer = geoJsonLayerRef.current
		if (layer) {
			console.log("Api Liquidity-Rent")
			layer.clearLayers().addData(features)
		}
	}, [features])

	const MapEvent = (feature, layer) => {
		useMapEvents({
			drag(e) {
				console.log(layer)
			}
		})
		return false
	}


	const onEachFeature = (feature, layer) => {
		let popupContent =
			"<pre>" +
			JSON.stringify(feature.properties, null, " ").replace(/[\{\}"]/g, "") +
			"</pre>"

		layer.bindPopup(popupContent)
	}

	const markers = L.markerClusterGroup()

	const pointToLayer = (feature, latlng) => {
		const coordinate = feature.geometry.coordinates
		const pointLatlng = turf.points([coordinate])
		// console.log(pointLatlng)

		return L.circleMarker(latlng, { draggable: true })

	}

	// 	return markers.addLayer(L.circleMarker(latlng))

	return (
		<LayersControl.Overlay name="Liquidity Rent">
			<GeoJSON
				data={features}
				pointToLayer={pointToLayer}
				onEachFeature={onEachFeature}
				ref={geoJsonLayerRef}
				style={() => ({
					color: '#4a83ec',
					weight: 0.5,
					fillColor: "#1a1d",
					fillOpacity: 0.7,
					opacity: 0.5,
					radius: 8,
          })}
			/>
		</LayersControl.Overlay>
  )
}