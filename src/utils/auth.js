const REDIRECT_URI = 'http://localhost:3000/callback/';
const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';
const CLIENT_ID = 'd9f91a067c2948fd9abaedbe38baa1f6';
const CLIENT_SECRET = 'd36715cde51c4616929a20124cea56a3';
const AUTHORIZE_ENDPOINT = 'https://accounts.spotify.com/authorize';
const SCOPES = ['user-read-currently-playing', 'user-read-playback-state,'];

const authorize = () => {
  window.location.href = `${AUTHORIZE_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPES.join(
    '%20',
  )}&response_type=code`;
};

const getToken = async (code) => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`,
    },
    body: `grant_type=authorization_code&code=${code}&redirect_uri=${REDIRECT_URI}`,
  });

  const data = await response.json();
  return data.access_token;
};

export { authorize, getToken };
