import { Gender } from 'config';

export interface HospitalProps {
  modal: boolean;
}

export interface HospitalList {
  id?: number;
  avatar: number;
  firstName: string;
  lastName: string;
  fatherName: string;
  name: string;
  email: string;
  age: number;
  gender: Gender;
  role: string;
  orders: number;
  progress: number;
  status: number;
  orderStatus: string;
  contact: string;
  country: string;
  location: string;
  about: string;
  skills: string[];
  time: string[];
  date: Date | string | number;
}

export interface HospitalListMinimal {
  id?: number;
  firstName: string;
  lastName: string;
  name: string;
  email: string;
  gender: Gender;
  contact: string;
  country: string;
  location: string;
  time: string[];
  date: Date | string | number;
}
