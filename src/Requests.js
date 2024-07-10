const key = "607b26a270d99be23078ee30bcdd5bcf";

const requests = {
  requestPopular: `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=4`,
  requestTopRated: `https://api.themoviedb.org/3/movie/top_rated?api_key=${key}&language=en-US&page=1`,
  requestTrending: `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=3`,
  requestHorror: `https://api.themoviedb.org/3/movie/upcoming?api_key=${key}&language=en-US&page=2`,
  requestUpcoming: `https://api.themoviedb.org/3/movie/upcoming?api_key=${key}&language=en-US&page=1`,
};
// https://api.themoviedb.org/3/movie/550?api_key=607b26a270d99be23078ee30bcdd5bcf

export default requests;
