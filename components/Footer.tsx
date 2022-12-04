"use client";

import ReactDOM from "react-dom";

export default function Footer() {
	const footer = (
		<footer className="fixed top-2 left-3 sm:top-auto sm:left-auto sm:right-3 sm:bottom-2 text-center">
			<a
				href="https://twitter.com/KarelRic"
				target="_blank"
				rel="noreferrer"
				className="transition-colors duration-150 text-neutral-500
				dark:text-neutral-600 hover:text-neutral-800 dark:hover:text-white"
			>
				@KarelRic
			</a>
		</footer>
	);

	if (typeof window === "undefined") return footer;
	return ReactDOM.createPortal(footer, document.body);
}
