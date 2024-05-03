import { Link } from "react-router-dom";

import styles from "../css/Footer.module.css";

import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaPhone } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";

var facebook = "https://www.facebook.com/p/Comercial-Stephane-100080010133353/";
var instagram = "https://www.instagram.com/comercialstephane";

function Footer() {
    return(
        <div className={styles.footer}>
            <div className={styles.navigation}>
                <ul>
                    <span>Contatos</span>
                    <li><FaPhone /> 75 3272-1985</li>
                    <li><FaWhatsapp /> 75 9124-2421</li>
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
                    <li><Link to="/sobrenos">Sobre Nós</Link></li>
                </ul>
            </div>

            <div className={styles.copy}>

            </div>
        </div>
    )
}

export default Footer;