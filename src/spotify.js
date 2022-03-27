const clientID = 'b12793596ba64623ae4c47a3b3c95014';
const redirectURI = 'http://localhost:3000/';
const scope = 'playlist-modify-public';

var spotifyUrl = 'https://accounts.spotify.com/authorize';
spotifyUrl += '?response_type=token';
spotifyUrl += '&client_id=' + encodeURIComponent(clientID);
spotifyUrl += '&scope=' + encodeURIComponent(scope);
spotifyUrl += '&redirect_uri=' + encodeURIComponent(redirectURI);
console.log('With scope: ' + spotifyUrl);

var spotifyUrl2 = 'https://accounts.spotify.com/authorize';
spotifyUrl2 += '?response_type=token';
spotifyUrl2 += '&client_id=' + encodeURIComponent(clientID);
// spotifyUrl2 += '&scope=' + encodeURIComponent(scope);
spotifyUrl2 += '&redirect_uri=' + encodeURIComponent(redirectURI);
console.log('No scope: ' + spotifyUrl2);

export default spotifyUrl;
