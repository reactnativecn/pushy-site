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
  scale?: number;
}

function Showcase() {
  const logos: ShowcaseLogo[] = [
    { src: zglt, alt: "中国联通", width: 152, height: 50 },
    { src: wyyx, alt: "网易游戏", width: 154, height: 62 },
    { src: hzsfdx, alt: "华中师范大学", width: 188, height: 54 },
    { src: lyl, alt: "蓝月亮", width: 146, height: 56 },
    { src: opple, alt: "欧普照明", width: 96, height: 90 },
    { src: pabdc, alt: "平安不动产", width: 158, height: 46 },
    { src: tjgj, alt: "天津公交", width: 150, height: 50 },
    { src: rjwl, alt: "锐捷网络", width: 164, height: 42 },
    { src: hqsb, alt: "环球时报", width: 150, height: 48 },
    { src: htxx, alt: "航天信息", width: 150, height: 54 },
  ];

  return (
    <div className="py-24 bg-white border-y border-slate-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-light text-slate-800 tracking-tight">
          他们选择了 <span className="font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">Pushy</span>
        </h2>
        <div className="mt-4 w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full"></div>
      </div>

      <div className="max-w-6xl mx-auto px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 md:gap-9">
          {logos.map((logo, index) => (
            <div
              key={index}
              className="group flex items-center justify-center h-24 sm:h-28 grayscale opacity-55 hover:grayscale-0 hover:opacity-100 transition-all duration-300 ease-in-out cursor-pointer hover:scale-105"
            >
              <img
                src={logo.src}
                alt={logo.alt}
                title={logo.alt}
                className="object-contain"
                style={{
                  width: logo.width,
                  height: logo.height,
                  maxWidth: "100%",
                  transform: logo.scale ? `scale(${logo.scale})` : undefined,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Showcase;
