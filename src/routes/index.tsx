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
				path: "calendar",
				element: <div>Calendar Page</div>,
			},
			{
				path: "tasks",
				element: <div>Tasks Page</div>,
			},
			{
				path: "team",
				element: <div>Team Page</div>,
			},
			{
				path: "profile",
				element: <div>Profile Page</div>,
			},
			{
				path: "settings",
				element: <div>Settings Page</div>,
			},
			{
				path: "charts/bar",
				element: <div>Bar Charts Page</div>,
			},
			{
				path: "charts/pie",
				element: <div>Pie Charts Page</div>,
			},
			{
				path: "charts/line",
				element: <div>Line Charts Page</div>,
			},
			{
				path: "maps",
				element: <div>Maps Page</div>,
			},
			{
				path: "notifications/system",
				element: <div>System Notifications Page</div>,
			},
		],
	},
	{
		path: "*",
		element: <div>Not such a page</div>,
	},
]);
export default router;
