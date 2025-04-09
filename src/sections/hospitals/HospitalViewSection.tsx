// material-ui
import { Theme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// third-party
import { PatternFormat } from 'react-number-format';

// project import
import MainCard from 'components/MainCard';

// assets
import { useGetCustomer } from '../../api/customer';
import { useEffect, useState } from 'react';
import { CustomerList } from '../../types/customer';
import Box from '@mui/material/Box';
import CircularWithPath from '../../components/@extended/progress/CircularWithPath';

type CustomerViewSectionProps = {
  id?: number | string;
};

// ==============================|| CUSTOMER - VIEW SECTION ||============================== //

export default function HospitalViewSection({ id }: CustomerViewSectionProps) {
  const { customersLoading: loading, customers } = useGetCustomer();

  const [data, setList] = useState<CustomerList | null>(null);

  useEffect(() => {
    const customerId = id;
    if (customerId && customers) {
      const newList = customers.find((info) => info.id === Number(customerId)) || null;
      setList(newList);
    }
  }, [customers, id]);

  const downMD = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

  return (
    <>
      {data && !loading ? (
        <Grid container spacing={2.5} sx={{ pl: { xs: 0, sm: 5, md: 6, lg: 10, xl: 12 } }}>
          <Grid item xs={12} sm={12} md={12} xl={8.5}>
            <Stack spacing={2.5}>
              <MainCard title="Personal Details">
                <List sx={{ py: 0 }}>
                  <ListItem divider={!downMD}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6}>
                        <Stack spacing={0.5}>
                          <Typography color="secondary">Full Name</Typography>
                          <Typography>
                            {data.firstName} {data.lastName}
                          </Typography>
                        </Stack>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Stack spacing={0.5}>
                          <Typography color="secondary">Email</Typography>
                          <Typography>{data.email}</Typography>
                        </Stack>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Stack spacing={0.5}>
                          <Typography color="secondary">Phone</Typography>
                          <Typography>
                            <PatternFormat displayType="text" format="+1 (###) ###-####" mask="_" defaultValue={data.contact} />
                          </Typography>
                        </Stack>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Stack spacing={0.5}>
                          <Typography color="secondary">Country</Typography>
                          <Typography>{data.country}</Typography>
                        </Stack>
                      </Grid>
                    </Grid>
                  </ListItem>
                </List>
              </MainCard>
              <MainCard title="About me">
                <Typography color="secondary">
                  Hello, I’m {data.firstName} {data.lastName} {data.role} based in international company, {data.about}
                </Typography>
              </MainCard>
            </Stack>
          </Grid>
        </Grid>
      ) : (
        <Box sx={{ p: 5 }}>
          <Stack direction="row" justifyContent="center">
            <CircularWithPath />
          </Stack>
        </Box>
      )}
    </>
  );
}