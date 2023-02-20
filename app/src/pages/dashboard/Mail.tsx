import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Card, Container } from '@mui/material';

import HeaderBreadcrumbs from '@src/components/HeaderBreadcrumbs';
import Page from '@src/components/Page';
import { useAppDispatch } from '@src/hooks/useAppDispatch';
import { useAppSelector } from '@src/hooks/useAppSelector';
import { PATH_DASHBOARD } from '@src/routes/paths';
import {
  MailCompose,
  MailDetails,
  MailList,
  MailSidebar,
} from '@src/sections/@dashboard/mail';
import { getLabels } from '@src/store/mail/mail.slice';

export default function Mail() {
  const themeStretch = useAppSelector(state => state.settings.themeStretch);

  const dispatch = useAppDispatch();

  const { mailId } = useParams();

  const [openSidebar, setOpenSidebar] = useState(false);

  const [openCompose, setOpenCompose] = useState(false);

  useEffect(() => {
    dispatch(getLabels());
  }, [dispatch]);

  return (
    <Page title="Mail">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <HeaderBreadcrumbs
          heading="Mail"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            { name: 'Mail' },
          ]}
        />
        <Card sx={{ height: { md: '72vh' }, display: { md: 'flex' } }}>
          <MailSidebar
            isOpenSidebar={openSidebar}
            onCloseSidebar={() => setOpenSidebar(false)}
            onOpenCompose={() => setOpenCompose(true)}
          />
          {mailId ? (
            <MailDetails />
          ) : (
            <MailList onOpenSidebar={() => setOpenSidebar(true)} />
          )}
          <MailCompose
            isOpenCompose={openCompose}
            onCloseCompose={() => setOpenCompose(false)}
          />
        </Card>
      </Container>
    </Page>
  );
}
