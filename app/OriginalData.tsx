'use client';
import { Flex, Text, Box, Grid, Table, Container } from '@radix-ui/themes';
import { useFieldArray, useForm, useFormContext } from 'react-hook-form';
import { FormModel, Material } from './types';

const OriginalData = () => {
  const { register, control } = useFormContext<FormModel>();
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: `original`,
  });
  return (
    <Box height="auto">
      <h1 className="text-3xl font-bold text-center mb-1">Original Material</h1>
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
                <Table.RowHeaderCell key={field.id}>
                  <input
                    className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    key={field.id}
                    {...register(`original.${index}.tonne`)}
                    defaultValue={fields[index].tonne}
                  />
                </Table.RowHeaderCell>
              ) : (
                <Table.Cell key={field.id}>
                  <input
                    className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    key={field.id}
                    {...register(`original.${index}.tonne`)}
                    defaultValue={fields[index].tonne}
                  />
                </Table.Cell>
              );
            })}
          </Table.Row>
        </Table.Body>
      </Table.Root>
    </Box>
  );
};

export default OriginalData;
