// Base de palavras
const words = [
    {name: "Macaco", hint: "Animal"},
    {name: "Banana", hint: "Fruta"},
    {name: "Abacate", hint: "Fruta"}
]

// Variáveis HMTL
const divWord = document.querySelector('#word')
const divActions = document.querySelector('#actions')

// Sorteio das palavras
var wordDrawn = (function() {
    return words[Math.floor(Math.random() * words.length)]
})()

const newGame = () => {
    wordDrawn = words[Math.floor(Math.random() * words.length)]
    removeWordView()
    createWordView(wordDrawn.name)
    toggleHint(true)
}

const restart = () => {
    removeWordView()
    createWordView(wordDrawn.name)
    toggleHint(true)
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
    document.querySelectorAll('#hint p')[0].innerText = wordDrawn.hint
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

// Pegar as teclas
document.querySelectorAll("#keyboard .line button").forEach((button, i) => {
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
        result = true
    }else{
       result = false
    }

    return result
}

// Events
document.querySelector('#actions #newGame').addEventListener("click", newGame)
document.querySelector('#actions #restart').addEventListener("click", restart)
document.addEventListener("DOMContentLoaded", newGame)