import Main from "../components/Main";
import Row from "../components/Row";
import requests from "../Requests";

const Home = () => {
  return (
    <>
      <Main />
      <Row title="Trending Now" fetchUrl={requests.requestTrending} />
      <Row title="Top Rated" fetchUrl={requests.requestTopRated} />
      <Row title="Horror" fetchUrl={requests.requestHorror} />
      <Row title="Comedy" fetchUrl={requests.requestPopular} />
      <Row title="Up Coming" fetchUrl={requests.requestUpcoming} />
    </>
  );
};

export default Home;
