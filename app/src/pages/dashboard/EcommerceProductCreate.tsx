import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import { Container } from '@mui/material';

import { paramCase } from 'change-case';

import HeaderBreadcrumbs from '@src/components/HeaderBreadcrumbs';
import Page from '@src/components/Page';
import { useAppDispatch } from '@src/hooks/useAppDispatch';
import { useAppSelector } from '@src/hooks/useAppSelector';
import { PATH_DASHBOARD } from '@src/routes/paths';
import ProductNewEditForm from '@src/sections/@dashboard/e-commerce/ProductNewEditForm';
import { getProducts } from '@src/store/product/product.slice';

export default function EcommerceProductCreate() {
  const themeStretch = useAppSelector(state => state.settings.themeStretch);
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const { name } = useParams();
  const { products } = useAppSelector(state => state.product);
  const isEdit = pathname.includes('edit');
  const currentProduct = products.find(
    product => paramCase(product.name) === name,
  );

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <Page title="Ecommerce: Create a new product">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={!isEdit ? 'Create a new product' : 'Edit product'}
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'E-Commerce',
              href: PATH_DASHBOARD.eCommerce.root,
            },
            { name: !isEdit ? 'New product' : name },
          ]}
        />

        <ProductNewEditForm isEdit={isEdit} currentProduct={currentProduct} />
      </Container>
    </Page>
  );
}
