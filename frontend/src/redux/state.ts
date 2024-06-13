import { RootState } from "@/types";
import { createSlice } from '@reduxjs/toolkit';


export const initialState: RootState = {
  userInfo: null,
  category: null,
  details: {
    title: '',
    description: '',
    price: 0,
    guests: 1,
    rooms: 1,
    bathrooms: 1,
  },
  amenities: null,
  photos: null,
  location: null,
}

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    // User information
    addUser: (state, action) => {
      state.userInfo = action.payload;
    },
    resetUser: (state) => {
      state.userInfo = null;
    },
    setFavorites: (state, action) => {
      if (state.userInfo) state.userInfo.favorites = action.payload
    },
    setMyProperties: (state, action) => {
      if (state.userInfo) state.userInfo.myProperties = action.payload
    },
    setMyReservations: (state, action) => {
      if (state.userInfo) state.userInfo.myReservations = action.payload
    },

    //Property creation payloads
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    resetCategory: (state) => {
      state.category = null;
    },
    setLocation: (state, action) => {
      state.location = action.payload;
    },
    setTitle: (state, action) => {
      if (state.details) state.details.title = action.payload;
    },
    setDescription: (state, action) => {
      if (state.details) state.details.description = action.payload;
    },
    setPrice: (state, action) => {
      if (state.details) state.details.price = action.payload;
    },
    setGuests: (state, action) => {
      if (state.details) state.details.guests = action.payload;
    },
    setRooms: (state, action) => {
      if (state.details) state.details.rooms = action.payload;
    },
    setBathrooms: (state, action) => {
      if (state.details) state.details.bathrooms = action.payload;
    },
    setPhotos: (state, action) => {
      state.photos = action.payload;
    },
    resetPhotos: (state) => {
      state.photos = null;
    },
    setAmenities: (state, action) => {
      state.amenities = action.payload;
    },
    resetAmenities: (state) => {
      state.amenities = [];
    },
    resetDetails: (state) => {
      state.details = initialState.details;
    },
    resetLocation: (state) => {
      state.location = null;
    },

    resetState: (state) => {
      Object.assign(state, initialState);
    }
  }
});

export const {
  addUser,
  resetUser,
  setFavorites,
  setMyProperties,
  setMyReservations,
  setCategory,
  setTitle,
  setPhotos,
  resetPhotos,
  setRooms,
  setPrice,
  setGuests,
  setBathrooms,
  setAmenities,
  setLocation,
  setDescription,
  resetAmenities,
  resetLocation,
  resetDetails,
  resetCategory,
  resetState
} = appSlice.actions;
export default appSlice.reducer
