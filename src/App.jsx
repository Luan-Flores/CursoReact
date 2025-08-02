// Importando o hook useState do React para gerenciar o estado da aplicação
import { useEffect, useState } from "react";
import { v4 } from "uuid";

// Importando o componente que irá renderizar as tarefas
import Tasks from "./components/Tasks";

// Importando o CSS global
import "./index.css";
import AddTask from "./components/AddTask";

// Componente principal da aplicação
function App() {
	// Estado que armazena a lista de tarefas
	// Cada tarefa tem: id, título, descrição e um booleano indicando se foi concluída
	// Está pegando do localStorage, e setando na onAddTaskSubmit
	const [tasks, setTasks] = useState(
		JSON.parse(localStorage.getItem("tasks")) || []
	);

	useEffect(() => {
		localStorage.setItem("tasks", JSON.stringify(tasks));
	}, [tasks]);
	//useEffect() -> 1 arg funcao que contem o side effect
	// 2 arg (opcional, por padrão a executa a funcao na 1vez que o usuario acessa a aplicacao)
	// 2 arg é um array de dependencias
	// sempre que o [tasks, algo, algo] for alterado, executa a funcao (1 arg)
	//------------------------------
	//-
	useEffect(() => {
		const fetchTasks = async () => {
			//CHAMAR A API, (pode usar axious, fetch, etc...)
			const response = await fetch(
				"https://jsonplaceholder.typicode.com/todos?_limit=10",
				{
					method: "GET",
				}
			);
			//PEGAR OS DADOS QUE ELA RETORNA
			const data = await response.json();
			console.log(data);
			//ARMAZENAR/PERSISTIR ESSES DADOS NO STATE
			setTasks(data);
		};
		fetchTasks();
	}, []);

	// Função chamada quando uma tarefa é clicada
	// Ela alterna o valor de isCompleted (de true para false ou vice-versa)
	function onTaskClick(taskId) {
		// Usamos o map para percorrer todas as tarefas
		const newTasks = tasks.map((task) => {
			// Quando encontramos a tarefa com o ID clicado, invertemos seu estado de conclusão
			if (task.id === taskId) {
				// O spread operator copia os dados da tarefa original,
				// e sobrescrevemos apenas o campo isCompleted
				return { ...task, isCompleted: !task.isCompleted };
			}
			// Se não for a tarefa clicada, retornamos ela sem alterações
			return task;
		});

		// Atualizamos o estado com a nova lista de tarefas
		setTasks(newTasks);
	}

	function onTrashClick(taskId) {
		const newTasks = tasks.filter((task) => task.id !== taskId); // remove a task com o id
		setTasks(newTasks); // atualiza o estado
	}

	// Funcao adicionar tarefa
	function onAddTaskSubmit(title, description) {
		const newTask = {
			id: v4(),
			//title e description tem o mesmo nome dos parametros da funcao
			//entao pode deixar somente title/description
			title,
			description,
			isCompleted: false,
		};
		setTasks([...tasks, newTask]);
	}

	return (
		// Container principal da aplicação
		<div className="w-screen h-screen bg-slate-500 flex justify-center p-6">
			{/* Área central onde o conteúdo (as tarefas) será exibido */}
			<div className="w-[500px] space-y-4">
				{/* Título principal do app */}
				<h1 className="text-3xl text-slate-100 font-bold text-center">
					Gerenciador de Tarefas
				</h1>

				{/* Componente Tasks, responsável por exibir a lista de tarefas */}
				{/* Passamos as tarefas e funções como props: */}
				{/* - onTaskClick: para marcar como concluída ou não */}
				{/* - onTrashClick: para excluir a tarefa */}
				<AddTask onAddTaskSubmit={onAddTaskSubmit} />
				<Tasks
					tasks={tasks}
					onTaskClick={onTaskClick}
					onTrashClick={onTrashClick}
				/>
			</div>
		</div>
	);
}

export default App;
