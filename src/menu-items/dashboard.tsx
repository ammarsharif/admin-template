// third-party
import { FormattedMessage } from 'react-intl';

// type
import DashboardOutlined from '@ant-design/icons/DashboardOutlined';
import CustomerServiceOutlined from '@ant-design/icons/CustomerServiceOutlined';
import { NavItemType } from 'types/menu';

// icons
const icons = { DashboardOutlined, CustomerServiceOutlined };

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard: NavItemType = {
  id: 'group-dashboard',
  title: <FormattedMessage id="dashboard" />,
  icon: icons.DashboardOutlined,
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: <FormattedMessage id="dashboard" />,
      type: 'item',
      url: '/dashboard',
      icon: icons.DashboardOutlined
    },
    {
      id: 'customer',
      title: <FormattedMessage id="customer" />,
      icon: icons.CustomerServiceOutlined,
      type: 'item',
      url: '/customers'
    } ,
    {
      id: 'hospital',
      title: <FormattedMessage id="hospital" />,
      icon: icons.CustomerServiceOutlined,
      type: 'item',
      url: '/hospitals'
    }
  ]
};

export default dashboard;
