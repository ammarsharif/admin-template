import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';

const Hospitals = Loadable(lazy(() => import('pages/hospitals')));
const ViewHospital = Loadable(lazy(() => import('pages/hospitals/viewHospital')));
const AddHospital = Loadable(lazy(() => import('pages/hospitals/addHospital')));
const EditHospital = Loadable(lazy(() => import('pages/hospitals/editHospital')));

// ==============================|| MAIN ROUTING ||============================== //

const HospitalRoutes = {
  path: '/hospitals',
  children: [
    {
      path: '',
      element: <Hospitals />
    },
    {
      path: 'view/:id',
      element: <ViewHospital />
    },
    {
      path: 'add',
      element: <AddHospital />
    },
    {
      path: 'edit/:id',
      element: <EditHospital />
    }
  ]
};

export default HospitalRoutes;
