import { useState } from "react";
import Confetti from "react-confetti";
import { useIntl } from "react-intl";

const BasicPage = () => {
	const intl = useIntl();
	const [isActive, setIsActive] = useState(false);
	const handleClick = () => {
		setIsActive(!isActive);
	};
	return (
		<div className="flex flex-col items-center justify-center h-full gap-4 p-4">
			{isActive && <Confetti />}
			<button
				type="button"
				className="px-5 py-2.5 p-2 bg-gradient-to-r from-blue-200 to-purple-300 hover:from-blue-400 hover:to-purple-500 text-gray-800 hover:text-white font-semibold rounded-lg transition-all shadow-lg hover:shadow-xl"
				onClick={handleClick}
			>
				{isActive
					? intl.formatMessage({
							id: "basic.stopButton",
							defaultMessage: "Stop Confetti",
							description: "ボタン：紙吹雪を停止",
						})
					: intl.formatMessage({
							id: "basic.startButton",
							defaultMessage: "Start Confetti",
							description: "ボタン：紙吹雪を開始",
						})}
			</button>
		</div>
	);
};

export default BasicPage;
