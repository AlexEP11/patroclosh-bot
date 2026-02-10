import chalk from "chalk";

export class Logger {
    private static timestamp(): string {
        const now = new Date();

        const day = now.getUTCDate().toString().padStart(2, "0");
        const month = now.toLocaleString("en-US", {
            month: "short",
            timeZone: "UTC",
        });
        const year = now.getUTCFullYear();

        const hours = now.getUTCHours().toString().padStart(2, "0");
        const minutes = now.getUTCMinutes().toString().padStart(2, "0");
        const seconds = now.getUTCSeconds().toString().padStart(2, "0");

        const offset = "+0000"; // UTC

        return `${day}/${month}/${year}:${hours}:${minutes}:${seconds} ${offset}`;
    }

    static info(message: string) {
        console.log(
            chalk.cyan(`[${this.timestamp()}] | [INFO]    | ${message}`),
        );
    }

    static success(message: string) {
        console.log(
            chalk.green(`[${this.timestamp()}] | [SUCCESS] | ${message}`),
        );
    }

    static warn(message: string) {
        console.log(
            chalk.yellow(`[${this.timestamp()}] | [WARNING] | ${message}`),
        );
    }

    static error(error: unknown) {
        if (error instanceof Error) {
            console.error(
                chalk.red(
                    `[${this.timestamp()}] | [ERROR]   | ${error.message}`,
                ),
            );
            console.error(
                chalk.red(`[${this.timestamp()}] | [ERROR]   | ${error.stack}`),
            );
        } else {
            console.error(
                chalk.red(
                    `[${this.timestamp()}] | [ERROR]   | ${String(error)}`,
                ),
            );
        }
    }
}
