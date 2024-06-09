import { RootState } from "@/types";
import { createSlice } from '@reduxjs/toolkit';


export const initialState: RootState = {
  userInfo: null,
  category: null,
  details: {
    title: '',
    description: '',
    price: 0,
    guests: 0,
    rooms: 0,
    bathrooms: 0,
    fileUrl: null,
  },
  address: null,
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

    //Property creation payloads
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    resetCategory: (state) => {
      state.category = null;
    },
    setAddress: (state, action) => {
      state.address = action.payload;
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
    setFile: (state, action) => {
      if (state.details) state.details.fileUrl = action.payload;
    },
    resetDetails: (state) => {
      state.details = initialState.details;
    },
    resetAddress: (state) => {
      state.address = null;
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
  setCategory,
  setTitle,
  setFile,
  setRooms,
  setPrice,
  setGuests,
  setBathrooms,
  setAddress,
  setDescription,
  resetAddress,
  resetDetails,
  resetCategory,
  resetState
} = appSlice.actions;
export default appSlice.reducer
