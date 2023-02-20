import { ReactFragment, forwardRef } from 'react';

import { Box, BoxProps } from '@mui/material';

interface Props extends BoxProps {
  children: React.ReactNode;
  title?: string;
  meta?: React.ReactNode;
}

const Page = forwardRef<ReactFragment, Props>(({ children, ...other }, ref) => (
  <Box ref={ref} {...other}>
    {children}
  </Box>
));

Page.defaultProps = {
  title: 'Minimal-UI',
  meta: null,
};

export default Page;
