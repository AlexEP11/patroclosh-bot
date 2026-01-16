import { env } from "configs/env.config";
import { Logger } from "configs/Logger";
import { rest } from "handlers/rest.handler";
import {
    RESTPostAPIApplicationCommandsJSONBody,
    RESTPostAPIChatInputApplicationCommandsJSONBody,
    Routes,
} from "discord.js";

export async function deployGuildCommands(
    commands: RESTPostAPIApplicationCommandsJSONBody[]
) {
    try {
        Logger.info(`Refreshing ${commands.length} guild commands...`);
        const data = (await rest.put(
            Routes.applicationGuildCommands(env.CLIENT_ID, env.GUILD_ID),
            { body: commands }
        )) as RESTPostAPIApplicationCommandsJSONBody[];

        Logger.success(`Successfully reloaded ${data.length} guild commands.`);
    } catch (error) {
        Logger.error(error);
    }
}

export async function deployGlobalCommands(
    commands: RESTPostAPIChatInputApplicationCommandsJSONBody[]
) {
    try {
        Logger.info(`Refreshing ${commands.length} global commands...`);
        const data = (await rest.put(
            Routes.applicationCommands(env.CLIENT_ID),
            { body: commands }
        )) as RESTPostAPIApplicationCommandsJSONBody[];

        Logger.success(`Successfully reloaded ${data.length} global commands.`);
    } catch (error) {
        Logger.error(error);
    }
}
