let monstro = {
    nome: 'fetulho',
    vida: 300,
    dano: 40
}

//Informações do Personagem
let personagem = JSON.parse(localStorage.getItem('Personagem'))
console.log('Personagem: ' + personagem.nome)
let nome = document.getElementById('nome')
let idade = document.getElementById('idade')
let classe = document.getElementById('classe')
let hp = document.getElementById('hpTotal')
let hpAtual = document.getElementById('hpAtual')
let vidaDoHeroi = personagem.hp
//let heroiEstaVivo = true
nome.innerHTML = personagem.nome
idade.innerHTML = personagem.idade
classe.innerHTML = personagem.classe
hp.innerHTML = personagem.hp.toFixed(2)
hpAtual.innerHTML = vidaDoHeroi.toFixed(2)

//Informações do Inimigo
let nomeInimigo = document.getElementById('nomeMonstro')
let vidaTotalInimigo = document.getElementById('vidaMonstro')
let vidaAtualInimigo = document.getElementById('vidaMonstroAtual')
let vidaDoMonstro = monstro.vida;
//let monstroEstaVivo = true;
nomeInimigo.innerHTML = monstro.nome
vidaTotalInimigo.innerHTML = monstro.vida
vidaAtualInimigo.innerHTML = vidaDoMonstro

//Informações Dado
let dadoNumero = document.getElementById('dadoNumero')
let dadoImg = document.getElementById('dadoImg')

//Informações Ações
let acoes = document.getElementById('acoes')
document.getElementById('hab1').innerHTML = personagem.poderes[0].nome
document.getElementById('hab2').innerHTML = personagem.poderes[1].nome
document.getElementById('hab3').innerHTML = personagem.poderes[2].nome

//Essa Função pega as informações da api e retorna elas
async function pegarDado() {
    //let dadoNumero = document.getElementById('dadoNumero')
    //let dadoImg = document.getElementById('dadoImg')
    let responde = await fetch('http://roll.diceapi.com/json/d6')
    console.log(responde)
    let dado = await responde.json()
    console.log(dado)
    return dado;
    /*fetch("http://roll.diceapi.com/json/d6")
      .then(
        response => {
          console.log(response)
          return response.json()
        }
      )
      .then(data => {
        //console.log(data)
        let numeroDado = data.dice[0].value
        atualizarDado(data.dice[0].value)
      });*/
}

//Essa função pega o json do fetch e decide de quem será o turno baseado no numero do dado(inpar = usuario, par = inimigo)
async function girarDado(){
    acoes.style.display = 'none'
    let dado = await pegarDado()
    dadoNumero.innerHTML = dado.dice[0].value
    dadoImg.src = await `http://roll.diceapi.com/images/poorly-drawn/d6/${dado.dice[0].value}.png`
    console.log('Atualizou')
    
    if (dado.dice[0].value%2 == 0) {
        document.getElementById('btn-girar').disabled = true
        console.log(`*1 Vez Do Inimigo! Numero do dado: ${dado.dice[0].value}`)
        document.getElementById('mensagem').innerHTML = `Vez Do Inimigo! Numero do dado: ${dado.dice[0].value}`
        setTimeout(() => turnoDoOponente(),3000)
    }else{
        document.getElementById('btn-girar').disabled = true
        console.log(`Sua Vez! Numero do dado: ${dado.dice[0].value}`)
        document.getElementById('mensagem').innerHTML = `Sua Vez! Numero do dado: ${dado.dice[0].value}`
        setTimeout(() => document.getElementById('mensagem').innerHTML = `Selecione uma Opção`,2000)
        setTimeout(() => acoes.style.display = 'block', 2000)
    }
}

/*async function teste(){
    let numero_dado = await atualizarDado()
    if (numero_dado%2 == 0) {
        alert(`*1 Vez Do Inimigo! Numero do dado: ${numero_dado}`)
        turnoDoOponente()
    }else{
        alert(`*2 Sua Vez! Numero do dado: ${numero_dado}`)
        acoes.style.display = 'block'
    }
}*/

//O turno do oponente causa dano no hp do usuario
function turnoDoOponente(){
    vidaDoHeroi = vidaDoHeroi - monstro.dano
    hpAtual.style.color = 'red'
    
    //console.log(`Você Sofreu um dano de: ${monstro.dano}`)
    document.getElementById('mensagem').innerHTML = `Você Sofreu um dano de: ${monstro.dano}`

    verificarVidaDoHeroi(vidaDoHeroi)
    atualizarVidaDoHeroi(vidaDoHeroi)
    setTimeout(() => document.getElementById('mensagem').innerHTML = ``, 3000)
    setTimeout(() => document.getElementById('btn-girar').disabled = false, 3000)
    setTimeout(() => hpAtual.style.color = 'black',3000)
}

//Executa a habilidade 1 do usuario causando dano no hp do inimigo
function hab1(){
    vidaAtualInimigo.style.color = 'red'
    document.getElementById('hab2').disabled = true
    document.getElementById('hab3').disabled = true
    document.getElementById('item').disabled = true
    //console.log(personagem.poderes[0].dano)
    let danoDoAtkRecalculado = personagem.poderes[0].dano * (personagem.forca + (0.1 * personagem.forca))
    vidaDoMonstro = vidaDoMonstro - danoDoAtkRecalculado
    //alert(`Voce usou a habilidade: ${personagem.poderes[0].nome} e causou ${danoDoAtkRecalculado} de dano`)
    document.getElementById('mensagem').innerHTML = `Voce usou a habilidade: ${personagem.poderes[0].nome} e causou ${danoDoAtkRecalculado.toFixed(2)} de dano`
    verificarVidaDoMmonstro(vidaDoMonstro)
    atualizarVidaDoMonstro(vidaDoMonstro)
    setTimeout(() => document.getElementById('mensagem').innerHTML = '',3000)
    setTimeout(() => acoes.style.display = 'none',3000)
    setTimeout(() => document.getElementById('btn-girar').disabled = false, 3000)
    setTimeout(() => document.getElementById('hab2').disabled = false, 3000)
    setTimeout(() => document.getElementById('hab3').disabled = false, 3000)
    setTimeout(() => document.getElementById('item').disabled = false, 3000)
    setTimeout(()=> vidaAtualInimigo.style.color = 'black',3000)
}

//Executa a habilidade 2 do usuario causando dano no hp do inimigo
function hab2(){
    vidaAtualInimigo.style.color = 'red'
    document.getElementById('hab1').disabled = true
    document.getElementById('hab3').disabled = true
    document.getElementById('item').disabled = true
    //console.log(personagem.poderes[0].dano)
    let danoDoAtkRecalculado = personagem.poderes[1].dano * (personagem.forca + (0.1 * personagem.forca))
    vidaDoMonstro = vidaDoMonstro - danoDoAtkRecalculado
    //alert(`Voce usou a habilidade: ${personagem.poderes[1].nome} e causou ${danoDoAtkRecalculado} de dano`)
    document.getElementById('mensagem').innerHTML = `Voce usou a habilidade: ${personagem.poderes[1].nome} e causou ${danoDoAtkRecalculado.toFixed(2)} de dano`
    verificarVidaDoMmonstro(vidaDoMonstro)
    atualizarVidaDoMonstro(vidaDoMonstro)
    setTimeout(() => document.getElementById('mensagem').innerHTML = '',3000)
    setTimeout(() => acoes.style.display = 'none',3000)
    setTimeout(() => document.getElementById('btn-girar').disabled = false, 3000)
    setTimeout(() => document.getElementById('hab1').disabled = false, 3000)
    setTimeout(() => document.getElementById('hab3').disabled = false, 3000)
    setTimeout(() => document.getElementById('item').disabled = false, 3000)
    setTimeout(()=> vidaAtualInimigo.style.color = 'black',3000)
}

//Executa a habilidade 3 do usuario causando dano no hp do inimigo
function hab3(){
    vidaAtualInimigo.style.color = 'red'
    document.getElementById('hab1').disabled = true
    document.getElementById('hab2').disabled = true
    document.getElementById('item').disabled = true
    //console.log(personagem.poderes[0].dano)
    let danoDoAtkRecalculado = personagem.poderes[2].dano * (personagem.forca + (0.1 * personagem.forca))
    vidaDoMonstro = vidaDoMonstro - danoDoAtkRecalculado
    //alert(`Voce usou a habilidade: ${personagem.poderes[2].nome} e causou ${danoDoAtkRecalculado} de dano`)
    document.getElementById('mensagem').innerHTML = `Voce usou a habilidade: ${personagem.poderes[2].nome} e causou ${danoDoAtkRecalculado.toFixed(2)} de dano`
    verificarVidaDoMmonstro(vidaDoMonstro)
    atualizarVidaDoMonstro(vidaDoMonstro)
    setTimeout(() => document.getElementById('mensagem').innerHTML = '',3000)
    setTimeout(() => acoes.style.display = 'none',3000)
    setTimeout(() => document.getElementById('btn-girar').disabled = false, 3000)
    setTimeout(() => document.getElementById('hab1').disabled = false, 3000)
    setTimeout(() => document.getElementById('hab2').disabled = false, 3000)
    setTimeout(() => document.getElementById('item').disabled = false, 3000)
    setTimeout(()=> vidaAtualInimigo.style.color = 'black',3000)
}

//variaveis relacionada a cura
let quantidadeDeCura = 4;
let resta = quantidadeDeCura;
let usos = 0;

//Essa função adiciona 20 pontos no hp do usuario
function itemDeCura(){
    document.getElementById('hab1').disabled = true
    document.getElementById('hab2').disabled = true
    document.getElementById('hab3').disabled = true

    document.getElementById('item').innerHTML = `Itens de Cura: ${resta}`
    if (usos<quantidadeDeCura) {
        hpAtual.style.color = 'aqua'
        vidaDoHeroi = vidaDoHeroi + 20
        atualizarVidaDoHeroi(vidaDoHeroi)
        usos++
        resta--
        document.getElementById('item').innerHTML = `Itens de Cura: ${resta}`
        document.getElementById('mensagem').innerHTML = `Você usou um item de cura! Sua vida aumentou 20 Pontos`
        setTimeout(() => document.getElementById('mensagem').innerHTML = '',3000)
        setTimeout(() => acoes.style.display = 'none',3000)
        setTimeout(() => document.getElementById('btn-girar').disabled = false, 3000)
        setTimeout(() => document.getElementById('hab1').disabled = false, 3000)
        setTimeout(() => document.getElementById('hab2').disabled = false, 3000)
        setTimeout(() => document.getElementById('hab3').disabled = false, 3000)
        setTimeout(() => hpAtual.style.color = 'black',3000)
    }else{
        alert('Você já usou todos os itens de cura!')
    }
    
}

//Atualiza a vida do héroi sempre que é chamada
function atualizarVidaDoHeroi(novaVida){
    hpAtual.innerHTML = Number(novaVida).toFixed(2)
}

//Atualiza a vida do monstro sempre que é chamada
function atualizarVidaDoMonstro(novaVida){
    vidaAtualInimigo.innerHTML = Number(novaVida).toFixed(2)
}

//verifica se a vida do monstro chagou a 0
function verificarVidaDoMmonstro(vida){
    if (vida<=0) {
        document.getElementById('mensagem-morte').innerHTML = 'O inimigo está morto! Recarregando a página'
        //alert('O inimigo está morto! Clique em Ok para reiniciar')
        //monstroEstaVivo = false
        setTimeout(() => window.location.reload(),3000)
    }
}

function verificarVidaDoHeroi(vida){
    if (vida<= 0) {
        //heroiEstaVivo = false;
        //alert('Você morreu! Clique em ok para reiniciar')
        setTimeout(() => document.getElementById('mensagem-morte').innerHTML = 'Você morreu! Recarregando a página', 3000)
        setTimeout(() => window.location.reload(),3000)
    }
}

function visualizarPersonagem(){
    window.location.href ='visualizarPersonagem.html'
}