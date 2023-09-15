import { useGetAdvancedTrainingQuery } from "../features/doctors/advancedTrainingApi";
import { useGetDoctorConsultationsQuery } from "../features/doctors/consultationsApi";
export const LkDoctor = () => {
  const { data, isLoading} = useGetDoctorConsultationsQuery();
  const {data: temp,} = useGetAdvancedTrainingQuery()
  if(isLoading) {
    return <p>Загрузка</p>
  }

  return (
    <div>
      <ul>
        {data ? (
          data.map((item: any, i: number) => {
            return <li key={i}>{item.id}</li>;
          })
        ) : (
          <li>консультации</li>
        )}
      </ul>
      <ul>
        {temp ? (
          temp.map((item: any, i: number) => {
            return <li key={i}>{item.organization}</li>;
          })
        ) : (
          <li>повышение квалификации</li>
        )}
      </ul>
    </div>
  );
};
