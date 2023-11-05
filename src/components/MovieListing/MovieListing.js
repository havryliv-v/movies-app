import React from 'react'
import { useSelector } from 'react-redux'
import Slider from 'react-slick'


import MovieCard from '../MovieCard/MovieCard'
import { Settings } from '../../common/settings'
import { getAllMovies, getAllShows, getLoadingStatus, getMoviesErrorStatus, getShowsErrorStatus } from '../../features/movies/movieSlice'

import Spinner from '../../images/Spinner.svg'
import './movieListing.scss'

const MovieListing = () => {

   const movies = useSelector(getAllMovies)
   const shows = useSelector(getAllShows)
   const loader = useSelector(getLoadingStatus)
   const errorMovies = useSelector(getMoviesErrorStatus)
   const errorShows = useSelector(getShowsErrorStatus)

   const errorMessage = 'Connection was lost or invalid request! Please try again later'
   console.log(movies)
   let renderMovies, renderShows = ''

   renderMovies = movies.Response === "True" ? (
      movies.Search.map((movie, index) => (
         <MovieCard key={index} data={movie} />
      ))
   ) : (<div className='movies-error'><h3>{movies.Error
   }</h3 ></div >)
   renderShows = shows.Response === "True" ? (
      shows.Search.map((shows, index) => (
         <MovieCard key={index} data={shows} />
      ))
   ) : (<div className='movies-error'><h3>{shows.Error
   }</h3 ></div >)
   return (
      <div className='movie-wrapper'>
         {loader ? <div className='movie-loading'><img alt='spiner' src={Spinner} /></div> : (
            <>
               <div className="movie-list">
                  <h2>Movies</h2>
                  <div className="movie-container">
                     {errorMovies ? <div className="movies-error">{errorMessage}</div> : (<Slider {...Settings}>{renderMovies}</Slider>)}
                  </div>
               </div>
               <div className="show-list">
                  <h2>Shows</h2>
                  <div className="movie-container">
                     {errorShows ? <div className="movies-error">{errorMessage}</div> : (<Slider {...Settings}>{renderShows}</Slider>)}
                  </div>
               </div>
            </>
         )}
      </div>
   )
}

export default MovieListing