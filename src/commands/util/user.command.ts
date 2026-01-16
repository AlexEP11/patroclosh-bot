import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

export default {
    data: new SlashCommandBuilder()
        .setName("user")
        .setDescription("Provides info about the user."),
    async execute(interaction: ChatInputCommandInteraction) {
        await interaction.reply(
            `This command was runned by ${interaction.user}, who joined to ${interaction.guild} on ${interaction.guild?.joinedAt}`
        );
    },
};
