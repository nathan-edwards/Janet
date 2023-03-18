import dotent from "dotenv";
import axios from "axios";
dotent.config();
export default async function (region, requestPath) {
    const options = {
        method: "GET",
        url: `https://${region}.api.riotgames.com${requestPath}`,
        headers: { "X-Riot-Token": process.env.RIOT_API_KEY },
    };
    try {
        const response = await axios
            .request(options);
        return response.data;
    }
    catch (error) {
        console.error(error);
    }
}
//# sourceMappingURL=RiotAPI.js.map