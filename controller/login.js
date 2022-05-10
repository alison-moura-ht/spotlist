const clientId = "5328f1d9f94f4f3db8cdb38d073f0b12"
const redirectUri = "https://alison-moura-ht.github.io/spotlist-t36/home.html"

function login() {
    location.href = `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=playlist-read-collaborative playlist-read-private`
}

document.getElementById("btnEntrar").onclick = login