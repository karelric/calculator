type Props = {
	display: string;
	error?: boolean;
};

export default function Screen({ display, error = false }: Props) {
	const text = display.slice(0, 12);
	const size = (() => {
		if (text.length > 10) return "text-5xl leading-tight";
		if (text.length > 8) return "text-6xl leading-none";
		if (text.length > 6) return "text-7xl leading-none";
		return "text-8xl leading-none";
	})();

	return (
		<div
			className={`text-right px-4 font-mono overflow-clip break-words flex
			flex-col justify-end h-[144px] flex-1 sm:flex-none ${size}`}
		>
			{!error && text}
			{error && (
				<span className="text-6xl leading-snug text-red-500">Error!</span>
			)}
		</div>
	);
}
