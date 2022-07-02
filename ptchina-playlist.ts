
interface IFile{
	filename:string
	extension:string
	duration:number
	originalFilename:string
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
		
		return await fetch(link).then(async (res)=>{
			const thread = await res.json() as IThread
		
			return thread
		})
	}
	
	async function getMedia(thread:IThread){
		const fileTypes = [".mp4",".mp3",".webm"]
	
		const files:IFile[] = []
	
		thread.files?.forEach((f)=>{
			if(fileTypes.includes(f.extension) )
			{
				files.push(f)
			}
		})
	
		for (let i = 0; i < thread.replies.length; i++) {
			const element = thread.replies[i].files;
			element?.forEach((f)=>{
				if(fileTypes.includes(f.extension) )
				{
					files.push(f)
				}
			})
		}
	
		return files
	}
	
	function createPlaylist(medias:IFile[]){
		const lines:string[] = []
	
		lines.push("#EXTM3U")
	
		for (let i = 0; i < medias.length; i++) {
			const media = medias[i];
	
			lines.push(`#EXTINF:${media.duration}, ${media.originalFilename}`)
			lines.push(`${location.origin}/file/${media.filename}`)
		}
	
		let playlist = lines.join("\n")
	
		return playlist
	}
	
	function downloadPlaylist(filename:string,playlist:string)
	{
		const blob = new Blob([playlist],{type:"application/mpegurl"})
		const url = window.URL.createObjectURL(blob)
	
		const a = document.createElement('a')
		a.href = url
		a.target = "_blank"
		a.download = filename
		a.style.display = "none"
		document.body.appendChild(a)
		a.click()
		document.body.removeChild(a)
	
	}

	const thread = await getThread()
	const files = await getMedia(thread)
	const playlist = await createPlaylist(files)

	if(playlist.split('\n').length > 1)
	{//playlist.split('\n').length === 1 means only "#EXTM3U" inside the string
		downloadPlaylist(`${thread.board}-${thread.postId}.m3u`,playlist)
	}
	else{
		console.log('No video/audio files in this thread.')
	}
}
