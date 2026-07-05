import { useEffect } from "react";
import Banner from "./Banner";
import LiveStats from "./LiveStats";
import Page1 from "./Page1";
import Page2 from "./Page2";
import Showcase from "./Showcase";
import CtaBand from "./CtaBand";
import Footer from "../Footer";

interface HomeProps {
	isMobile?: boolean;
}

/** Reveal-on-scroll: adds .is-revealed to [data-reveal] elements as they enter the viewport. */
function useScrollReveal() {
	useEffect(() => {
		const elements = Array.from(
			document.querySelectorAll<HTMLElement>(".home-wrapper [data-reveal]"),
		);

		if (typeof IntersectionObserver === "undefined") {
			for (const el of elements) {
				el.classList.add("is-revealed");
			}
			return;
		}

		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						entry.target.classList.add("is-revealed");
						observer.unobserve(entry.target);
					}
				}
			},
			{ threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
		);

		for (const el of elements) {
			observer.observe(el);
		}

		return () => {
			observer.disconnect();
		};
	}, []);
}

function Home(props: HomeProps) {
	useScrollReveal();

	return (
		<div className="home-wrapper">
			<Banner {...props} />
			<LiveStats />
			<Showcase />
			<Page1 />
			<Page2 />
			<CtaBand />
			<Footer />
		</div>
	);
}

export default Home;
