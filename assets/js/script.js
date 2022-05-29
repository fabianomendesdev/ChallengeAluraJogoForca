// Base de palavras
const words = [
    {name: "Macaco", hint: "Animal"},
    {name: "Banana", hint: "Fruta"},
    {name: "Abacate", hint: "Fruta"}
]

// Variáveis globais
let hitCounter = 0

// Variáveis HMTL
const menuSection = document.querySelector("#menu")
const gameSection = document.querySelector("#game") 
const addWordSection = document.querySelector("#addWord")
const divWord = document.querySelector('#word')
const divKeyboard = document.querySelector('#keyboard')
const divActions = document.querySelector('#actions')
const container = document.querySelectorAll('.container-md')[0]
const divHangman = document.querySelector('#hangman')
const allKeyboardButtons = document.querySelectorAll("#keyboard .line button")

// inputs
const wordInput = document.querySelector("#wordInput")
const hintInput = document.querySelector("#hintInput")

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

// Mostrar e essconder seção
const showHideSection = (value = "menu") => {
    switch(value){
        case "menu":
            gameSection.classList.add("hidden")
            addWordSection.classList.add("hidden")
            menuSection.classList.remove("hidden")
            break
        
        case "addWord":
            gameSection.classList.add("hidden")
            menuSection.classList.add("hidden")
            addWordSection.classList.remove("hidden")
            break

        case "game":
            addWordSection.classList.add("hidden")
            menuSection.classList.add("hidden")
            gameSection.classList.remove("hidden")
            break
    }
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
    

    const element2 = document.createElement('div')
    element2.id = "containerShowLostWinMsg"
    container.appendChild(element2)
    element2.appendChild(element)
}

// Fechar mensagem de erro ou de acerto
const closeLostwinMsg = () => {
    if(document.querySelector("#divShowLostWinMsg")){
        const divShowLostWinMsg = document.querySelector("#containerShowLostWinMsg")
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

// verificar erros das palavras
const verifyError = (element, max) => {
    console.log(element)
    console.log(max)
    
    element.classList.remove('is-invalid')
    element.classList.remove('is-valid')
    element.parentElement.classList.remove("is-invalid")
    element.parentElement.classList.remove("is-valid")

    if(element.value.length == ""){
        element.classList.add('is-invalid')
        element.parentElement.classList.add("is-invalid")
    }else if(element.value.length < 2){
        element.classList.add('is-invalid')
        element.parentElement.classList.add("is-invalid")
    }else if (element.value.length > max) {
        element.classList.add('is-invalid')
        element.parentElement.classList.add("is-invalid")
    }else{
        element.classList.add('is-valid')
        element.parentElement.classList.add("is-valid")
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
document.querySelector('#hint div').addEventListener("click", _ => toggleHint())
wordInput.addEventListener("input", _ => verifyError(wordInput, 8))
hintInput.addEventListener("input", _ => verifyError(hintInput, 9))
document.addEventListener("DOMContentLoaded", _ => showHideSection("menu"))

// Retorna o array dos elementos
const query = (name) => document.querySelectorAll('.'+name)

// Eventos de rota
let routeArray = [
    {key: query('newGame'), func: _ => {newGame()}},
    {key: query('giveUp'), func: _ => {showHideSection("menu"); restart()}},
    {key: query('playButton'), func: _ => {showHideSection("game"); newGame()}},
    {key: query('addWordButton'), func: _ => {showHideSection("addWord")}},
    {key: query('backToMenu'), func: _ => {showHideSection("menu")}}
]

routeArray.forEach((item) => {
    item.key.forEach((element) => {
        element.addEventListener('click', item.func)
    })
})