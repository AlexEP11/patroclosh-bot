import { Client, Collection, GatewayIntentBits } from "discord.js";
import { deployGlobalCommands, deployGuildCommands } from "utils/deploy.util";
import {
    loadCommands,
    loadEvents,
    loadPlayerExtractors,
} from "utils/load.util";
import { env } from "./env.config";
import { Player } from "discord-player";

export const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

export const player = new Player(client, {
    skipFFmpeg: false,
});

client.commands = new Collection();

export async function start() {
    const commands = await loadCommands();
    await loadEvents();
    await deployGuildCommands(commands);
    //*: Descomentar para produccion
    await deployGlobalCommands(commands);
    await loadPlayerExtractors();
    await client.login(env.TOKEN);
}
