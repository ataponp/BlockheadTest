import { Material, ProductionDropDownRule } from '.';

export type FormModel = {
  original: Material[];
  productionDropDownRule: ProductionDropDownRule[];
  actual: Material[];
};
