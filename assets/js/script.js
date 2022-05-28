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
const container = document.querySelectorAll('.container-md')[0]
const divHangman = document.querySelector('#hangman')
const allKeyboardButtons = document.querySelectorAll("#keyboard .line button")

// Sorteio das palavras
var wordDrawn = (function() {
    return words[Math.floor(Math.random() * words.length)]
})()

// Novo jogo
const newGame = () => {
    hitCounter = 0
    removeDoll()
    wordDrawn = words[Math.floor(Math.random() * words.length)]
    removeWordView()
    createWordView(wordDrawn.name)
    document.querySelector('#toggleHint').innerText = wordDrawn.hint
    toggleHint(true, true)
    removeKeyboardHitsAndMisses()
    closeLostwinMsg()
    showHideKeyboard(true)
    toggleWordColor(false)
}

// Reiniciar jogo
const restart = () => {
    hitCounter = 0
    removeDoll()
    removeWordView()
    createWordView(wordDrawn.name)
    removeKeyboardHitsAndMisses()
    closeLostwinMsg()
    showHideKeyboard(true)
    toggleWordColor(false)
}

// Ganhou
const win = () => {
    showHideKeyboard(false)
    toggleWordColor(true)
    showLostWinMsg(true, "Você Ganhou!", wordDrawn.name.toLocaleUpperCase())
}

// Perdeu
const lost = () => {
    showHideKeyboard(false)
    showLostWinMsg(false, "Você Perdeu!", wordDrawn.name.toLocaleUpperCase())
}

// Mostrar mensagens de erro e acerto
const showLostWinMsg = (errorWin, msg, word) => {
    const element = document.createElement('div')
    element.id = "divShowLostWinMsg"
    
    const pElement = document.createElement('p')
    pElement.innerText = msg
    pElement.classList.add('msg')

    const closeButtonElement = document.createElement('button')
    closeButtonElement.innerText = "Fechar"
    closeButtonElement.addEventListener('click', closeLostwinMsg)

    const newGameButtonElement = document.createElement('button')
    newGameButtonElement.innerText = "Novo jogo"
    newGameButtonElement.addEventListener('click', newGame)

    const divElement = document.createElement('div')
    divElement.appendChild(newGameButtonElement)
    divElement.appendChild(closeButtonElement)
    
    const p2Element = document.createElement('p')
    p2Element.classList.add('info')

    if(errorWin){
        p2Element.innerText = "Parabéns!"
        pElement.classList.add('hit')
    }else{
        p2Element.innerText = "Palavra: "+ word
        pElement.classList.add('error')
    }

    element.appendChild(pElement)
    element.appendChild(p2Element)
    element.appendChild(divElement)
    container.appendChild(element)
}

// Fechar mensagem de erro ou de acerto
const closeLostwinMsg = () => {
    if(document.querySelector("#divShowLostWinMsg")){
        const divShowLostWinMsg = document.querySelector("#divShowLostWinMsg")
        container.removeChild(divShowLostWinMsg)
    }
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

// Adicionar/remover cor de acerto da palavra
const toggleWordColor = (op) => {
    if(op){
        divWord.classList.add("hit")
    }else{
        divWord.classList.remove("hit")
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
        if(!(button.classList.contains('hit') || button.classList.contains('error'))){
            verify(button, i)
        }
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
        if(hitCounter >= wordDrawn.name.length){
            win()
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
            lost()
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
document.querySelector('#hint div').addEventListener("click", _ => toggleHint())
document.addEventListener("DOMContentLoaded", newGame)