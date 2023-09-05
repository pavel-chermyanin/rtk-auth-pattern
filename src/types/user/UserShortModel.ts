
// GET user/me/user

export interface UserShortModel {
  uid: string;
  first_name: string;
  last_name: string;
  patronymic: string;
  birthday: number;
  email: string;
  gender: number;
  gender_label: string;
  country: string;
  country_label: string;
  city: string;
  avatar: string;
  phone: string;
  role: string;
}