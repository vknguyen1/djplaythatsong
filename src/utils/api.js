// api.js

import axios from 'axios';

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;

async function getAccessToken() {
  try {
    const response = await axios.post(
      'https://accounts.spotify.com/api/token',
      {
        grant_type: 'client_credentials',
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
      },
    );
    const accessToken = response.data.access_token;
    return accessToken;
  } catch (error) {
    console.error(error);
  }
}

async function getTopTracks() {
  try {
    const accessToken = await getAccessToken();
    const response = await axios.get(
      'https://api.spotify.com/v1/me/top/tracks',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    const topTracks = response.data.items;
    return topTracks;
  } catch (error) {
    console.error(error);
  }
}

export { getAccessToken, getTopTracks };
