import React, { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import { GeoJSON, LayersControl } from 'react-leaflet'
import * as L from 'leaflet'
import markerClusterGroup from 'react-leaflet-cluster'
import 'leaflet-path-drag';
import * as turf from '@turf/turf'

export default function Draggable() {
	const [features, setFeatures] = useState([])
	const [within, setWithin] = useState([])
	let geojson = features.features
	let coordinates = []
	let count = []

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


	const onEachFeature = (feature, layer) => {

		let popupContent =
			"<pre>" +
			JSON.stringify(feature.properties, null, " ").replace(/[\{\}"]/g, "") +
			"</pre>"

		layer.bindPopup(popupContent)
	}

	const markers = L.markerClusterGroup()

	const pointToLayer = (feature, latlng) => {

		return L.circleMarker(latlng, { draggable: true })

	}

	// 	return markers.addLayer(L.circleMarker(latlng))

	const polygon = turf.polygon([[
					[-6.171458331177864, 106.82324790577107],
					[-6.171582546806833, 106.8292918647082],
					[-6.173003260992031, 106.82910445512874],
					[-6.173465212895221, 106.82998437981179],
					[-6.177748243451104, 106.82988624915535],
					[-6.178477150029734, 106.83071826799736],
					[-6.178883978004937, 106.8304454646428],
					[-6.180096693894435, 106.83145894962195],
					[-6.1804779200411275, 106.82297806182642],
					[-6.171458331177864, 106.82324790577107]
	]], { name: 'poly1', population: 400 })

	const eventHandlers = {

		mousemove: (e) => {

			if (coordinates.length == 0) {
				for (let a = 1; a <= geojson.length; a++) {
					let i = a - 1
					let Lat = geojson[i].geometry.coordinates[1]
					let Lng = geojson[i].geometry.coordinates[0]

					coordinates[i] = [Lat, Lng]
				}
			}

			let objectid = e.sourceTarget.feature.properties.objectid
			let LatLng = turf.points(coordinates)
			let ptsWithin = turf.pointsWithinPolygon(LatLng, polygon)

			for (let b = 1; b <= geojson.length; b++) {
				let i = b - 1
				let lat = e.latlng.lat
				let lng = e.latlng.lng
				let latlng = [lat, lng]
				if (b == objectid) {
					coordinates[i] = latlng
					console.log(ptsWithin)
				}
			}
		}
	}

	return (
		<LayersControl.Overlay name="Liquidity Rent">
			<GeoJSON
				data={features}
				pointToLayer={pointToLayer}
				onEachFeature={onEachFeature}
				ref={geoJsonLayerRef}
				eventHandlers={eventHandlers}
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