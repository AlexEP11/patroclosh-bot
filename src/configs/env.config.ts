import { get } from "env-var";
import "dotenv/config";

export const env = {
    TOKEN: get("TOKEN").required().asString(),
    CLIENT_ID: get("CLIENT_ID").required().asString(),
    GUILD_ID: get("GUILD_ID").required().asString(),
    CK: get("CK").required().asString(),
};
