import { IconButton, Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';

import Iconify from '@src/components/Iconify';

const RootStyle = styled('div')(({ theme }) => ({
  height: 40,
  zIndex: 99,
  opacity: 0,
  margin: 'auto',
  display: 'flex',
  position: 'absolute',
  alignItems: 'center',
  top: theme.spacing(1),
  right: theme.spacing(1),
  bottom: theme.spacing(1),
  justifyContent: 'center',
  padding: theme.spacing(0, 0.75),
  boxShadow: theme.customShadows.z12,
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
  transition: theme.transitions.create('opacity'),
}));

interface MailItemActionProps extends React.HTMLAttributes<HTMLDivElement> {
  handleArchive: () => void;
  handleDelete: () => void;
  handleMarkRead: () => void;
  handleHidden: () => void;
}

export default function MailItemAction({
  handleArchive,
  handleDelete,
  handleMarkRead,
  handleHidden,
  ...other
}: MailItemActionProps) {
  const MAIL_ACTIONS = [
    {
      name: 'Archive',
      icon: 'eva:archive-fill',
      action: handleArchive,
    },
    {
      name: 'Delete',
      icon: 'eva:trash-2-outline',
      action: handleDelete,
    },
    {
      name: 'Mark Email Read',
      icon: 'ic:round-mark-email-read',
      action: handleMarkRead,
    },
    {
      name: 'Hidden Email',
      icon: 'eva:eye-off-fill',
      action: handleHidden,
    },
  ];

  return (
    <RootStyle {...other}>
      {MAIL_ACTIONS.map(action => (
        <Tooltip key={action.name} title={action.name}>
          <IconButton
            size="small"
            onClick={action.action}
            sx={{
              mx: 0.75,
              '&:hover': {
                color: 'text.primary',
              },
            }}
          >
            <Iconify icon={action.icon} width={24} height={24} />
          </IconButton>
        </Tooltip>
      ))}
    </RootStyle>
  );
}
