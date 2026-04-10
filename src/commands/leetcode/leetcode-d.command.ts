import { leetcode } from "configs/bot.config";
import {
    ChatInputCommandInteraction,
    EmbedBuilder,
    SlashCommandBuilder,
} from "discord.js";
import { Difficulty, difficultyColors } from "interfaces/leetcode.interface";

export default {
    data: new SlashCommandBuilder()
        .setName("leetcode-d")
        .setDescription("Show the daily leetcode problem"),

    async execute(interaction: ChatInputCommandInteraction) {
        const { question, link } = await leetcode.daily();

        const stats = JSON.parse(question.stats);
        const url = `https://leetcode.com${link}`;
        const difficulty: Difficulty = question.difficulty;

        const embed = new EmbedBuilder()
            .setTitle(`${question.title}`)
            .setURL(url)
            .setColor(difficultyColors[difficulty] || "Grey")
            .setDescription(`Porcentaje de aceptación: **${stats.acRate}**`)
            .addFields(
                {
                    name: "Dificultad",
                    value: question.difficulty,
                    inline: true,
                },
                {
                    name: "Likes",
                    value: `${question.likes}`,
                    inline: true,
                },
                {
                    name: "Premium",
                    value: question.isPaidOnly ? "Si" : "No",
                    inline: true,
                },
            )
            .setThumbnail(
                "https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png",
            )
            .setFooter({
                text: "LeetCode Daily Challenge",
            });

        await interaction.reply({
            embeds: [embed],
        });
    },
};
