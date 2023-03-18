import { ApplicationCommandOptionType } from "discord.js";
import { Command, Janet, Context } from "../../structures/index.js";
import RiotAPI from "../../api/RiotAPI.js";
import assets from "../../assets.js";
import moment from "moment";

// Todo - Add a way to delete duplicate events
export default class ClashEvent extends Command {
	constructor(client: Janet) {
		super(client, {
			name: "clashevent",
			description: {
				content: "Created Scheduled Events for Clash",
				examples: ["clashevent EUW", "clashevent LA1"],
				usage: "clashevent <region>",
			},
			category: "riot",
			aliases: ["ce"],
			cooldown: 3,
			args: true,
			player: {
				voice: false,
				dj: false,
				active: false,
				djPerm: null,
			},
			permissions: {
				dev: false,
				client: ["SendMessages", "ViewChannel", "EmbedLinks", "ManageEvents"],
				user: ["ManageEvents"],
			},
			slashCommand: true,
			options: [
				{
					name: "region",
					description: "The region you want to get events for",
					type: ApplicationCommandOptionType.String,
					required: true,
					choices: [
						{ name: "BR", value: "br1" },
						{ name: "EUN", value: "eun1" },
						{ name: "EUW", value: "euw1" },
						{ name: "JP", value: "jp1" },
						{ name: "KR", value: "kr" },
						{ name: "LA1", value: "la1" },
						{ name: "LA2", value: "la2" },
						{ name: "NA", value: "na1" },
						{ name: "OC", value: "oc1" },
						{ name: "TR", value: "tr1" },
						{ name: "RU", value: "ru" },
					],
				},
			],
		});
	}

	public async run(client: Janet, ctx: Context, args: string[]) {
		const embed = this.client.embed();
		const data: any = await RiotAPI(args[0], "/lol/clash/v1/tournaments")
		for (let i = 0; i < data.length; i++) {
			for (let j = 0; j < data.length - i - 1; j++) {
				if (
					data[j + 1].schedule[0].startTime < data[j].schedule[0].startTime
				) {
					[data[j + 1], data[j]] = [data[j], data[j + 1]];
				}
			}
		}

		function titleCase(s: string) {
			return s
				.toLowerCase()
				.split(" ")
				.map((word) => word.charAt(0).toUpperCase() + word.substring(1))
				.join(" ");
		}

		const removeUnderscore = (s: string) => {
			if (typeof s !== "string") return "";
			return s.replace("_", " ");
		};

		function checkForArt(nameKey: string) {
			var checkForArt = assets.clashArt.find(obj => {
				return obj.name === nameKey
			});
			var art: string;
			if (checkForArt === undefined) {
				art = assets.clashArt[0].url;
			} else {
				art = checkForArt.url;
			}
			return art;
		}

		function createEvents(data: any) {
			for (let i = 0; i < data.length; i++) {
				ctx.guild.scheduledEvents.create({
					name: "Clash: " + titleCase(removeUnderscore(data[i].nameKey)) + " Cup " + titleCase(removeUnderscore(data[i].nameKeySecondary.replace("_", " "))),
					entityType: 3,
					entityMetadata: { location: "Summoner's Rift" },
					scheduledStartTime: moment(data[i].schedule[0].registrationTime).format(),
					scheduledEndTime: moment(data[i].schedule[0].startTime).format(),
					privacyLevel: 2,
					image: checkForArt(data[i].nameKey),
				})
			}
		}

		await ctx.sendMessage({
			embeds: [
				embed
					.setDescription(`Creating ${data.length} Event...`)
					.setColor(client.color.green),
			]
		});
		createEvents(data);
		return ctx.editMessage({
			embeds: [
				embed
					.setDescription(`${data.length} Events Created`)
					.setColor(client.color.green),
			]
		});
	}
}
