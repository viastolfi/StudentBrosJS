const sound = new Audio('sounds/click.mp4')
const button = document.querySelector(".btn-primary")


button.addEventListener("click",playMusic)


function playMusic(){
    sound.play()
}

