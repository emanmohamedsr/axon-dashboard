const getCurvedPath = (start: [number, number], end: [number, number]) => {
	const lat1 = start[0];
	const lng1 = start[1];
	const lat2 = end[0];
	const lng2 = end[1];

	const offsetY = 30;

	const rLat = (lat1 + lat2) / 2 + offsetY;
	const rLng = (lng1 + lng2) / 2;

	const path = [];
	for (let t = 0; t <= 1; t += 0.05) {
		const lat =
			(1 - t) * (1 - t) * lat1 + 2 * (1 - t) * t * rLat + t * t * lat2;
		const lng =
			(1 - t) * (1 - t) * lng1 + 2 * (1 - t) * t * rLng + t * t * lng2;
		path.push([lat, lng] as [number, number]);
	}

	return path;
};
export default getCurvedPath;
