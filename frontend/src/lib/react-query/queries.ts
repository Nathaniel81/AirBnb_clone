import { 
  IPropertyPayLoad, 
  IReservationPayload, 
  IFavoritePayLoad 
} from "@/types";
import { 
  useQuery,
  useMutation,
  useInfiniteQuery,
} from "@tanstack/react-query";
import axios from 'axios';
import { QUERY_KEYS } from "./queryKeys";

// User-related queries
const signOutAccount = async () => {
  const response = await axios.post('/api/user/logout/');
  return response.data;
};
export const useSignOutAccount = () => {
  return useMutation({
    mutationFn: signOutAccount,
  });
};

export const updateFavorites = async (property_id: IFavoritePayLoad) => {
  const response = await axios.patch(`/api/user/favorites/`, property_id);
  return response.data;
};
export const useUpdateFavorites = () => {
  return useMutation({
    mutationFn: (property_id: IFavoritePayLoad) => updateFavorites(property_id),
  });
};

const getFavorites = async () => {
  const response = await axios.get('/api/user/favorites/');
  return response.data;
};
export const useGetFavorites = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_FAVORITES],
    queryFn: () => getFavorites(),
  });
};

// Category-related queries
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

// Property-related queries
const getInfiniteProperties = async (
  pageParam?: number,
  category?: string,
  country?: string,
  guests?: number, 
  bathrooms?: number, 
  rooms?: number
) => {
  const { data } = await axios.get(`/api/properties/`, {
    params: {
      page: pageParam,
      category,
      country,
      guests, 
      bathrooms, 
      rooms 
    },
  });
  return data;
}
export const useGetInfiniteProperties = (
  category?: string,
  country?: string,
  guests?: number,
  bathrooms?: number,
  rooms?: number,
) => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.GET_INFINITE_PROPERTIES],
    queryFn: ({ pageParam = 1 }) => getInfiniteProperties(
      pageParam, 
      category, 
      country, 
      guests, 
      bathrooms, 
      rooms
    ),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.next) {
        return pages.length + 1;
      }
  },
  });
};

const getPropertyDetail = async (id: string) => {
  const response = await axios.get(`/api/properties/${id}`);
  return response.data;
};
export const useGetPropertyDetail = (id: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_PROPERTY_DETAIL, id],
    queryFn: () => getPropertyDetail(id),
    enabled: !!id,
  });
};

const getUserProperties = async () => {
  const response = await axios.get(`/api/user/properties/`);
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

// Reservation-related queries
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
  const response = await axios.get(`/api/user/reservations`,);
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
