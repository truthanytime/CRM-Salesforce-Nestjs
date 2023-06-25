import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  IsArray,
  ArrayNotEmpty,
  ValidateNested,
  IsEnum,
} from 'class-validator';

enum updateTypeEnum {
  INSERT = 'insert',
  UPDATE = 'update',
  DELETE = 'delete',
}

export class RecordUpdate {
  @IsString()
  @IsNotEmpty()
  table: string;

  @IsEnum(updateTypeEnum)
  @IsNotEmpty()
  type: updateTypeEnum;

  @IsArray()
  @ArrayNotEmpty()
  data: any[];
}

export class PostMigrationRecordUpdateDto {
  @IsArray()
  @ValidateNested()
  @ArrayNotEmpty()
  @Type(() => RecordUpdate)
  updates: RecordUpdate[];
}

export class PostTableRecordUpdateDto {
  @IsArray()
  updates: any[];
}
