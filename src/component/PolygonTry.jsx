import React from "react"
import { Polygon, Marker, Popup } from "react-leaflet"
import { useState, useRef, useMemo, useCallback } from "react";
import * as turf from '@turf/turf';
import * as L from 'leaflet'

const PolygonTry = () => {

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

  const purpleOptions = { color: 'purple' }

  const polygon2 = [
  [51.515, -0.09],
  [51.52, -0.1],
  [51.52, -0.12],
]

  const points = turf.points([
    // [-6.23363948370361, 106.82140332523127],
    // [-6.175136397558281, 106.82710988104894],
    // [-6.176022029614596, 106.82510756259015],
    // [-6.302221951514286, 106.89508079454139]
  ]);

  const ptsWithin = turf.pointsWithinPolygon(points, polygon)

  const latlng = polygon.geometry.coordinates

  return (
    <Polygon pathOptions={purpleOptions} positions={latlng}/>
    // console.log(latlng)
	)

}

export default PolygonTry