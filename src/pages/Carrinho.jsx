import {useState, useEffect} from "react"

function Carrinho() {
    ///estado para armazenar os dados recebidos
    const [dados, setDados] = useState([]);

    ///estado para armazenar se der erro
    const [erro, setErro] = useState(null);

    //useEffect server para buscar os dados da api logo quando o componente(<Carrinho />) for carregado
    useEffect(() => {

        //busca os dados 
        const buscarDados = async () => {
            try{
                ///fetch como requisição get
                const response = await fetch("http://192.168.100.231:5000/carrinho", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            ///verifica as respostas
            if(response.ok){
                const data = await response.json();

                //atualiza o estado dos dados
                setDados(data);
            }else{
                ///manda mensagem de erro
                setErro("Erro aos buscar os dados dos clientes");
                console.error("Erro na resposta: ", response.statusText);
            }   
            }catch(error){
                ////manda mensagem de erro de requisição
                setErro("Erro na solicitação");
                console.log("Erro na solicitação", error);
            }
        }

        ///chama a toda essa função
        buscarDados();

    }, [])

    const removerProduto = async(id) => {
            ///filter() cria novo array "carrinho", filter vê todos os dados e retorna outro array com a condição especificada
            const carrinho = dados.filter(produto => produto.id !== id); ///condição: se o id for diferente dos outros 
            setDados(carrinho); //atualiza o estado dos dados para a nova array carrinho, que só vai ter os dados que nao foram apagados

            try{
                const response = await fetch(`http://192.168.100.231:5000/carrinho/${id}`, { ///dá o fetch no id específico
                    method: "DELETE", ///método de deletar
                    headers: {
                        "Content-Type": "application/json"
                    },
                });

                //se der erro
                if (!response.ok) {
                    setErro("Erro ao remover o produto do carrinho");
                    console.error("Erro na resposta: ", response.statusText);
                }

            }catch(error){ ///se der erro no try
                setErro("Erro ao realizar a requisição para remover o produto do carrinho");
                console.error("Erro na requisição: ", error);
            } 
    }

    return(
        <div>
            {
                ///se tiver um ou mais dados, ele mapeia a div que foi escrita
                dados.length > 0 ? (
                    dados.map((produto, index) => (
                        <div key={index}>
                            <img src={produto.img} alt="img" />
                            <p>{produto.nome}</p>
                            <p>{produto.preco}</p>
                            <p>{produto.quantidade}</p>
                            <button>++</button>
                            {/* botao de remover produto */}
                            <button onClick={() => removerProduto(produto.id)}>Remover</button> 
                        </div>
                    ))
                ) : (
                    <p>Não há nada no carrinho</p>
                )
            }
        </div>
    )
}

export default Carrinho;