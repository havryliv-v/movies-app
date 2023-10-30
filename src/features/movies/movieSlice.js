import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import moviesApi from '../../common/apis/moviesApi';
import { APIKey } from '../../common/apis/movieApiKey'


export const fetchAsyncMovies = createAsyncThunk('movies/fetchAsyncMovies', async (term) => {

   const response = await moviesApi
      .get(`?apiKey=${APIKey}&s=${term}&type=movie`)

   return response.data
})

export const fetchAsyncShows = createAsyncThunk('movies/fetchAsyncShows', async (term) => {

   const response = await moviesApi
      .get(`?apiKey=${APIKey}&s=${term}&type=series`)
   console.log(response)

   return response.data
})

export const fetchAsyncDetails = createAsyncThunk('movies/fetchAsyncDetails', async (id) => {
   const response = await moviesApi
      .get(`?apiKey=${APIKey}&i=${id}&Plot=full`)
   console.log(response)
   return response.data
})

const initialState = {
   movies: {},
   shows: {},
   selectedMovieOrShow: {}
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
      [fetchAsyncMovies.pending]: () => {
         console.log('pending')
      },
      [fetchAsyncMovies.fulfilled]: (state, { payload }) => {
         return { ...state, movies: payload }
      },
      [fetchAsyncMovies.rejected]: () => {
         console.log('rejected')
      },
      [fetchAsyncShows.fulfilled]: (state, { payload }) => {
         return { ...state, shows: payload }
      },
      [fetchAsyncDetails.fulfilled]: (state, { payload }) => {
         return { ...state, selectedMovieOrShow: payload }
      },
   }
})

export const { removeSelectedItem } = movieSlice.actions
export const getAllMovies = (state) => state.movies.movies
export const getAllShows = (state) => state.movies.shows
export const getDetails = (state) => state.movies.selectedMovieOrShow

export default movieSlice.reducer