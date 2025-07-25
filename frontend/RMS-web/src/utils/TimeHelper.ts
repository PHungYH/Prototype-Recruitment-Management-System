export class TimeHelper {
    static convertToHKTime = (utcString: string) => {
        const utcDate = new Date(utcString);

        // Add 16 hours to convert UTC to Hong Kong time
        const hkDate = new Date(utcDate.getTime() + 16 * 60 * 60 * 1000 );

        // Format the adjusted date
        return hkDate.toISOString().replace('T', ' ').substring(0, 19);
    }
}
