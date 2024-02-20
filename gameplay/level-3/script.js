const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
const canvas_width = 1800
const canvas_height = 800
let health = 3
let noUrutSoal = 0

const pertanyaan = [
    {
        soal: 'berapakah hasil dari 3 + 7 ?',
        jawaban : [1, 5, 7, 10],
        abjad: ["A. ", "B. ", "C. ", "D. "],
        jawabanBenar : "d"
    },
    {
        soal: 'berapakah hasil dari 2 + 3 ?',
        jawaban : [9, 5, 70, 1],
        abjad: ["A. ", "B. ", "C. ", "D. "],
        jawabanBenar : "b"
    },
    {
        soal: 'berapakah hasil dari 1 + 1 ?',
        jawaban : [2, 7, 900, 8],
        abjad: ["A. ", "B. ", "C. ", "D. "],
        jawabanBenar : "a"
    },
    {
        soal: 'berapakah hasil dari 6 + 54 ?',
        jawaban : [100, 5000, 7000, 60],
        abjad: ["A. ", "B. ", "C. ", "D. "],
        jawabanBenar : "d"
    },
]

function createImage(path, x, y, width, height){
    let img = new Image()
    img.src = path
    ctx.drawImage(img, x, y, width, height);
}

function createText(value, size, color, x, y) {
    ctx.fillStyle=`${color}`
    ctx.font = `${size}px serif`
    ctx.fillText(value, x, y);
}

document.addEventListener('keypress', e => {
    if(e.key === pertanyaan[noUrutSoal].jawabanBenar){
        hero.setPath('../../assets/character/Attack/attack.png')
        enemy.setPath('../../assets/enemy/Hit/Hit-Sheet.png')
        setTimeout(() => {
            hero.setPath('../../assets/character/Idle/Idle-Sheet.png')
        }, 400)
        setTimeout(() => {
            enemy.setPath('../../assets/enemy/Run/Run-Sheet.png')
            enemy.x = canvas_width
        }, 100)
        noUrutSoal === pertanyaan.length ? noUrutSoal = 0 :  noUrutSoal++
    }else{
        health--
    }
})

function panelPertanyaan(){
    createImage('../../assets/panel.png', 500, -80, 800, 400)
    createText(pertanyaan[noUrutSoal].soal, 30, 'black', 720, 70)
    pertanyaan[noUrutSoal].jawaban.forEach((jawab, i) => {
        createText(`${pertanyaan[noUrutSoal].abjad[i]} ${jawab}`, 30, 'black', 650 + i*140, 160)
    })
}

class Character {
    constructor(path, x, y, width, height, frameX, frameY, frameWidth, frameHeight){
        this.img = new Image()
        this.img.src = path
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.frameX = frameX
        this.frameY = frameY
        this.counterFrameX = 1
        this.counterFrameY = 1
        this.frameWidth = frameWidth
        this.frameHeight = frameHeight
        this.stagger = 0
    }

    setPath(newPath){
        this.img.src = newPath
    }

    animate(){
        ctx.drawImage(
            this.img, 
            this.frameX * this.counterFrameX, 
            this.frameY, 
            this.frameWidth, 
            this.frameHeight, 
            this.x, 
            this.y, 
            this.width, 
            this.height
        )
        if(this.stagger % 20 === 0){
            if(this.counterFrameX === 3) {
                this.counterFrameX = 1
            }else{
                this.counterFrameX++
            }
        }

        this.stagger++
    }
}

class Enemy extends Character{
    constructor(path, x, y, width, height, frameX, frameY, frameWidth, frameHeight){
        super(path, x, y, width, height, frameX, frameY, frameWidth, frameHeight)
    }

    animate(){
        ctx.drawImage(
            this.img, 
            this.frameX * this.counterFrameX, 
            this.frameY, 
            this.frameWidth, 
            this.frameHeight, 
            this.x, 
            this.y, 
            this.width, 
            this.height
        )
        if(this.stagger % 7 === 0){
            if(this.counterFrameX === 3) {
                this.counterFrameX = 1
            }else{
                this.counterFrameX++
            }
        }
        
        // Collision
        if(this.x < hero.x + hero.width){
            this.x = canvas_width
            noUrutSoal++
            health--
        }

        this.stagger++
        this.x -= 2
    }
}

const hero = new Character('../../assets/character/Idle/Idle-Sheet.png', 100, 450, 200, 230, 65, 1, 60, 80)
const enemy = new Enemy('../../assets/enemy/Run/Run-Sheet.png', canvas_width, 545, 150, 230, 49, 1, 45, 70)

function animationLoop(){
    ctx.clearRect(0, 0, canvas_width, canvas_height)
    createImage('../../assets/background/background.png', 0, 0, canvas_width, canvas_height)
    hero.animate()
    enemy.animate()
    createImage('../../assets/health.png', 10, 30, 100, 100)
    createText("Level 3", 60, "white", 1500, 100)
    createText(health, 60, "white", 110, 100)
    if(health === 0) window.location.href = '../../state/game-over/index.html'
    if(noUrutSoal === pertanyaan.length) window.location.href = '../../state/ending/index.html'

    // panel pertanyaan
    panelPertanyaan()
    requestAnimationFrame(animationLoop)
}
animationLoop()