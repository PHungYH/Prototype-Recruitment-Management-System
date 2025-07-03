class AppGlobal {
  public api_url: string = 'http://localhost:8009/api';
  public endpoint_auth: string = '/auth';
  
  public storage_key_token: string = 'token';
  public storage_key_userType:string = 'userType';

  public userType_APPLICANT:string = 'APPLICANT';
  public userType_ADMIN:string = 'ADMIN';
}

const appGlobal = new AppGlobal();
export default appGlobal;
