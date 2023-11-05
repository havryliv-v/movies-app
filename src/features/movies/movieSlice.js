import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import moviesApi from '../../common/apis/moviesApi';
import { APIKey } from '../../common/apis/movieApiKey'


export const fetchAsyncMovies = createAsyncThunk('movies/fetchAsyncMovies', async (term = 'Impossible') => {

   const response = await moviesApi
      .get(`?apiKey=${APIKey}&s=${term}&type=movie`)

   response.data.Search.map((item) => {
      if (item.Poster === 'N/A') {
         return item.Poster = 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/330px-No-Image-Placeholder.svg.png'
      }
      return item
   })

   return response.data
})

export const fetchAsyncShows = createAsyncThunk('movies/fetchAsyncShows', async (term = 'Batman') => {

   const response = await moviesApi
      .get(`?apiKey=${APIKey}&s=${term}&type=series`)

   response.data.Search.map((item) => {
      if (item.Poster === 'N/A') {
         return item.Poster = 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/330px-No-Image-Placeholder.svg.png'
      }
      return item
   })

   return response.data
})

export const fetchAsyncDetails = createAsyncThunk('movies/fetchAsyncDetails', async (id) => {
   const response = await moviesApi
      .get(`?apiKey=${APIKey}&i=${id}&Plot=full`)

   if (response.data.Poster === 'N/A') {
      response.data.Poster = 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/330px-No-Image-Placeholder.svg.png';
   }

   return response.data
})

const initialState = {
   movies: {},
   shows: {},
   selectedMovieOrShow: {},
   loading: false,
   errorMovies: false,
   errorShows: false
}

const movieSlice = createSlice({
   name: 'movies',
   initialState,
   reducers: {
      removeSelectedItem: (state) => {
         state.selectedMovieOrShow = {}
      }
   },
   extraReducers: {
      [fetchAsyncMovies.pending]: (state) => {

         return { ...state, loading: true }
      },
      [fetchAsyncMovies.fulfilled]: (state, { payload }) => {
         return { ...state, movies: payload, loading: false }
      },
      [fetchAsyncMovies.rejected]: (state, action) => {
         return { ...state, loading: false, errorMovies: true }
      },
      [fetchAsyncShows.fulfilled]: (state, { payload }) => {
         return { ...state, shows: payload, loading: false }
      },
      [fetchAsyncShows.rejected]: (state, action) => {
         return { ...state, loading: false, errorShows: true }
      },
      [fetchAsyncDetails.fulfilled]: (state, { payload }) => {
         return { ...state, selectedMovieOrShow: payload, loading: false }
      },
   }
})

export const { removeSelectedItem } = movieSlice.actions
export const getAllMovies = (state) => state.movies.movies
export const getAllShows = (state) => state.movies.shows
export const getDetails = (state) => state.movies.selectedMovieOrShow
export const getLoadingStatus = (state) => state.movies.loading
export const getMoviesErrorStatus = (state) => state.movies.errorMovies
export const getShowsErrorStatus = (state) => state.movies.errorShows


export default movieSlice.reducer