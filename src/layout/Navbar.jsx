import { Link } from "react-router-dom";

import styles from "../css/Navbar.module.css";
import img from "../img/logoNav.png"
import {FaCartPlus} from "react-icons/fa";
import {FaBars} from "react-icons/fa";

function Navbar(){
    return(
        <nav className={styles.nav}>
            <div>
                <img src={img} alt="Logo" />
            </div>

            <Link to="/carrinho" className={styles.carrinho}><FaCartPlus /></Link>
            <input type="checkbox" id="ver" />
            <label htmlFor="ver"><FaBars /></label>

            <div className={styles.navigation}>
                

                <ul>
                    <li><Link to="/">Início</Link></li>

                    <li><Link to="/produtos">Produtos</Link></li>

                    <li><Link to="/pedidos">Pedidos</Link></li>

                    <li><Link to="/carrinho"><FaCartPlus /></Link></li>
                </ul>
            </div>

            <div className={styles.barra}>
                <label htmlFor="ver"> &equiv;</label>
                <ul>
                    <li><Link to="/">Início</Link></li>

                    <li><Link to="/produtos">Produtos</Link></li>

                    <li><Link to="/pedidos">Pedidos</Link></li>

                    <li><Link to="/carrinho">Seu carrinho</Link></li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar;