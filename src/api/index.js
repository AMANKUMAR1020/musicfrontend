import axios from "axios";

export const client = axios.create({
	// baseURL: "http://localhost:3500/api",
	// baseURL: "https://musicbackend-jet.vercel.app/api",
	baseURL: 'https://musicbackend-jet.vercel.app/api',
});
