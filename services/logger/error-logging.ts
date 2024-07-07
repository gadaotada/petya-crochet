import ConfigManager from "@/services/init";

const loggerURL = process.env.LOGGER_URL
const apiKey = process.env.LOGGER_API_KEY
const projectName = process.env.LOGGER_PROJECT_NAME

export async function errorLog(type: "Critical" | "Warning" | "General" | "Other", code: string, location: string, error: Error): Promise<void> {
    if (!loggerURL || !apiKey || !projectName) {
        throw new Error('Missing environment variables for error logging!')
    }

    const configManager = await ConfigManager.getInstance();
    const settings = configManager.getSettings();

    if (!settings.logging) {
        console.log(`Logging is disabled in global settings. Skipping logging for ${type} error at ${location}.`);
        return;
    }

    let detailedMessage = `Message: ${error.message}`;
    if (error.stack) {
        detailedMessage += ` | Stack: ${error.stack}`;
    }

    const payload = {
        appName: projectName,
        type: type,
        code: code,
        location: location,
        message: detailedMessage
    };

    try {
        await fetch(`${loggerURL}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'chocolog-api-key': apiKey,
                'chocolog-api-name': projectName
            },
            body: JSON.stringify(payload)
        });
    } catch (err) {
        console.log("Unable to register the error:", err)
    }
}