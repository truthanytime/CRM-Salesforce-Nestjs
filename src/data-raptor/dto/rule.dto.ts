import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsDefined,
  ValidateNested,
  IsBoolean,
  IsArray,
  IsOptional,
  IsEnum,
} from 'class-validator';

export enum DiscriminatorTypeEnum {
  CONDITIONAL = 'CO',
  LOGICAL = 'LO',
  OPEN_PARENTHESIS = 'OP',
  CLOSED_PARENTHESIS = 'CP',
  LOOKUP = 'LU',
}

export class Discriminator {
  @IsNotEmpty()
  @IsEnum(DiscriminatorTypeEnum)
  type: DiscriminatorTypeEnum;
}

export class Condition extends Discriminator {
  @IsString()
  @IsDefined()
  field: string;

  @IsString()
  @IsDefined()
  operator: string;

  @IsDefined()
  value: any;

  @IsOptional()
  @IsBoolean()
  isValueField?: boolean;
}

export class LogicalOperator extends Discriminator {
  @IsNotEmpty()
  @IsEnum(['AND', 'and', 'OR', 'or'])
  value: string;
}

export class LookUp extends Discriminator {
  @IsString()
  @IsDefined()
  table: string;

  @IsString()
  @IsDefined()
  relationshipName: string;

  @IsString()
  @IsDefined()
  referenceTable: string;

  @IsDefined()
  @ValidateNested()
  @Type(() => Discriminator, {
    discriminator: {
      property: 'type',
      subTypes: [
        { value: Condition, name: DiscriminatorTypeEnum.CONDITIONAL },
        { value: LookUp, name: DiscriminatorTypeEnum.LOOKUP },
      ],
    },
    keepDiscriminatorProperty: true,
  })
  condition: Condition | LookUp;

  @IsString()
  @IsDefined()
  joinField: string;

  @IsString()
  @IsDefined()
  referenceJoinField: string;
}

export class Parenthesis extends Discriminator {}

const discriminatorConfig = {
  discriminator: {
    property: 'type',
    subTypes: [
      { value: Condition, name: DiscriminatorTypeEnum.CONDITIONAL },
      { value: LogicalOperator, name: DiscriminatorTypeEnum.LOGICAL },
      { value: Parenthesis, name: DiscriminatorTypeEnum.OPEN_PARENTHESIS },
      { value: Parenthesis, name: DiscriminatorTypeEnum.CLOSED_PARENTHESIS },
      { value: LookUp, name: DiscriminatorTypeEnum.LOOKUP },
    ],
  },
  keepDiscriminatorProperty: true,
};

export class JoinClause {
  @IsString()
  type: string;
  @IsString()
  table: string;

  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Discriminator, discriminatorConfig)
  condition: (Condition | LogicalOperator)[];
}

export class RuleDto {
  @IsString()
  table: string;

  @IsArray()
  @ValidateNested()
  @IsOptional()
  @Type(() => JoinClause)
  join?: JoinClause[];

  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Discriminator, discriminatorConfig)
  where: (Condition | LogicalOperator | Parenthesis | LookUp)[];
}
