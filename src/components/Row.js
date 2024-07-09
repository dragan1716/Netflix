import axios from "axios";
import React, { useEffect, useState } from "react";

const Row = ({ title, fetchUrl }) => {
  const [movies, setMovies] = useState([]);

  const fetchMovies = async () => {
    try {
      await axios.get(fetchUrl).then((response) => {
        setMovies(response.data.results);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [fetchUrl]);

  console.log(movies);
  return (
    <>
      <h2 className="text-white font-bold md:text-xl p-4">{title}</h2>
      <div className="relative flex items-center">
        <div id={"slider"} className="flex">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="w-160px sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2"
            >
              <img
                className="w-full h-auto block object-cover"
                src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
                alt={movie?.title}
              />
              <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 text-white opacity-0 hover:opacity-100">
                <p className="flex justify-center items-center font-bold px-2 h-full w-full top-[40%] text-center">
                  {movie?.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Row;
