import React, { useState, ChangeEvent } from 'react';
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
  FormElement,
} from '@nextui-org/react';
import router from 'next/router';
import { SSRProvider } from 'react-bootstrap';

export default function Registro({ mainMenu, footerMenu, basicSettings }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [formData, setFormData] = useState({
    name: '',
    lastname: '',
    email: '',
    password: '',
    company: '',
    phone: '',
    country: '',
    street: '',
    city: '',
    state: '',
    postalcode: '',
    isAdmin: false,
  });

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
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
      }).then(response => {
        if (response.status === 409) {
          document.getElementById('respuesta').innerHTML = "CORREO YA REGISTRADO CON OTRO USUARIO";
        } else if (response.status === 200) {
          location.replace('http://localhost:3000/login');
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
                Register
              </Text>

              <form onSubmit={handleSubmit}>
                <Input
                  clearable
                  bordered
                  fullWidth
                  color="primary"
                  size="lg"
                  placeholder="Name"
                  name="name"
                  aria-label='Name'
                  value={formData.name}
                  onChange={handleInputChange}
                />
                <Spacer y={1} />
                <Input
                  clearable
                  bordered
                  fullWidth
                  color="primary"
                  size="lg"
                  placeholder="Last Name"
                  name="lastname"
                  aria-label='Lastname'
                  value={formData.lastname}
                  onChange={handleInputChange}
                />
                <Spacer y={1} />
                <Input
                  clearable
                  bordered
                  fullWidth
                  color="primary"
                  size="lg"
                  placeholder="Email"
                  name="email"
                  aria-label='Email'
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
                  placeholder="Password"
                  name="password"
                  aria-label='Password'
                  value={formData.password}
                  onChange={handleInputChange}
                />
                <Spacer y={1} />
                <Input
                  clearable
                  bordered
                  fullWidth
                  color="primary"
                  size="lg"
                  placeholder="Company"
                  name="company"
                  aria-label='Company'
                  value={formData.company}
                  onChange={handleInputChange}
                />
                <Spacer y={1} />
                <Input
                  clearable
                  bordered
                  fullWidth
                  color="primary"
                  size="lg"
                  placeholder="Phone"
                  name="phone"
                  aria-label='Phone'
                  value={formData.phone}
                  onChange={handleInputChange}
                />
                <Spacer y={1} />
                <Input
                  clearable
                  bordered
                  fullWidth
                  color="primary"
                  size="lg"
                  placeholder="Country"
                  name="country"
                  aria-label='Country'
                  value={formData.country}
                  onChange={handleInputChange}
                />
                <Spacer y={1} />
                <Input
                  clearable
                  bordered
                  fullWidth
                  color="primary"
                  size="lg"
                  placeholder="Street"
                  name="street"
                  aria-label='Street'
                  value={formData.street}
                  onChange={handleInputChange}
                />
                <Spacer y={1} />
                <Input
                  clearable
                  bordered
                  fullWidth
                  color="primary"
                  size="lg"
                  placeholder="City"
                  name="city"
                  aria-label='City'
                  value={formData.city}
                  onChange={handleInputChange}
                />
                <Spacer y={1} />
                <Input
                  clearable
                  bordered
                  fullWidth
                  color="primary"
                  size="lg"
                  placeholder="State"
                  name="state"
                  aria-label='State'
                  value={formData.state}
                  onChange={handleInputChange}
                />
                <Spacer y={1} />
                <Input
                  clearable
                  bordered
                  fullWidth
                  color="primary"
                  size="lg"
                  placeholder="Postal Code"
                  name="postalcode"
                  aria-label='Postalcode'
                  value={formData.postalcode}
                  onChange={handleInputChange}
                />
                <Spacer y={1} />
                <input
                  type="hidden"
                  name="isAdmin"
                  aria-label='Admin'
                  value={formData.isAdmin.toString()}
                />
                <div id="respuesta" ></div>
                <Spacer y={1} />
                <Button type="submit">Sign Up</Button>
              </form>
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