import { Collection } from "discord.js";
import { CommandI } from "interfaces/command.interface";

declare module "discord.js" {
    interface Client {
        commands: Collection<string, CommandI>;
    }
}
