import { Courier_Prime } from "@next/font/google";
import type { AppProps } from "next/app";
import Head from "next/head";
import "../styles/globals.css";

const mono = Courier_Prime({ weight: "400", subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<style jsx global>{`
				html {
					--custom-mono: ${mono.style.fontFamily};
				}
			`}</style>

			<Head>
				<meta charSet="utf-8" />
				<meta
					name="theme-color"
					content="#ffffff"
					media="(prefers-color-scheme: light)"
				/>
				<meta
					name="theme-color"
					content="#000000"
					media="(prefers-color-scheme: dark)"
				/>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1, viewport-fit=cover"
				/>
				<meta name="description" content="Calculator" />

				<title>Calculator</title>
			</Head>

			<Component {...pageProps} />
		</>
	);
}
