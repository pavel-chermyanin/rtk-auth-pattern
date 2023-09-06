import { DoctorShortModel } from "../doctor/DoctorShortModel";
import { UserShortModel } from "../user/UserShortModel";

export interface Consultation {
  id: number;
  doctor: DoctorShortModel;
  patient: UserShortModel;
  request: string;
  price: number;
  recommendation: any; // должен быть объект
  is_payed: boolean;
  status: number;
  connection_type: number;
  date: number;
  created_at: number;
  updated_at: number;
  deleted_at: number;
  files: string;
  feedback: string;
  feedback_id: string;
  total_passed_time_seconds: number;
  registration_log: string;
}
