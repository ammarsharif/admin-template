import { useParams } from 'react-router-dom';
import CustomerFormSection from '../../sections/customers/CustomerFormSection';

// ==============================|| CUSTOMER EDIT ||============================== //

export default function EditCustomer() {
  const { id } = useParams();

  return (
    <>
      <CustomerFormSection id={id} />
    </>
  );
}
