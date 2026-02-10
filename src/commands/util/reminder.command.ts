import { Logger } from "configs/Logger";
import {
    ChatInputCommandInteraction,
    EmbedBuilder,
    SlashCommandBuilder,
} from "discord.js";

export default {
    data: new SlashCommandBuilder()
        .setName("reminder")
        .setDescription("Create a reminder")
        .addNumberOption((option) =>
            option
                .setName("minutes")
                .setDescription("The reminder time.")
                .setRequired(true)
                .setMinValue(1)
                .setMaxValue(120),
        )
        .addStringOption((option) =>
            option
                .setName("task")
                .setDescription("The reminder description.")
                .setRequired(true),
        ),

    async execute(interaction: ChatInputCommandInteraction) {
        const minutes = interaction.options.getNumber("minutes", true);
        const task = interaction.options.getString("task", true);

        await interaction.reply({
            content: `Te enviaré un mensaje privado en ${minutes} ${minutes > 1 ? "minutos" : "minuto"}.`,
        });
        Logger.info(`Task: ${task} from user: ${interaction.user.username}`);

        setTimeout(
            async () => {
                try {
                    const embed = new EmbedBuilder()
                        .setTitle("Recordatorio")
                        .setThumbnail(interaction.user.avatarURL())
                        .setDescription(task)
                        .setTimestamp()
                        .setColor("Random");

                    await interaction.user.send({
                        embeds: [embed],
                    });

                    Logger.success(
                        `Task deliveried succesfully to user: ${interaction.user.username}`,
                    );
                } catch (error) {
                    Logger.error(error);
                }
            },
            60 * 1000 * Number(minutes),
        );
    },
};
