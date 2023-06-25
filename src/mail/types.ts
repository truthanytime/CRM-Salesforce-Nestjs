export interface SendMailData<T> {
  to: string;
  from?: string;
  templateId: string;
  dynamicTemplateData: T;
}

export interface WelcomeTemplateData {
  dashboardUrl: string;
  password: string;
}

export interface PasswordResetTemplateData {
  resetPasswordLink: string;
}
