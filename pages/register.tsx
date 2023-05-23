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

export default function Registro({ products, mainMenu, footerMenu, basicSettings }: InferGetServerSidePropsType<typeof getServerSideProps>) {
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
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      // Aquí puedes redirigir al usuario a una página de éxito o realizar otras acciones después de la inserción
      router.push('login'); // Reemplaza '/success' con la ruta que desees

      // Restablecer el formulario después de la inserción
      setFormData({
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
    } else {
      // Maneja el caso de error si la inserción no fue exitosa
      console.error(e);
      console.error('Error al enviar el formulario');
    }
  };

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
                value={formData.postalcode}
                onChange={handleInputChange}
              />
              <Spacer y={1} />
              <input
                type="hidden"
                name="isAdmin"
                value={formData.isAdmin.toString()}
              />
              <Spacer y={1} />

              <Button type="submit">Sign Up</Button>
            </form>
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