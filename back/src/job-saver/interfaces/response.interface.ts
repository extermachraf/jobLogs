export interface IJobResponse {
  success: boolean;
  data?: any;
  error: string;
}

export const ErrorMessages = {
  INVALID_DATA: 'Invalid data provided',
  INVALID_COMPANY: 'Invalid company data',
  INVALID_JOB: 'Invalid job data',
  INVALID_CONTACTS: 'Invalid contact information',
};
