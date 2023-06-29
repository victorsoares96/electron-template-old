import {
  Avatar,
  Box,
  Card,
  CardHeader,
  Stack,
  Typography,
} from '@mui/material';
import { alpha, styled } from '@mui/material/styles';

import orderBy from 'lodash/orderBy';

import { _appAuthors } from '@src/_mock';
import Iconify from '@src/components/Iconify';
import { fShortenNumber } from '@src/utils/formatNumber';

interface AuthorItemProps {
  author: {
    avatar: string;
    favourite: number;
    name: string;
  };
  index: number;
}

const IconWrapperStyle = styled('div')(({ theme }) => ({
  width: 40,
  height: 40,
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.primary.main,
  backgroundColor: alpha(theme.palette.primary.main, 0.08),
}));

function AuthorItem({ author, index }: AuthorItemProps) {
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Avatar alt={author.name} src={author.avatar} />
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle2">{author.name}</Typography>
        <Typography
          variant="caption"
          sx={{
            mt: 0.5,
            display: 'flex',
            alignItems: 'center',
            color: 'text.secondary',
          }}
        >
          <Iconify
            icon="eva:heart-fill"
            sx={{ width: 16, height: 16, mr: 0.5 }}
          />
          {fShortenNumber(author.favourite)}
        </Typography>
      </Box>

      <IconWrapperStyle
        sx={{
          ...(index === 1 && {
            color: 'info.main',
            bgcolor: theme => alpha(theme.palette.info.main, 0.08),
          }),
          ...(index === 2 && {
            color: 'error.main',
            bgcolor: theme => alpha(theme.palette.error.main, 0.08),
          }),
        }}
      >
        <Iconify icon="ant-design:trophy-filled" width={20} height={20} />
      </IconWrapperStyle>
    </Stack>
  );
}

export default function AppTopAuthors() {
  const displayAuthor = orderBy(_appAuthors, ['favourite'], ['desc']);

  return (
    <Card>
      <CardHeader title="Top Authors" />
      <Stack spacing={3} sx={{ p: 3 }}>
        {displayAuthor.map((author, index) => (
          <AuthorItem key={author.id} author={author} index={index} />
        ))}
      </Stack>
    </Card>
  );
}