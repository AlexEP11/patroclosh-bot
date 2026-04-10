import { EmbedBuilder } from "@discordjs/builders";
import { leetcode } from "configs/bot.config";
import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

export default {
    data: new SlashCommandBuilder()
        .setName("leetcode")
        .setDescription("Give a random leetcode problem")
        .addStringOption((option) =>
            option
                .setName("category")
                .setDescription("Select the leetcode problem category")
                .addChoices(
                    { name: "Algorithms", value: "Algorithms" },
                    { name: "Database", value: "Database" },
                    { name: "Shell", value: "Shell" },
                    { name: "Concurrency", value: "Concurrency" },
                    { name: "JavaScript", value: "JavaScript" },
                    { name: "Pandas", value: "pandas" },
                )
                .setRequired(true),
        )
        .addStringOption((option) =>
            option
                .setName("difficulty")
                .setDescription("Select difficulty problem")
                .addChoices(
                    { name: "Easy", value: "EASY" },
                    { name: "Medium", value: "MEDIUM" },
                    { name: "Hard", value: "HARD" },
                )
                .setRequired(true),
        ),

    async execute(interaction: ChatInputCommandInteraction) {
        const category = interaction.options.getString("category", true);
        const difficulty = interaction.options.getString("difficulty", true) as
            | "EASY"
            | "MEDIUM"
            | "HARD";

        if (
            difficulty === "HARD" &&
            (category === "Shell" || category === "Concurrency")
        ) {
            return interaction.reply({
                content:
                    "La categoría **Shell** y **Concurrency** no tienen problemas HARD.",
            });
        }

        const { questions } = await leetcode.problems({
            category,
            filters: {
                difficulty,
            },
        });

        const randomIndex = Math.floor(Math.random() * questions.length);
        const problem = questions[randomIndex];

        if (!problem) {
            return await interaction.reply({
                content:
                    "Hubo un error al tratar de conseguir el ejercicio de leetcode, intentalo mas tarde",
            });
        }

        const url = `https://leetcode.com/problems/${problem.titleSlug}`;

        const embed = new EmbedBuilder()
            .setTitle(`${problem.title}`)
            .setURL(url)
            .setDescription(
                `Porcentaje de aceptación: **${problem.acRate.toFixed(2)} %**`,
            )
            .addFields(
                {
                    name: "Dificultad",
                    value: problem.difficulty,
                    inline: true,
                },
                {
                    name: "Premium",
                    value: problem.isPaidOnly ? "Si" : "No",
                    inline: true,
                },
            )
            .setColor(0xffa500)
            .setThumbnail(
                "https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png",
            )
            .setFooter({
                text: `No. ${problem.questionFrontendId}`,
            });

        await interaction.reply({
            embeds: [embed],
        });
    },
};
