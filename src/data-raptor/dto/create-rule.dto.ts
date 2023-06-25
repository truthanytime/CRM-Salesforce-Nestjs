import { Type } from 'class-transformer';
import { RuleDto } from './rule.dto';
import {
  Min,
  Max,
  IsString,
  IsObject,
  IsNotEmpty,
  MinLength,
  IsNumber,
  IsDefined,
  IsNotEmptyObject,
  ValidateNested,
  IsOptional,
  IsBoolean,
} from 'class-validator';
import { RuleCategory, RuleRiskLevel } from '../types';

export class CreateRuleDto {
  @IsString()
  @IsNotEmpty()
  table: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => RuleDto)
  rule: RuleDto;

  @IsNumber()
  @Min(0)
  @Max(100)
  violationScore: number;

  formattedRule?: RuleDto;

  @IsOptional()
  @IsBoolean()
  active?: boolean;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  category: RuleCategory;

  @IsString()
  @IsOptional()
  riskLevel: RuleRiskLevel;

  @IsOptional()
  frontEndObject: any;
}
