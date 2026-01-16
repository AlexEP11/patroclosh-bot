import { client } from "configs/bot.config";
import { Logger } from "configs/Logger";
import fs from "fs";
import path from "path";

export async function loadCommands() {
    const commands = [];
    const foldersPath = path.join(__dirname, "..", "commands");
    const commandFolders = fs.readdirSync(foldersPath);

    for (const folder of commandFolders) {
        const commandsPath = path.join(foldersPath, folder);
        const commandFiles = fs
            .readdirSync(commandsPath)
            .filter((file) => file.endsWith(".js") || file.endsWith(".ts"));

        for (const file of commandFiles) {
            const filePath = path.join(commandsPath, file);
            const commandModule = await import(filePath);
            const command = commandModule.default;

            if (command) {
                client.commands.set(command.data.name, command);
                commands.push(command.data.toJSON());
            } else {
                Logger.warn(
                    `The command at ${filePath} is missing "data" or "execute"`
                );
            }
        }
    }

    return commands;
}

export async function loadEvents() {
    const eventsPath = path.join(__dirname, "..", "events");

    const eventFiles = fs
        .readdirSync(eventsPath)
        .filter((file) => file.endsWith(".js") || file.endsWith(".ts"));
    for (const file of eventFiles) {
        const filePath = path.join(eventsPath, file);
        const eventModule = await import(filePath);
        const event = eventModule.default;

        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args));
        } else {
            client.on(event.name, (...args) => event.execute(...args));
        }
    }
}
