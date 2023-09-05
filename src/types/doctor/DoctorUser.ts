import { UserShortModel } from "../user/UserShortModel";
import { DoctorAdvancedTraining } from "./helperTypes/DoctorAdvancedTraining";
import { DoctorCertificate } from "./helperTypes/DoctorCertificate";
import { DoctorEducationLabel } from "./helperTypes/DoctorEducationLabel";
import { DoctorHigherEducation } from "./helperTypes/DoctorHigherEducation";
import { DoctorRating } from "./helperTypes/DoctorRating";
import { DoctorSpecialization } from "./helperTypes/DoctorSpecialization";
import { DoctorWorkExpirience } from "./helperTypes/DoctorWorkExpirience";

// GET user/me/doctor

export interface DoctorUser {
  user: UserShortModel;
  slug: string;
  specialization: DoctorSpecialization[];
  education_type_label: DoctorEducationLabel;
  education_story: string;
  higher_education: DoctorHigherEducation[];
  work_expirience: DoctorWorkExpirience[];
  advanced_training: DoctorAdvancedTraining[];
  certificate: DoctorCertificate[];
  rank_label: string;
  work_experience_old: string;
  seniority: number;
  rank: number;
  scientific_degree: number;
  scientific_degree_label: string;
  category: number;
  category_label: string;
  healing_diseases: any;
  adl_age_category: boolean;
  chi_age_category: boolean;
  text_chat_price: number;
  video_chat_price: number;
  rating: DoctorRating[];
  is_moderated: boolean;
}
