function BtnHashTask(props) {
	console.log(props.task.title + " " + props.task.isCompleted);
	return (
		<button
			{...props}
			className={`w-full flex justify-center bg-slate-400 text-white p-2 rounded-md ${
				props.task.isCompleted && "line-through"
			}`}
		>
			{props.children}
		</button>
	);
}

export default BtnHashTask;
