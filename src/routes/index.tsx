import AboutPage from "@/pages/About";
import HomePage from "@/pages/Home";
import RootLayout from "@/shared/layout";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
	{
		path: "/",
		element: <RootLayout />,
		errorElement: <div>Error occurred!</div>,
		children: [
			{
				index: true,
				element: <HomePage />,
			},
			{
				path: "about",
				element: <AboutPage />,
			},
		],
	},
]);
export default router;
