import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import requests from "../Requests";

const Main = () => {
  const [movie, setMovie] = useState([]);

  const fetchMovies = async () => {
    try {
      await axios.get(requests.requestPopular).then((response) => {
        const movies = response.data.results;
        const randomMovie = Math.floor(Math.random() * movies.length);
        setMovie(movies[randomMovie]);
      });
    } catch (error) {
      console.log(error);
    }
  };
  console.log(movie);

  useEffect(() => {
    fetchMovies();
  }, []);
  return (
    <div className="w-full h-[550px] text-white">
      <div className="w-full h-full">
        <div className="absolute w-full h-[550px] bg-gradient-to-r from-black"></div>
        <img
          className="w-full h-full object-cover"
          src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
          alt={movie?.title}
        />
        <div className="absolute w-full top-[20%] ml-4 mr-4">
          <h1 className="text-white text-4xl font-bold">{movie?.title}</h1>
          <div className="my-4">
            <button className="text-black font-bold bg-gray-300 border py-2 px-4 mr-2 cursor-pointer">
              Play
            </button>
            <button className="text-white font-bold border py-2 px-4">
              Watch Later
            </button>
          </div>
          <p className="text-gray-300 font-bold text-sm mb-4">
            Released: {movie.release_date}
          </p>
          <p className="text-white w-[90%]">{movie?.overview}</p>
        </div>
      </div>
    </div>
  );
};

export default Main;
