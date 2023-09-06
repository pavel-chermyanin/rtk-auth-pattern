import { UserShortModel } from "../user/UserShortModel";

// GET user/me/patient

export interface PatientUser {
  user: UserShortModel;
  height: number;
  weight: number;
  blood_type: string;
  diseases: string;
  allergies: string;
  operations: string;
  medicines: string;
  other: string;
}
