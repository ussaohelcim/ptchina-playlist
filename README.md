# ptchina-playlist
Bookmarklet para salvar um fio do ptchina como playlist .m3u

# Como usar

- copie isso
```javascript
javascript:(()=>{"use strict";async function getFio() {let link = window.location.href;link = link.replace(".html", ".json");return await fetch(link).then(async (res) => {const fio = await res.json();return fio;});}async function getMedia(fio) {const fileTypes = [".mp4", ".mp3", ".webm"];const files = [];let link = window.location.href;link = link.replace(".html", ".json");fio.files?.forEach((f) => {if (fileTypes.includes(f.extension)) {files.push(f);}});for (let i = 0; i < fio.replies.length; i++) {const element = fio.replies[i].files;element?.forEach((f) => {if (fileTypes.includes(f.extension)) {files.push(f);}});}return files;}function createPlaylist(filename, medias) {const lines = [];lines.push("#EXTM3U");for (let i = 0; i < medias.length; i++) {const media = medias[i];lines.push(`#EXTINF:${media.duration}, ${media.originalFilename}`);lines.push(`${location.origin}/file/${media.filename}`);}let playlist = lines.join("\n");baixarPlaylist(filename, playlist);}function baixarPlaylist(filename, playlist) {const blob = new Blob([playlist], { type: "application/mpegurl" });const url = window.URL.createObjectURL(blob);const a = document.createElement('a');a.href = url;a.target = "_blank";a.download = filename;a.style.display = "none";document.body.appendChild(a);a.click();document.body.removeChild(a);}getFio().then((fio) => {getMedia(fio).then((files) => {createPlaylist(`${fio.board}-${fio.postId}.m3u`, files);});});})();
```
- crie um bookmark/favorito
- cole o script no campo de url
- vá até um fio de musiquinhas do ptchina
- clique no bookmark/favorito que você criou
- vai ser baixado um arquivo `.m3u`
- abra esse arquivo utilizando o vlc, ou outro programa que suporte `.m3u`  

Enjoe ouvir as musiquinhas do fio como se você tivesse ouvindo uma radio.
