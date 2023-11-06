import type { Material, ProductionDropDownRule } from '@/app/types';

export default function actualProduction(original: Material[], productionDropDownRule: ProductionDropDownRule[]): Partial<Material[]> {
  const resultActual: Material[] = [];
  let cumulative = 0;
  original = original.sort((a, b) => a.year - b.year);
  original.forEach((item) => {
    resultActual.push({
      year: item.year,
      tonne: getActualProduction(item.tonne, cumulative, productionDropDownRule),
    });
    cumulative += item.tonne;
  });

  return resultActual;
}

function getActualProduction(current: number, cumulative: number, productionDropDownRule: ProductionDropDownRule[]): number {
  let actualProduction = 0;
  let totalAccumulate = cumulative + current;
  let remain = current;
  productionDropDownRule = productionDropDownRule.sort((a, b) => a.cumulativeStart - b.cumulativeStart);
  productionDropDownRule.forEach((rule) => {
    if (rule.cumulativeStart <= cumulative && (cumulative <= rule.cumulativeEnd! || !rule.cumulativeEnd)) {
      if (totalAccumulate < rule.cumulativeEnd! || !rule.cumulativeEnd) {
        actualProduction += (remain * rule.sharePercentage) / 100;
      } else {
        actualProduction += ((rule.cumulativeEnd! - cumulative) * rule.sharePercentage) / 100;
        remain = totalAccumulate - rule.cumulativeEnd!;
        cumulative = rule.cumulativeEnd!;
      }
    }
  });

  return actualProduction;
}
