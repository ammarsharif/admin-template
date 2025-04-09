import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';

const Customers = Loadable(lazy(() => import('pages/customers')));
const ViewCustomer = Loadable(lazy(() => import('pages/customers/viewCustomer')));
const AddCustomer = Loadable(lazy(() => import('pages/customers/addCustomer')));
const EditCustomer = Loadable(lazy(() => import('pages/customers/editCustomer')));

// ==============================|| MAIN ROUTING ||============================== //

const CustomerRoutes = {
  path: '/customers',
  children: [
    {
      path: '',
      element: <Customers />
    },
    {
      path: 'view/:id',
      element: <ViewCustomer />
    },
    {
      path: 'add',
      element: <AddCustomer />
    },
    {
      path: 'edit/:id',
      element: <EditCustomer />
    }
  ]
};

export default CustomerRoutes;
