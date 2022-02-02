const clientID = 'b12793596ba64623ae4c47a3b3c95014';
const redirectURI = 'http://localhost:3000/';

// localStorage.setItem(stateKey, state);
// var scope = 'user-read-private user-read-email';

var spotifyUrl = 'https://accounts.spotify.com/authorize';
spotifyUrl += '?response_type=token';
spotifyUrl += '&client_id=' + encodeURIComponent(clientID);
// spotifyUrl += '&scope=' + encodeURIComponent(scope);
spotifyUrl += '&redirect_uri=' + encodeURIComponent(redirectURI);
// spotifyUrl += '&state=' + encodeURIComponent(state);
console.log(spotifyUrl);
//
// const spotifyToken = 'BQDdHxpw62XitA3LbFAul6j1n3spChc7Bu4rtsR76CGOII3qYiCjyYwvSiYvO7R9eU_XqjqcCez6JlWMKIsM_vU3aOoLsg6QGj5fIk_B_S0O_4SyhR11va32H4CarQ2_ut8eeqqeOGMHrGNB3d4';
//
// console.log(`Bearer ${spotifyToken}`);
//
// const resource = 'https://api.spotify.com/v1/me';
// const settings = {
//     method: 'GET',
//     headers: {
//         'Authorization': `Bearer ${spotifyToken}`
//     }
// }
//
// const spotifyData = fetch(resource, settings).then(response => {
//     response.json().then(data => {
//         console.log(data)
//     });
// });
//
// const spotifyData = () => {
//
//     const spotifyToken = 'BQDdHxpw62XitA3LbFAul6j1n3spChc7Bu4rtsR76CGOII3qYiCjyYwvSiYvO7R9eU_XqjqcCez6JlWMKIsM_vU3aOoLsg6QGj5fIk_B_S0O_4SyhR11va32H4CarQ2_ut8eeqqeOGMHrGNB3d4';
//     const resource = 'https://api.spotify.com/v1/me';
//     const settings = {
//         method: 'GET',
//         headers: {
//             'Authorization': `Bearer ${spotifyToken}`
//         }
//     }
//
//     fetch(resource, settings)
//     .then(response => response.json())
//     .then(result => return result.display_name);
//
// }
//
export default spotifyUrl;
