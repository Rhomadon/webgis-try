import React from "react"
import { Polygon } from "react-leaflet"

const PolygonTry = () => {

  const polygon = [
    [-6.171627182063201, 106.82347326256779],
    [-6.171593317542253, 106.82912754349512],
    [-6.173083354416028, 106.82917863639507],
    [-6.173921498315776, 106.82990245247763],
    [-6.177675676248114, 106.82990366255183],
    [-6.179918034012296, 106.83100432710029],
    [-6.180330067753554, 106.82317681538653]
  ]

  const purpleOptions = { color: 'purple' }

  return (
    <Polygon pathOptions={purpleOptions} positions={polygon} />
	)

}

export default PolygonTry