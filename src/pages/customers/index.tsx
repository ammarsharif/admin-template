import { MouseEvent, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// material-ui
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

// third-party
import { PatternFormat } from 'react-number-format';
import { ColumnDef } from '@tanstack/react-table';

// project-import
import Avatar from 'components/@extended/Avatar';
import IconButton from 'components/@extended/IconButton';
import { IndeterminateCheckbox } from 'components/third-party/react-table';

import AlertDialog from 'components/AlertDialog';
import EmptyReactTable from 'components/EmptyReactTable';

import { SnackbarProps } from 'types/snackbar';
import { openSnackbar } from 'api/snackbar';

import { deleteCustomer, useGetCustomer } from 'api/customer';
import { ImagePath, getImageUrl } from 'utils/getImageUrl';

// types
import { CustomerList } from 'types/customer';

// assets
import DeleteOutlined from '@ant-design/icons/DeleteOutlined';
import EditOutlined from '@ant-design/icons/EditOutlined';
import EyeOutlined from '@ant-design/icons/EyeOutlined';
import GenericTable from '../../components/ReactTable';

// ==============================|| CUSTOMER LIST ||============================== //

export default function CustomerListPage() {
  const navigate = useNavigate();

  const { customersLoading, customers: lists } = useGetCustomer();

  const [open, setOpen] = useState<boolean>(false);

  const [customerId, setCustomerId] = useState<any>('');

  const handleClose = () => {
    setOpen(!open);
  };

  const deleteHandler = async (id: number) => {
    await deleteCustomer(id).then(() => {});
  };

  const columns = useMemo<ColumnDef<CustomerList>[]>(
    () => [
      {
        id: 'select',
        header: ({ table }) => (
          <IndeterminateCheckbox
            {...{
              checked: table.getIsAllRowsSelected(),
              indeterminate: table.getIsSomeRowsSelected(),
              onChange: table.getToggleAllRowsSelectedHandler()
            }}
          />
        ),
        cell: ({ row }) => (
          <IndeterminateCheckbox
            {...{
              checked: row.getIsSelected(),
              disabled: !row.getCanSelect(),
              indeterminate: row.getIsSomeSelected(),
              onChange: row.getToggleSelectedHandler()
            }}
          />
        )
      },
      {
        header: '#',
        accessorKey: 'id',
        meta: {
          className: 'cell-center'
        }
      },
      {
        header: 'User Info',
        accessorKey: 'name',
        cell: ({ row, getValue }) => (
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Avatar
              alt="Avatar 1"
              size="sm"
              src={getImageUrl(`avatar-${!row.original.avatar ? 1 : row.original.avatar}.png`, ImagePath.USERS)}
            />
            <Stack spacing={0}>
              <Typography variant="subtitle1">{getValue() as string}</Typography>
              <Typography color="text.secondary">{row.original.email as string}</Typography>
            </Stack>
          </Stack>
        )
      },
      {
        header: 'Contact',
        accessorKey: 'contact',
        cell: ({ getValue }) => <PatternFormat displayType="text" format="+1 (###) ###-####" mask="_" defaultValue={getValue() as number} />
      },
      {
        header: 'Age',
        accessorKey: 'age',
        meta: {
          className: 'cell-right'
        }
      },
      {
        header: 'Country',
        accessorKey: 'country'
      },
      {
        header: 'Status',
        accessorKey: 'status',
        cell: (cell) => {
          switch (cell.getValue()) {
            case 3:
              return <Chip color="error" label="Rejected" size="small" variant="light" />;
            case 1:
              return <Chip color="success" label="Verified" size="small" variant="light" />;
            case 2:
            default:
              return <Chip color="info" label="Pending" size="small" variant="light" />;
          }
        }
      },
      {
        header: 'Actions',
        meta: {
          className: 'cell-center'
        },
        disableSortBy: true,
        cell: ({ row }) => {
          return (
            <Stack direction="row" alignItems="center" justifyContent="center" spacing={0}>
              <Tooltip title="View">
                <IconButton color="secondary" onClick={() => navigate(`view/${row.original.id}`)}>
                  <EyeOutlined />
                </IconButton>
              </Tooltip>
              <Tooltip title="Edit">
                <IconButton color="primary" onClick={() => navigate(`edit/${row.original.id}`)}>
                  <EditOutlined />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete">
                <IconButton
                  color="error"
                  onClick={(e: MouseEvent<HTMLButtonElement>) => {
                    e.stopPropagation();
                    setOpen(true);
                    setCustomerId(Number(row.original.id));
                  }}
                >
                  <DeleteOutlined />
                </IconButton>
              </Tooltip>
            </Stack>
          );
        }
      }
    ],
    [navigate]
  );

  if (customersLoading) return <EmptyReactTable columns={columns} />;

  return (
    <>
      <GenericTable columns={columns} data={lists} entityName={'Customer'} addPageRoute={'/customers/add'} />
      <AlertDialog
        open={open}
        title="Are you sure you want to delete this customer?"
        subtitle="By deleting this customer, they won't be able to access the app."
        action={async () => deleteHandler(Number(customerId))}
        onComplete={() =>
          openSnackbar({
            open: true,
            message: 'Customer deleted successfully',
            variant: 'alert',
            alert: {
              color: 'success'
            }
          } as SnackbarProps)
        }
        handleClose={handleClose}
        actionLabel="Delete"
        cancelLabel="Cancel"
        icon={<DeleteOutlined />}
      />
    </>
  );
}
