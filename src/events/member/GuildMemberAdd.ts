import { Event, Janet } from "../../structures/index.js";
import { ChannelType, GuildMember } from "discord.js";


export default class GuildMemberAdd extends Event {
  constructor(client: Janet, file: string) {
    super(client, file, {
      name: "guildMemberAdd",
    });
  }
  public async run(member: GuildMember): Promise<void> {
    const data = await this.client.prisma.guild.findUnique({ where: { guildId: member.guild.id } });
    if (!data) return;
    const channel = member.guild.channels.cache.get(data.welcomeChannel);
    if (!channel) return;
    if (channel.type !== ChannelType.GuildText) return;
    const message = "Welcome to the server, <@" + member.user.id + ">!";
    channel.send({ content: message });
  }
}
