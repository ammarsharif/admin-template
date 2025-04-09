import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import DashboardLayout from 'layout/Dashboard';
import CustomerRoutes from './CustomerRoutes';
import HospitalRoutes from './HospitalRoutes';

// render - dashboard
const Dashboard = Loadable(lazy(() => import('pages/dashboard')));

// render - applications
const Customers = Loadable(lazy(() => import('pages/customers')));
const ViewCustomer = Loadable(lazy(() => import('pages/customers/viewCustomer')));
const AddCustomer = Loadable(lazy(() => import('pages/customers/addCustomer')));
const EditCustomer = Loadable(lazy(() => import('pages/customers/editCustomer')));

const UserPersonal = Loadable(lazy(() => import('pages/settings/personal')));

const MaintenanceError404 = Loadable(lazy(() => import('pages/maintenance/404')));
const MaintenanceError500 = Loadable(lazy(() => import('pages/maintenance/500')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  children: [
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        {
          path: '/dashboard',
          element: <Dashboard />
        },
        {
          path: 'settings',
          children: [
            {
              path: 'personal',
              element: <UserPersonal />
            }
          ]
        },
        CustomerRoutes,
        HospitalRoutes
      ]
    },
    {
      path: 'maintenance/500',
      element: <MaintenanceError500 />
    },
    {
      path: '*',
      element: <MaintenanceError404 />
    }
  ]
};

export default MainRoutes;
