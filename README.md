# ptchina-playlist

[Bookmarklet](https://en.wikipedia.org/wiki/Bookmarklet) to download a thread as a `.m3u` playlist 

# How to use

- copy this script:
```javascript
javascript:(()=>{"use strict";async function threadToPlaylist() {async function getThread() {let link = window.location.href;link = link.replace(".html", ".json");return await fetch(link).then(async (res) => {const fio = await res.json();return fio;});}async function getMedia(thread) {const fileTypes = [".mp4", ".mp3", ".webm"];const files = [];thread.files?.forEach((f) => {if (fileTypes.includes(f.extension)) {files.push(f);}});for (let i = 0; i < thread.replies.length; i++) {const element = thread.replies[i].files;element?.forEach((f) => {if (fileTypes.includes(f.extension)) {files.push(f);}});}return files;}function createPlaylist(medias) {const lines = [];lines.push("#EXTM3U");for (let i = 0; i < medias.length; i++) {const media = medias[i];lines.push(`#EXTINF:${media.duration}, ${media.originalFilename}`);lines.push(`${location.origin}/file/${media.filename}`);}let playlist = lines.join("\n");return playlist;}function downloadPlaylist(filename, playlist) {const blob = new Blob([playlist], { type: "application/mpegurl" });const url = window.URL.createObjectURL(blob);const a = document.createElement('a');a.href = url;a.target = "_blank";a.download = filename;a.style.display = "none";document.body.appendChild(a);a.click();document.body.removeChild(a);}const thread = await getThread();const files = await getMedia(thread);const playlist = await createPlaylist(files);downloadPlaylist(`${thread.board}-${thread.postId}.m3u`, playlist);}threadToPlaylist();})();
```  

- create a bookmark
- paste the script on the url field
- open a thread with `.webm`,`.mp4` and `.mp3` files
- click on the bookmark
- a `.m3u` file will be asked to be downloaded
- you can now open this file using some media player like vlc

Enjoe ouvir as musiquinhas do fio como se você tivesse ouvindo uma radio.  
Enjoy listening/watching the thread medias as if you were listening to a radio. 