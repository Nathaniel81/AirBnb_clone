export interface IUser {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    picture: string;
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
  
  export interface IAddress {
    value: string;
    label: string;
    region: string;
  }
  
  export interface IListingPayLoad {
    category: string;
    details: IDetails | null;
    address: IAddress | null;
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
  }

  export interface RootState {
    userInfo: IUser | null;
    category: string | null;
    details: IDetails | null;
    address: IAddress | null;
  }
