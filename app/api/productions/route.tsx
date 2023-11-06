import actualProduction from '@/app/lib/actualProduction';
import validateOriginal from '@/app/lib/validateOriginal';
import validateProductionDropDownRule from '@/app/lib/validateProductionDropDownRule';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();
  if (!body.original) {
    return NextResponse.json('Invalid original is required', {
      status: 400,
    });
  }
  if (!body.productionDropDownRule) {
    return NextResponse.json('Invalid productionDropDownRule is required', {
      status: 400,
    });
  }
  const errorOriginal = validateOriginal(body.original);
  if (errorOriginal)
    return NextResponse.json(errorOriginal.message, {
      status: 400,
    });
  const errorProductionDropDownRule = validateProductionDropDownRule(body.productionDropDownRule);
  if (errorProductionDropDownRule)
    return NextResponse.json(errorProductionDropDownRule.message, {
      status: 400,
    });

  const actualMaterial = actualProduction(body.original, body.productionDropDownRule);

  return NextResponse.json(actualMaterial, { status: 200 });
}
