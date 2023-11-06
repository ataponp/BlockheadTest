import { Material, ProductionDropDownRule } from '@/app/types';
import actualProduction from '../actualProduction';
import validateOriginal from '../validateOriginal';
import validateProductionDropDownRule from '../validateProductionDropDownRule';

const mockOriginal: Material[] = [
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
];

const mockOriginal2: Material[] = [
  {
    year: 2022,
    tonne: 1000.5,
  },
  {
    year: 2023,
    tonne: 1500.5,
  },
  {
    year: 2024,
    tonne: 900.5,
  },
  {
    year: 2025,
    tonne: 1000.5,
  },
  {
    year: 2026,
    tonne: 1200.5,
  },
];

const mockProductionDropDownRule: ProductionDropDownRule[] = [
  {
    cumulativeStart: 0,
    cumulativeEnd: 2500,
    sharePercentage: 100,
  },
  {
    cumulativeStart: 2500,
    cumulativeEnd: undefined,
    sharePercentage: 50,
  },
];

const mockProductionDropDownRule2: ProductionDropDownRule[] = [
  {
    cumulativeStart: 0,
    cumulativeEnd: 600,
    sharePercentage: 100,
  },
  {
    cumulativeStart: 600,
    cumulativeEnd: undefined,
    sharePercentage: 25,
  },
];

describe('actualProduction lib function', () => {
  it('should return the actual result', () => {
    const actual = actualProduction(mockOriginal, mockProductionDropDownRule);
    console.log(mockOriginal, mockProductionDropDownRule, actual);
    expect(actual).toEqual([
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
        tonne: 450,
      },
      {
        year: 2025,
        tonne: 500,
      },
      {
        year: 2026,
        tonne: 600,
      },
    ]);
  });

  it('should return the actual result2', () => {
    const actual = actualProduction(mockOriginal2, mockProductionDropDownRule);
    console.log(mockOriginal2, mockProductionDropDownRule, actual);
    expect(actual).toEqual([
      {
        year: 2022,
        tonne: 1000.5,
      },
      {
        year: 2023,
        tonne: 1500,
      },
      {
        year: 2024,
        tonne: 450.25,
      },
      {
        year: 2025,
        tonne: 500.25,
      },
      {
        year: 2026,
        tonne: 600.25,
      },
    ]);
  });

  it('should return the actual result3', () => {
    const actual = actualProduction(mockOriginal, mockProductionDropDownRule2);
    console.log(mockOriginal, mockProductionDropDownRule2, actual);
    expect(actual).toEqual([
      {
        year: 2022,
        tonne: 700,
      },
      {
        year: 2023,
        tonne: 375,
      },
      {
        year: 2024,
        tonne: 225,
      },
      {
        year: 2025,
        tonne: 250,
      },
      {
        year: 2026,
        tonne: 300,
      },
    ]);
  });

  it('should return the actual result4', () => {
    const actual = actualProduction(mockOriginal2, mockProductionDropDownRule2);
    console.log(mockOriginal2, mockProductionDropDownRule2, actual);
    expect(actual).toEqual([
      {
        year: 2022,
        tonne: 700.125,
      },
      {
        year: 2023,
        tonne: 375.125,
      },
      {
        year: 2024,
        tonne: 225.125,
      },
      {
        year: 2025,
        tonne: 250.125,
      },
      {
        year: 2026,
        tonne: 300.125,
      },
    ]);
  });

  it('should fail with an error Invalid original[required]', async () => {
    const mockOriginal: Material[] = [];

    const error = validateOriginal(mockOriginal);
    expect(error?.message).toEqual('Invalid original is required');
  });

  it('should fail with an error Invalid original[year negative value]', async () => {
    const mockOriginal: Material[] = [
      {
        year: -10,
        tonne: 0,
      },
    ];

    const error = validateOriginal(mockOriginal);
    expect(error?.message).toEqual('Invalid original year negative value');
  });

  it('should fail with an error Invalid original[tonne negative value]', async () => {
    const mockOriginal: Material[] = [
      {
        year: 0,
        tonne: -10,
      },
    ];

    const error = validateOriginal(mockOriginal);
    expect(error?.message).toEqual('Invalid original tonne negative value');
  });

  it('should fail with an error Invalid original[year duplicate value]', async () => {
    const mockOriginal: Material[] = [
      {
        year: 2023,
        tonne: 0,
      },
      {
        year: 2023,
        tonne: 0,
      },
    ];

    const error = validateOriginal(mockOriginal);
    expect(error?.message).toEqual('Invalid original has duplicate year');
  });

  it('should fail with an error Invalid productionDropDownRule[required]', async () => {
    const mockProductionDropDownRule: ProductionDropDownRule[] = [];
    const error = validateProductionDropDownRule(mockProductionDropDownRule);
    expect(error?.message).toEqual('Invalid productionDropDownRule is required');
  });

  it('should fail with an error Invalid productionDropDownRule[cumulativeStart negative value]', async () => {
    const mockProductionDropDownRule: ProductionDropDownRule[] = [
      {
        cumulativeStart: -100,
        cumulativeEnd: 100,
        sharePercentage: 100,
      },
      {
        cumulativeStart: 200,
        cumulativeEnd: 200,
        sharePercentage: 75,
      },
      {
        cumulativeStart: 300,
        cumulativeEnd: undefined,
        sharePercentage: 50,
      },
    ];
    const error = validateProductionDropDownRule(mockProductionDropDownRule);
    expect(error?.message).toEqual('Invalid productionDropDownRule CumulativeStart negative value');
  });

  it('should fail with an error Invalid productionDropDownRule[SharePercentage negative value]', async () => {
    const mockProductionDropDownRule: ProductionDropDownRule[] = [
      {
        cumulativeStart: 0,
        cumulativeEnd: 100,
        sharePercentage: -100,
      },
      {
        cumulativeStart: 200,
        cumulativeEnd: 200,
        sharePercentage: 75,
      },
      {
        cumulativeStart: 300,
        cumulativeEnd: undefined,
        sharePercentage: 50,
      },
    ];
    const error = validateProductionDropDownRule(mockProductionDropDownRule);
    expect(error?.message).toEqual('Invalid productionDropDownRule SharePercentage must be between 0 and 100');
  });

  it('should fail with an error Invalid productionDropDownRule[SharePercentage > 100]', async () => {
    const mockProductionDropDownRule: ProductionDropDownRule[] = [
      {
        cumulativeStart: 0,
        cumulativeEnd: 100,
        sharePercentage: 101,
      },
      {
        cumulativeStart: 200,
        cumulativeEnd: 200,
        sharePercentage: 75,
      },
      {
        cumulativeStart: 300,
        cumulativeEnd: undefined,
        sharePercentage: 50,
      },
    ];
    const error = validateProductionDropDownRule(mockProductionDropDownRule);
    expect(error?.message).toEqual('Invalid productionDropDownRule SharePercentage must be between 0 and 100');
  });

  it('should fail with an error Invalid productionDropDownRule[cumulativeStart == cumulativeEnd]', async () => {
    const mockProductionDropDownRule: ProductionDropDownRule[] = [
      {
        cumulativeStart: 0,
        cumulativeEnd: 100,
        sharePercentage: 100,
      },
      {
        cumulativeStart: 200,
        cumulativeEnd: 200,
        sharePercentage: 75,
      },
      {
        cumulativeStart: 300,
        cumulativeEnd: undefined,
        sharePercentage: 50,
      },
    ];
    const error = validateProductionDropDownRule(mockProductionDropDownRule);
    expect(error?.message).toEqual('Invalid productionDropDownRule CumulativeStart must be less than CumulativeEnd');
  });

  it('should fail with an error Invalid productionDropDownRule[cumulativeStart > cumulativeEnd]', async () => {
    const mockProductionDropDownRule: ProductionDropDownRule[] = [
      {
        cumulativeStart: 101,
        cumulativeEnd: 100,
        sharePercentage: 100,
      },
      {
        cumulativeStart: 200,
        cumulativeEnd: 300,
        sharePercentage: 75,
      },
      {
        cumulativeStart: 300,
        cumulativeEnd: undefined,
        sharePercentage: 50,
      },
    ];
    const error = validateProductionDropDownRule(mockProductionDropDownRule);
    expect(error?.message).toEqual('Invalid productionDropDownRule CumulativeStart must be less than CumulativeEnd');
  });

  it('should fail with an error Invalid productionDropDownRule[cumulativeStart duplicate value]', async () => {
    const mockProductionDropDownRule: ProductionDropDownRule[] = [
      {
        cumulativeStart: 0,
        cumulativeEnd: 100,
        sharePercentage: 100,
      },
      {
        cumulativeStart: 200,
        cumulativeEnd: 300,
        sharePercentage: 75,
      },
      {
        cumulativeStart: 200,
        cumulativeEnd: undefined,
        sharePercentage: 50,
      },
    ];
    const error = validateProductionDropDownRule(mockProductionDropDownRule);
    expect(error?.message).toEqual('Invalid productionDropDownRule has duplicate cumulativeStart');
  });

  it('should fail with an error Invalid productionDropDownRule[cumulativeEnd duplicate value]', async () => {
    const mockProductionDropDownRule: ProductionDropDownRule[] = [
      {
        cumulativeStart: 0,
        cumulativeEnd: 100,
        sharePercentage: 100,
      },
      {
        cumulativeStart: 50,
        cumulativeEnd: 100,
        sharePercentage: 75,
      },
      {
        cumulativeStart: 200,
        cumulativeEnd: undefined,
        sharePercentage: 50,
      },
    ];
    const error = validateProductionDropDownRule(mockProductionDropDownRule);
    expect(error?.message).toEqual('Invalid productionDropDownRule has duplicate cumulativeEnd');
  });

  it('should fail with an error Invalid productionDropDownRule[overlap value]', async () => {
    const mockProductionDropDownRule: ProductionDropDownRule[] = [
      {
        cumulativeStart: 0,
        cumulativeEnd: 100,
        sharePercentage: 100,
      },
      {
        cumulativeStart: 10,
        cumulativeEnd: 300,
        sharePercentage: 75,
      },
      {
        cumulativeStart: 300,
        cumulativeEnd: undefined,
        sharePercentage: 50,
      },
    ];
    const error = validateProductionDropDownRule(mockProductionDropDownRule);
    expect(error?.message).toEqual('Invalid productionDropDownRule overlap value');
  });

  it('should fail with an error Invalid productionDropDownRule[discontinue value]', async () => {
    const mockProductionDropDownRule: ProductionDropDownRule[] = [
      {
        cumulativeStart: 0,
        cumulativeEnd: 100,
        sharePercentage: 100,
      },
      {
        cumulativeStart: 100,
        cumulativeEnd: 200,
        sharePercentage: 75,
      },
      {
        cumulativeStart: 300,
        cumulativeEnd: undefined,
        sharePercentage: 50,
      },
    ];
    const error = validateProductionDropDownRule(mockProductionDropDownRule);
    expect(error?.message).toEqual('Invalid productionDropDownRule discontinue value');
  });
});
