import React from "react";
import { MapContainer, GeoJSON, TileLayer, useMap } from "react-leaflet";

require("leaflet-path-drag")

export const DraggablePathDrag = () => {

	const geoJSONRef = React.useRef(null);
  const [coordinates, setCoordinates] = React.useState([
    [-104.98569488525392, 39.63431579014969],
    [-104.98569488525392, 39.64165260123419],
    [-104.97161865234376, 39.64165260123419],
    [-104.97161865234376, 39.63431579014969]
  ]);

  const handleFeature = (layer) => {
    layer.makeDraggable();
    layer.dragging.enable();

    layer.on("dragend", function (e) {
      const latLngs = e.target._latlngs[0]; // here replace the expression
      const coordinates = latLngs.map((point) => [point.lng, point.lat]);
      geoJSONRef.current.eachLayer((geoLayer) => {
        // console.log(geoLayer.getLatLngs()[0]);
      });
      setCoordinates(coordinates);
})
	}

	const object = {
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
    }
		]
	}

	console.log(object.features)

	return (
      <GeoJSON
        key={`${coordinates}`}
        ref={geoJSONRef}
        data={object}
        style={() => ({
          color: "green",
          weight: 3,
          opacity: 0.5
        })}
        draggable={true}
        pmIgnore={false}
        onEachFeature={(feature, layer) => handleFeature(layer)}
      ></GeoJSON>
	)
}
