import { Fragment, MouseEvent, useState } from 'react';

import {
  Checkbox,
  Link,
  MenuItem,
  Stack,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

import Avatar from '@src/components/Avatar';
import Iconify from '@src/components/Iconify';
import Label from '@src/components/Label';
import { TableMoreMenu } from '@src/components/table';
import createAvatar from '@src/utils/createAvatar';
import { fCurrency } from '@src/utils/formatNumber';
import { fDate } from '@src/utils/formatTime.util';

interface InvoiceTableRowProps {
  row: any;
  selected: boolean;
  onSelectRow: (event: MouseEvent<HTMLButtonElement>) => void;
  onViewRow: () => void;
  onEditRow: () => void;
  onDeleteRow: () => void;
}

export default function InvoiceTableRow({
  row,
  selected,
  onSelectRow,
  onViewRow,
  onEditRow,
  onDeleteRow,
}: InvoiceTableRowProps) {
  const theme = useTheme();

  const {
    sent,
    invoiceNumber,
    createDate,
    dueDate,
    status,
    invoiceTo,
    totalPrice,
  } = row;

  const [openMenu, setOpenMenuActions] = useState<
    (EventTarget & HTMLButtonElement) | null
  >(null);

  const handleOpenMenu = (event: MouseEvent<HTMLButtonElement>) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  return (
    <TableRow hover selected={selected}>
      <TableCell padding="checkbox">
        <Checkbox checked={selected} onClick={onSelectRow} />
      </TableCell>

      <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar
          alt={invoiceTo.name}
          color={createAvatar(invoiceTo.name).color}
          sx={{ mr: 2 }}
        >
          {createAvatar(invoiceTo.name).name}
        </Avatar>

        <Stack>
          <Typography variant="subtitle2" noWrap>
            {invoiceTo.name}
          </Typography>

          <Link
            noWrap
            variant="body2"
            onClick={onViewRow}
            sx={{ color: 'text.disabled', cursor: 'pointer' }}
          >
            {invoiceNumber}
          </Link>
        </Stack>
      </TableCell>

      <TableCell align="left">{fDate(createDate)}</TableCell>

      <TableCell align="left">{fDate(dueDate)}</TableCell>

      <TableCell align="center">{fCurrency(totalPrice)}</TableCell>

      <TableCell align="center" sx={{ textTransform: 'capitalize' }}>
        {sent}
      </TableCell>

      <TableCell align="left">
        <Label
          variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
          color={
            (status === 'paid' && 'success') ||
            (status === 'unpaid' && 'warning') ||
            (status === 'overdue' && 'error') ||
            'default'
          }
          sx={{ textTransform: 'capitalize' }}
        >
          {status}
        </Label>
      </TableCell>

      <TableCell align="right">
        <TableMoreMenu
          open={openMenu}
          onOpen={handleOpenMenu}
          onClose={handleCloseMenu}
          actions={
            <>
              <MenuItem
                onClick={() => {
                  onDeleteRow();
                  handleCloseMenu();
                }}
                sx={{ color: 'error.main' }}
              >
                <Iconify icon="eva:trash-2-outline" />
                Delete
              </MenuItem>

              <MenuItem
                onClick={() => {
                  onViewRow();
                  handleCloseMenu();
                }}
              >
                <Iconify icon="eva:eye-fill" />
                View
              </MenuItem>

              <MenuItem
                onClick={() => {
                  onEditRow();
                  handleCloseMenu();
                }}
              >
                <Iconify icon="eva:edit-fill" />
                Edit
              </MenuItem>
            </>
          }
        />
      </TableCell>
    </TableRow>
  );
}
