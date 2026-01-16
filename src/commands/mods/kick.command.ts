import { Logger } from "configs/Logger";
import {
    ChatInputCommandInteraction,
    PermissionFlagsBits,
    SlashCommandBuilder,
} from "discord.js";

export default {
    data: new SlashCommandBuilder()
        .setName("kick")
        .setDescription("Select a member and kick them.")
        .addUserOption((option) =>
            option
                .setName("user")
                .setDescription("User to kick.")
                .setRequired(true)
        )
        .addStringOption((option) =>
            option.setName("reason").setDescription("The reason for kicking.")
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),

    async execute(interaction: ChatInputCommandInteraction) {
        const user = interaction.options.getUser("user", true);

        const member = await interaction.guild?.members
            .fetch(user.id)
            .catch((error) => Logger.error(error));

        if (!member) {
            return interaction.reply({
                content: "That user is not in this server.",
                ephemeral: true,
            });
        }

        if (member.id === interaction.user.id) {
            return interaction.reply({
                content: "You can't kick yourself.",
                ephemeral: true,
            });
        }

        if (member.id === interaction.guild?.ownerId) {
            return interaction.reply({
                content: "You can't kick the server owner.",
                ephemeral: true,
            });
        }

        // if (member.roles.highest.position >= interaction.member) {
        //     return interaction.reply({
        //         content:
        //             "You can't kick this member due to role hierarchy.",
        //         ephemeral: true,
        //     });
        // }

        await member.kick("Kicked via /kick command");

        return interaction.reply({
            content: `**${user.tag}** has been kicked.`,
        });
    },
};
