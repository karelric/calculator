import { ReactNode } from "react";
import { KeyType, OPERATORS } from "../utils/calculator";

type KeyData = {
	key: KeyType;
	icon: ReactNode;
	span?: boolean;
	action?: boolean;
	operator?: boolean;
};

const keys: KeyData[] = [
	{ key: "ac", icon: "AC", action: true },
	{ key: "signs", icon: <Signs />, action: true },
	{
		key: "percent",
		icon: <span className="material-icons text-4xl font-black">percent</span>,
		action: true,
	},
	{ key: "div", icon: <Division />, operator: true },
	{ key: "7", icon: "7" },
	{ key: "8", icon: "8" },
	{ key: "9", icon: "9" },
	{
		key: "mult",
		icon: <span className="material-icons text-4xl font-black">close</span>,
		operator: true,
	},
	{ key: "4", icon: "4" },
	{ key: "5", icon: "5" },
	{ key: "6", icon: "6" },
	{
		key: "rest",
		icon: <span className="material-icons text-4xl font-black">remove</span>,
		operator: true,
	},
	{ key: "1", icon: "1" },
	{ key: "2", icon: "2" },
	{ key: "3", icon: "3" },
	{
		key: "add",
		icon: <span className="material-icons text-4xl font-black">add</span>,
		operator: true,
	},
	{ key: "0", icon: "0", span: true },
	{ key: ",", icon: "," },
	{ key: "equal", icon: "=", operator: true },
];

type Props = {
	isCleared?: boolean;
	operator?: KeyType;
	onKey?: (key: KeyType) => void;
};

export default function Keypad({ isCleared, operator, onKey }: Props) {
	return (
		<div className="grid grid-cols-4 gap-5 sm:gap-[2px] items-stretch w-full">
			{keys.map((key) => {
				const icon = key.key == "ac" && !isCleared ? "C" : key.icon;
				return (
					<Key
						key={key.key}
						active={OPERATORS.includes(key.key) && key.key === operator}
						data={{ ...key, icon }}
						onKey={onKey}
					/>
				);
			})}
		</div>
	);
}

type KeyProps = {
	active?: boolean;
	data: KeyData;
	onKey?: (key: KeyType) => void;
};

function Key({ active = false, data, onKey }: KeyProps) {
	const color = (() => {
		if (data.operator)
			return [
				"bg-operator hover:bg-operator/90 active:bg-operator/80",
				"text-white",
			];

		if (data.action)
			return [
				"bg-neutral-400 hover:bg-neutral-400/90 active:bg-neutral-400/80",
				"dark:bg-neutral-400 dark:hover:bg-neutral-400/90 dark:active:bg-neutral-400/80 dark:text-black",
			];

		return [
			"bg-neutral-200 hover:bg-neutral-200/90 active:bg-neutral-200/80",
			"dark:bg-neutral-700 dark:hover:bg-neutral-700/90 dark:active:bg-neutral-700/80",
		];
	})().join(" ");

	const isActive = (() => {
		if (active) {
			return ["xs:bg-white xs:text-operator sm:scale-[.98]"];
		}
		return [];
	})().join(" ");

	const isSpan = data.span ? "col-span-2" : "aspect-square";

	return (
		<button
			type="button"
			onClick={() => onKey?.(data.key)}
			className={`flex flex-col justify-center items-center text-3xl sm:text-4xl
			font-medium select-none active:scale-[.98] transition-transform duration-100
			rounded-full leading-none sm:rounded-none ${color} ${isSpan} ${isActive}`}
		>
			{data.icon}
		</button>
	);
}

function Signs() {
	return (
		<div
			className="w-9 aspect-square relative flex flex-col justify-center items-center scale-[1]
			font-bold overflow-hidden"
		>
			<span className="absolute top-0 left-0 text-xl font-black leading-none material-icons">
				add
			</span>
			<div className="bg-current w-[3px] h-full m-[3px] rotate-45 rounded-full"></div>
			<span className="absolute right-0 bottom-0 text-xl font-black leading-none material-icons">
				remove
			</span>
		</div>
	);
}

function Division() {
	return (
		<div className="w-6 h-6 flex flex-col justify-between items-center">
			<div className="w-[5px] aspect-square bg-current rounded-full"></div>
			<div className="w-full h-1 bg-current rounded-full"></div>
			<div className="w-[5px] aspect-square bg-current rounded-full"></div>
		</div>
	);
}
