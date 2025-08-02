function BtnHashTask(props) {
	console.log(props.task.title + " " + props.task.isCompleted);
	return (
		<button
			{...props}
			className={`w-full bg-slate-400 text-white p-2 rounded-md ${
				props.task.isCompleted && "line-through"
			}`}
		>
			{props.children}
		</button>
	);
}

export default BtnHashTask;
