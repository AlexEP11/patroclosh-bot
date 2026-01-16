import { Logger } from "configs/Logger";
import { Client, Events } from "discord.js";

export default {
    name: Events.ClientReady,
    once: true,
    execute(client: Client) {
        if (!client.user) {
            Logger.error("Client is ready but user is null!");
            return;
        }

        Logger.success(`🐱 ${client.user.tag} is online!`);
    },
};
