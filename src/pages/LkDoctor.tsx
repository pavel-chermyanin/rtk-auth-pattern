import { isValidInputTimeValue } from "@testing-library/user-event/dist/utils";
import React from "react";
import { useGetDoctorConsultationsQuery } from "../features/doctors/consultations";
export const LkDoctor = () => {
  const { data, isLoading} = useGetDoctorConsultationsQuery();
  console.log(data);
  if(isLoading) {
    return <p>Загрузка</p>
  }
  return (
    <ul>
      {data ? data.map((item: any) => {
        return <li>{item.id}</li>;
      }): <li>консультации</li>}
    </ul>
  );
};
