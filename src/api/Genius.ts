import axios from "axios";

export async function searchSong(track: string) {
    const options = {
        method: 'GET',
        url: 'https://genius-song-lyrics1.p.rapidapi.com/search/',
        params: { q: track, per_page: '10', page: '1' },
        headers: {
            'X-RapidAPI-Key': '2535964012mshd889dbc897cff15p1a6aa7jsn87020cc1dbbd',
            'X-RapidAPI-Host': 'genius-song-lyrics1.p.rapidapi.com'
        }
    };

    try {
        const response = await axios
            .request(options);
        return response.data.hits;
    } catch (error) {
        console.error(error);
    }
}

export async function getLyrics(id: number) {
    const options = {
        method: 'GET',
        url: 'https://genius-song-lyrics1.p.rapidapi.com/song/lyrics/',
        params: { id: id },
        headers: {
            'X-RapidAPI-Key': '2535964012mshd889dbc897cff15p1a6aa7jsn87020cc1dbbd',
            'X-RapidAPI-Host': 'genius-song-lyrics1.p.rapidapi.com'
        }
    };

    try {
        const response = await axios
            .request(options);
        return response.data.lyrics.lyrics.body.plain;
    } catch (error) {
        console.error(error);
    }
}