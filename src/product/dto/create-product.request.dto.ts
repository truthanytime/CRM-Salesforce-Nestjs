import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import {
  ProductCategory,
  ProductCurrency,
  ProductRateChargeType,
} from '../types';

export class CreateProductRequestDto {
  @IsString()
  productName: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsEnum(ProductCategory)
  category: ProductCategory;

  @IsEnum(ProductRateChargeType)
  rateChargeType: ProductRateChargeType;

  @IsEnum(ProductCurrency)
  currency: ProductCurrency;

  @IsNumber()
  price: number;
}
