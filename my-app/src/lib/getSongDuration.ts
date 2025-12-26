



export function getSongDuration(audioUrl: string){
    return new Promise((res, rej) => {
        const audio = new Audio(audioUrl);
        audio.onloadedmetadata = () => res(audio.duration);
        audio.onerror = () => rej("Failed to load Audio !")
    })
}