import axios from 'axios'
import backgroundImg from '../../assets/Background.jpg'
import React, { useEffect, useState } from 'react';
import styles from './Background.module.css'

const { VITE_ACCESS_KEY } = import.meta.env;

// MUESTRA IMÁGENES EN EL FONDO DEL PROYECTO, CAMBIAN CADA 1 MINUTO
const Background = ( {children} )=> {
    // Array de imágenes a mostrar
    const [img, setImg] = useState([])
    // Indice del array de imagenes donde está la imagen a motrar
    const [ind, setInd] = useState( 0 )
    // Cantidad de imagenes que se motrarán en el background
    const cantImgs = 10
    // Variable utilizada para cargar las imágenes por primera y única vez al iniciar este componente
    let addImages = false

    // OBTIENE LAS IMÁGENES DE LA API Y LAS CARGA EN EL ARRAY DE IMÁGENES
    const imgBackground = async ()=> { 
            const apiRoot = 'https://api.unsplash.com' 
            const URL = `${ apiRoot }/photos/random/?client_id=${ VITE_ACCESS_KEY }&count=${cantImgs}&query=wallpaper`
            const { data } = await axios(URL)

            setImg(data)           
    }

    // CAMBIA SETEA EL INDICE DEL ARRAY DE IMÁGENES CON UN NUEVO INDICE CADA 1 MINUTO (60000 MILISEGUNDOS)
    const selectImage = ()=>{
        setTimeout(()=>{
            const newInd = Math.floor( Math.random() * ( cantImgs ) )
            setInd( newInd )
            selectImage()
        },60000)
    }

    // SE EJECUTA UNA SOLA VEZ, AL INICIAR ESTE COMPONENTE
    useEffect( ()=>{
        // Controla que el llamado a la API por las imágenes se ralice una unica vez y no que se recargue 2veces
        if( !addImages ){ 
            // Al setear addImages en true, imgBackground se ejecuta una sola vez
            addImages = true
            imgBackground()
            // Dispara por primera vez el evento para cambiar el indice del array de imagenes cada 1 minuto
            selectImage()
        } 
    }, [])
    
    return(
        <div className= { styles.background }>
            {/* Img se llama cada vez que el valor de ind es cambiado por la funcion selectImage */}
            {
                img.length
                ? <img className= { styles.image } src= { img[ind]?.urls?.full? img[ind]?.urls?.full : '' } alt="Imagen de fondo" />
                : <img className= { styles.image } src= { backgroundImg } alt="Imagen de fondo" />
            }
            { children }
        </div>
    )
}

export default Background