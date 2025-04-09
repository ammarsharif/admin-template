import { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { alpha, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  getExpandedRowModel,
  useReactTable,
  SortingState
} from '@tanstack/react-table';
import { RankingInfo, rankItem } from '@tanstack/match-sorter-utils';
import ScrollX from 'components/ScrollX';
import MainCard from 'components/MainCard';
import {
  DebouncedInput,
  HeaderSort,
  RowSelection,
  SelectColumnSorting,
  TablePagination
} from 'components/third-party/react-table';
import PlusOutlined from '@ant-design/icons/PlusOutlined';

export const fuzzyFilter = (
  row: {
    getValue: (arg0: any) => any;
  },
  columnId: any,
  value: string,
  addMeta: (arg0: RankingInfo) => void
) => {
  const itemRank = rankItem(row.getValue(columnId), value);
  addMeta(itemRank);
  return itemRank.passed;
};

interface GenericTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  entityName: string;
  ExpandingDetailComponent?: React.ComponentType<{ data: T }>;
  addPageRoute?: string;
}

export default function GenericTable<T>({
  data,
  columns,
  entityName,
  ExpandingDetailComponent,
  addPageRoute
}: GenericTableProps<T>) {
  console.log("data", data);
  const theme = useTheme();
  const [sorting, setSorting] = useState<SortingState>([{ id: 'id', desc: true }]);
  const [rowSelection, setRowSelection] = useState({});
  const [globalFilter, setGlobalFilter] = useState('');

  const navigate = useNavigate();

  const table = useReactTable({
    data,
    columns,
    state: { sorting, rowSelection, globalFilter },
    enableRowSelection: true,
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    getRowCanExpand: () => Boolean(ExpandingDetailComponent),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    globalFilterFn: fuzzyFilter,
    debugTable: true
  });

  const backColor = alpha(theme.palette.primary.lighter, 0.1);

  return (
    <MainCard content={false}>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center" justifyContent="space-between" sx={{ padding: 2 }}>
        <DebouncedInput
          value={globalFilter}
          onFilterChange={(value) => setGlobalFilter(String(value))}
          // placeholder={`Search ${data.length} records...`}
        />
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center">
          <SelectColumnSorting getState={table.getState} getAllColumns={table.getAllColumns} setSorting={setSorting} />
          <Stack direction="row" spacing={2} alignItems="center">
            {addPageRoute && (
              <Button variant="contained" startIcon={<PlusOutlined />} onClick={() => navigate(addPageRoute)}>
                Add {entityName}
              </Button>
            )}{' '}
          </Stack>
        </Stack>
      </Stack>
      <ScrollX>
        <Stack>
          {/*<RowSelection selected={Object.keys(rowSelection).length} />*/}
          <TableContainer>
            <Table>
              <TableHead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableCell key={header.id} onClick={header.column.getToggleSortingHandler()}>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <Box>{flexRender(header.column.columnDef.header, header.getContext())}</Box>
                          {header.column.getCanSort() && <HeaderSort column={header.column} />}
                        </Stack>
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableHead>
              <TableBody>
                {table.getRowModel().rows.map((row) => (
                  <Fragment key={row.id}>
                    <TableRow>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                      ))}
                    </TableRow>
                    {row.getIsExpanded() && ExpandingDetailComponent && (
                      <TableRow sx={{ bgcolor: backColor }}>
                        {/*<TableCell colSpan={row.getVisibleCells().length}>*/}
                        {/*  <ExpandingDetailComponent data={row.original} />*/}
                        {/*</TableCell>*/}
                      </TableRow>
                    )}
                  </Fragment>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Divider />
          <Box sx={{ p: 2 }}>
            <TablePagination
              setPageSize={table.setPageSize}
              setPageIndex={table.setPageIndex}
              getState={table.getState}
              getPageCount={table.getPageCount}
            />
          </Box>
        </Stack>
      </ScrollX>
    </MainCard>
  );
}
