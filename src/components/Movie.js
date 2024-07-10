import React, { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const Movie = ({ movie }) => {
  const [liked, setLiked] = useState(false);

  const handleLikeClick = () => {
    const likedMovies = JSON.parse(localStorage.getItem("likedMovies")) || [];
    let updatedLikedMovies;

    if (liked) {
      updatedLikedMovies = likedMovies.filter(
        (likedMovie) => likedMovie.id !== movie.id
      );
    } else {
      const { id, title } = movie;
      updatedLikedMovies = [...likedMovies, { id, title }];
    }

    localStorage.setItem("likedMovies", JSON.stringify(updatedLikedMovies));
    setLiked(!liked);
  };

  useEffect(() => {
    const likedMovies = JSON.parse(localStorage.getItem("likedMovies")) || [];
    setLiked(likedMovies.some((likedMovie) => likedMovie.id === movie.id));
  }, [movie.id]);

  return (
    <div
      key={movie.id}
      className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2"
    >
      <img
        className="w-full h-auto block object-cover"
        src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
        alt={movie?.title}
      />
      <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 text-white opacity-0 hover:opacity-100">
        <p className="whitespace-normal flex justify-center items-center font-bold px-2 h-full w-full top-[40%] text-center break-words">
          {movie?.title}
        </p>
        <div onClick={handleLikeClick} className="absolute top-4 left-4">
          {liked ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
        </div>
      </div>
    </div>
  );
};

export default Movie;
