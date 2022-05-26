// Base de palavras
const words = [
    {name: "Macaco", hint: "Animal"},
    {name: "Banana", hint: "Fruta"},
    {name: "Abacate", hint: "Fruta"}
]

// Variáveis globais
let hitCounter = 0

// Variáveis HMTL
const divWord = document.querySelector('#word')
const divKeyboard = document.querySelector('#keyboard')
const divActions = document.querySelector('#actions')
const divHangman = document.querySelector('#hangman')
const allKeyboardButtons = document.querySelectorAll("#keyboard .line button")

// Sorteio das palavras
var wordDrawn = (function() {
    return words[Math.floor(Math.random() * words.length)]
})()

const newGame = () => {
    hitCounter = 0
    removeDoll()
    wordDrawn = words[Math.floor(Math.random() * words.length)]
    removeWordView()
    createWordView(wordDrawn.name)
    document.querySelector('#toggleHint').innerText = wordDrawn.hint
    toggleHint(true, true)
    removeKeyboardHitsAndMisses()
    showHideKeyboard(true)
}

const restart = () => {
    hitCounter = 0
    removeDoll()
    removeWordView()
    createWordView(wordDrawn.name)
    removeKeyboardHitsAndMisses()
    showHideKeyboard(true)
}

// Criar inputs de mostrar as palavras
const createWordView = (name) => {
    let motherElement = divWord
    for(let i=0; i < name.length; i++){
        const elementChildren = document.createElement('input')
        elementChildren.type = "text"
        elementChildren.setAttribute('readonly', '')
        motherElement.appendChild(elementChildren)
    }
}

// Remover inputs de mostrar palavras
const removeWordView = () => {
    document.querySelectorAll('#word input').forEach((input) => {
        divWord.removeChild(input)
    })
}

// Mostar ou esconder dica
const toggleHint = (op = false, add = false) => {
    if(op){ 
        if(add){
            document.getElementById('hint').classList.add('toggle')
        }else{
            document.getElementById('hint').classList.remove('toggle')
        }
    }else{
        document.getElementById('hint').classList.toggle("toggle")
    }
}

// Remover erros e acertos das teclas
const removeKeyboardHitsAndMisses = () => {
    allKeyboardButtons.forEach((button) => {
        button.classList.remove('error', 'hit')
    });
}

// Pegar as teclas
allKeyboardButtons.forEach((button, i) => {
    button.addEventListener("click", () => {
        verify(button, i)
    })
});

// Verificar teclas
const verify = (button, i) => {
    const array = [
        'q','w','e','r','t','y','u','i','o','p',
        'a','s','d','f','g','h','j','k','l','ç',
        'z','x','c','v','b','n','m'
    ]

    if(checkHitsMisses(array[i])){
        button.classList.add("hit")
    }else{
        button.classList.add("error")
    }
}

// Verificar acertos
const checkHitsMisses = (key) => {
    let word = wordDrawn.name.toLocaleLowerCase()
    let result

    if(word.indexOf(key) != -1){
        hitCounter += showCorrectLetter(key)
        console.log(hitCounter)
        if(hitCounter >= wordDrawn.name.length){
            showHideKeyboard(false)
            alert("Acertou")
        }
        result = true
    }else{
        showErrorHangman()
        result = false
    }

    return result
}

// Mostrar letra certa
const showCorrectLetter = (key) => {
    let sum = 0
    for(let i=0; i < wordDrawn.name.length; i++) {
        if(key == wordDrawn.name.toLocaleLowerCase().charAt(i)){
            document.querySelectorAll('#word input')[i].value = key.toLocaleUpperCase()
            sum++
        }
    }
    return sum
}

// Mostar erro na forca
const showErrorHangman = () => {
    if(!document.querySelector("#imgPuppet")){
        let element = document.createElement('img')
        element.id = "imgPuppet"
        element.alt = "Boneco"
        element.src = "assets/img/puppet1.png"
        divHangman.appendChild(element)
    }else{
        let imgNumber = imgPuppet.src.substring(imgPuppet.src.length-5, imgPuppet.src.length-4)
        imgNumber++
        if(imgNumber < 6){
            imgPuppet.src = `assets/img/puppet${imgNumber}.png`
        }else{
            imgPuppet.src = `assets/img/puppet${imgNumber}.png`
            showHideKeyboard(false)
            alert("acabou")
        }
    }
}

// Remover boneco
const removeDoll = () => {
    if(document.getElementById("imgPuppet")){
        divHangman.removeChild(document.getElementById("imgPuppet"))
    }
}

// Mostrar e esconder teclado
const showHideKeyboard = (op = false) => {
    if(op){
        divKeyboard.classList.remove('hidden')
    }else{
        divKeyboard.classList.add('hidden')
    }
}

// Eventos
document.querySelector('#actions #newGame').addEventListener("click", newGame)
document.querySelector('#actions #restart').addEventListener("click", restart)
document.querySelector('#hint').addEventListener("click", _ => toggleHint())
document.addEventListener("DOMContentLoaded", newGame)