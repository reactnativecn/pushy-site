import type { CSSProperties } from "react";
import wyyx from "../../pages/public/images/showcase/wyyx.svg";
import lyl from "../../pages/public/images/showcase/lyl.svg";
import hzsfdx from "../../pages/public/images/showcase/hzsfdx-cropped.jpg";
import pabdc from "../../pages/public/images/showcase/pabdc.png";
import rjwl from "../../pages/public/images/showcase/rjwl.svg";
import htxx from "../../pages/public/images/showcase/htxx.png";
import tjgj from "../../pages/public/images/showcase/tjgj.png";
import zglt from "../../pages/public/images/showcase/zglt.png";
import opple from "../../pages/public/images/showcase/opple.png";
import hqsb from "../../pages/public/images/showcase/hqsb.png";

interface ShowcaseLogo {
	src: string;
	alt: string;
	width: number;
	height: number;
}

const logos: ShowcaseLogo[] = [
	{ src: zglt, alt: "中国联通", width: 132, height: 44 },
	{ src: wyyx, alt: "网易游戏", width: 134, height: 54 },
	{ src: hzsfdx, alt: "华中师范大学", width: 164, height: 47 },
	{ src: lyl, alt: "蓝月亮", width: 128, height: 49 },
	{ src: opple, alt: "欧普照明", width: 84, height: 78 },
	{ src: pabdc, alt: "平安不动产", width: 138, height: 40 },
	{ src: tjgj, alt: "天津公交", width: 131, height: 44 },
	{ src: rjwl, alt: "锐捷网络", width: 143, height: 37 },
	{ src: hqsb, alt: "环球时报", width: 131, height: 42 },
	{ src: htxx, alt: "航天信息", width: 131, height: 47 },
];

function LogoTile({ logo }: { logo: ShowcaseLogo }) {
	return (
		<div className="group flex h-24 w-52 shrink-0 items-center justify-center rounded-2xl bg-white px-6 hover:-translate-y-1 transition-transform duration-300">
			<img
				src={logo.src}
				alt={logo.alt}
				title={logo.alt}
				className="object-contain max-w-full grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
				style={{ width: logo.width, height: logo.height }}
				loading="lazy"
			/>
		</div>
	);
}

function Showcase() {
	return (
		<section className="relative py-24 overflow-hidden">
			<div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 text-center mb-14">
				<p
					data-reveal
					className="text-sm font-semibold tracking-[0.2em] text-blue-400/90 uppercase mb-4"
				>
					Trusted by teams
				</p>
				<h2
					data-reveal
					style={{ "--reveal-delay": "80ms" } as CSSProperties}
					className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-50"
				>
					众多团队的共同选择
				</h2>
				<p
					data-reveal
					style={{ "--reveal-delay": "160ms" } as CSSProperties}
					className="mt-4 text-base md:text-lg text-slate-500"
				>
					从运营商、制造业到互联网与媒体，Pushy 支撑着各行业应用的持续交付
				</p>
			</div>

			<div data-reveal style={{ "--reveal-delay": "240ms" } as CSSProperties}>
				<div className="pushy-marquee">
					<div className="pushy-marquee__track">
						{[...logos, ...logos].map((logo, index) => (
							<LogoTile key={`${logo.alt}-${index}`} logo={logo} />
						))}
					</div>
				</div>
			</div>
		</section>
	);
}

export default Showcase;
