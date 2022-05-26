// Base de palavras
const words = [
    {name: "Macaco", hint: "Animal"},
    {name: "Banana", hint: "Fruta"}
]

// Sorteio das palavras
const wordDrawn = words[Math.floor(Math.random() * words.length)]

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
toggleHint(true)

// Pegar as teclas
document.querySelectorAll("#keyboard .line button").forEach(function(button, i) {
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