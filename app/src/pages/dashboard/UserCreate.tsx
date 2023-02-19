import { useLocation, useParams } from 'react-router-dom';

import { Container } from '@mui/material';

import { capitalCase, paramCase } from 'change-case';

import { _userList } from '@src/_mock';
import HeaderBreadcrumbs from '@src/components/HeaderBreadcrumbs';
import Page from '@src/components/Page';
import { useAppSelector } from '@src/hooks/useAppSelector';
import { PATH_DASHBOARD } from '@src/routes/paths';
import UserNewEditForm from '@src/sections/@dashboard/user/UserNewEditForm';

export default function UserCreate() {
  const themeStretch = useAppSelector(state => state.settings.themeStretch);

  const { pathname } = useLocation();

  const { name = '' } = useParams();

  const isEdit = pathname.includes('edit');

  const currentUser = _userList.find(user => paramCase(user.name) === name);

  return (
    <Page title="User: Create a new user">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={!isEdit ? 'Create a new user' : 'Edit user'}
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'User', href: PATH_DASHBOARD.user.list },
            { name: !isEdit ? 'New user' : capitalCase(name) },
          ]}
        />

        <UserNewEditForm isEdit={isEdit} currentUser={currentUser} />
      </Container>
    </Page>
  );
}
