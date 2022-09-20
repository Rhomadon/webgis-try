import React, { useCallback, useState, useRef, useMemo, useEffect } from 'react'
import axios from 'axios'
import { GeoJSON, LayersControl, Popup } from 'react-leaflet'
import * as L from 'leaflet'

export default function Draggable() {
	const [draggable, setDraggable] = useState(false)
	const [features, setFeatures] = useState([])
	const [coordinates, setCoordinates] = useState([])

	const axiosData = () => {
		const url = 'http://localhost:4000/liquidity-rent/api'
		axios.get(url).then(res => {
			setFeatures(res.data)
		}).catch(err => {
			console.log(err.message)
		})
		axios.get(url).then(res => {
			setCoordinates(res.data.features)
		}).catch(err => {
			console.log(err.message)
		})
	}

	const feature = (e) => {
		const latLngs = e.target.getLatLng().lat
		console.log(latLngs)
		const coordinates = latLngs.map((point) => [point.lng, point.lat])
		console.log(coordinates)
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

	const eventHandlers = useMemo(
		() => ({
			dragend() {
				const marker = geoJsonLayerRef.current
				console.log(marker)
				if (marker != null) {
					setFeatures(marker.getLatLng())
				}
			}
		}), [])

	const toggleDraggable = useCallback(() => {
    setDraggable((d) => !d)
	}, [])

	const onEachFeature = (feature, layer) => {
		let popupContent =
			"<pre>" +
			JSON.stringify(feature.properties, null, " ").replace(/[\{\}"]/g, "") +
			"</pre>"

		console.log(feature.properties)

		layer.bindPopup(popupContent)
		layer.on('dragend', function(e){
        document.getElementById("latitude").value = layer.getLatLng().lat;
        document.getElementById("longitude").value = layer.getLatLng().lng;
		})
	}

	const pointToLayer = (feature, latlng) => {
		return L.circleMarker(latlng, { draggable: true }, {
			radius: 8,
			fillColor: "#ff7800",
			color: "#000",
			weight: 1,
			opacity: 1,
			fillOpacity: 0.8
		})
	}

	return (
		<LayersControl.Overlay name="Liquidity Rent">
			<GeoJSON
				data={features}
				// onEachFeature={onEachFeature}
				ref={geoJsonLayerRef}
				eventHandlers={eventHandlers}
			// pointToLayer={pointToLayer}
			>
				<Popup minWidth={90}>
					<button>Text</button>
				</Popup>
			</GeoJSON>
		</LayersControl.Overlay>
  )
}