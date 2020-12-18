let personagem = JSON.parse(localStorage.getItem('Personagem'))
document.getElementById('nome').innerHTML = personagem.nome
document.getElementById('idade').innerHTML = personagem.idade
document.getElementById('classe').innerHTML = personagem.classe
document.getElementById('forca').innerHTML = personagem.forca
document.getElementById('vida').innerHTML = personagem.vida
document.getElementById('hp').innerHTML = personagem.hp.toFixed(2)
let habilidade = document.getElementById('habilidades')
console.log(habilidade)
let mensagem = ''

for (let index = 0; index < personagem.poderes.length; index++) {
    mensagem = mensagem + `<h3>${personagem.poderes[index].nome} - <i>${personagem.poderes[index].dano}</i> de Dano Base</h3><br>`
}
habilidade.innerHTML = mensagem

function IrABatalha(){
    window.location.href = 'batalha.html'
}

function criarNovoPersonagem(){
    localStorage.removeItem('Personagem')
    window.location.href = 'fichaPersonagem.html'
}