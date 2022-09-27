import React from "react"
import { Polygon, Marker, Popup } from "react-leaflet"
import { useState, useRef, useMemo, useCallback } from "react";
import * as turf from '@turf/turf';
import * as L from 'leaflet'

const PolygonTry = () => {

  const polygon = turf.polygon([[
    [-6.171585071290688, 106.82322574193486],
    [-6.171585071290688, 106.82967187156312],
    [-6.180291218219335, 106.8295110353771],
    [-6.180329229230923, 106.82291580423785],
    [-6.171585071290688, 106.82322574193486]
  ]], { name: 'poly1', population: 400 })

  const purpleOptions = { color: 'purple' }

  const polygon2 = [
  [51.515, -0.09],
  [51.52, -0.1],
  [51.52, -0.12],
]

  const points = turf.points([
    [-6.23363948370361, 106.82140332523127],
    // [-6.175136397558281, 106.82710988104894],
    [-6.176022029614596, 106.82510756259015],
    [-6.302221951514286, 106.89508079454139]
  ]);

  const ptsWithin = turf.pointsWithinPolygon(points, polygon)

  const latlng = polygon.geometry.coordinates

  return (
    <Polygon pathOptions={purpleOptions} positions={latlng}/>
    // console.log(latlng)
	)

}

export default PolygonTry