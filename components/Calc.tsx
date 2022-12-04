import { useCallback, useEffect, useMemo, useState } from "react";
import Calculator, { KeyType } from "../utils/calculator";
import Keypad from "./Keypad";
import Screen from "./Screen";

export default function Calc() {
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
		<div
			className="fixed top-0 sm:relative w-full h-full max-w-[436px] flex flex-col
			justify-end pb-[env(safe-area-inset-bottom)]"
		>
			<div className="flex flex-col p-5">
				<Screen
					display={display}
					error={error}
					onDelete={() => execute(() => calc.remove())}
				/>

				<Keypad
					operator={operator}
					isCleared={cleared}
					onKey={(k) => execute(() => calc.execute(k))}
				/>
			</div>
		</div>
	);
}
