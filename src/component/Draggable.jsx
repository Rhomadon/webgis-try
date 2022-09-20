import React, { useCallback, useState, useRef, useMemo, useEffect } from 'react'
import axios from 'axios'
import { GeoJSON, LayersControl } from 'react-leaflet'

export default function Draggable() {
	const [draggable, setDraggable] = useState(false)
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

	// const eventHandlers = useMemo(
	// 	() => ({
	// 		dragend() {
	// 			const marker = geoJsonLayerRef.current
	// 			console.log(marker)
				// if (marker != null) {
				// 	setFeatures(marker.getLatLng())
				// }
		// 	}
		// }), [])

	const toggleDraggable = useCallback(() => {
    setDraggable((d) => !d)
	}, [])

	const onEachFeature = (feature, layer) => {
		let popupContent =
			"<pre>" +
			JSON.stringify(feature.properties, null, " ").replace(/[\{\}"]/g, "") +
			"</pre>"

		layer.bindPopup(popupContent)
		layer.on('dragend', function(e){
        document.getElementById("latitude").value = layer.getLatLng().latitude;
        document.getElementById("longitude").value = layer.getLatLng().longitude;
    })
	}

	return (
		<LayersControl.Overlay name="Liquidity Rent">
			<GeoJSON
				data={features}
				onEachFeature={onEachFeature}
				ref={geoJsonLayerRef}
			/>
		</LayersControl.Overlay>
  )
}