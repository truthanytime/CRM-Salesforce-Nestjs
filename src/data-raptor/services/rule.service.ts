import { Injectable } from '@nestjs/common';
import { CreateRuleDto } from '../dto/create-rule.dto';
import { UpdateRuleDto } from '../dto/update-rule.dto';
import { RuleRepository } from '../repositories/rule.repository';
import { RuleStatus } from '../types';
import { Rule } from '../entities/rule.entity';
import { FindManyOptions, FindOneOptions } from 'typeorm';

@Injectable()
export class RuleService {
  constructor(private readonly ruleRepository: RuleRepository) {}

  async createRule(rule: CreateRuleDto, dataMigrationId: string) {
    const ruleCreated = this.ruleRepository.create({
      ...rule,
      dataMigrationId,
    });
    return await this.ruleRepository.save(ruleCreated);
  }

  async deleteRule(id: string) {
    return await this.ruleRepository.softDelete(id);
  }

  async findOne(options: FindOneOptions<Rule>) {
    const rule = await this.ruleRepository.findOne(options);
    return rule;
  }

  async findMany(options: FindManyOptions<Rule>) {
    const rule = await this.ruleRepository.find(options);
    return rule;
  }

  async findByMigrationAndTable(dataMigrationId: string, table: string) {
    const rules = await this.ruleRepository.find({
      where: { dataMigrationId, table },
    });
    return rules;
  }

  async update(id: string, data: UpdateRuleDto) {
    const rule = await this.ruleRepository.findOne(id);
    const saveRule = await this.ruleRepository.save({
      ...rule,
      ...data,
      status: RuleStatus.REQUESTED,
      statusDate: new Date(),
    });
    return saveRule;
  }
}
