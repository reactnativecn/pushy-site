// import Link from "next/link";
import wyyx from "../../pages/public/images/showcase/wyyx.png";
import lyl from "../../pages/public/images/showcase/lyl.png";
import hzsfdx from "../../pages/public/images/showcase/hzsfdx.jpg";
import pabdc from "../../pages/public/images/showcase/pabdc.png";
// import yckj from "../../pages/public/images/showcase/yckj.svg";
// import najj from "../../pages/public/images/showcase/najj.svg";
import rjwl from "../../pages/public/images/showcase/rjwl.svg";
import htxx from "../../pages/public/images/showcase/htxx.png";
import tjgj from "../../pages/public/images/showcase/tjgj.png";
import zglt from "../../pages/public/images/showcase/zglt.png";
import opple from "../../pages/public/images/showcase/opple.png";
import dsec from "../../pages/public/images/showcase/dsec.png";
import hqsb from "../../pages/public/images/showcase/hqsb.png";

function Showcase() {
  return (
    <div className="max-w-[1250px] mx-auto home-page !mb-32">
      <h2>
        他们选择了 <span>Pushy</span>
      </h2>
      <div className="title-line-wrapper page1-line !mb-10">
        <div className="title-line" />
      </div>
      <div className="grid grid-cols-2 xl:grid-cols-5 gap-y-5">
        {/* <div className="h-20 flex justify-center items-center">
          <img
            src={dsec}
            alt="澳門特別行政區政府 統計暨普查局"
            title="澳門特別行政區政府 統計暨普查局"
            height={70}
          />
        </div> */}
        <div className="h-20 flex justify-center items-center">
          <img src={zglt} alt="中国联通" title="中国联通" />
        </div>
        <div className="h-20 flex justify-center items-center">
          <img src={wyyx} alt="网易游戏" title="网易游戏" />
        </div>
        <div className="h-20 flex justify-center items-center">
          <img
            src={hzsfdx}
            alt="华中师范大学"
            title="华中师范大学"
            height={170}
          />
        </div>
        <div className="h-20 flex justify-center items-center">
          <img src={lyl} alt="蓝月亮" title="蓝月亮" height={50} />
        </div>
        <div className="h-20 flex justify-center items-center">
          <img src={opple} alt="欧普照明" title="欧普照明" height={110} />
        </div>
        <div className="h-20 flex justify-center items-center">
          <img src={pabdc} alt="平安不动产" title="平安不动产" height={55} />
        </div>
        <div className="h-20 flex justify-center items-center">
          <img src={tjgj} alt="天津公交" title="天津公交" height={48} />
        </div>
        <div className="h-20 flex justify-center items-center">
          <img src={rjwl} alt="锐捷网络" title="锐捷网络" height={35} />
        </div>{" "}
        <div className="h-20 flex justify-center items-center">
          <img src={hqsb} alt="环球时报" title="环球时报" height={55} />
        </div>
        <div className="h-20 flex justify-center items-center">
          <img src={htxx} alt="航天信息" title="航天信息" height={80} />
        </div>
      </div>
    </div>
  );
}

export default Showcase;
