import { Logger } from "configs/Logger";
import {
    ChatInputCommandInteraction,
    SlashCommandBuilder,
    TextChannel,
} from "discord.js";

export default {
    data: new SlashCommandBuilder()
        .setName("clear")
        .setDescription("Delete a number of messages in the current channel.")
        .addIntegerOption((option) =>
            option
                .setName("amount")
                .setDescription("The number of message to delete [1 - 100].")
                .setRequired(true)
                .setMinValue(1)
                .setMaxValue(100),
        ),

    async execute(interaction: ChatInputCommandInteraction) {
        const channel = interaction.channel;
        const amountMessage = interaction.options.getInteger("amount", true);

        if (!(channel instanceof TextChannel)) {
            return interaction.reply({
                content: "The current channel doesn't support messages.",
                ephemeral: true,
            });
        }

        try {
            const deleted = await channel.bulkDelete(amountMessage, true);

            return interaction.reply({
                content: `Deleted ${deleted.size} message from ${channel.name} channel.`,
                ephemeral: true,
            });
        } catch (error) {
            Logger.error(error);

            return interaction.reply({
                content:
                    "I couldn't delete messages (older than 14 days or missing permissions).",
            });
        }
    },
};
