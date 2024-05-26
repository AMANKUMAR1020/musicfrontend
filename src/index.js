import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
//import { router } from "./router";
// import { ChakraProvider } from "@chakra-ui/react";
// import theme from "./theme/index.js";
import { store } from "./redux/store.js";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter, Routes,Route } from "react-router-dom";
import App from './App'

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<Provider store={store}>
			<PersistGate persistor={persistStore(store)}>
				<BrowserRouter>
					<Routes>
						<Route path="/*" element={<App />} />
					</Routes>
				</BrowserRouter>
			</PersistGate>
		</Provider>
	</React.StrictMode>
);
