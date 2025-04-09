import { useParams } from 'react-router-dom';
import HospitalViewSection from '../../sections/hospitals/HospitalViewSection';

// ==============================|| CUSTOMER VIEW ||============================== //

export default function ViewHospital() {
  const { id } = useParams();

  return (
    <>
      <HospitalViewSection id={id} />
    </>
  );
}
