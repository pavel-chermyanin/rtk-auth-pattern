import { DoctorAdvancedTraining } from "./helperTypes/DoctorAdvancedTraining";
import { DoctorEducationLabel } from "./helperTypes/DoctorEducationLabel";
import { DoctorHigherEducation } from "./helperTypes/DoctorHigherEducation";
import { DoctorRating } from "./helperTypes/DoctorRating";
import { DoctorSpecialization } from "./helperTypes/DoctorSpecialization";
import { DoctorWorkExpirience } from "./helperTypes/DoctorWorkExpirience";

// модель доктора в каждой консультации
// GET doctors/
// GET doctors/favorites/by_patient/

export interface DoctorShortModel {
  id: string;
  slug: string;
  first_name: string;
  patronymic: string;
  last_name: string;
  gender: string;
  gender_label: string;
  avatar: string;
  nearest_reception_time: number;
  specialization: DoctorSpecialization[];
  education_type_label: DoctorEducationLabel;
  higher_education: DoctorHigherEducation[];
  work_expirience: DoctorWorkExpirience[];
  advanced_training: DoctorAdvancedTraining[];
  free_reception_time: { time: number }[];
  rank: number;
  rank_label: string;
  scientific_degree: number;
  scientific_degree_label: string;
  text_chat_price: number;
  video_chat_price: number;
  ratings: DoctorRating[];
  ratings_rating: number;
  seniority: number;
  category: number;
  category_label: string;
  is_favorite: boolean;
}
