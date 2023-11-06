import type { ProductionDropDownRule } from '@/app/types';

export default function validateProductionDropDownRule(productionDropDownRule: ProductionDropDownRule[]): Error | undefined {
  if (productionDropDownRule.length === 0) return Error('Invalid productionDropDownRule is required');

  productionDropDownRule = productionDropDownRule.sort((a, b) => a.cumulativeStart - b.cumulativeStart);
  const isValidateProductionDropDownRuleCumulativeStart = productionDropDownRule.every((item) => {
    return item.cumulativeStart >= 0;
  });
  if (!isValidateProductionDropDownRuleCumulativeStart) return Error('Invalid productionDropDownRule CumulativeStart negative value');

  const isValidateProductionDropDownRulePercentage = productionDropDownRule.every((item) => {
    return item.sharePercentage >= 0 && item.sharePercentage <= 100;
  });
  if (!isValidateProductionDropDownRulePercentage) return Error('Invalid productionDropDownRule SharePercentage must be between 0 and 100');

  const isValidateProductionDropDownRuleCumulativeStartEnd = productionDropDownRule.every((item) => {
    return item.cumulativeStart < item.cumulativeEnd! || !item.cumulativeEnd;
  });
  if (!isValidateProductionDropDownRuleCumulativeStartEnd) return Error('Invalid productionDropDownRule CumulativeStart must be less than CumulativeEnd');

  if (productionDropDownRule.map((e) => e.cumulativeStart).filter((item, index) => productionDropDownRule.map((e) => e.cumulativeStart).indexOf(item) !== index).length > 0)
    return Error('Invalid productionDropDownRule has duplicate cumulativeStart');

  if (productionDropDownRule.map((e) => e.cumulativeEnd).filter((item, index) => productionDropDownRule.map((e) => e.cumulativeEnd).indexOf(item) !== index).length > 0)
    return Error('Invalid productionDropDownRule has duplicate cumulativeEnd');

  let _start = productionDropDownRule[0].cumulativeStart;
  let _end = productionDropDownRule[0].cumulativeEnd!;
  for (let index = 1; index < productionDropDownRule.length; index++) {
    const item = productionDropDownRule[index];
    if ((_start < item.cumulativeEnd! || !item.cumulativeEnd) && item.cumulativeStart < _end) {
      return Error('Invalid productionDropDownRule overlap value');
    }
    if (_end !== item.cumulativeStart) {
      return Error('Invalid productionDropDownRule discontinue value');
    }
  }

  return undefined;
}
