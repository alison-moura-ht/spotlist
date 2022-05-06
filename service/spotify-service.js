const redirectUri = "http://localhost:5500/home.html"
const clientId = "331dc5e3b64e4904a0e9b4be3c114d59"
const clientSecret = "aa49476a627240e58374b82c08e18f28"
const usuarioLogado = {}
let accessToken
let refreshToken
let expiresIn
let tokenExpirado = false

export async function pegarToken(code) {
    refreshToken = sessionStorage.getItem("refresh_token")
    if(refreshToken) return atualizarToken()

    const body = {
        grant_type: "authorization_code",
        code: code,
        redirect_uri: redirectUri 
    }
    try {
        const resposta = await fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            body: new URLSearchParams(Object.entries(body)).toString(),
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: `Basic ${btoa(clientId + ":" + clientSecret)}`
            }
        })
        const dadoResposta = await resposta.json()
        accessToken = dadoResposta.access_token
        refreshToken = dadoResposta.refresh_token
        expiresIn = dadoResposta.expires_in
        sessionStorage.setItem("refresh_token", refreshToken)

        setTimeout(() => {
            tokenExpirado = true
        }, expiresIn)

    } catch (error) {
        throw error
    }
}

async function atualizarToken() {
    const body = {
        grant_type: "refresh_token",
        refresh_token: refreshToken
    }
    try {
        const resposta = await fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            body: new URLSearchParams(Object.entries(body)).toString(),
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: `Basic ${btoa(clientId + ":" + clientSecret)}`
            }
        })
        const dadoResposta = await resposta.json()
        accessToken = dadoResposta.access_token
        expiresIn = dadoResposta.expires_in
        tokenExpirado = false

        setTimeout(() => {
            tokenExpirado = true
        }, expiresIn)

    } catch (error) {
        throw error
    }
}

export async function pegarPerfilUsuario() {
    if(tokenExpirado) await atualizarToken()
    try {
        const resposta = await fetch("https://api.spotify.com/v1/me", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`
            }
        })
        const dadoResposta = await resposta.json()
        usuarioLogado.nome = dadoResposta.display_name
        usuarioLogado.email = dadoResposta.email
        usuarioLogado.id = dadoResposta.id
        return usuarioLogado
    } catch (error) {
        throw error
    }
}

export async function pegarPlaylists() {
    if(tokenExpirado) await atualizarToken()
    try {
        const resposta = await fetch("https://api.spotify.com/v1/me/playlists", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`
            }
        })
        const dadoResposta = await resposta.json()
        return dadoResposta.items
    } catch (error) {
        throw error
    }
}

export async function criarPlaylist(playlist) {
    if(tokenExpirado) await atualizarToken()
    try {
        const resposta = await fetch(`https://api.spotify.com/v1/users/${usuarioLogado.id}/playlists`, {
            method: "POST",
            body: JSON.stringify(playlist),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`
            }
        })
        const dadoResposta = await resposta.json()
        console.log(dadoResposta);
    } catch (error) {
        throw error
    }
}