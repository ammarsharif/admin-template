import { useParams } from 'react-router-dom';
import HospitalFormSection from '../../sections/hospitals/HospitalFormSection';

// ==============================|| CUSTOMER EDIT ||============================== //

export default function EditHospital() {
  const { id } = useParams();

  return (
    <>
      <HospitalFormSection id={id} />
    </>
  );
}
