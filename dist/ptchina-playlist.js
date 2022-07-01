"use strict";
/**
https://github.com/ussaohelcim/ptchina-playlist

MIT License

Copyright (c) 2022 ussaohelcim

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
 */
async function threadToPlaylist() {
    async function getThread() {
        let link = window.location.href;
        link = link.replace(".html", ".json");
        return await fetch(link).then(async (res) => {
            const fio = await res.json();
            return fio;
        });
    }
    async function getMedia(thread) {
        const fileTypes = [".mp4", ".mp3", ".webm"];
        const files = [];
        thread.files?.forEach((f) => {
            if (fileTypes.includes(f.extension)) {
                files.push(f);
            }
        });
        for (let i = 0; i < thread.replies.length; i++) {
            const element = thread.replies[i].files;
            element?.forEach((f) => {
                if (fileTypes.includes(f.extension)) {
                    files.push(f);
                }
            });
        }
        return files;
    }
    function createPlaylist(medias) {
        const lines = [];
        lines.push("#EXTM3U");
        for (let i = 0; i < medias.length; i++) {
            const media = medias[i];
            lines.push(`#EXTINF:${media.duration}, ${media.originalFilename}`);
            lines.push(`${location.origin}/file/${media.filename}`);
        }
        let playlist = lines.join("\n");
        return playlist;
    }
    function downloadPlaylist(filename, playlist) {
        const blob = new Blob([playlist], { type: "application/mpegurl" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.target = "_blank";
        a.download = filename;
        a.style.display = "none";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
    const thread = await getThread();
    const files = await getMedia(thread);
    const playlist = await createPlaylist(files);
    if (playlist.split('\n').length > 1) {
        downloadPlaylist(`${thread.board}-${thread.postId}.m3u`, playlist);
    }
    else {
        console.log('No video/audio files in this thread.');
    }
}
