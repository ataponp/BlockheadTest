import { Flex, Text, Box, Grid, Table, Container } from '@radix-ui/themes';
import { useFieldArray, useForm, useFormContext } from 'react-hook-form';
import { FormModel, Material } from './types';

const ProductionDropDown = () => {
  const { register, control } = useFormContext<FormModel>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: `productionDropDownRule`,
  });
  return (
    <Box height="auto">
      <h1 className="text-3xl font-bold text-center mb-1">Production Share Drop Down</h1>
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Cumulative Mine Produced Start</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Cumulative Mine Produced End</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Company Production Share Percentage</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {fields.map((field, index) => {
            return (
              <Table.Row key={field.id}>
                <Table.RowHeaderCell>
                  <input
                    className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    key={field.id}
                    {...register(`productionDropDownRule.${index}.cumulativeStart`)}
                    defaultValue={fields[index].cumulativeStart}
                  />
                </Table.RowHeaderCell>
                <Table.Cell>
                  <input
                    className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    key={field.id}
                    {...register(`productionDropDownRule.${index}.cumulativeEnd`)}
                    defaultValue={fields[index].cumulativeEnd ?? 'Infinity'}
                  />
                </Table.Cell>
                <Table.Cell>
                  <input
                    className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    key={field.id}
                    {...register(`productionDropDownRule.${index}.sharePercentage`)}
                    defaultValue={fields[index].sharePercentage}
                  />
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table.Root>
    </Box>
  );
};

export default ProductionDropDown;
