import { CheckIcon, ChevronRightIcon, TrashIcon } from "lucide-react"; //biblioteca de icons
import App from "../App";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import BtnHashTask from "./BtnHashTask";

function Tasks({ tasks, onTaskClick, onTrashClick, onSeeDetailsClick }) {
	const navigate = useNavigate();

	function onSeeDatailsClick(task) {
		const query = new URLSearchParams(); //faz tratamento da URL (ex: tira espaços)
		query.set("title", task.title);
		query.set("description", task.description);
		navigate(`/task?${query.toString()}`);
	}
	return (
		<ul className="space-y-4 p-6 bg-slate-200 rounded-md shadow min-h-[200px] max-h-[480px] overflow-y-auto">
			{tasks.map((task) => (
				<li key={task.id} className="flex gap-2">
					<BtnHashTask task={task} onClick={() => onTaskClick(task.id)}>
						{task.isCompleted ? <CheckIcon /> : null}
						{task.title} {/* Exibe o título da task */}
					</BtnHashTask>
					<Button onClick={() => onSeeDatailsClick(task)}>
						<ChevronRightIcon />
					</Button>
					<Button onClick={() => onTrashClick(task.id)}>
						<TrashIcon />
					</Button>
				</li>
			))}
		</ul>
	);
}

export default Tasks;
