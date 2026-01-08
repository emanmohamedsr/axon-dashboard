import { DataTable } from "@/shared/components";
import useTask from "../../hooks/useTaskStore";
import type { Task } from "../../types/task";
import getColumns from "./Columns";
interface TaskTableProps {
	isWidgetMode?: boolean;
}

const TaskTable = ({ isWidgetMode = false }: TaskTableProps) => {
	const tasksData = useTask((state) => state.tasks);
	return (
		<DataTable<Task, any> columns={getColumns(isWidgetMode)} data={tasksData} />
	);
};

export default TaskTable;
