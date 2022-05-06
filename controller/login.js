const clientId = "331dc5e3b64e4904a0e9b4be3c114d59"
const redirectUri = "http://localhost:5500/home.html"

function login() {
    location.href = `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=playlist-read-collaborative playlist-read-private`
}

document.getElementById("btnEntrar").onclick = login