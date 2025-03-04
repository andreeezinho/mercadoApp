import {useState, useEffect} from "react";
import { Link } from "react-router-dom"

import styles from "../css/Carrinho.module.css";

import {FaCartPlus} from "react-icons/fa";
import {FaTrash} from "react-icons/fa";

function Carrinho() {
    ///estado para armazenar os dados recebidos
    const [dados, setDados] = useState([]);

    ///estado para armazenar se der erro
    const [erro, setErro] = useState(null);

    ///armazena dados do formulário de confirmação
    const [FormData, setFormData] = useState({
        nome: '',
        telefone: '',
        endereco: ''
    });

    ///atualiza os valores dos inputs
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...FormData,
            [name]: value,
        });
    };


    //useEffect server para buscar os dados da api logo quando o componente(<Carrinho />) for carregado
    useEffect(() => {

        //busca os dados 
        const buscarDados = async () => {
            try{
                ///fetch como requisição get
                const response = await fetch("http://192.168.100.113:5000/carrinho", {
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

    const aumentaQuant = async(id, quantidade) => {
        const atualizaQuant = quantidade + 1;

        try{
            const response = await fetch(`http://localhost:5000/carrinho/${id}`, { ///dá o fetch no id específico
                method: "PATCH", ///método de atualizar
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({quantidade: atualizaQuant})
            });

            //se der erro
            if (!response.ok) {
                setErro("Erro em aumentar a quantidade");
                console.error("Erro em aumentar a quantidade: ", response.statusText);
            }
        
            if(response.ok){
                const novosDados = dados.map(produto => {
                    if(produto.id === id){
                        return{...produto, quantidade: atualizaQuant}
                    }

                    return produto;
                });

                setDados(novosDados);
            }

        }catch(error){ ///se der erro no try
            setErro("Erro ao realizar a requisição para remover o produto do carrinho");
            console.error("Erro na requisição: ", error);
        }     
    }

    const reduzQuant = async(id, quantidade) => {
        if(quantidade > 1){
            const atualizaQuant = quantidade - 1;

            try{
                const response = await fetch(`http://localhost:5000/carrinho/${id}`, { ///dá o fetch no id específico
                    method: "PATCH", ///método de atualizar
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({quantidade: atualizaQuant})
                });
    
                //se der erro
                if (!response.ok) {
                    setErro("Erro em aumentar a quantidade");
                    console.error("Erro em aumentar a quantidade: ", response.statusText);
                }
            
                if(response.ok){
                    const novosDados = dados.map(produto => {
                        if(produto.id === id){
                            return{...produto, quantidade: atualizaQuant}
                        }
    
                        return produto;
                    });
    
                    setDados(novosDados);
                }
    
            }catch(error){ ///se der erro no try
                setErro("Erro ao realizar a requisição para remover o produto do carrinho");
                console.error("Erro na requisição: ", error);
            } 
        }

            
    }

    ///somar preço total do carrinho
    const somarTudo = () => {
        if(dados.length === 0 || !Array.isArray(dados)){
            return 0;
        }

        const soma = dados.reduce((total, produto) => {
            return total + (produto.preco * produto.quantidade)
        }, 0)

        return soma;
    }

    const removerProduto = async(id) => {
            ///filter() cria novo array "carrinho", filter vê todos os dados e retorna outro array com a condição especificada
            const carrinho = dados.filter(produto => produto.id !== id); ///condição: se o id for diferente dos outros 
            setDados(carrinho); //atualiza o estado dos dados para a nova array carrinho, que só vai ter os dados que nao foram apagados

            try{
                const response = await fetch(`http://localhost:5000/carrinho/${id}`, { ///dá o fetch no id específico
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

    const enviarPedido = async (somarTudo) => {
        try {
            const response = await fetch("http://localhost:5000/pedidos", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },  
                body: JSON.stringify({"precoTotal": somarTudo, "nome": FormData.nome, "telefone": FormData.telefone, "endereco": FormData.endereco}),
            });

            if (!response.ok) {
                setErro("Erro ao enviar o produto para os pedidos...");
                console.error("Erro na resposta: ", response.statusText);
            }
        } catch (error) {
            setErro("Erro na solicitação");
            console.log("Erro na solicitação", error);
        }
    };

    return(
        <div className={styles.container}>
            <div className={styles.topTexto}><FaCartPlus /><h1>Seu carrinho de compras</h1></div>

            <div className={styles.containerCards}>
                <div className={styles.menuTabela}>
                    <ul>
                        <li className={styles.produto}>Produto</li>
                        <li className={styles.preco}>Preço</li>
                        <li className={styles.quantidade}>Quantidade</li>
                    </ul>
                </div>

                {
                    ///se tiver um ou mais dados, ele redenriza os dados nessa div
                    dados.length > 0 ? (
                        dados.map((produto, index) => (
                            <div key={index} className={styles.divProduto}>
                                <img src={produto.img} alt="img" />
                                <p className={styles.nome}>{produto.nome}</p>
                                <span>R$ {produto.preco}</span>
                                <div>
                                    <button className={styles.btnQuant} onClick={() => reduzQuant(produto.id, produto.quantidade)}>-</button>
                                    <span>{produto.quantidade}</span>
                                    <button onClick={() => aumentaQuant(produto.id, produto.quantidade)}>+</button>
                                    
                                    {/* botao de remover produto */}
                                    <button className={styles.remover} onClick={() => removerProduto(produto.id)}><FaTrash /></button>
                                </div> 
                            </div>
                        ))
                    ) : (
                        <p>Não há nada no carrinho :/</p>
                    )
                }
            </div>

            <div className={`${styles.menuTabela} ${styles.mostrarPreco}`}>
                <ul>
                    <li className={styles.produto}></li>
                    <li className={styles.preco}>Total</li>
                    <li className={styles.quantidade}>R$ {somarTudo()}</li>
                </ul>
            </div>

            <div className={styles.confirmar}>
                {
                    dados.length > 0 ?(
                        <div className={styles.info}>
                            <h2>Insiras suas informações para finalizar</h2>
                            <form onSubmit={enviarPedido}>
                                <input type="text" placeholder="Insira o seu nome" name="nome" value={FormData.nome} onChange={handleChange} required/>
                                <input type="number" placeholder="Insira o seu telefone" name="telefone" value={FormData.telefone} onChange={handleChange} required />
                                <input type="text" placeholder="Insira o seu endereço (Rua, bairro, n°...)" name="endereco" value={FormData.endereco} onChange={handleChange} required />
                                <Link to="/pedidos"><button onClick={() => enviarPedido(somarTudo())}>Finalizar</button></Link>
                            </form>
                        </div>
                    ):(<></>)
                }
            </div>

            
        </div>
    )
}

export default Carrinho;