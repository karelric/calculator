import { ReactNode, TouchEvent, useState } from "react";

type Props = {
	display: string;
	error?: boolean;
	onDelete?: () => void;
};

export default function Screen({ display, onDelete, error = false }: Props) {
	const text = display.slice(0, 12);
	const size = (() => {
		if (text.length > 10) return "text-5xl";
		if (text.length > 8) return "text-6xl";
		if (text.length > 6) return "text-7xl";
		return "text-8xl";
	})();

	return (
		<DetectSwipe onSwipeRight={() => onDelete?.()}>
			<div
				className={`text-right overflow-clip whitespace-nowrap flex
			flex-col justify-end leading-none pb-2 truncate h-[104px]
			font-light ${size}`}
			>
				{!error && text}
				{error && (
					<span className="text-6xl leading-snug text-red-500">Error!</span>
				)}
			</div>
		</DetectSwipe>
	);
}

type DetectSwipeProps = {
	children: ReactNode;
	onSwipeRight?: () => void;
};

function DetectSwipe({ children, onSwipeRight }: DetectSwipeProps) {
	const [x, setX] = useState<number | null>(null);

	function onTouchStart(e: TouchEvent) {
		const current = e.touches.item(0).clientX;
		setX(current);
	}

	function handleTouchEnd(e: TouchEvent) {
		if (!x) return;

		const afterX = e.changedTouches.item(0)?.clientX;
		if (x < afterX) {
			onSwipeRight?.();
		} else {
			console.log("Swiped to left!");
		}

		setX(null);
	}

	return (
		<div onTouchStart={onTouchStart} onTouchEnd={handleTouchEnd}>
			{children}
		</div>
	);
}
