import { v4 as uuidv4 } from "uuid";
import { createDateInCurrentMonth } from "../utils/createDate";
const currentDay = new Date().getDate();

export default [
	{
		id: uuidv4(),
		title: "Design Review (All Day)",
		start: new Date().toISOString().split("T")[0],
		end: new Date().toISOString().split("T")[0],
		allDay: true,
		backgroundColor: "#2586d6",
		borderColor: "transparent",
	},
	{
		id: uuidv4(),
		title: "Client Workshop",
		start: createDateInCurrentMonth(1, 9, 0).split("T")[0],
		end: createDateInCurrentMonth(1, 17, 0).split("T")[0],
		allDay: true,
		backgroundColor: "#85c0d3",
	},

	{
		id: uuidv4(),
		title: "Daily Standup",
		start: createDateInCurrentMonth(currentDay + 1, 9, 30),
		end: createDateInCurrentMonth(currentDay + 1, 10, 0),
		allDay: false,
		backgroundColor: "#dd98a3",
	},
	{
		id: uuidv4(),
		title: "Sync with Dev Team",
		start: createDateInCurrentMonth(5, 14, 0),
		end: createDateInCurrentMonth(5, 14, 45),
		allDay: false,
		backgroundColor: "#b69ad6",
	},

	{
		id: uuidv4(),
		title: "Sprint Planning",
		start: createDateInCurrentMonth(18, 10, 0),
		end: createDateInCurrentMonth(18, 11, 30),
		allDay: false,
		backgroundColor: "#81b4ed",
	},

	{
		id: uuidv4(),
		title: "Deep Work: Feature Implementation",
		start: createDateInCurrentMonth(22, 13, 0),
		end: createDateInCurrentMonth(22, 16, 30),
		allDay: false,
		backgroundColor: "#6B95DB",
	},
	{
		id: uuidv4(),
		title: "Project Kick-off Meeting",
		start: createDateInCurrentMonth(25, 15, 0),
		end: createDateInCurrentMonth(25, 17, 30),
		allDay: false,
		backgroundColor: "#9FB8FF",
	},

	{
		id: uuidv4(),
		title: "Server Maintenance",
		description: "Planned downtime.",
		start: createDateInCurrentMonth(12, 22, 0),
		end: createDateInCurrentMonth(13, 3, 0),
		allDay: false,
		backgroundColor: "#e7000b",
	},
];
