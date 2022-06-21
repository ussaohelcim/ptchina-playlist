# ptchina-playlist
Bookmarklet para salvar um fio do ptchina como playlist .m3u

# Como usar

- copie isso
```
javascript: (() => {"use strict";function getFio(){return __awaiter(this,void 0,void 0,function*(){let e=window.location.href;return e=e.replace(".html",".json"),yield fetch(e).then(e=>__awaiter(this,void 0,void 0,function*(){const t=yield e.json();return t}))})}function getMedia(e){var t;return __awaiter(this,void 0,void 0,function*(){const n=[".mp4",".mp3",".webm"],i=[];let o=window.location.href;o=o.replace(".html",".json"),null===(t=e.files)||void 0===t||t.forEach(e=>{n.includes(e.extension)&&i.push(e)});for(let t=0;t<e.replies.length;t++){const o=e.replies[t].files;null==o||o.forEach(e=>{n.includes(e.extension)&&i.push(e)})}return i})}function createPlaylist(e,t){const n=[];n.push("#EXTM3U");for(let e=0;e<t.length;e++){const i=t[e];n.push(`#EXTINF:${i.duration}, ${i.originalFilename}`),n.push(`${location.origin}/file/${i.filename}`)}let i=n.join("\n");baixarPlaylist(e,i)}function baixarPlaylist(e,t){const n=new Blob([t],{type:"application/mpegurl"}),i=window.URL.createObjectURL(n),o=document.createElement("a");o.href=i,o.target="_blank",o.download=e,o.style.display="none",document.body.appendChild(o),o.click(),document.body.removeChild(o)}var __awaiter=this&&this.__awaiter||function(e,t,n,i){function o(e){return e instanceof n?e:new n(function(t){t(e)})}return new(n||(n=Promise))(function(n,a){function l(e){try{c(i.next(e))}catch(e){a(e)}}function r(e){try{c(i.throw(e))}catch(e){a(e)}}function c(e){e.done?n(e.value):o(e.value).then(l,r)}c((i=i.apply(e,t||[])).next())})};getFio().then(e=>{getMedia(e).then(t=>{createPlaylist(`${e.board}-${e.postId}.m3u`,t)})});})();
```
- crie um bookmark/favorito
- cole o script no campo de url
- vá até um fio de musiquinhas do ptchina
- clique no bookmark/favorito que você criou
- vai ser baixado um arquivo `.m3u`
- abra esse arquivo utilizando o vlc, ou outro programa que suporte `.m3u`  

Enjoe ouvir as musiquinhas do fio como se você tivesse ouvindo uma radio.
