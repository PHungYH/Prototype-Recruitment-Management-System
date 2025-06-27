import axios from "axios";
import appGlobal from "./AppGlobal";

export class AuthHelper {
    static async isLoggedIn(): Promise<boolean> {
        const token = localStorage.getItem("token");
        if (!token) return false;

        try {
            const response = await axios.get(`${appGlobal.api_url}/validateToken`, {
                headers: { token }
            });
            return response.data.result === true;
        } catch (error) {
            console.error("Error fetching data:", error);
            return false;
        }
    }
    
    static clearSession(): void {
        const token = localStorage.getItem(appGlobal.storage_key_token)
        if (token) {
            localStorage.removeItem(appGlobal.storage_key_token);
            localStorage.removeItem(appGlobal.storage_key_userType);
        }
    }
}