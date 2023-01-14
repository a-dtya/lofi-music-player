console.log("Welcome")
let songIndex = 0
let masterPlay = document.getElementById("masterPlay")
let myProgressBar = document.getElementById("myProgressBar")
let masterSongName = document.getElementById("masterSongName")
let audioElement = new Audio('song1.mp3')
let gif = document.getElementById('gif')
let songItem = Array.from(document.getElementsByClassName('songItem'))
let songs = [
    {songName:"Vathilil-Lofi",songPath:"song1.mp3",coverPath:"song1.jpg"},
    {songName:"Eeran Megham",songPath:"song2.mp3",coverPath:"song2.jpg"},
    {songName:"Adiye Lofi",songPath:"song3.mp3",coverPath:"song3.jpg"}
]
songItem.forEach((element,i)=>{
    element.getElementsByTagName('img')[0].src = songs[i].coverPath
    element.getElementsByClassName('songName')[0].innerText = songs[i].songName
})
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play()
        masterPlay.classList.remove('fa-circle-play')
        masterPlay.classList.add('fa-circle-pause')
        gif.style.opacity = 1
    }else{
        audioElement.pause()
        masterPlay.classList.remove('fa-circle-pause')
        masterPlay.classList.add('fa-circle-play')
        gif.style.opacity = 0
    }
})
audioElement.addEventListener('timeupdate',()=>{
    console.log('timeupdate')
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100)
    myProgressBar.value = progress

})
myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime = myProgressBar.value*audioElement.duration/100

})
const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-circle-pause')
        element.classList.add('fa-circle-play')
    })
}
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        songIndex = parseInt(e.target.id)
        makeAllPlays()
       e.target.classList.remove('fa-circle-play')
       e.target.classList.add('fa-circle-pause')
       audioElement.src = `song${songIndex+1}.mp3`
       masterSongName.innerText = songs[songIndex].songName
       gif.style.opacity = 1
       audioElement.currentTime = 0
       audioElement.play()
       masterPlay.classList.remove('fa-circle-play')
       masterPlay.classList.add('fa-circle-pause')
    })
})
document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>=2){
        songIndex = 0
    }
    else{
        songIndex+=1
    }
    masterSongName.innerText = songs[songIndex].songName
    audioElement.src = `song${songIndex+1}.mp3`
       audioElement.currentTime = 0
       audioElement.play()
       masterPlay.classList.remove('fa-circle-play')
       masterPlay.classList.add('fa-circle-pause')
})
document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=0){
        songIndex = 2
    }
    else{
        songIndex-=1
    }
    masterSongName.innerText = songs[songIndex].songName
    audioElement.src = `song${songIndex+1}.mp3`
       audioElement.currentTime = 0
       audioElement.play()
       masterPlay.classList.remove('fa-circle-play')
       masterPlay.classList.add('fa-circle-pause')
})