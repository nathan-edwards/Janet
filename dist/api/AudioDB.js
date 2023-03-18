import axios from "axios";
export default async function (artist, track) {
    const options = {
        method: 'GET',
        url: 'https://theaudiodb.p.rapidapi.com/searchtrack.php',
        params: { s: artist, t: track },
        headers: {
            'X-RapidAPI-Key': '2535964012mshd889dbc897cff15p1a6aa7jsn87020cc1dbbd',
            'X-RapidAPI-Host': 'theaudiodb.p.rapidapi.com'
        }
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
//# sourceMappingURL=AudioDB.js.map