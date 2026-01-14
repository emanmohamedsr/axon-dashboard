import axios from "axios";

const nominatimClient = axios.create({
	baseURL: "https://nominatim.openstreetmap.org",
});
export default nominatimClient;
