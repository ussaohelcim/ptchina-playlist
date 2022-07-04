interface IFile{
	filename:string
	extension:string
	duration:number
	originalFilename:string
	mimetype:string
}

interface IPost{
	files:IFile[]|undefined
}

interface IThread{
	files:IFile[]|undefined
	replies:IPost[]
	board:string
	postId:number
}

async function threadToPlaylist(board:string,postId:number){

	async function getThread():Promise<IThread> {
		let link = `${window.location.origin}/${board}/thread/${postId}.json` 
		
		return await fetch(link).then(res=> res.json()) as IThread
	}
	
	function isAudioOrVideo(file:IFile){
		const mimeTypes = ['video','audio']
		const fileType = file.mimetype.split('/')[0]

		return fileType === mimeTypes[0] || fileType === mimeTypes[1]
	}

	async function getMedia(thread:IThread){	
		const files:IFile[] = []

		thread.files.forEach((file)=>{
			if(isAudioOrVideo(file)){
				files.push(file)
			}
		})
	
		for (let i = 0; i < thread.replies.length; i++) {
			const replyFiles = thread.replies[i].files;
			replyFiles.forEach((file)=>{
				if(isAudioOrVideo(file)){
					files.push(file)
				}
			})
		}
			
		return files
	}
	
	function createPlaylist(medias:IFile[]){
		const lines:string[] = []
	
		lines.push('#EXTM3U')
	
		for (let i = 0; i < medias.length; i++) {
			const media = medias[i];
	
			lines.push(`#EXTINF:${media.duration}, ${media.originalFilename}`)
			lines.push(`${location.origin}/file/${media.filename}`)
		}
	
		let playlist = lines.join('\n')
	
		return playlist
	}
	
	function downloadPlaylist(filename:string,playlist:string)
	{
		const blob = new Blob([playlist],{type:'application/mpegurl'})
		const url = window.URL.createObjectURL(blob)
	
		const a = document.createElement('a')
		a.href = url
		a.target = '_blank'
		a.download = filename
		a.style.display = 'none'
		document.body.appendChild(a)
		a.click()
		document.body.removeChild(a)
	
	}

	try {
		const thread = await getThread()
		const files = await getMedia(thread)
		const playlist = await createPlaylist(files)

		if(playlist.split('\n').length > 1){
			//playlist.split('\n').length === 1 means only '#EXTM3U' inside the string
			downloadPlaylist(`${thread.board}-${thread.postId}.m3u`,playlist)
		}
		else{
			console.log('No video/audio files in this thread.')
		}
	} catch (error) {
		console.log(error);
	}

}

window.addEventListener('createPlaylist',(e)=>{
	//@ts-ignore
	threadToPlaylist(e.detail.board,e.detail.postId);
});
