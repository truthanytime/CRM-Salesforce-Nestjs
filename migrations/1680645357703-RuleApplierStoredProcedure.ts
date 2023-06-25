import { MigrationInterface, QueryRunner } from 'typeorm';

export class RuleApplierStoredProcedure1680645357703
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    CREATE OR REPLACE PROCEDURE public.apply_data_raptor_rule(p_query text, p_action text, p_rule_id text, p_target_table text, p_violation_score numeric DEFAULT NULL::numeric, p_rule_name text DEFAULT NULL::text, INOUT p_data jsonb[] DEFAULT '{}'::jsonb[])
    LANGUAGE plpgsql
    AS $procedure$
    DECLARE
        r record;
        l_rule_data jsonb;
        result_data jsonb[];
        updated_confidence_score numeric;
    BEGIN
        l_rule_data := jsonb_build_object('violation_score', p_violation_score, 'rule_name', p_rule_name);
        
        FOR r IN EXECUTE p_query LOOP
            IF p_action = 'remove' AND r.rules_applied ? p_rule_id THEN
                EXECUTE format('
            UPDATE %I.%I t1 
              SET rules_applied = jsonb_strip_nulls(COALESCE(rules_applied, jsonb_build_object())::jsonb - %L), 
                confidence_score = confidence_score + (rules_applied -> %L -> %L)::numeric 
              WHERE t1."Id" = %L 
              RETURNING confidence_score',
            split_part(p_target_table, '.', 1), split_part(p_target_table, '.', 2), 
            p_rule_id, 
            p_rule_id, 'violation_score', 
            r."Id") 
          INTO updated_confidence_score;
            ELSIF p_action = 'apply' AND NOT r.rules_applied ? p_rule_id THEN
                EXECUTE format('
            UPDATE %I.%I t1 
              SET rules_applied = jsonb_set(COALESCE(rules_applied, jsonb_build_object()), %L, %L), 
                confidence_score = confidence_score - %s 
              WHERE t1."Id" = %L 
              RETURNING confidence_score', 
            split_part(p_target_table, '.', 1), split_part(p_target_table, '.', 2), 
            '{'||p_rule_id||'}', l_rule_data, 
            p_violation_score, 
            r."Id") 
          INTO updated_confidence_score;
            END IF;
            
            -- Add additional data to the result_data array
            result_data := result_data || jsonb_build_object('Id', r."Id", 'confidence_score', updated_confidence_score);
        END LOOP;
        
        -- Assign the result_data array to p_data
        p_data := result_data;
    END;
    $procedure$;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP PROCEDURE public.apply_data_raptor_rule
    `);
  }
}
