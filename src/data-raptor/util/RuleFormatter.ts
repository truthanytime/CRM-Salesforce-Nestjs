import { RuleDto } from '../dto/rule.dto';
import { v4 } from 'uuid';

export class RuleFormatter {
  static getFormattedRule(tenantId: number, dataSource: string, rule: RuleDto) {
    const ruleClone: RuleDto = JSON.parse(JSON.stringify(rule));
    const schema = `mig_${tenantId}_${dataSource}`.replace(/(\-)/g, '_');
    const tableNames = [];
    //Format Table
    tableNames.push(ruleClone.table);
    ruleClone.table = `${schema}."${ruleClone.table}" ${ruleClone.table}`;

    //Format Join
    if (ruleClone.join) {
      ruleClone.join = ruleClone.join.map((join) => {
        tableNames.push(join.table);
        return {
          ...join,
          table: `${schema}."${join.table}" ${join.table}`,
        };
      });
    }

    let ruleJsonString = JSON.stringify(ruleClone);

    tableNames.forEach((tableName) => {
      const postfix = v4().split('-')[0];
      const fieldRegex = new RegExp(`(\\"${tableName}\\\.)`, 'g');
      ruleJsonString = ruleJsonString.replace(
        fieldRegex,
        `"${tableName}${postfix}.`,
      );

      const tableAliasRegex = new RegExp(`( ${tableName}\\")`, 'g');
      ruleJsonString = ruleJsonString.replace(
        tableAliasRegex,
        ` ${tableName}${postfix}"`,
      );
    });

    return JSON.parse(ruleJsonString);
  }
}
