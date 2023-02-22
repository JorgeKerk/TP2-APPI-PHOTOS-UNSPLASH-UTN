import React from 'react';
import styles from './Loader.module.css'

// ANIMACION QUE MUESTRA PUNTOS DE ESPERA GIRANDO HORIZONTALMENTE CUANDO SE DEMORA EN CARGAR LAS IMAGENES 
const Loader = ()=> {
    return(
        <div className= {styles.divContainer}>
            <div className={ styles.lds_ellipsis } ><div></div><div></div><div></div><div></div></div>
        </div>
    )
}

export default Loader