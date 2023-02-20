import { Container } from '@mui/material';

import HeaderBreadcrumbs from '@src/components/HeaderBreadcrumbs';
import Page from '@src/components/Page';
import { useAppSelector } from '@src/hooks/useAppSelector';
import { PATH_DASHBOARD } from '@src/routes/paths';
import InvoiceNewEditForm from '@src/sections/@dashboard/invoice/new-edit-form';

export default function InvoiceCreate() {
  const themeStretch = useAppSelector(state => state.settings.themeStretch);

  return (
    <Page title="Invoices: Create a new invoice">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Create a new invoice"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Invoices', href: PATH_DASHBOARD.invoice.list },
            { name: 'New invoice' },
          ]}
        />

        <InvoiceNewEditForm />
      </Container>
    </Page>
  );
}
