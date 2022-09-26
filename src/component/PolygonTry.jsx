import React from "react"
import { Polygon } from "react-leaflet"

const PolygonTry = () => {

  const polygon = [

    [-6.1805684018469815, 106.82299239842139],
    [-6.175474065229426, 106.8231240451767],
    [-6.171446887035483, 106.82320505855019],
    [-6.171593317542253, 106.82912754349512],
    [-6.173083354416028, 106.82917863639507],
    [-6.173921498315776, 106.82990245247763],
    [-6.177675676248114, 106.82990366255183],
    [-6.180266367461498, 106.83130639576717],
]

const purpleOptions = { color: 'purple' }

  return (
    <Polygon pathOptions={purpleOptions} positions={polygon} />
	)

}

export default PolygonTry