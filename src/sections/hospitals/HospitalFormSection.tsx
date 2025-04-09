import { useEffect, useMemo, useState } from 'react';

// material-ui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

// project imports
import MainCard from 'components/MainCard';
import CircularWithPath from 'components/@extended/progress/CircularWithPath';
import { useGetCustomer } from 'api/customer';

// types
import { CustomerList } from 'types/customer';
import CustomerForm from '../../sections/customers/CustomerForm';

type CustomerFormSectionProps = {
  id?: number | string;
};

// ==============================|| CUSTOMER FORM SECTION ||============================== //

export default function HospitalFormSection({ id }: CustomerFormSectionProps) {
  const { customersLoading: loading, customers } = useGetCustomer();

  const [list, setList] = useState<CustomerList | null>(null);

  useEffect(() => {
    const customerId = id;
    if (customerId && customers) {
      const newList = customers.find((info) => info.id === Number(customerId)) || null;
      setList(newList);
    }
  }, [customers, id]);

  const customerForm = useMemo(
    () => !loading && <CustomerForm customer={list} />,
    [list, loading]
  );

  return (
    <MainCard>
      {loading ? (
        <Box sx={{ p: 5 }}>
          <Stack direction="row" justifyContent="center">
            <CircularWithPath />
          </Stack>
        </Box>
      ) : (
        customerForm
      )}
    </MainCard>
  );
}
