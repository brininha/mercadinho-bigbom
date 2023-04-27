// Função básica, fundamental, essencial, primordial...
listar();

// Função de filtragem, ativada ao realizar uma pesquisa pelo nome.
function filtrar() {
    let filtro = document.getElementById('filtro').value;
    listar(filtro, undefined);
}

// Função organizadora, ativada ao selecionar uma categoria do menu.
function categorizar(categoria) {
    let catg = categoria;
    listar(undefined, catg);
}

// Todas as listagens: padrão, filtrada e categorizada.
function listar(filtro, categoria) {
    axios.get('http://localhost:8080/produtos/')
        .then((resposta) => {
            let dados = resposta.data
            let lista = document.getElementById("lista");
            let produtos = "";
            dados.forEach(dado => {
                if (filtro == undefined && categoria == undefined) {
                    produtos += encurtador(dado);
                } else if (filtro == undefined && categoria != undefined) {
                    if (dado.categoria.indexOf(categoria) != -1) {
                        produtos += encurtador(dado);
                    }
                } else if (filtro != undefined && categoria == undefined) {
                    if (dado.nome.toUpperCase().indexOf(filtro.toUpperCase()) != -1) {
                        produtos += encurtador(dado);
                    }
                }
            });
            lista.innerHTML = produtos;
        })
}

// Função destinada ao envio de dados pelo formulário.
function enviar() {
    const dados = {
        nome: document.getElementById("nome").value,
        categoria: document.getElementById("categoria").value,
        qtde: document.getElementById("qtde").value,
        valor: document.getElementById("valor").value,
        img: document.getElementById("img").value
    }

    axios.post('http://localhost:8080/produtos/', dados)
        .then((resposta) => {
            console.log(resposta.data);
        })
    
    alert("Produto cadastrado com sucesso!");
}

// Função destinada à alteração de dados.
function alterar(){
    const dados = {
        id: document.getElementById("alt-id").value,
        nome: document.getElementById("alt-nome").value,
        categoria: document.getElementById("alt-categoria").value,
        qtde: document.getElementById("alt-qtde").value,
        valor: document.getElementById("alt-valor").value,
        img: document.getElementById("alt-img").value
    }

    axios.put('http://localhost:8080/produtos/', dados)
        .then((resposta) => {
            alert(resposta.data);
        })
}

// Função destinada à eliminação de dados.
function eliminar() {
    const dado = {
        id: document.getElementById("del-id").value
    }

    axios.put('http://localhost:8080/exclusao/', dado)
        .then((resposta) => {
            alert(resposta.data);
        })
}

// Função com um código que se repete muitas vezes.
function encurtador(dado) {
    produtos = "";
    produtos += `<tr class='alignment'>`;
    produtos += `<td>${dado._id}</td>`;
    produtos += `<td><div style="text-align: center;"><img src="${dado.img}" width="100px"></div></td>`;
    produtos += `<td>${dado.nome}</td>`;
    produtos += `<td>${dado.qtde}</td>`;
    produtos += `<td>${dado.categoria}</td>`;
    produtos += `<td>R$ ${dado.valor.toFixed(2)}</td>`;
    produtos += `<td><div class="btn-group btn-group-sm" role="group"><button type="button" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#updateModal">Editar</button><button type="button" class="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#deleteModal">Excluir</button></div></td>`;
    produtos += "</tr>";
    return produtos;
}