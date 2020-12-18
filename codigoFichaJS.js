let nomePersonagem = document.getElementById('nome')
let idadePersonagem = document.getElementById('idade')
let classePersonagem = document.getElementsByName('classe')
let AtributoForcaPersonagem = document.getElementsByName('atributo_forca')
let AtributoVidaPersonagem = document.getElementsByName('atributo_vida')

let jaCriouPersonagem = localStorage.getItem('Personagem')
console.log(jaCriouPersonagem)

if (jaCriouPersonagem != null) {
    //console.log('entrou')
    //document.getElementById('divFicha').style.display = 'none';
    document.getElementById('divAviso').style.display = 'block'
}else{
    document.getElementById('divFicha').style.display = 'block';
    //document.getElementById('divAviso').style.display = 'block'
}

function qualClasse(){
    let classeEscolhida;
    for (let index = 0; index < classePersonagem.length; index++) {
        if (classePersonagem[index].checked) {
            classeEscolhida = classePersonagem[index].value
        }
    }
    return classeEscolhida;
}

function qualAtributoForca() {
    let valorDaForca;
    for (let index = 0; index < AtributoForcaPersonagem.length; index++) {
        if (AtributoForcaPersonagem[index].checked) {
            valorDaForca = AtributoForcaPersonagem[index].value;
        }
        
    }
    return valorDaForca;
}

function qualAtributoVida() {
    let valorVida;
    for (let index = 0; index < AtributoVidaPersonagem.length; index++) {
        if (AtributoVidaPersonagem[index].checked) {
            valorVida = AtributoVidaPersonagem[index].value;
        }
        
    }
    return valorVida;
}

function definirPoderes(){
    let classe = qualClasse()
    let poderes = [];

    if (classe == 'ladino') {
        let poder1 = {nome: 'Corte Fatal!', dano: 22}
        poderes.push(poder1);
        let poder2 = {nome: 'Ataque Furtivo!', dano: 30}
        poderes.push(poder2)
        let poder3 = {nome: 'Golpe Perfurador!', dano: 19}
        poderes.push(poder3)
    }else if (classe == 'barbaro') {
        let poder1 = {nome: 'Ataque Pesado!', dano: 38}
        poderes.push(poder1);
        let poder2 = {nome: 'Fúria Espartana!', dano: 25}
        poderes.push(poder2)
        let poder3 = {nome: 'Força Avassaladora!', dano: 30}
        poderes.push(poder3)
    } else if (classe == 'paladino') {
        let poder1 = {nome: 'Corte Transversal Divino!', dano: 27}
        poderes.push(poder1);
        let poder2 = {nome: 'Julgamento Divino!', dano: 36}
        poderes.push(poder2)
        let poder3 = {nome: 'Bicuda na costela kkkkkj', dano: 70}
        poderes.push(poder3)
    }

    return poderes;
}

function definirHp (){
    let hp;
    let vida = Number(qualAtributoVida());
    
    if (vida == 1) {
        hp = 200 * 1.1;
    }else if (vida == 2) {
        hp = 200 * 1.2
    }else if (vida == 3) {
        hp = 200 * 1.3
    }else if (vida == 4) {
        hp = 200 * 1.4
    }else if (vida == 5) {
        hp = 200 * 1.5
    }

    return hp;
}

function criarPersonagem (){
    let nomeDoPErsonagenm = nomePersonagem.value;
    let idadeDoPersonagem = Number(idadePersonagem.value);
    let classeDoPersonagem = qualClasse();
    let forcaDoPersonagem = Number(qualAtributoForca());
    let vidaDoPersonagem = Number(qualAtributoVida());
    let poderesDoPersonagem = definirPoderes();
    let hp = definirHp();

    let personagem = {
        nome: nomeDoPErsonagenm,
        idade: idadeDoPersonagem,
        classe: classeDoPersonagem,
        forca: forcaDoPersonagem,
        vida: vidaDoPersonagem,
        poderes: poderesDoPersonagem,
        hp: hp
    }
    
    if (personagem.nome && personagem.classe && personagem.forca && personagem.vida && personagem.poderes && personagem.hp) {
        alert('Personagem Criado')
        localStorage.setItem('Personagem', JSON.stringify(personagem))
        window.location.href = 'visualizarPersonagem.html'
    }else{
        alert('Houve Um Erro Na Criação Do Personagem!')
        //setTimeout(window.location.reload(), 1000*10)
        window.location.reload()
    }

}

function irPersonagem(){
    window.location.href = 'visualizarPersonagem.html'
}

