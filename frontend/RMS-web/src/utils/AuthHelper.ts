import appGlobal from "./AppGlobal";
import { HTTPHelper } from "./HTTPHelper";

interface SimpleBooleanResponse {
    result: boolean;
}

export class AuthHelper {

    static async isLoggedIn(): Promise<boolean> {
        const token = localStorage.getItem("token");
        if (!token) return false;

        try {
            const data = await HTTPHelper.call<SimpleBooleanResponse>(
                `${appGlobal.endpoint_auth}/validateToken`,
                'GET'
            );
            return data.result === true;
        } catch (error) {
            console.error("Error fetching data:", error);
            return false;
        }
    }

    static clearSession(): void {
        const token = localStorage.getItem(appGlobal.storage_key_token)
        if (token) {
            localStorage.removeItem(appGlobal.storage_key_token);
        }
    }
}