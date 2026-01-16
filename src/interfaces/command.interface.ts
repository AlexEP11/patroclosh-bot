import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

export interface CommandI {
    data: SlashCommandBuilder;
    execute: (interaction: ChatInputCommandInteraction) => Promise<void>;
}
