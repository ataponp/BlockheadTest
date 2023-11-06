import type { Material } from '@/app/types';

export default function validateOriginal(original: Material[]): Error | undefined {
  // validate the original
  if (original.length === 0) return Error('Invalid original is required');

  original = original.sort((a, b) => a.year - b.year);

  if (original.map((e) => e.year).filter((item, index) => original.map((e) => e.year).indexOf(item) !== index).length > 0) return Error('Invalid original has duplicate year');

  const isValidateOriginalYear = original.every((item) => {
    return item.year >= 0;
  });
  if (!isValidateOriginalYear) return Error('Invalid original year negative value');

  const isValidateOriginalTonne = original.every((item) => {
    return item.tonne >= 0;
  });
  if (!isValidateOriginalTonne) return Error('Invalid original tonne negative value');

  return undefined;
}
