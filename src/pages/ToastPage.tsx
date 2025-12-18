import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { FormattedMessage, useIntl } from "react-intl";

const TOAST_DURATION = 5000;

const ToastPage = () => {
	const intl = useIntl();
	const [tasks, setTasks] = useState([
		{
			id: 1,
			text: intl.formatMessage({
				id: "toast.task1",
				defaultMessage: "Task 1",
				description: "タスク1のラベル",
			}),
			completed: false,
		},
		{
			id: 2,
			text: intl.formatMessage({
				id: "toast.task2",
				defaultMessage: "Task 2",
				description: "タスク2のラベル",
			}),
			completed: false,
		},
		{
			id: 3,
			text: intl.formatMessage({
				id: "toast.task3",
				defaultMessage: "Task 3",
				description: "タスク3のラベル",
			}),
			completed: false,
		},
	]);
	const [showConfetti, setShowConfetti] = useState(false);
	const [showToast, setShowToast] = useState(false);

	useEffect(() => {
		if (!showConfetti) return;

		const timer = setTimeout(() => {
			setShowConfetti(false);
			setShowToast(false);
		}, TOAST_DURATION);

		return () => clearTimeout(timer);
	}, [showConfetti]);

	const handleToggle = (id: number) => {
		const updatedTasks = tasks.map((task) =>
			task.id === id ? { ...task, completed: !task.completed } : task,
		);
		setTasks(updatedTasks);

		const allCompleted = updatedTasks.every((task) => task.completed);
		if (allCompleted) {
			setShowToast(true);
			setShowConfetti(true);
		}
	};

	return (
		<div className="flex flex-col items-center justify-center h-full gap-8 p-4">
			<div className="flex flex-col gap-4 mt-10">
				{tasks.map((task) => (
					<div key={task.id} className="flex items-center gap-3">
						<input
							type="checkbox"
							id={String(task.id)}
							checked={task.completed}
							onChange={() => handleToggle(task.id)}
							className="w-5 h-5"
						/>
						<label
							htmlFor={String(task.id)}
							className={`text-xl cursor-pointer ${task.completed ? "line-through opacity-50" : ""}`}
						>
							{task.text}
						</label>
					</div>
				))}
			</div>
			{showConfetti && <Confetti />}
			{showToast && (
				<div className="fixed top-4 left-1/2 -translate-x-1/2 bg-green-400 text-white px-6 py-3 rounded-lg shadow-lg z-50">
					<FormattedMessage
						id="toast.completeMessage"
						defaultMessage="All Completed!"
						description="メッセージ：全タスク完了時に表示"
					/>
				</div>
			)}
		</div>
	);
};

export default ToastPage;
