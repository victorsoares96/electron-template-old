import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { LoadingButton } from '@mui/lab';
import { Card, Stack } from '@mui/material';

import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { _invoiceAddressFrom } from '@src/_mock';
import { FormProvider } from '@src/components/hook-form';
import { PATH_DASHBOARD } from '@src/routes/paths';

import InvoiceNewEditAddress from './InvoiceNewEditAddress';
import InvoiceNewEditDetails from './InvoiceNewEditDetails';
import InvoiceNewEditStatusDate from './InvoiceNewEditStatusDate';

interface InvoiceNewEditFormProps {
  isEdit: boolean;
  currentInvoice: {
    createDate: Date;
    dueDate: Date;
    taxes: string;
    status: string;
    discount: string;
    invoiceFrom: any;
    invoiceTo: any;
    items: {
      title: string;
      description: string;
      service: string;
      quantity: number;
      price: number;
      total: number;
    }[];
  };
}

export default function InvoiceNewEditForm({
  isEdit,
  currentInvoice,
}: InvoiceNewEditFormProps) {
  const navigate = useNavigate();

  const [loadingSave, setLoadingSave] = useState(false);

  const [loadingSend, setLoadingSend] = useState(false);

  const NewUserSchema = Yup.object().shape({
    createDate: Yup.string().nullable().required('Create date is required'),
    dueDate: Yup.string().nullable().required('Due date is required'),
    invoiceTo: Yup.mixed().nullable().required('Invoice to is required'),
  });

  const defaultValues = useMemo(
    () => ({
      createDate: currentInvoice?.createDate || null,
      dueDate: currentInvoice?.dueDate || null,
      taxes: currentInvoice?.taxes || '',
      status: currentInvoice?.status || 'draft',
      discount: currentInvoice?.discount || '',
      invoiceFrom: currentInvoice?.invoiceFrom || _invoiceAddressFrom[0],
      invoiceTo: currentInvoice?.invoiceTo || null,
      items: currentInvoice?.items || [
        {
          title: '',
          description: '',
          service: '',
          quantity: 0,
          price: 0,
          total: 0,
        },
      ],
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentInvoice],
  );

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  useEffect(() => {
    if (isEdit && currentInvoice) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentInvoice]);

  const newInvoice = {
    ...values,
    items: values.items.map(item => ({
      ...item,
      total: item.quantity * item.price,
    })),
  };

  const handleSaveAsDraft = async () => {
    setLoadingSave(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      reset();
      setLoadingSave(true);
      navigate(PATH_DASHBOARD.invoice.list);
      console.log(JSON.stringify(newInvoice, null, 2));
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateAndSend = async () => {
    setLoadingSend(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      reset();
      setLoadingSend(false);
      navigate(PATH_DASHBOARD.invoice.list);
      console.log(JSON.stringify(newInvoice, null, 2));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider
      // @ts-ignore
      methods={methods}
    >
      <Card>
        <InvoiceNewEditAddress />
        <InvoiceNewEditStatusDate />
        <InvoiceNewEditDetails />
      </Card>

      <Stack
        justifyContent="flex-end"
        direction="row"
        spacing={2}
        sx={{ mt: 3 }}
      >
        <LoadingButton
          color="inherit"
          size="large"
          variant="contained"
          loading={loadingSave && isSubmitting}
          onClick={handleSubmit(handleSaveAsDraft)}
        >
          Save as Draft
        </LoadingButton>

        <LoadingButton
          size="large"
          variant="contained"
          loading={loadingSend && isSubmitting}
          onClick={handleSubmit(handleCreateAndSend)}
        >
          {isEdit ? 'Update' : 'Create'} & Send
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
