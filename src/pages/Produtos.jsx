import {useState, useEffect} from "react";

import styles from "../css/Produtos.module.css";

import {FaShoppingBasket} from "react-icons/fa";

function Produtos() {
    ///estado para armazenar os dados recebidos
    const [dados, setDados] = useState([]);

    ///estado para armazenar se der erro
    const [erro, setErro] = useState(null);

    //useEffect server para buscar os dados da api logo quando o componente(<Clientes />) for carregado
    useEffect(() => {

        //busca os dados 
        const buscarDados = async () => {
            try{
                ///fetch como requisição
                const response = await fetch("http://localhost:5000/produtos", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            ///verifica as respostas
            if(response.ok){
                const data = await response.json();

                //atualiza o estado com os dados
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


    const enviarParaCarrinho = async (produto) => {
        try {
            const response = await fetch("http://localhost:5000/carrinho", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(produto),
            });

            if (!response.ok) {
                setErro("Erro ao enviar o produto para o carrinho");
                console.error("Erro na resposta: ", response.statusText);
            }
        } catch (error) {
            setErro("Erro na solicitação");
            console.log("Erro na solicitação", error);
        }
    };

    return(

        <div className={styles.container}>
            <div className={styles.texto}>
                <FaShoppingBasket />
                <p>Adicione produtos no seu carrinho!</p>
            </div>

            <div className={styles.navCategoria}>
                <ul>
                    <li><a href="###">Alimentos</a></li>
                    <li><a href="###">Higiene</a></li>
                </ul>
            </div>

            <div className={styles.containerProdutos}>
                <div className={styles.categoria}>
                    <h1>ALIMENTOS</h1>
                </div>

                <div className={styles.containerCards}>
                    {  
                    ///renderiza os dados se tiver um ou mais
                    dados.length > 0 ? (
                        dados.map((alimentos, indexAlimentos) => (

                            // se categoria do produto for alimentos, gera a diva só de aliemtos
                            alimentos.categoria === "alimentos" ? (
                                <div key={indexAlimentos} className={styles.cardDiv}>
                                    <div><img src={alimentos.img} alt="img" /></div>
                                    <p>{alimentos.nome}</p>
                                    <p>R$ {alimentos.preco}</p>
                                    <button onClick={() => enviarParaCarrinho(alimentos)}>Comprar</button>
                                </div>
                            ):(<></>)
                        ))
                    ) : (
                        ///mensagem se nao tiver nada para exibir
                        <p>Produtos não registrados :/</p>
                    )}
                </div>
            </div>

            <div className={styles.containerProdutos}>
                <div className={styles.categoria}>
                    <h1>HIGIENE</h1>
                </div>
                
                <div className={styles.containerCards}> 
                    {  
                    ///renderiza os dados se tiver um ou mais
                    dados.length > 0 ? (
                        dados.map((higiene, indexHigiene) => (

                            // se categoria do produto for alimentos, gera a diva só de aliemtos
                            higiene.categoria === "higiene" ? (
                                <div key={indexHigiene} className={styles.cardDiv}>
                                    <div><img src={higiene.img} alt="img" /></div>
                                    <p>{higiene.nome}</p>
                                    <p>R$ {higiene.preco}</p>
                                    <button onClick={() => enviarParaCarrinho(higiene)}>Comprar</button>
                                </div>
                            ):(<></>)
                        ))
                    ) : (<></>)
                    }
                </div>
            </div>
        </div>
    )
}

export default Produtos;