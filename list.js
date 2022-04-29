let lista = [];

let novoItem = document.querySelector('#novoItem');
let btnNovoItem = document.querySelector('#btnNovoItem');
let items = document.querySelector('#items');
let boxCompleted = document.querySelector("#boxCompleted");

recuperarLista(); //Verificando se há dados salvos no storage

btnNovoItem.addEventListener('click', (e) => {
    if (novoItem.value != '') {
        inserirItem({ nome: novoItem.value, id: gerarId() }); //Insere um objeto na função
        novoItem.value = '';
    }else{
        return;
    }
})

novoItem.addEventListener('keypress', (e) => {
    if (e.keyCode == 13 && novoItem.value != '') {
        inserirItem({ nome:novoItem.value, id: gerarId() })
        novoItem.value = '';
    }
})



//------------------------------FUNÇÃO PARA RECUPERAR OS DADOS DA LISTA
function recuperarLista() {
    let listaItems = localStorage.getItem('listaDeCompras'); //Recupera as informações salvas no local storage do navgeador
    if (listaItems) { //Se houer items para serem recuperados
        let items = JSON.parse(listaItems); //Recupera as strings salvas convertendo para um JSON

        for (const item of items) { //Para cada item do JSON
            inserirItem(item, false); //Inserir um novo html como item ja existente
        }
    }
}



//------------------------------FUNÇÃO PARA GERAR UM ID ALEATÓRIO ENTRE 0-8000
function gerarId() {
    return Math.floor(Math.random() * 8000);
}



//------------------------------FUNÇÃO PARA ADICIONAR UM NOVO ITEM
function inserirItem(item, novoItem = true) {//Se não houver um novo item, a var retorna false
    lista.push(item); //Adicina o objeto novo item na lista
    items.appendChild(criarItemLista(item)); //Adiciona uma nova tag filha na lista

    if (novoItem) { //Se for um novo item
        localStorage.setItem('listaDeCompras', JSON.stringify(lista)); //Armazenando no Storage o novo item da lista
    }
}



//------------------------------FUNÇÃO PARA CRIAR AS TAGS DO NOVO ITEM
function criarItemLista(item) {
    let li = document.createElement('li'); //Cria uma tag li em uma variavel
    let boxCheck = '<input class="inputBoxCheck" id="boxCompleted" type="checkbox" />'
    let btnHtml = '<div class="areaBtnRemove"><button class="btnRemove" onClick="deletarItem(' + item.id + ')"><img class="icons-styled trash" src="assets/lixeira-de-reciclagem.png" alt=""></button></div>'; //Btn de deletar do item especifico
    let itemHtml = '<p>'+item.nome+'</p>';
    li.innerHTML = boxCheck + itemHtml + btnHtml;
    li.style.marginBottom = '15px';
    li.id = item.id;

    return li;
}



//------------------------------FUNÇÃO PARA REMOVER O ITEM DA LISTAE DO STORAGE
function deletarItem(id) {
    let indice = lista.findIndex(i => i.id == id); //Vai procurar o indice do elemento a ser apagado na lista de items (lista criada no incio do cod)

    if (indice < 0) {
        alert('O indice não foi encontrado');
        return;
    }

    lista.splice(indice, 1); //Removendo APENAS o elemento com o indice encontrado
    localStorage.setItem('listaDeCompras', JSON.stringify(lista)); // Atualiza a lista no storage
    document.getElementById('' + id + '').remove(); //Remove o elemento html do item
}



//------------------------------FUNÇÃO PARA MARCAR E DESMARCAR ITEM
function marcarItem(){
    if(boxCompleted.checked){
        console.log("clicado");
    }
}