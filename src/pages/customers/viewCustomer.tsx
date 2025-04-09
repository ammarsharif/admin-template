import { useParams } from 'react-router-dom';
import CustomerViewSection from '../../sections/customers/CustomerViewSection';

// ==============================|| CUSTOMER VIEW ||============================== //

export default function ViewCustomer() {
  const { id } = useParams();

  return (
    <>
      <CustomerViewSection id={id} />
    </>
  );
}
