import { MigrationInterface, QueryRunner } from 'typeorm';

export class SalesforceIntegrationSeeders1676070923261
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
        INSERT INTO public.integration (application_id, application_name, application_description, application_icon, provider_name, provider_link, total_installs, categories, features, languages, requirement_permissions, subscription_title, subscriptions, subscription_link)
        VALUES('salesforce', 'Salesforce', 'Analyze your Salesforce data and discover their confidence score with CustomerCity', 'https://cdn-icons-png.flaticon.com/128/5968/5968914.png', 'CustomerCity', 'https://customercitydev.com', '10,000+', '{Analysis}', '{Analysis,Data,Confidence}', 'Japanese, German, Finnish, Swedish, Portuguese, English, Italian, French, Spanish, Polish, and Dutch', NULL, 'Salesforce Subscription', 'Essentials, Professional, Enterprise or Unlimited plans', 'https://www.salesforce.com/editions-pricing/overview/');
      `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
      DELETE FROM public.integration where application_name ='Salesforce';
      `,
    );
  }
}
