import React from 'react';
import MainLayout from '../layouts/Main';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { apiClient } from '../lib/api';
import { IBasicSettings } from '../@types/settings';
import { makeAllMenus } from '../lib/menu';
import { IProduct } from 'boundless-api-client';
import { IMenuItem } from '../@types/components';

import {
  Card,
  Spacer,
  Button,
  Text,
  Input,
  Row,
  Checkbox,
  Container,
} from '@nextui-org/react';

export default function Login({ products, mainMenu, footerMenu, basicSettings }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <MainLayout mainMenu={mainMenu} footerMenu={footerMenu} basicSettings={basicSettings}>
      <div>
        <Container
          display="flex"
          alignItems="center"
          justify="center"
          css={{ minHeight: '100vh' }}
        >
          <Card css={{ mw: '420px', p: '20px' }}>
            <Text
              size={24}
              weight="bold"
              css={{
                as: 'center',
                mb: '20px',
              }}
            >
              Login
            </Text>
            <Input
              clearable
              bordered
              fullWidth
              color="primary"
              size="lg"
              placeholder="Email"
            />
            <Spacer y={1} />
            <Input
              clearable
              bordered
              fullWidth
              color="primary"
              size="lg"
              placeholder="Password"
            />
            <Row justify="space-between">
              <Checkbox>
                <Text size={14}>Remember me</Text>
              </Checkbox>
              <Text size={14}>Forgot password?</Text>
            </Row>
            <Spacer y={1} />
            <Button>Sign in</Button>
          </Card>
        </Container>
      </div>
    </MainLayout>
  );
}


export const getServerSideProps: GetServerSideProps<IIndexPageProps> = async () => {
  const categoryTree = await apiClient.catalog.getCategoryTree({ menu: 'category' });
  const { products } = await apiClient.catalog.getProducts({ collection: ['main-page'], sort: 'in_collection' });
  const basicSettings = await apiClient.system.fetchSettings(['system.locale', 'system.currency']) as IBasicSettings;

  const menus = makeAllMenus({ categoryTree });

  return {
    props: {
      products,
      basicSettings,
      ...menus
    }
  };
};

interface IIndexPageProps {
  products: IProduct[];
  mainMenu: IMenuItem[];
  footerMenu: IMenuItem[];
  basicSettings: IBasicSettings;
}