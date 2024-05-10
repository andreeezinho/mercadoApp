import { Link } from "react-router-dom";

import styles from "../css/Footer.module.css";

import img from "../img/logoNav.png";

import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaPhone } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { FaInfo } from "react-icons/fa";


var facebook = "https://www.facebook.com/p/Comercial-Stephane-100080010133353/";
var instagram = "https://www.instagram.com/comercialstephane";

function Footer() {
    return(
        <footer className={styles.footer}>
            <div className={styles.logo}>
                <img src={img} alt="Logo" />
            </div>

            <div className={styles.navigation}>
                <ul>
                    <span>Contatos</span>
                    <li><FaPhone /><a href="###">75 3272-1985</a></li>
                    <li><FaWhatsapp /><a href="###">75 9124-2421</a></li>
                </ul>
                
                <ul>
                    <span>Redes Socias</span>
                    <li>
                        <FaInstagram />
                        <a href={instagram}>Instagram</a>
                    </li>
                    <li>
                        <FaFacebook />
                        <a href={facebook}>Facebook</a>
                    </li>
                </ul>

                <ul>
                    <span>Nossa Empresa</span>
                    <li>
                        <FaInfo />
                        <Link to="/sobrenos">Sobre Nós</Link>
                    </li>
                </ul>
            </div>

            <div className={styles.copy}>
                <p>Comercial Stephane LTDA</p>
                <p><span>&copy;</span>Copyright by <span>andreeezinho</span>, todos os direitos reservados.</p>
                <p>Tucano, BA - 2024</p>
            </div>
        </footer>
    )
}

export default Footer;