import { Button, Tooltip } from "antd";
import {
  SmileOutlined,
  CarOutlined,
  RocketOutlined,
  SendOutlined,
} from "@ant-design/icons";
import { ReactNode } from "react";

const AppText = () => (
  <Tooltip title="iOS 和 Android 版本记做不同的应用。您可删除已不再使用的应用来有效利用配额。">
    <a>应用</a>
  </Tooltip>
);
const PackageText = () => (
  <Tooltip title="原生包指完整的 apk 或 ipa 格式的安装包。您可删除已不再使用的原生包来有效利用配额。">
    <a>原生包</a>
  </Tooltip>
);
const HotUpdateText = () => (
  <Tooltip
    title={`热更包指"pushy bundle"命令生成的 ppk 文件（其中包含jsbundle、图片等业务逻辑文件）。
注意这不是用户实际下载的文件，用户实际下载的是经过服务器运算后生成的极小差量补丁包。您可删除已不再使用的热更包来有效利用配额。`}
  >
    <a>热更包</a>
  </Tooltip>
);
const CheckLimitText = ({ children }: { children: ReactNode }) => (
  <>
    <hr style={{ margin: "10px 0" }} />
    所有应用累加
    <br />
    每天
    <Tooltip
      title={
        <>
          指每次客户端向服务器端发起更新检查请求，无论检查结果是否存在新版本。如日更新检查次数超过百万次，请点此查看
          <a
            target="_blank"
            style={{ textDecorationLine: "underline", fontWeight: "bold" }}
            href="docs/faq#大客户方案"
          >
            大客户方案
          </a>
          。
        </>
      }
    >
      <a>{children}次</a>
    </Tooltip>
    更新查询
    <hr style={{ margin: "10px 0" }} />
  </>
);

function Pricing() {
  return (
    <div className="home-wrapper">
      <section className="pricing-section">
        <p
          style={{
            marginBottom: 25,
            textAlign: "center",
          }}
        >
          新注册用户将自动获得
          <Tooltip title="您可将注册用户名、公司（或个人）名称发送至<hi@charmlot.com>，申请延长评估时间">
            <a>7 天</a>
          </Tooltip>
          的<strong>专业版</strong>
          免费试用评估。到期后转为免费版。如需按月购买，请联系QQ客服 34731408.
        </p>
        <div className="pricing pricing--rabten">
          <div className="pricing__item">
            <SmileOutlined className="icon" />
            <h3 className="pricing__title">免费版</h3>
            <p className="pricing__sentence">适用于小型应用，轻度更新需求</p>
            <div className="pricing__price">
              <span className="pricing__anim pricing__anim--1">
                <span className="pricing__currency">￥</span>0
              </span>
              <span className="pricing__anim pricing__anim--2">
                <span className="pricing__period"> / 年</span>
              </span>
              <hr />
              <span className="pricing__anim pricing__anim--1">
                {/* <span className="pricing__currency">￥</span>80 */}
              </span>
              <span className="pricing__anim pricing__anim--2">
                {/* <span className="pricing__period">/ 月</span> */}
              </span>
            </div>
            <ul className="pricing__feature-list">
              <li className="pricing__feature">
                可创建3个
                <AppText />
                ，每个限*：
              </li>
              <li className="pricing__feature">
                30个
                <PackageText />
                ，每个最大30M
              </li>
              <li className="pricing__feature">
                30个
                <HotUpdateText />
                ，每个最大3M
              </li>
              <li className="pricing__feature">
                <CheckLimitText>1千</CheckLimitText>
              </li>
            </ul>
            <Button
              shape="round"
              style={{ marginTop: "auto", padding: "4px 16px" }}
              href="docs/getting-started"
            >
              开始使用
            </Button>
          </div>
          <div className="pricing__item">
            <CarOutlined className="icon" />
            <h3 className="pricing__title">标准版</h3>
            <p className="pricing__sentence">适用于一般应用，中度更新需求</p>
            <div className="pricing__price">
              <span className="pricing__anim pricing__anim--1">
                <span className="pricing__currency">￥</span>800
              </span>
              <span className="pricing__anim pricing__anim--2">
                <span className="pricing__period">/ 年</span>
              </span>
              <hr />
              <span className="pricing__anim pricing__anim--1">
                <span className="pricing__currency">￥</span>100
              </span>
              <span className="pricing__anim pricing__anim--2">
                <span className="pricing__period">/ 月</span>
              </span>
            </div>
            <ul className="pricing__feature-list">
              <li className="pricing__feature">
                可创建5个
                <AppText /> ，每个限*：
              </li>
              <li className="pricing__feature">
                50个
                <PackageText />
                ，每个最大150M
              </li>
              <li className="pricing__feature">
                50个
                <HotUpdateText />
                ，每个最大15M
              </li>
              <li className="pricing__feature">
                <CheckLimitText>1万</CheckLimitText>
              </li>
              <li className="pricing__feature">提供专人技术支持</li>
            </ul>
            <Button
              style={{ marginTop: "auto" }}
              shape="round"
              type="primary"
              target="_blank"
              href="https://pushy-admin.reactnative.cn/#/user"
            >
              立即升级
            </Button>
          </div>
          <div className="pricing__item">
            <SendOutlined className="icon" />
            <h3 className="pricing__title">高级版</h3>
            <p className="pricing__sentence">适用于一般应用，中度更新需求</p>
            <div className="pricing__price">
              <span className="pricing__anim pricing__anim--1">
                <span className="pricing__currency">￥</span>2400
              </span>
              <span className="pricing__anim pricing__anim--2">
                <span className="pricing__period">/ 年</span>
              </span>{" "}
              <hr />
              <span className="pricing__anim pricing__anim--1">
                <span className="pricing__currency">￥</span>300
              </span>
              <span className="pricing__anim pricing__anim--2">
                <span className="pricing__period">/ 月</span>
              </span>
            </div>
            <ul className="pricing__feature-list">
              <li className="pricing__feature">
                可创建10个
                <AppText />
                ，每个限*：
              </li>
              <li className="pricing__feature">
                60个
                <PackageText />
                ，每个最大500M
              </li>
              <li className="pricing__feature">
                60个
                <HotUpdateText />
                ，每个最大50M
              </li>{" "}
              <li className="pricing__feature">
                <CheckLimitText>10万</CheckLimitText>
              </li>
              <li className="pricing__feature">提供专人技术支持</li>
            </ul>
            <Button
              style={{ marginTop: "auto" }}
              shape="round"
              type="primary"
              target="_blank"
              href="https://pushy-admin.reactnative.cn/#/user"
            >
              立即升级
            </Button>
          </div>
          <div className="pricing__item">
            <RocketOutlined className="icon" />
            <h3 className="pricing__title">专业版</h3>
            <p className="pricing__sentence">适用于商业应用，高速迭代需求</p>
            <div className="pricing__price">
              <span className="pricing__anim pricing__anim--1">
                <span className="pricing__currency">￥</span>7200
              </span>
              <span className="pricing__anim pricing__anim--2">
                <span className="pricing__period">/ 年</span>
              </span>{" "}
              <hr />
              <span className="pricing__anim pricing__anim--1">
                <span className="pricing__currency">￥</span>900
              </span>
              <span className="pricing__anim pricing__anim--2">
                <span className="pricing__period">/ 月</span>
              </span>
            </div>
            <ul className="pricing__feature-list">
              <li className="pricing__feature">
                可创建50个
                <AppText />
                ，每个限*：
              </li>
              <li className="pricing__feature">
                100个
                <PackageText />
                ，每个最大2000M
              </li>
              <li className="pricing__feature">
                100个
                <HotUpdateText />
                ，每个最大200M
              </li>{" "}
              <li className="pricing__feature">
                <CheckLimitText>100万</CheckLimitText>
              </li>
              <li className="pricing__feature">提供专人技术支持</li>
            </ul>
            <Button
              style={{ marginTop: "auto" }}
              shape="round"
              type="primary"
              target="_blank"
              href="https://pushy-admin.reactnative.cn/#/user"
            >
              立即升级
            </Button>
          </div>
        </div>
        <div
          style={{
            color: "#8b909d",
            textAlign: "center",
            fontSize: "16px",
            marginTop: 10,
          }}
        >
          <p className="mb-4">
            *注：iOS 和 Android 版本记做不同的应用。
            <br />
            原生包指完整的apk/ipa安装包。热更包指pushy
            bundle命令生成的ppk文件（不是用户实际下载的增量更新文件）。
            <br />
            您可删除已不再使用的应用、原生包、热更包来有效利用配额。
          </p>
          <p>
            对于付费业务还有其他疑问？请参考
            <a
              className="text-[#1890ff] font-bold"
              href="docs/faq#%E4%BB%98%E8%B4%B9%E9%97%AE%E9%A2%98"
            >
              常见问题
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}

export default Pricing;
