import { RuleDto } from './rule.dto';
import { Min, Max, IsOptional, IsBoolean, IsString } from 'class-validator';

export class UpdateRuleDto {
  @IsOptional()
  name?: string;

  @IsOptional()
  rule?: RuleDto;

  formattedRule?: RuleDto;

  previousFormattedRule?: RuleDto;

  @Min(0)
  @Max(100)
  @IsOptional()
  violationScore?: number;

  @IsOptional()
  @IsBoolean()
  active?: boolean;

  @IsString()
  @IsOptional()
  description?: string;

  @IsOptional()
  frontEndObject?: any;
}
