import { Client, Collection, GatewayIntentBits } from "discord.js";
import { deployGlobalCommands, deployGuildCommands } from "utils/deploy.util";
import { loadCommands, loadEvents } from "utils/load.util";
import { env } from "./env.config";

export const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();

export async function start() {
    const commands = await loadCommands();
    await loadEvents();
    await deployGuildCommands(commands);
    //*: Descomentar para produccion
    // await deployGlobalCommands(commands);
    await client.login(env.TOKEN);
}
