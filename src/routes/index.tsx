import CalendarPage from "@/pages/Calendar";
import ChatbotPage from "@/pages/Chatbot";
import ConnectionsMapPage from "@/pages/ConnectionsMap";
import ErrorFallbackPage from "@/pages/Error";
import LandingPage from "@/pages/Landing";
import NotFoundPage from "@/pages/NotFound";
import TasksPage from "@/pages/Tasks";
import TeamPage from "@/pages/Team";
import RootLayout from "@/shared/layout";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
	{
		path: "/",
		element: <RootLayout />,
		errorElement: <ErrorFallbackPage />,
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
				path: "ai-assistant",
				element: <ChatbotPage />,
			},
			{
				path: "maps",
				element: <ConnectionsMapPage />,
			},
		],
	},
	{
		path: "*",
		element: <NotFoundPage />,
	},
]);
export default router;
