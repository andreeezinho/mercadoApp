import {FaHandsWash} from "react-icons/fa"
import {FaUtensils} from "react-icons/fa"
import {FaBacon} from "react-icons/fa"
import {FaAppleAlt} from "react-icons/fa"
import {FaWineGlass} from "react-icons/fa"

function NavCategoria() {
    return(
        <ul>
            <a href="#alimentos"><li><FaUtensils /> Alimentos</li></a>
            <a href="#higiene"><li><FaHandsWash /> Higiene</li></a>
            <a href="#acougue"><li><FaBacon /> Açougue</li></a>
            <a href="#hortifruti"><li><FaAppleAlt /> Hortifrut</li></a>
            <a href="#adega"><li><FaWineGlass /> Adega</li></a>
        </ul>
    )
}

export default NavCategoria;