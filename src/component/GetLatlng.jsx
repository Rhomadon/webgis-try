import React from "react";
import { useMapEvents } from "react-leaflet";

const GetLatlng = () => {
	const MapEvents = () => {

		useMapEvents({
			click(e) {
				console.log(e.latlng)
			}
			// drag(e) {
			// 	// setState your coords here
			// 	// coords exist in "e.latlng.lat" and "e.latlng.lng"
			// 	console.log(e);
			// 	// console.log(e);
			// },
		});
		return false;
	}

	return (
		<MapEvents />
	)
}

export default GetLatlng