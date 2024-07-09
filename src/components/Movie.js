import React from "react";

const Movie = () => {
  return (
    <div>
      <img
        key={movie.id}
        className="w-48 md:w-64 h-64 object-cover"
        src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
        alt={movie.title}
      />
    </div>
  );
};

export default Movie;
