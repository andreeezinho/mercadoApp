import { Link } from "react-router-dom";

import styles from "../css/Navbar.module.css";
import img from "../img/logoNav.png"
import {FaCartPlus} from "react-icons/fa";
import {FaBars} from "react-icons/fa";

function Navbar(){
    return(
        <nav className={styles.nav}>
            <div>
                <Link to="/">
                    <img src={img} alt="Logo" />    
                </Link>
            </div>

            <Link to="/carrinho" className={styles.carrinho}><FaCartPlus /></Link>
            <input type="checkbox" id="ver" />
            <label htmlFor="ver"><FaBars /></label>

            <div className={styles.navigation}>
                <label htmlFor="ver"><FaBars /></label>
                <ul>
                    <li><Link to="/">Início</Link></li>

                    <li><Link to="/produtos">Produtos</Link></li>

                    <li><Link to="/pedidos">Pedidos</Link></li>

                    <li><Link to="/carrinho"><span>Seu carrinho</span><FaCartPlus /></Link></li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar;