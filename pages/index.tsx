import Calc from "../components/Calc";
import Footer from "../components/Footer";

export default function Home() {
	return (
		<>
			<main className="w-full h-full flex flex-col justify-center items-center">
				<div
					className="w-full sm:max-w-sm flex flex-col gap-2 items-center
					h-full sm:h-auto"
				>
					<Calc env={process.env.NODE_ENV} />
				</div>
			</main>

			<Footer />
		</>
	);
}
