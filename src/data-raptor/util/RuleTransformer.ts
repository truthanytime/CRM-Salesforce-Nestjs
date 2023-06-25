import {
  RuleDto,
  JoinClause,
  DiscriminatorTypeEnum,
  LookUp,
  Condition,
  LogicalOperator,
  Parenthesis,
} from '../dto/rule.dto';

export class RuleTransformer {
  static transformLookUpFields(rule: RuleDto) {
    try {
      const ruleCopy: RuleDto = JSON.parse(JSON.stringify(rule));
      const joinClause: JoinClause[] = [];
      const joinClauseTableMap = {};
      const ruleConditions = ruleCopy.where || [];

      ruleConditions.forEach((condition, index) => {
        if (condition.type === DiscriminatorTypeEnum.LOOKUP) {
          RuleTransformer._processLookUpCondition(
            condition as LookUp,
            index,
            joinClause,
            ruleConditions,
            joinClauseTableMap,
          );
        }
      });
      ruleCopy.join = joinClause;
      return ruleCopy;
    } catch (e) {
      console.log('Error in RuleTransformer', e, e.stack);
      return rule;
    }
  }

  static _processLookUpCondition(
    condition: LookUp,
    index: number,
    joinClause: JoinClause[],
    ruleConditions: (LookUp | Condition | LogicalOperator | Parenthesis)[],
    joinClauseTableMap: any,
  ) {
    // Build Join object based on the Look up condition
    const conditionLookUp = condition as LookUp;
    const joinCondition: Condition = {
      type: DiscriminatorTypeEnum.CONDITIONAL,
      field: `${conditionLookUp.table}.${conditionLookUp.joinField}`,
      operator: '=',
      value: `${conditionLookUp.referenceTable}.${conditionLookUp.referenceJoinField}`,
      isValueField: true,
    };

    const join: JoinClause = {
      type: 'left',
      table: conditionLookUp.referenceTable,
      condition: [joinCondition],
    };

    // Check if relationship already exists on join if not add it
    const relationshipKey = `${conditionLookUp.table}.${conditionLookUp.relationshipName}`;
    if (!joinClauseTableMap[relationshipKey]) {
      joinClauseTableMap[relationshipKey] = {
        index: joinClause.length,
        join,
      };
      joinClause.push(join);
    }

    // check if condition is a condition or lookup and apply up logic
    if (conditionLookUp.condition.type === DiscriminatorTypeEnum.CONDITIONAL) {
      ruleConditions[index] = conditionLookUp.condition as Condition;
      return;
    } else if (
      conditionLookUp.condition.type === DiscriminatorTypeEnum.LOOKUP
    ) {
      return RuleTransformer._processLookUpCondition(
        conditionLookUp.condition as LookUp,
        index,
        joinClause,
        ruleConditions,
        joinClauseTableMap,
      );
    }
  }
}
