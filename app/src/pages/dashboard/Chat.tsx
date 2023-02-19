import { useEffect } from 'react';

import { Card, Container } from '@mui/material';

import HeaderBreadcrumbs from '@src/components/HeaderBreadcrumbs';
import Page from '@src/components/Page';
import { useAppDispatch } from '@src/hooks/useAppDispatch';
import { useAppSelector } from '@src/hooks/useAppSelector';
import { PATH_DASHBOARD } from '@src/routes/paths';
import { ChatSidebar, ChatWindow } from '@src/sections/@dashboard/chat';
import { getContacts, getConversations } from '@src/store/chat/chat.slice';

export default function Chat() {
  const themeStretch = useAppSelector(state => state.settings.themeStretch);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getConversations());
    dispatch(getContacts());
  }, [dispatch]);

  return (
    <Page title="Chat">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <HeaderBreadcrumbs
          heading="Chat"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Chat' },
          ]}
        />
        <Card sx={{ height: '72vh', display: 'flex' }}>
          <ChatSidebar />
          <ChatWindow />
        </Card>
      </Container>
    </Page>
  );
}
