import fs from "fs/promises";

type ServicesStatus = {
    logging: boolean,
    analytics: boolean
}

class ConfigManager {
    private static instance: ConfigManager;
    private settings: ServicesStatus;

    private constructor() {
        this.settings = { logging: true, analytics: true };
    }

    public static async getInstance(): Promise<ConfigManager> {
        if (!ConfigManager.instance) {
            ConfigManager.instance = new ConfigManager();
            await ConfigManager.instance.loadSettings();
        }
        return ConfigManager.instance;
    }

    private async loadSettings(): Promise<void> {
        try {
            const currServices = await fs.readFile('./global-app-settings.json', 'utf-8');
            this.settings = JSON.parse(currServices) as ServicesStatus;
        } catch (err) {
            console.error("Error reading global settings: ", err);
        }
    }

    public getSettings(): ServicesStatus {
        return this.settings;
    }

    public async updateSettings(newSettings: ServicesStatus): Promise<void> {
        this.settings = newSettings;
        try {
            await fs.writeFile('./global-app-settings.json', JSON.stringify(newSettings, null, 2));
        } catch (err) {
            console.error("Error writing global settings: ", err);
        }
    }
}

export default ConfigManager;
