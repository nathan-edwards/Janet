import Janet from "./Janet.js";
import { ApplicationCommandOption, PermissionResolvable } from "discord.js";
export default class Command {
    client: Janet;
    name: string;
    nameLocalizations: any;
    description: {
        content: string | null;
        usage: string | null;
        examples: string[] | null;
    };
    descriptionLocalizations: any | null;
    aliases: string[];
    cooldown: number;
    args: boolean;
    player: {
        voice: boolean;
        dj: boolean;
        active: boolean;
        djPerm: string | null;
    };
    permissions: {
        dev: boolean;
        client: string[] | PermissionResolvable;
        user: string[] | PermissionResolvable;
    };
    slashCommand: boolean;
    options: ApplicationCommandOption[];
    category: string | null;
    constructor(client: Janet, options: CommandOptions);
    run(client: Janet, message: any, args: string[]): Promise<void>;
}
interface CommandOptions {
    name: string;
    nameLocalizations?: any;
    description?: {
        content: string;
        usage: string;
        examples: string[];
    };
    descriptionLocalizations?: any;
    aliases?: string[];
    cooldown?: number;
    args?: boolean;
    player?: {
        voice: boolean;
        dj: boolean;
        active: boolean;
        djPerm: string | null;
    };
    permissions?: {
        dev: boolean;
        client: string[] | PermissionResolvable;
        user: string[] | PermissionResolvable;
    };
    slashCommand?: boolean;
    options?: ApplicationCommandOption[];
    category?: string;
}
export {};
