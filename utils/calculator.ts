export default class Calculator {
	private current: KeyType[] = ["0"];

	constructor() {}

	get info() {
		return this.split();
	}

	get display(): string {
		const [left, op, right] = this.split();
		const last = right ?? left;
		const [int, decimal] = last.join("").split(",");
		const d = decimal ? `,${decimal.slice(0, 8)}` : "";

		return `${int}${d}`;
	}

	get operator(): KeyType | undefined {
		const [_, op, right] = this.split();
		return !right ? op : undefined;
	}

	get isCleared(): boolean {
		return this.current.length === 1 && this.current[0] === "0";
	}

	executeKey(key: string) {
		try {
			switch (key) {
				case "0":
					return this.addCero();

				case "1":
				case "2":
				case "3":
				case "4":
				case "5":
				case "6":
				case "7":
				case "8":
				case "9":
					return this.addDigit(key);

				case "+":
					return this.execute("add");

				case "-":
					return this.execute("rest");

				case "*":
					return this.execute("mult");

				case "/":
					return this.execute("div");

				case "Backspace":
					this.remove();
					break;

				case "Escape":
					this.clear();
					break;

				case "Enter":
					this.resolve();
					break;

				default:
					console.warn(`Key ${key} not supported.`);
					break;
			}
		} catch (err) {
			this.clear();
			throw err;
		}
	}

	execute(key: KeyType) {
		try {
			switch (key) {
				case "ac":
					this.clear();
					break;

				case "0":
					this.addCero();
					break;

				case "1":
				case "2":
				case "3":
				case "4":
				case "5":
				case "6":
				case "7":
				case "8":
				case "9":
					this.addDigit(key);
					break;

				case "add":
				case "rest":
				case "mult":
				case "div":
					this.addOperator(key);
					break;

				// case ",":
				// 	this.addComa();
				// 	break;

				case "equal":
					this.resolve();
					break;

				default:
					throw "Not supported key.";
			}
		} catch (err) {
			this.clear();
			throw err;
		}

		const [l, o, r] = this.split();
		console.log(l, o, r);
	}

	remove() {
		const [left, op, right] = this.split();
		if (right) {
			let sub = right.slice(0, right.length - 1);
			if (sub.length == 0) sub = ["0"];

			this.current = [...left, op!, ...sub];
			return;
		}

		if (op) {
			this.current = [...left, op, "0"];
			return;
		}

		if (left[0] !== "0") {
			let sub = left.slice(0, left.length - 1);
			if (sub.length == 0) sub = ["0"];
			this.current = sub;
		}
	}

	addCero() {
		const [left, op, right] = this.split();
		const last = right ?? left;

		if (last[0] != "0") {
			this.current.push("0");
		}
	}

	addDigit(key: KeyType) {
		const [left, op, right] = this.split();
		if (right && right[0] == "0") {
			right[0] = key;
			this.current = [...left, op!, ...right];
		} else if (left[0] == "0") {
			left[0] = key;
			this.current = [...left];
			if (op) this.current.push(op);
		} else this.current.push(key);
	}

	addOperator(key: KeyType) {
		const [left, op, right] = this.split();
		if (right) {
			this.resolve();
			this.current.push(key);
			return;
		}

		if (op) {
			this.current = [...left, key];
			return;
		}

		this.current.push(key);
	}

	addComa() {
		const [left, op, right] = this.split();
		if (right && right[0] === "0") {
			this.current = [...left, op!, "0", ","];
		} else if (op) {
			//
		} else {
			this.current.push(",");
		}
	}

	resolve() {
		const [left, op, right] = this.split();
		if (!op || !right) return;

		const a = Number(left.join("").replaceAll(",", "."));
		const b = Number(right.join("").replaceAll(",", "."));

		console.log(a, b);

		switch (op) {
			case "add":
				this.setResult(a + b);
				break;

			case "rest":
				this.setResult(a - b);
				break;

			case "mult":
				this.setResult(a * b);
				break;

			case "div":
				if (b === 0) throw "Division by cero not allowed.";
				this.setResult(a / b);
				break;

			default:
				throw "Operator not supported";
		}
	}

	clear() {
		const [left, op, right] = this.split();
		if (right) {
			if (right[0] === "0") this.current = left;
			else this.current = [...left, op!, "0"];
		} else if (op) {
			this.current = left;
		} else this.current = ["0"];
	}

	private setResult(n: number) {
		this.current = n.toString().replaceAll(".", ",").split("") as KeyType[];
	}

	private findOperator(): number {
		for (let i = 0; i < this.current.length; i++) {
			const key = this.current[i];
			if (OPERATORS.includes(key)) return i;
		}
		return -1;
	}

	private split(): [KeyType[], KeyType | undefined, KeyType[] | undefined] {
		const op = this.findOperator();
		if (op < 0) return [this.current, undefined, undefined];

		if (op + 1 == this.current.length) {
			return [this.current.slice(0, op), this.current[op], undefined];
		}

		return [
			this.current.slice(0, op),
			this.current[op],
			this.current.slice(op + 1),
		];
	}
}

export const OPERATORS = ["add", "rest", "mult", "div"];

export type KeyType =
	| "1"
	| "2"
	| "3"
	| "4"
	| "5"
	| "6"
	| "7"
	| "8"
	| "9"
	| "0"
	| "ac"
	| "signs"
	| "percent"
	| "div"
	| "mult"
	| "rest"
	| "add"
	| "equal"
	| ","
	| "-"
	| ".";
