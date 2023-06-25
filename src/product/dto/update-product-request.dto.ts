import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import {
  ProductCategory,
  ProductCurrency,
  ProductRateChargeType,
} from '../types';

export class UpdateProductRequestDto {
  @IsOptional()
  @IsNumber()
  productId: number;

  @IsOptional()
  @IsString()
  productName: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsEnum(ProductCategory)
  category: ProductCategory;

  @IsOptional()
  @IsEnum(ProductRateChargeType)
  rateChargeType: ProductRateChargeType;

  @IsOptional()
  @IsEnum(ProductCurrency)
  currency: ProductCurrency;

  @IsOptional()
  @IsNumber()
  price: number;

  @IsOptional()
  @IsNumber()
  createdBy: number;

  @IsOptional()
  @IsBoolean()
  isActive: boolean;

  @IsOptional()
  @IsString()
  createDate: Date;
}
