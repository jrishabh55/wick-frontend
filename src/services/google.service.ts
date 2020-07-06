export const scope = [
  'https://www.googleapis.com/auth/youtube',
  'https://www.googleapis.com/auth/youtube.force-ssl',
  'https://www.googleapis.com/auth/youtube.readonly',
  'https://www.googleapis.com/auth/youtubepartner-channel-audit',
].join(' ');

export let GoogleAuth: gapi.auth2.GoogleAuth;

export const initAuthClient = async () => {
  await (new Promise((resolve, reject) => gapi.load('client:auth2', resolve)));
  gapi.client.setApiKey(process.env.REACT_APP_GOOGLE_API_KEY as string);

  await gapi.client.init({
      scope,
      apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
      clientId: process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID,
      discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest']
  });

  GoogleAuth = gapi.auth2.getAuthInstance();
  return GoogleAuth as Omit<gapi.auth2.GoogleAuth, "then">;
}

