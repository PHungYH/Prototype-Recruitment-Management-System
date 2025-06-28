class AppGlobal {
  public api_url: string = 'http://localhost:8008/api';
  public endpoint_auth: string = '/auth';
  
  public storage_key_token = 'token';
}

const appGlobal = new AppGlobal();
export default appGlobal;
