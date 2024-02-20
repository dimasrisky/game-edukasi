const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

const canvas_width = 1800
const canvas_height = 800
let yText = 900
let text = 'cessitatibus culpa, beatae quod ex tenetur asperiores accusamus, enim ad maxime? Molestiae culpa esse, nulla, doloremque magni ullam '

function createImage(path, x, y, width, height){
    let img = new Image()
    img.src = path
    ctx.drawImage(img, x, y, width, height);
}

function createText(value, size, color, x, y, maxWidth) {
    ctx.fillStyle=`${color}`
    ctx.font = `${size}px Inter`
    ctx.fillText(value, x, y, maxWidth);
}

function animationLoop(){
    ctx.clearRect(0, 0, canvas_width, canvas_height)
    createImage('../../assets/background/background.png', 0, 0, canvas_width, canvas_height)
    createText(text, 25, 'white', 200, yText, 1900)
    if(yText < -200) window.location.href = '../../gameplay/level-1/index.html'
    yText--
    requestAnimationFrame(animationLoop)
}
animationLoop()