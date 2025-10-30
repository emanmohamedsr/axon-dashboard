import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider";
import router from "./routes";

const App = () => {
	return (
		<ThemeProvider defaultTheme='dark' storageKey='axon-dashboard-theme'>
			<RouterProvider router={router} />
		</ThemeProvider>
	);
};

export default App;
