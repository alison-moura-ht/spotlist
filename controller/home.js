import {
  pegarToken,
  pegarPerfilUsuario,
  pegarPlaylists,
  criarPlaylist
} from "./../service/spotify-service.js";
const linkNoImage = "https://fl-1.cdn.flockler.com/embed/no-image.svg"
let usuarioLogado = {};
let playlists = [];

async function setup() {
  try {
    const params = new URLSearchParams(location.search);
    const code = params.get("code");
    await pegarToken(code);
    usuarioLogado = await pegarPerfilUsuario();
    mostrarUsuario();
    mostrarPlaylists();
  } catch (error) {
    console.log(error);
    alert(error.message);
  }
}

function mostrarUsuario() {
  document.getElementById(
    "titulo"
  ).innerHTML = `Seja bem-vind@ ${usuarioLogado.nome}`;
}

async function mostrarPlaylists() {
  playlists = await pegarPlaylists();
  let sectionPlaylist = document.getElementById("sectionPlaylist");
  console.log(playlists);
  sectionPlaylist.innerHTML = "";
  for (let item of playlists) {
    sectionPlaylist.innerHTML += `
        <div class="col s12 m6 l4">
            <div class="card grey darken-3 waves-effect waves-light">
                <div class="card-image">
                    <img src="${ item.images[0] ? item.images[0].url : linkNoImage }">
                    <span class="card-title">${ item.name }</span>
                </div>
                <div class="card-content white-text">
                    <p>${ item.description }</p>
                </div>
            </div>
        </div>
        `;
  }
}

async function cadastrarPlaylist() {
  // Acessando a instância do modal
  const modal = M.Modal.getInstance(document.querySelector(".modal"));
  
  // Montando objeto da playlist
  const playlist = {}
  playlist.name = document.getElementById("inputNome").value
  playlist.description = document.getElementById("inputDescricao").value
  playlist.collaborative = document.getElementById("checkboxColaborativa").checked
  playlist.public = document.getElementById("checkboxPublica").checked

  if(playlistValida(playlist)) {
    await criarPlaylist(playlist)
    mostrarPlaylists()
    modal.close()
  }

}

function playlistValida(playlist) {
  let erros = []
  if(!playlist.name) erros.push("O nome é obrigatório")
  if(!playlist.description) erros.push("A descrição é obrigatória")
  if(playlist.public && playlist.collaborative) erros.push("Playlist colaborativa, não pode ser pública")
  
  if(erros.length > 0) {
    alert(erros)
    return false
  }
  else return true
}

function checkboxPublica() {
  if(document.getElementById("checkboxPublica").checked) {
    document.getElementById("checkboxColaborativa").checked = false
    document.getElementById("checkboxColaborativa").disabled = true
  } else {
    document.getElementById("checkboxColaborativa").disabled = false
  }
}

document.body.onload = setup;
document.getElementById("btnSalvar").onclick = cadastrarPlaylist
document.getElementById("checkboxPublica").onclick = checkboxPublica
