import { useMutation, useQuery } from "@tanstack/react-query";
import axios from 'axios';
import { IListingPayLoad } from "@/types";
import { QUERY_KEYS } from "./queryKeys";


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


const getProperties = async (filter?: string) => {
  const response = await axios.get(`/api/properties${filter}`);
  return response.data;
};
export const useGetProperties = (filter?: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_PROPERTIES],
    queryFn: () => getProperties(filter),
    enabled: !!filter
  });
};

export const createListing = async (listing: IListingPayLoad) => {
  const response = await axios.post(`/api/properties/`, listing);
  return response.data;
};

export const useCreateListing = () => {
  return useMutation({
    mutationFn: (listing: IListingPayLoad) => createListing(listing),
  });
};
