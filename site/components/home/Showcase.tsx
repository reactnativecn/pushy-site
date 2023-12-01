import { Button } from "antd";
import Link from "next/link";

// import BannerSVGAnim from './BannerSVGAnim';
// import logo from "../../public/images/logo.svg";
// import hero from "../../public/images/home_hero.svg";
import Image from "next/image";
import wyyx from "../../public/images/showcase/wyyx.svg";
import lyl from "../../public/images/showcase/lyl.svg";
import hzsfdx from "../../public/images/showcase/hzsfdx.svg";
import jljr from "../../public/images/showcase/jljr.svg";
import pabdc from "../../public/images/showcase/pabdc.svg";
import yckj from "../../public/images/showcase/yckj.svg";
import najj from "../../public/images/showcase/najj.svg";
import rjwl from "../../public/images/showcase/rjwl.svg";
import htxx from "../../public/images/showcase/htxx.svg";
import tjgj from "../../public/images/showcase/tjgj.svg";

function Showcase({ isMobile }: { isMobile: boolean }) {
  return (
    <div className="max-w-[1250px] mx-auto home-page !mb-32">
      <h2>
        他们选择了 <span>Pushy</span>
      </h2>
      <div className="title-line-wrapper page1-line !mb-10">
        <div className="title-line" />
      </div>
      <div className="grid grid-cols-2 xl:grid-cols-5 gap-y-5">
        <div className="h-20 flex justify-center items-center">
          <Image src={wyyx} alt="网易游戏" height={60} />
        </div>
        <div className="h-20 flex justify-center items-center">
          <Image src={lyl} alt="蓝月亮" height={50} />
        </div>
        <div className="h-20 flex justify-center items-center">
          <Image src={hzsfdx} alt="华中师范大学" height={75} />
        </div>
        <div className="h-20 flex justify-center items-center">
          <Image src={jljr} alt="娇兰佳人" height={70} />
        </div>
        <div className="h-20 flex justify-center items-center">
          <Image src={pabdc} alt="平安不动产" height={60} />
        </div>
        <div className="h-20 flex justify-center items-center">
          <Image src={yckj} alt="友车科技" height={55} />
        </div>
        <div className="h-20 flex justify-center items-center">
          <Image src={najj} alt="诺安基金" height={70} />
        </div>
        <div className="h-20 flex justify-center items-center">
          <Image src={rjwl} alt="锐捷网络" height={35} />
        </div>
        <div className="h-20 flex justify-center items-center">
          <Image src={htxx} alt="航天信息" height={42} />
        </div>
        <div className="h-20 flex justify-center items-center">
          <Image src={tjgj} alt="天津公交" height={48} />
        </div>
      </div>
    </div>
  );
}

export default Showcase;
