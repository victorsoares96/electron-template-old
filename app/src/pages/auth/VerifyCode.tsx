/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link as RouterLink } from 'react-router-dom';

import { Box, Button, Container, Link, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import Iconify from '@src/components/Iconify';
import Page from '@src/components/Page';
import LogoOnlyLayout from '@src/layouts/LogoOnlyLayout';
import { PATH_AUTH } from '@src/routes/paths';
import { VerifyCodeForm } from '@src/sections/auth/verify-code';

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  height: '100%',
  alignItems: 'center',
  padding: theme.spacing(12, 0),
}));

export default function VerifyCode() {
  return (
    <Page title="Verify" sx={{ height: 1 }}>
      <RootStyle>
        <LogoOnlyLayout />

        <Container>
          <Box sx={{ maxWidth: 480, mx: 'auto' }}>
            <Button
              size="small"
              component={RouterLink}
              to={PATH_AUTH.login}
              startIcon={
                <Iconify
                  icon="eva:arrow-ios-back-fill"
                  width={20}
                  height={20}
                />
              }
              sx={{ mb: 3 }}
            >
              Back
            </Button>

            <Typography variant="h3" paragraph>
              Please check your email!
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              We have emailed a 6-digit confirmation code to acb@domain, please
              enter the code in below box to verify your email.
            </Typography>

            <Box sx={{ mt: 5, mb: 3 }}>
              <VerifyCodeForm />
            </Box>

            <Typography variant="body2" align="center">
              Don’t have a code? &nbsp;
              <Link variant="subtitle2" underline="none" onClick={() => {}}>
                Resend code
              </Link>
            </Typography>
          </Box>
        </Container>
      </RootStyle>
    </Page>
  );
}
