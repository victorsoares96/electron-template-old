import { useParams } from 'react-router-dom';

import { Container } from '@mui/material';

import { _invoices } from '@src/_mock';
import HeaderBreadcrumbs from '@src/components/HeaderBreadcrumbs';
import Page from '@src/components/Page';
import { useAppSelector } from '@src/hooks/useAppSelector';
import { PATH_DASHBOARD } from '@src/routes/paths';
import Invoice from '@src/sections/@dashboard/invoice/details';

export default function InvoiceDetails() {
  const themeStretch = useAppSelector(state => state.settings.themeStretch);

  const { id } = useParams();

  const invoice = _invoices.find(invoice => invoice.id === id);

  return (
    <Page title="Invoice: View">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Invoice Details"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'Invoices',
              href: PATH_DASHBOARD.invoice.root,
            },
            { name: invoice?.invoiceNumber || '' },
          ]}
        />

        <Invoice invoice={invoice} />
      </Container>
    </Page>
  );
}
