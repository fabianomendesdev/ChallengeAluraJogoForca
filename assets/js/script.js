// Base de palavras
const words = [
    {name: "Banana", hint: "Fruta"},
    {name: "Zíper", hint: "Objeto"},
    {name: "Bolo", hint: "Comida"},
    {name: "Juiz", hint: "Profissão"},
    {name: "Marreco", hint: "Animal"},
    {name: "Baralho", hint: "Jogo"},
    {name: "Cocada", hint: "Comida"},
    {name: "Perito", hint: "Profissão"},
    {name: "Freezer", hint: "Objeto"},
    {name: "Vespa", hint: "Inseto"},
    {name: "Pastel", hint: "Comida"},
    {name: "Bola", hint: "Jogo"},
    {name: "Porco", hint: "Animal"},
    {name: "Canjica", hint: "Comida"},
    {name: "Formiga", hint: "Inseto"},
    {name: "Pequi", hint: "Fruta"},
    {name: "Tapioca", hint: "Comida"},
    {name: "Webcam", hint: "Objeto"},
    {name: "Cobra", hint: "Animal"},
    {name: "Forca", hint: "Jogo"},
    {name: "Fava", hint: "Comida"},
    {name: "Abelha", hint: "Inseto"},
    {name: "Anzol", hint: "Objeto"},
    {name: "Coxinha", hint: "Comida"},
    {name: "Abacate", hint: "Fruta"},
    {name: "Barata", hint: "Inseto"},
    {name: "Dominó", hint: "Jogo"},
    {name: "Pamonha", hint: "Comida"},
    {name: "Macaco", hint: "Animal"},
    {name: "Imbu", hint: "Fruta"},
    {name: "Cuscuz", hint: "Comida"},
    {name: "Navalha", hint: "Objeto"},
    {name: "Kiwi", hint: "Fruta"},
    {name: "Mosca", hint: "Inseto"},
    {name: "Feijoada", hint: "Comida"},
    {name: "Pera", hint: "Fruta"},
    {name: "Xadrez", hint: "Jogo"},
    {name: "Besouro", hint: "Inseto"},
    {name: "Alpaca", hint: "Animal"},
    {name: "Paçoca", hint: "Comida"},
    {name: "Pudim", hint: "Comida"},
    {name: "", hint: "Inseto"}
]

// Variáveis globais
let hitCounter = 0
const numberLettersWordInput = 8
const numberLettersHintInput = 10

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

// Botões
const cleanButton = document.querySelector("#cleanButton")
const addWordButton = document.querySelector("#addWordButton")

// inputs
const wordInput = document.querySelector("#wordInput")
const hintInput = document.querySelector("#hintInput")

// Adicionar valores dinámicos ao html
document.querySelector("#wordSpan").innerText = "0"+numberLettersWordInput
document.querySelector("#hintSpan").innerHTML = numberLettersHintInput

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
    const element2 = document.createElement('div')
    element2.id = "containerShowLostWinMsg"

    const element = document.createElement('div')
    element.id = "divShowLostWinMsg"
    
    const pElement = document.createElement('p')
    pElement.innerText = msg
    pElement.classList.add('msg')

    const closeButtonElement = document.createElement('button')
    closeButtonElement.innerText = "Fechar"
    closeButtonElement.addEventListener('click', _ => removeElement(element2))

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

const removeElement = (element) => {
    if(element){
        element.remove()
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
    removeClassInputsClean(element)

    if(element.value.length == "" || element.value.length > max){
        element.classList.add('is-invalid')
        element.parentElement.classList.add("is-invalid")
        return true
    }else{
        element.classList.add('is-valid')
        element.parentElement.classList.add("is-valid")
        return false
    }
}

// Limpar inputs
const cleanAddWord = () => {
    wordInput.value = ""
    removeClassInputsClean(wordInput)
    
    hintInput.value = ""
    removeClassInputsClean(hintInput)
}

// Remove class is-valid e is-invalid
const removeClassInputsClean = (element) => {
    element.classList.remove('is-invalid')
    element.classList.remove('is-valid')
    element.parentElement.classList.remove("is-invalid")
    element.parentElement.classList.remove("is-valid")
}

// Adicionar palavra
const addWord = () => {
    verifyError(wordInput, numberLettersWordInput)
    verifyError(hintInput, numberLettersHintInput)
    if(verifyError(wordInput, numberLettersWordInput) || verifyError(hintInput, numberLettersHintInput)){
        showAlert(true, "Erro ao adicionar palavra!")
    }else{
        showAlert(false, "Palavra adicionada com sucesso!")
        words.push({name: wordInput.value, hint: hintInput.value})
        cleanAddWord()
    }
}

const showAlert = (error, msg) => {
    const element = document.createElement('div')
    element.id = "showAlert"
    
    const pElement = document.createElement('p')
    pElement.innerText = msg

    if(error){
        element.classList.add("error")
    }else{
        element.classList.add("hit")
    }

    element.appendChild(pElement)
    container.appendChild(element)
    setTimeout(_ => removeElement(element), 2000)
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
wordInput.addEventListener("input", _ => verifyError(wordInput, numberLettersWordInput))
hintInput.addEventListener("input", _ => verifyError(hintInput, numberLettersHintInput))
document.addEventListener("DOMContentLoaded", _ => showHideSection("menu"))

cleanButton.addEventListener('click', cleanAddWord)
addWordButton.addEventListener('click', addWord)

// Retorna o array dos elementos
const query = (name) => document.querySelectorAll('.'+name)

// Eventos de rota
let routeArray = [
    {key: query('routeNewGame'), func: _ => {newGame()}},
    {key: query('routeGiveUp'), func: _ => {showHideSection("menu"); restart()}},
    {key: query('routePlayButton'), func: _ => {showHideSection("game"); newGame()}},
    {key: query('routeAddWordButton'), func: _ => {showHideSection("addWord")}},
    {key: query('routeBackToMenu'), func: _ => {showHideSection("menu")}}
]

routeArray.forEach((item) => {
    item.key.forEach((element) => {
        element.addEventListener('click', item.func)
    })
})