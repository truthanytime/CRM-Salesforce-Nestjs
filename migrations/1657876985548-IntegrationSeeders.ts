import { MigrationInterface, QueryRunner } from 'typeorm';

export class IntegrationSeeders1657876985548 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
            INSERT INTO public.integration (application_name,application_description,application_icon,provider_name,provider_link,total_installs,categories,features,languages,subscription_title, subscriptions, subscription_link)
            VALUES ('Gmail','Bring CustomerCity to your inbox with the CustomerCity integration for Gmail.','https://cdn-icons-png.flaticon.com/32/281/281769.png','CustomerCity','https://customercitydev.com','10,000+','{"Sales enablement"}','{"Contact Management","Content Management","Templates"}','Japanese, German, Finnish, Swedish, Portuguese, English, Italian, French, Spanish, Polish, and Dutch','Gmail Subscription', 'Free, Basic, or Business plans', 'https://workspace.google.com/intl/en_id/pricing.html');
            INSERT INTO public.integration (application_name,application_description,application_icon,provider_name,provider_link,total_installs,categories,features,languages,requirement_permissions,subscription_title,subscriptions,subscription_link) VALUES
            ('Google Calendar','Book meetings quickly and easily with CustomerCity and Google Calendar.','https://cdn-icons-png.flaticon.com/32/2702/2702609.png','CustomerCity','https://customercitydev.com','10,000+','{"Sales enablement"}','{"Contact Management","Content Management","Templates"}','Japanese, German, Finnish, Swedish, Portuguese, English, Italian, French, Spanish, Polish, and Dutch',NULL,'Gmail Subscription','Free, Basic, or Business plans','https://workspace.google.com/intl/en_id/pricing.html');
            `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
                DELETE FROM public.integration where application_name in ('Gmail', 'Google Calendar') ;
            `,
    );
  }
}
