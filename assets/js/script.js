// Base de palavras
const words = [
    {name: "Macaco", tip: "Animal"},
    {name: "Macaco", tip: "Animal"},
    {name: "Macaco", tip: "Animal"},
    {name: "Macaco", tip: "Animal"},
    {name: "Macaco", tip: "Animal"},
    {name: "Macaco", tip: "Animal"},
    {name: "Macaco", tip: "Animal"},
    {name: "Macaco", tip: "Animal"},
    {name: "Macaco", tip: "Animal"},
    {name: "Macaco", tip: "Animal"},
    {name: "Macaco", tip: "Animal"},
    {name: "Banana", tip: "Fruta"}
]

// Sorteio das palavras
const wordDrawn = Math.floor(Math.random() * words.length)

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
    let word = words[0].name.toLocaleLowerCase()
    let result

    if(word.indexOf(key) != -1){
        result = true
    }else{
       result = false
    }

    return result
}