class AppGlobal {
  public api_url: string = 'http://localhost:8008/api';
  
  public storage_key_token = 'token';
  public storage_key_userType = 'userType';
}

const appGlobal = new AppGlobal();
export default appGlobal;
