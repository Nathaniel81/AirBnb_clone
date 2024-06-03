import { createSlice} from "@reduxjs/toolkit"
import { RootState } from "@/types";


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
  address: null
}

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.userInfo = action.payload;
    },
    resetUser: (state) => {
      state.userInfo = null;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    resetCategory: (state) => {
      state.category = null;
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
    setAddress: (state, action) => {
      state.address = action.payload;
    },
    resetAddress: (state) => {
      state.address = null;
    },
  }
});

export const {
  addUser,
  resetUser,
  setCategory,
  setTitle,
  setDescription,
  setPrice,
  setGuests,
  setRooms,
  setBathrooms,
  setFile,
  setAddress,
  resetAddress,
  resetCategory,
  resetDetails
} = appSlice.actions;
export default appSlice.reducer
