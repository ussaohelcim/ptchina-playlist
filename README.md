# ptchina-playlist
Bookmarklet para salvar um fio do ptchina como playlist .m3u

# Como usar

- copie isso
```
javascript: (() => {"use strict";function getFio(){return __awaiter(this,void 0,void 0,function*(){let t=window.location.href;return t=t.replace(".html",".json"),yield fetch(t).then(t=>__awaiter(this,void 0,void 0,function*(){const e=yield t.json();return e}))})}function getMedia(t){var e;return __awaiter(this,void 0,void 0,function*(){const n=[".mp4",".mp3",".webm"],i=[];let o=window.location.href;o=o.replace(".html",".json"),null===(e=t.files)||void 0===e||e.forEach(t=>{n.includes(t.extension)&&i.push(t)});for(let e=0;e<t.replies.length;e++){const o=t.replies[e].files;null==o||o.forEach(t=>{n.includes(t.extension)&&i.push(t)})}return i})}function createPlaylist(t,e){const n=[];n.push("#EXTM3U");for(let t=0;t<e.length;t++){const i=e[t];n.push(`#EXTINF:${i.duration}, ${i.originalFilename}`),n.push(`https://ptchan.org/file/${i.filename}`)}let i=n.join("\n");baixarPlaylist(t,i)}function baixarPlaylist(t,e){const n=new Blob([e],{type:"application/mpegurl"}),i=window.URL.createObjectURL(n),o=document.createElement("a");o.href=i,o.target="_blank",o.download=t,o.style.display="none",document.body.appendChild(o),o.click(),document.body.removeChild(o)}var __awaiter=this&&this.__awaiter||function(t,e,n,i){function o(t){return t instanceof n?t:new n(function(e){e(t)})}return new(n||(n=Promise))(function(n,a){function l(t){try{c(i.next(t))}catch(t){a(t)}}function r(t){try{c(i.throw(t))}catch(t){a(t)}}function c(t){t.done?n(t.value):o(t.value).then(l,r)}c((i=i.apply(t,e||[])).next())})};getFio().then(t=>{getMedia(t).then(e=>{createPlaylist(`${t.board}-${t.postId}.m3u`,e)})});})();
```
- crie um bookmark/favorito
- cole o script no campo de url
- vá até um fio de musiquinhas do ptchina
- clique no bookmark/favorito que você criou
- vai ser baixado um arquivo `.m3u`
- abra esse arquivo utilizando o vlc, ou outro programa que suporte `.m3u`  

Enjoe ouvir as musiquinhas do fio como se você tivesse ouvindo uma radio.
