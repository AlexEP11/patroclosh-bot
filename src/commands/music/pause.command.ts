import { useQueue } from "discord-player";
import {
    ChatInputCommandInteraction,
    GuildMember,
    SlashCommandBuilder,
} from "discord.js";

export default {
    data: new SlashCommandBuilder()
        .setName("pause")
        .setDescription("Pause the current song"),

    async execute(interaction: ChatInputCommandInteraction) {
        if (
            !(interaction.member instanceof GuildMember) ||
            !interaction.member.voice.channel
        ) {
            return interaction.reply({
                content: "You aren't in a voice channel.",
            });
        }

        if (
            interaction.guild?.members.me?.voice.channelId &&
            interaction.member.voice.channelId !==
                interaction.guild.members.me.voice.channelId
        ) {
            return interaction.reply({
                content: "You aren't in my voice channel.",
            });
        }

        await interaction.deferReply();
        const queue = useQueue(interaction.guild!.id);

        if (!queue || !queue.currentTrack)
            return void interaction.followUp({
                content: "No music is being played.",
            });

        queue.node.pause();

        return void interaction.followUp({
            content: `Paused ${queue.currentTrack}`,
        });
    },
};
