import { Logger } from "configs/Logger";
import { QueryType, useMainPlayer } from "discord-player";
import {
    ChatInputCommandInteraction,
    EmbedBuilder,
    GuildMember,
    SlashCommandBuilder,
} from "discord.js";

export default {
    data: new SlashCommandBuilder()
        .setName("play")
        .setDescription("Reproduce a song.")
        .addStringOption((option) =>
            option
                .setName("query")
                .setDescription("The song you want to play.")
                .setRequired(true),
        ),

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

        const player = useMainPlayer();
        const channel = interaction.member.voice.channel;
        const query = interaction.options.getString("query");

        const searchResult = await player.search(query!, {
            requestedBy: interaction.user,
            searchEngine: QueryType.AUTO,
        });

        if (!searchResult.hasTracks())
            return interaction.followUp({
                content: "No results were found!",
            });

        try {
            const queue = player.nodes.create(interaction.guild!, {
                metadata: {
                    channel: interaction.channel,
                    client: interaction.guild?.members.me,
                    requestedBy: interaction.user.username,
                },
                leaveOnEmptyCooldown: 30000,
                leaveOnEmpty: true,
                leaveOnEnd: false,
                volume: 100,
            });

            if (!queue.connection) {
                await queue.connect(channel);
            }

            await queue.play(searchResult.tracks[0]!);
            const result = searchResult.tracks[0];

            const embed = new EmbedBuilder()
                .setTitle(result?.cleanTitle || "Not Found")
                .setThumbnail(result?.thumbnail!)
                .setDescription(result?.duration || "0:00")
                .setURL(result?.url || "alexep11.vercel.app")
                .setAuthor({
                    name: result?.author || "El cuico",
                });

            await interaction.followUp({
                content: `${queue.isEmpty() ? "Reproduciendo" : "Añadida a la cola"} **${searchResult.tracks[0]!.title}**`,
                embeds: [embed],
            });
        } catch (error) {
            Logger.error(error);
            if (interaction.deferred || interaction.replied) {
                await interaction.editReply({
                    content: "Error reproduciendo la canción.",
                });
            } else {
                await interaction.reply({
                    content: "Error reproduciendo la canción.",
                });
            }
        }
    },
};
