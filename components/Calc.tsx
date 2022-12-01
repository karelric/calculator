import { useCallback, useEffect, useMemo, useState } from "react";
import Calculator, { KeyType } from "../utils/calculator";
import Keypad from "./Keypad";
import Screen from "./Screen";

type Props = {
	env?: "development" | "production" | "test";
};

export default function Calc({ env }: Props) {
	const calc = useMemo(() => new Calculator(), []);

	const [error, setError] = useState(false);
	const [display, setDisplay] = useState(calc.display);
	const [cleared, setCleared] = useState<boolean>(calc.isCleared);
	const [operator, setOperator] = useState<KeyType | undefined>(calc.operator);
	const execute = useCallback((exec: () => void) => {
		try {
			exec();
			setError(false);
		} catch (err) {
			console.error(err);
			setError(true);
		} finally {
			setDisplay(calc.display);
			setOperator(calc.operator);
			setCleared(calc.isCleared);
		}
	}, []);

	useEffect(() => {
		console.log("window!");
		function handler({ key }: KeyboardEvent) {
			execute(() => calc.executeKey(key));
		}

		window.addEventListener("keyup", handler);
		return () => window.removeEventListener("keyup", handler);
	}, [calc, execute]);

	return (
		<div className="fixed sm:relative w-full h-full flex flex-col pb-[env(safe-area-inset-bottom)]">
			<Screen display={display} error={error} />

			<Keypad
				operator={operator}
				isCleared={cleared}
				onKey={(k) => execute(() => calc.execute(k))}
			/>

			{env === "development" && (
				<p className="text-center p-2 bg-neutral-900 rounded break-words">
					{JSON.stringify(calc.info)}
				</p>
			)}
		</div>
	);
}
