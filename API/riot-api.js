const axios = require('axios');

module.exports = async (region, requestPath) => {
  const data = await axios({
    method: 'GET',
    url: `https://${region}.api.riotgames.com${requestPath}`,
    headers: {
      'X-Riot-Token': process.env.RIOT_API_KEY,
    },
  });
  return data.data;
};
