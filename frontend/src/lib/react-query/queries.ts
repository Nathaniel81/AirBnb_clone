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

export const createListing = async (listing: IListingPayLoad) => {
  const response = await axios.post(`/api/properties/`, listing);
  return response.data;
};

export const useCreateListing = () => {
  return useMutation({
    mutationFn: (listing: IListingPayLoad) => createListing(listing),
  });
};
