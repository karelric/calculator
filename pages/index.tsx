import Calc from "../components/Calc";
import Footer from "../components/Footer";

export default function Home() {
	return (
		<>
			<main className="w-full sm:min-h-d flex flex-col justify-center items-center">
				<Calc />
			</main>

			<Footer />
		</>
	);
}
