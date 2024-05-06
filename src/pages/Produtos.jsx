import {useState, useEffect} from "react";

import styles from "../css/Produtos.module.css";

import {FaShoppingBasket} from "react-icons/fa";

import NavCategoria from "../components/NavCategoria";

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

    ////!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    ///
    ///
    /// ADICIONAR A BARRA DE CATEGORIA NO NAVBAR LATERAL DA TELA MOBILE
    ///
    ///
    ///!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    return(
        <div className={styles.container}>
            <div className={styles.texto}>
                <FaShoppingBasket />
                <p>Adicione produtos no seu carrinho!</p>
            </div>

            <div id="navCategoria" className={styles.navCategoria}>
                <NavCategoria />
            </div>

            <div className={styles.containerProdutos}>
                <div className={styles.categoria}>
                    <h1 id="alimentos">ALIMENTOS</h1>
                </div>

                <div className={styles.containerCards}>
                    {  
                    ///renderiza os dados se tiver um ou mais
                    dados.length > 0 ? (
                        dados.map((alimentos, indexAlimentos) => (

                            // se categoria do produto for alimentos, gera a div só de alimentos
                            alimentos.categoria === "alimentos" ? (
                                <div key={indexAlimentos} className={styles.cardDiv}>
                                    <div><img src={alimentos.img} alt="img" /></div>
                                    <p>{alimentos.nome}</p>
                                    <p><b>R$ {alimentos.preco}</b></p>
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
                    <h1 id="higiene">HIGIENE</h1>
                </div>
                
                <div className={styles.containerCards}> 
                    {  
                    ///renderiza os dados se tiver um ou mais
                    dados.length > 0 ? (
                        dados.map((higiene, indexHigiene) => (

                            // se categoria do produto for higiene, gera a div só de higiene
                            higiene.categoria === "higiene" ? (
                                <div key={indexHigiene} className={styles.cardDiv}>
                                    <div><img src={higiene.img} alt="img" /></div>
                                    <p>{higiene.nome}</p>
                                    <p><b>R$ {higiene.preco}</b></p>
                                    <button onClick={() => enviarParaCarrinho(higiene)}>Comprar</button>
                                </div>
                            ):(<></>)
                        ))
                    ) : (<></>)
                    }
                </div>
            </div>

            <div className={styles.containerProdutos}>
                <div className={styles.categoria}>
                    <h1 id="acougue">AÇOGUE</h1>
                </div>
                
                <div className={styles.containerCards}> 
                    {  
                    ///renderiza os dados se acougue tiver um ou mais
                    dados.length > 0 ? (
                        dados.map((acougue, indexAcougue) => (

                            // se categoria do produto for açogue, gera a div só de açogue
                            acougue.categoria === "açougue" ? (
                                <div key={indexAcougue} className={styles.cardDiv}>
                                    <div><img src={acougue.img} alt="img" /></div>
                                    <p>{acougue.nome}</p>
                                    <p><b>R$ {acougue.preco}</b></p>
                                    <button onClick={() => enviarParaCarrinho(acougue)}>Comprar</button>
                                </div>
                            ):(<></>)
                        ))
                    ) : (<></>)
                    }
                </div>
            </div>

            <div className={styles.containerProdutos}>
                <div className={styles.categoria}>
                    <h1 id="hortifruti">HORTIFRUTI</h1>
                </div>
                
                <div className={styles.containerCards}> 
                    {  
                    ///renderiza os dados se hortifruti tiver um ou mais
                    dados.length > 0 ? (
                        dados.map((hortifruti, indexHortifruti) => (

                            // se categoria do produto for hortifruti, gera a div só de hortifruti
                            hortifruti.categoria === "hortifruti" ? (
                                <div key={indexHortifruti} className={styles.cardDiv}>
                                    <div><img src={hortifruti.img} alt="img" /></div>
                                    <p>{hortifruti.nome}</p>
                                    <p><b>R$ {hortifruti.preco}</b></p>
                                    <button onClick={() => enviarParaCarrinho(hortifruti)}>Comprar</button>
                                </div>
                            ):(<></>)
                        ))
                    ) : (<></>)
                    }
                </div>
            </div>

            <div className={styles.containerProdutos}>
                <div className={styles.categoria}>
                    <h1 id="adega">ADEGA</h1>
                    <a href="#navCategoria">Voltar para o início</a>
                </div>
                
                <div className={styles.containerCards}> 
                    {  
                    ///renderiza os dados se adega tiver um ou mais
                    dados.length > 0 ? (
                        dados.map((adega, indexAdega) => (

                            // se categoria do produto for adega, gera a div só de adega
                            adega.categoria === "adega" ? (
                                <div key={indexAdega} className={styles.cardDiv}>
                                    <div><img src={adega.img} alt="img" /></div>
                                    <p>{adega.nome}</p>
                                    <p><b>R$ {adega.preco}</b></p>
                                    <button onClick={() => enviarParaCarrinho(adega)}>Comprar</button>
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