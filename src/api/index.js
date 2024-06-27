import axios from "axios";

export const client = axios.create({
	baseURL: "https://musicbackend-bsf4.onrender.com/api",
	// baseURL: "http://localhost:3500/api",
	// baseURL: "https://musicbackend-jet.vercel.app/api",
	//	baseURL: 'https://musicbackend-jet.vercel.app/api',
	//	baseURL: 'https://musicfrontend-amans-projects-9f0222ca.vercel.app/api'
	//	baseURL: 'https://musicfrontend-git-main-amans-projects-9f0222ca.vercel.app/api'
});









// import axios from "axios";

// export const client = axios.create({
// //	 baseURL: "http://localhost:3500/api",
// //	 baseURL: "https://musicbackend-jet.vercel.app/api",
// //	baseURL: 'https://musicbackend-jet.vercel.app/api',
// 	baseURL: 'https://musicfrontend-amans-projects-9f0222ca.vercel.app/api'
// //	baseURL: 'https://musicfrontend-git-main-amans-projects-9f0222ca.vercel.app/api'
// });
