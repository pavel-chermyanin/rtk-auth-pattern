import { DoctorShortModel } from "./DoctorShortModel";

// GET doctors/{user}/

export interface DoctorProfile extends DoctorShortModel {
  country: string;
  country_label: string;
  city: string;
  healing_diseases: any;
  age: number;
  feedback_count: number;
  rating_values_count: {};
}
