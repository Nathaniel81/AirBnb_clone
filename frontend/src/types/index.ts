export interface ILocation {
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

export interface IImage {
  id: number;
  image_url: string;
}

export interface IProperty {
  id: number;
  title: string;
  description: string;
  price: string;
  photo: string;
  guests: string;
  bathrooms: string;
  rooms: string;
  bedrooms: string;
  images: IImage[];
  location: ILocation;
  category: ICategory;
  host: IUser
}

export interface IUser {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  picture: string;
  favorites: IProperty[];
  myProperties: IProperty[];
  myReservations: IProperty[];
}

interface IDetails {
  title: string;
  description: string;
  price: number;
  guests: number;
  rooms: number;
  bathrooms: number;
}
  
export interface ILocationPayload {
  value: string;
  label: string;
  region: string;
}
  
export interface IPropertyPayLoad {
  category: string | null;
  details: IDetails | null;
  location: ILocationPayload | null;
  amenities: string[] | null;
  photos: File[];
}

export interface IFavoritePayLoad {
  property_id: number;
}

export interface IReservationDates {
  startDate: string | null;
  endDate: string | null;
}

export interface IReservationPayload {
  startDate: string | undefined;
  endDate: string | undefined;
  property: string | undefined;
  total_price: number | undefined;
}

export interface ISearchParam {
  country?: string,
  guests?: number,
  rooms?: number,
  bathrooms?: number
}

export interface IAmenities {
  id: number,
  name: string,
  icon: JSX.Element,
  description: string
}

export interface RootState {
  userInfo: IUser | null;
  category: string | null;
  details: IDetails | null;
  amenities: string[] | null;
  photos: string[] | null;
  location: ILocation | null;
}
