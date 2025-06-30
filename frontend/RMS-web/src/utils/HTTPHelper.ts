import appGlobal from "./AppGlobal";

export class HTTPHelper {
  /**
   * Generic HTTP caller
   * @param endpoint   — the path (e.g. appGlobal.endpoint_auth + '/login')
   * @param method     — GET, POST, PUT, DELETE, etc.
   * @param body?      — the payload object; will be JSON.stringified if provided
   */
  static async call<T>(
    endpoint: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
    body?: any
  ): Promise<T> {
    const url = `${appGlobal.api_url}${endpoint}`;
    const headers: { [key: string]: string } = {
      'Content-Type': 'application/json'
    };
    const token = localStorage.getItem("token");
    if (token)
      headers['token'] = token;
    const opts: RequestInit = {
      method,
      headers: headers,
      // only include body if passed in
      ...(body && { body: JSON.stringify(body) }),
    };

    const res = await fetch(url, opts);

    if (!res.ok) {
      // try to get error details from server
      const errText = await res.text().catch(() => res.statusText);
      throw new Error(errText || 'Network response was not ok');
    }

    // assume all endpoints return JSON
    return (await res.json()) as T;
  }
}