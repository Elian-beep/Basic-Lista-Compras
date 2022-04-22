let lista = [];

let novoItem = document.querySelector('#novoItem');
let btnNovoItem = document.querySelector('#btnNovoItem');
let items = document.querySelector('#items');

btnNovoItem.addEventListener('click', (e) => {
    inserirItem({ nome: novoItem.value, id: null }); //Insere um objeto na função
    novoItem.value = '';
})



//------------------------------FUNÇÃO PARA GERAR UM ID ALEATÓRIO ENTRE 0-8000
function gerarId(){
    return Math.floor(Math.random() * 8000);
}



//------------------------------FUNÇÃO PARA ADICIONAR UM NOVO ITEM
function inserirItem(item, novoItem = true){//Se não houver um novo item, a var retorna false
    lista.push(item); //Adicina o objeto novo item na lista
    items.appendChild(criarItemLista(item)); //Adiciona uma nova tag filha na lista

    if(novoItem){ //Se for um novo item
        sessionStorage.setItem('listaDeCompras', JSON.stringify(lista)); //Armazenando no Storage o novo item da lista
    }
}



//------------------------------FUNÇÃO PARA CRIAR AS TAGS DO NOVO ITEM
function criarItemLista(item){
    let li = document.createElement('li'); //Cria uma tag li em uma variavel
    let btnHtml = '<button onClick="deletarItem('+item.id+')">Deletar</button>'; //Btn de deletar do item especifico
    
    li.innerHTML = item.nome + '&nbsp;&nbsp;' + btnHtml;
    li.style.marginBottom = '15px';
    li.id = item.id;

    return li;
}