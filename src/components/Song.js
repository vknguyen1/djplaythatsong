import axios from 'axios';

async function getSongInfo(songId, accessToken) {
  try {
    // Get the audio features for the song
    const featuresResponse = await axios.get(
      `https://api.spotify.com/v1/audio-features/${songId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    const key = featuresResponse.data.key;
    const tempo = featuresResponse.data.tempo;

    // Get the related artists for the song
    const artistsResponse = await axios.get(
      `https://api.spotify.com/v1/artists/${songId}/related-artists`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    const relatedArtists = artistsResponse.data.artists;

    return { key, tempo, relatedArtists };
  } catch (error) {
    console.error(error);
  }
}

export default getSongInfo;
