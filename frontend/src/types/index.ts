export interface IAddress {
  id: string;
  continent: string;
  country: string;
  province: string;
  city: string;
  value: string;
  label: string;
  region: string;
}

export interface ICategory {
  id: string;
  name: string;
  title: string;
  picture_url: string;
  description: string;
}

export interface IProperty {
  id: string;
  title: string;
  description: string;
  price: string;
  photo: string;
  guests: string;
  bathrooms: string;
  rooms: string;
  bedrooms: string;
  address: IAddress;
  category: ICategory;
  host: IUser
}

export interface IUser {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  picture: string;
  wishlist: IProperty[];
  myProperties: IProperty[];
}

interface IDetails {
  title: string;
  description: string;
  price: number;
  guests: number;
  rooms: number;
  bathrooms: number;
  fileUrl: string | null;
}
  
export interface IAddressPayload {
  value: string;
  label: string;
  region: string;
}
  
export interface IPropertyPayLoad {
  category: string | null;
  details: IDetails | null;
  address: IAddressPayload | null;
}

export interface IWishlistPayLoad {
  property_id: string;
}

export interface IReservationDates {
  startDate: string | null;
  endDate: string | null;
}

export interface IReservationPayload {
  startDate: string | undefined;
  endDate: string | undefined;
  property: string | undefined;
}

export interface ISearchParam {
  country?: string,
  guests?: number,
  rooms?: number,
  bathrooms?: number
}

export interface RootState {
  userInfo: IUser | null;
  category: string | null;
  details: IDetails | null;
  address: IAddress | null;
}
