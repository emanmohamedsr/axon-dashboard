import CalendarPage from "@/pages/Calendar";
import ConnectionsMapPage from "@/pages/ConnectionsMap";
import LandingPage from "@/pages/Landing";
import TasksPage from "@/pages/Tasks";
import TeamPage from "@/pages/Team";
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
				element: <LandingPage />,
			},
			{
				path: "calendar",
				element: <CalendarPage />,
			},
			{
				path: "tasks",
				element: <TasksPage />,
			},
			{
				path: "team",
				element: <TeamPage />,
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
				element: <ConnectionsMapPage />,
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
