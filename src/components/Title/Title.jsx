import React from 'react'
import styles from './Title.module.css'

// DESLIZA LA PÁGINA AL INICIO AL HACER CLICK EN EL TÍTULO
const handleClickGoOnTop = ()=>{
    window.scrollTo({
        top: 0, 
        behavior: 'smooth'
    })
}

// TITULO ANIMADO
const Title = ()=> {
    return(
        <>
            <h1 className= { styles.titleContent } onClick= { handleClickGoOnTop } >
                GALERÍA DE IMÁGENES
            </h1>
        </>
    )
}

export default Title