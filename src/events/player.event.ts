import { Logger } from "configs/Logger";
import { Events } from "discord.js";
import { player } from "configs/bot.config";

export default {
    name: Events.ClientReady,
    once: true,

    async execute() {
        player.events.on("playerStart", (_, track) => {
            Logger.success(`Reproduciendo: ${track.title}`);
        });

        player.events.on("audioTrackAdd", (_, track) => {
            Logger.success(`Añadido a la cola: ${track.title}`);
        });

        player.events.on("error", (_, error) => {
            Logger.error("Error del reproductor:");
            Logger.error(error);
        });
    },
};
