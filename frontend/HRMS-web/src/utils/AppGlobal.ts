class AppGlobal {
  private api_url: string = 'http://localhost:8008/api';;

  getApiUrl(): string {
    return this.api_url;
  }
}

const appGlobal = new AppGlobal();
export default appGlobal;
