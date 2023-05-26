import React, { useState, ChangeEvent } from 'react';
import MainLayout from '../layouts/Main';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { apiClient } from '../lib/api';
import { IBasicSettings } from '../@types/settings';
import { makeAllMenus } from '../lib/menu';
import { IProduct } from 'boundless-api-client';
import { IMenuItem } from '../@types/components';
import Link from 'next/link';


import {
  Card,
  Spacer,
  Button,
  Text,
  Input,
  Row,
  Checkbox,
  FormElement,
  Container,
} from '@nextui-org/react';
import { Col, SSRProvider, Stack } from 'react-bootstrap';

export default function Login({ products, mainMenu, footerMenu, basicSettings }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false
  });
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = () => {
    setIsChecked(formData.remember);
  }
  const handleInputChange = (e: ChangeEvent<FormElement>) => {
    const { name, value } = e.target as HTMLInputElement;
    setFormData({
      ...formData,
      [name]: value
    })
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    postData(formData);
  };

  const postData = async (formData) => {
    try {
      console.log(formData)
      const res = await fetch('/api/validar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
      }).then(response => {
        if (response.status === 409) {
          document.getElementById('respuesta').innerHTML = "Password o Correo incorrecto";
        } else if (response.status === 201) {
          location.replace('https://i1224.my-boundless.app/');
        } else {
          location.replace('http://localhost:3000/');
        }

      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <SSRProvider>
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
              <form onSubmit={handleSubmit}>
                <Input
                  clearable
                  bordered
                  fullWidth
                  color="primary"
                  size="lg"
                  aria-label='Email'
                  name='email'
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
                <Spacer y={1} />
                <Input
                  clearable
                  bordered
                  fullWidth
                  color="primary"
                  size="lg"
                  type='password'
                  name='password'
                  placeholder="Password"
                  aria-label='Password'
                  value={formData.password}
                  onChange={handleInputChange}
                />
                <Row justify="space-between">
                  <Checkbox name='remember'>
                    <Text size={14}>Remember me</Text>
                  </Checkbox>
                  <Text size={14}>Forgot password?</Text>
                </Row>
                <Spacer y={1} />

                <Button type="submit">
                  Sign in
                </Button>
              </form>
              <Text
                size={12}
                weight="bold"
                css={{
                  as: 'center',
                  mb: '20px',
                  marginTop: '20px',
                }}>
                <div id="respuesta" ></div>
                -----Or-----
              </Text>
              <Container
                display="flex"
                alignItems="center"
                justify="center"
              >
                <Link href="/register">
                  <a>
                    <Button
                      css={{
                        mb: '20px',
                      }}
                    >
                      Sign up
                    </Button>
                  </a>
                </Link>
              </Container>
            </Card>
          </Container>
        </div>
      </MainLayout>
    </SSRProvider>
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
