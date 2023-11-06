'use client';
import { Button } from '@/components/ui/button';
import { Box, Container, Flex, Grid, Table } from '@radix-ui/themes';
import axios, { AxiosError } from 'axios';
import { useState } from 'react';
import { FormProvider, SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import OriginalData from './OriginalData';
import ProductionDropDown from './ProductionDropDown';
import { FormModel, Material } from './types';

export default function Home() {
  const methods = useForm<FormModel>({
    defaultValues: {
      original: [
        {
          year: 2022,
          tonne: 1000,
        },
        {
          year: 2023,
          tonne: 1500,
        },
        {
          year: 2024,
          tonne: 900,
        },
        {
          year: 2025,
          tonne: 1000,
        },
        {
          year: 2026,
          tonne: 1200,
        },
      ],
      productionDropDownRule: [
        {
          cumulativeStart: 0,
          cumulativeEnd: 2500,
          sharePercentage: 100,
        },
        {
          cumulativeStart: 2500,
          sharePercentage: 50,
        },
      ],
      actual: [],
    },
    mode: 'onChange',
  });
  const { control, handleSubmit } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'actual',
  });
  const [error, setError] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);

  const onSubmit: SubmitHandler<FormModel> = async (data) => {
    try {
      setSubmitting(true);
      setError('');
      data.original = data.original.map((item) => {
        return { ...item, tonne: Number(item.tonne) };
      });
      data.productionDropDownRule = data.productionDropDownRule.map((item) => {
        return {
          cumulativeStart: Number(item.cumulativeStart),
          cumulativeEnd: item.cumulativeEnd?.toLocaleString() === 'infinity' ? undefined : Number(item.cumulativeEnd),
          sharePercentage: Number(item.sharePercentage),
        };
      });
      const res = await axios.post<Material[]>('/api/productions', data);
      remove();
      append(res.data);
    } catch (error) {
      remove();
      setSubmitting(false);
      setError(`${(error as AxiosError).response?.data}`);
    }
  };

  return (
    <main>
      <Container size="4" className="min-h-screen h-screen p-4">
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid columns="1" gap="3" width="auto">
              <ProductionDropDown />
              <OriginalData />
              <Flex direction="column" gap="3">
                <h1 className="text-3xl font-bold text-center my-1">
                  <Button>Apply Production Share Drop Down Rules Let&lsquo;s go</Button>
                </h1>

                {error && <p className="text-red-500 text-center">{error}</p>}

                <Box height="auto" className="text-center">
                  <h1 className="text-3xl font-bold text-center mb-1">Actual Material</h1>
                  <Table.Root variant="surface">
                    <Table.Header>
                      <Table.Row>
                        {fields.map((field, index) => {
                          return <Table.ColumnHeaderCell key={field.id}>{fields[index].year}</Table.ColumnHeaderCell>;
                        })}
                      </Table.Row>
                    </Table.Header>

                    <Table.Body>
                      <Table.Row>
                        {fields.map((field, index) => {
                          return index === 0 ? (
                            <Table.RowHeaderCell key={field.id}>{fields[index].tonne}</Table.RowHeaderCell>
                          ) : (
                            <Table.Cell key={field.id}>{fields[index].tonne}</Table.Cell>
                          );
                        })}
                      </Table.Row>
                    </Table.Body>
                  </Table.Root>
                </Box>
              </Flex>
            </Grid>
            <Grid columns="1" gap="3" width="auto"></Grid>
          </form>
        </FormProvider>
      </Container>
    </main>
  );
}
