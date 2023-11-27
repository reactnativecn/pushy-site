import Banner from "./Banner";
import Page1 from "./Page1";
import Page2 from "./Page2";

function Home(props: any) {
  return (
    <div className="home-wrapper">
      <Banner {...props} />
      <Page1 {...props} />
      <Page2 {...props} />
    </div>
  );
}

export default Home;
