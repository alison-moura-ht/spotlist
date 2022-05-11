import config from "./../config.js"
const clientId = config.clientId
const redirectUri = config.redirectUri

function login() {
    location.href = `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=playlist-read-collaborative playlist-read-private`
}

document.getElementById("btnEntrar").onclick = login