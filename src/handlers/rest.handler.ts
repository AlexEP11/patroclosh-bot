import { REST } from "discord.js";
import { env } from "configs/env.config";

export const rest = new REST().setToken(env.TOKEN);
