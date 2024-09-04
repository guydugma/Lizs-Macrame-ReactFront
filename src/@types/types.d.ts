import { ReactNode } from "react";
export type LoginUser = {
  email: string;
  password: string;
};
// type for the object
export type RegisterUser = {
  name: {
    first: string;
    last: string;
  };
  phone: string;
  email: string;
  password: string;
  address: {
    country: string;
    city: string;
    street: string;
    houseNumber: number;
    zip: string;
  };
  isAdmin: boolean;
};

export type ProductType = {
  _id: string;
  title: string;
  description: string;
  price: number;
  stock: number;
  imageFileNames: string[];
  stringAColor: string;
  stringBColor: string;
  stone: string;
  category: string;
};

export type StoneType = {
  _id: string;
  name: string;
  zodiac: string;
  description: string;
  imageFileName: string;
};

export type pageLink = {
  heb: string;
  eng: string;
};

export type CategoryType = {
  _id: string;
  hebTitle: string;
  engLink: string;
  imageFileNames: string[];
};

export type ErrorType = {
  status: number;
  message: string;
  details: string;
};

export type decodedType = {
  _id: string;
  isAdmin: boolean;
};

// טיפוס לפונקציה שמקבלת ילדים ומחזירה אלמנט של ראקט
export type FCC = ({ children: ReactNode }) => ReactNode;

export type OrderType = {};
