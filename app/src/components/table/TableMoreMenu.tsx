import { Fragment, MouseEvent } from 'react';

import { IconButton } from '@mui/material';

import Iconify from '../Iconify';
import MenuPopover from '../MenuPopover';

interface Props {
  actions: React.ReactNode;
  open: any;
  onClose: () => void;
  onOpen: (event: MouseEvent<HTMLButtonElement>) => void;
}

export default function TableMoreMenu({
  actions,
  open,
  onClose,
  onOpen,
}: Props) {
  return (
    <>
      <IconButton onClick={onOpen}>
        <Iconify icon="eva:more-vertical-fill" width={20} height={20} />
      </IconButton>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={onClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        arrow="right-top"
        sx={{
          mt: -1,
          width: 160,
          '& .MuiMenuItem-root': {
            px: 1,
            typography: 'body2',
            borderRadius: 0.75,
            '& svg': { mr: 2, width: 20, height: 20 },
          },
        }}
      >
        {actions}
      </MenuPopover>
    </>
  );
}
