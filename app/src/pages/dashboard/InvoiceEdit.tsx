import { useParams } from 'react-router-dom';

import { Container } from '@mui/material';

import { _invoices } from '@src/_mock';
import HeaderBreadcrumbs from '@src/components/HeaderBreadcrumbs';
import Page from '@src/components/Page';
import { useAppSelector } from '@src/hooks/useAppSelector';

import { PATH_DASHBOARD } from '../../routes/paths';
import InvoiceNewEditForm from '../../sections/@dashboard/invoice/new-edit-form';

export default function InvoiceEdit() {
  const themeStretch = useAppSelector(state => state.settings.themeStretch);

  const { id } = useParams();

  const currentInvoice = _invoices.find(invoice => invoice.id === id);

  return (
    <Page title="Invoices: Edit">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Edit invoice"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Invoices', href: PATH_DASHBOARD.invoice.list },
            { name: currentInvoice?.invoiceNumber || '' },
          ]}
        />

        <InvoiceNewEditForm isEdit currentInvoice={currentInvoice} />
      </Container>
    </Page>
  );
}
