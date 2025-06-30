class AppGlobal {
  public api_url: string = 'http://localhost:8009/api';
  public endpoint_auth: string = '/auth';
  
  public storage_key_token = 'token';
  public storage_key_userType = 'userType';

  public userType_APPLICANT = 'APPLICANT';
  public userType_ADMIN = 'ADMIN';
}

const appGlobal = new AppGlobal();
export default appGlobal;
