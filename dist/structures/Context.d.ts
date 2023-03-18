import { CommandInteraction, GuildMemberResolvable, Message, APIInteractionGuildMember, Guild, GuildMember, TextChannel, GuildChannel, User } from "discord.js";
import { Janet } from "./index.js";
export default class Context {
    ctx: CommandInteraction | Message;
    isInteraction: boolean;
    interaction: CommandInteraction | null;
    message: Message | null;
    id: string;
    channelId: string;
    client: Janet;
    author: User | null;
    channel: GuildChannel | TextChannel | null;
    guild: Guild | null;
    createdAt: Date;
    createdTimestamp: number;
    member: GuildMemberResolvable | GuildMember | APIInteractionGuildMember | null;
    args: any[];
    msg: any;
    constructor(ctx: any, args: any);
    setArgs(args: any[]): void;
    sendMessage(content: any): Promise<any>;
    editMessage(content: any): Promise<any>;
    sendDeferMessage(content: any): Promise<any>;
    sendFollowUp(content: any): Promise<void>;
    get deferred(): boolean;
}
