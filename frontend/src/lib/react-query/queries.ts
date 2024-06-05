import { useMutation, useQuery } from "@tanstack/react-query";
import axios from 'axios';
import { IPropertyPayLoad, IWishlistPayLoad, IReservationPayload } from "@/types";
import { QUERY_KEYS } from "./queryKeys";


export const updateWishlist = async (property_id: IWishlistPayLoad) => {
  const response = await axios.patch(`/api/auth/wishlist/`, property_id);
  return response.data;
};
export const useUpdateWishlist = () => {
  return useMutation({
    mutationFn: (property_id: IWishlistPayLoad) => updateWishlist(property_id),
  });
};

const getFavorites = async () => {
  const response = await axios.get('/api/auth/wishlist/');
  return response.data;
};
export const useGetFavorites = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_FAVORITES],
    queryFn: () => getFavorites(),
  });
};

const getCategories = async () => {
  const response = await axios.get('/api/categories');
  return response.data;
};
export const useGetCategories = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_CATEGORIES],
    queryFn: () => getCategories(),
  });
};

const getProperties = async (category?: string) => {
  const response = await axios.get('/api/properties', {
      params: { category },
    }
  );
  return response.data;
};
export const useGetProperties = (category?: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_PROPERTIES],
    queryFn: () => getProperties(category),
    enabled: !!category
  });
};

const getReservations = async (property_id: string) => {
  const response = await axios.get(`/api/reservations`, {
    params: { property_id },
  });
  return response.data;
};
export const useGetReservations = (property_id: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_RESERVATIONS, property_id],
    queryFn: () => getReservations(property_id),
    enabled: !!property_id,
  });
};

const getMyReservations = async () => {
  const response = await axios.get(`/api/auth/reservations`,);
  return response.data;
};
export const useGetMyReservations = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_MY_RESERVATIONS],
    queryFn: () => getMyReservations(),
  });
};

export const createReservation = async (reservation: IReservationPayload) => {
  const response = await axios.post(`/api/reservations/`, reservation);
  return response.data;
};
export const useCreateReservation = () => {
  return useMutation({
    mutationFn: (reservation: IReservationPayload) => createReservation(reservation),
  });
};

const getPropertyDetail = async (id: string) => {
  const response = await axios.get(`/api/properties/${id}`);
  return response.data;
};
export const useGetPropertyDetail = (id: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_PROPERTY_DETAIL],
    queryFn: () => getPropertyDetail(id),
    enabled: !!id,
  });
};

const getUserProperties = async () => {
  const response = await axios.get(`/api/auth/properties/`);
  return response.data;
};
export const useGetUserProperties = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_USER_PROPERTIES],
    queryFn: () => getUserProperties(),
  });
};

export const createListing = async (listing: IPropertyPayLoad) => {
  const response = await axios.post(`/api/properties/`, listing);
  return response.data;
};

export const useCreateListing = () => {
  return useMutation({
    mutationFn: (listing: IPropertyPayLoad) => createListing(listing),
  });
};
