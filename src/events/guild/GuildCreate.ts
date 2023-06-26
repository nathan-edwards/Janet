import { Event, Janet, Context } from "../../structures/index.js";


export default class GuildCreate extends Event {
    constructor(client: Janet, file: string) {
        super(client, file, {
            name: "guildCreate",
        });
    }
    public async run(ctx: Context): Promise<void> {
        const data = await this.client.prisma.guild.findUnique({ where: { guildId: ctx.guild.id } });
        if (!data) {
            await this.client.prisma.guild.create({ data: { guildId: ctx.guild.id } });
        }
    }
}
