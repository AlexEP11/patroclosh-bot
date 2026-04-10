import { ColorResolvable, RGBTuple } from "discord.js";

export type Difficulty = "Easy" | "Medium" | "Hard";

export const difficultyColors: Record<Difficulty, ColorResolvable> = {
    Easy: "Green",
    Medium: "Orange",
    Hard: "Red",
};
