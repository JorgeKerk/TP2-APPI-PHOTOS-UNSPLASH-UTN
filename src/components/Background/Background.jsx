import axios from 'axios'
import backgroundImg from '../../assets/Background.jpg'
import React, { useEffect, useState } from 'react'
import styles from './Background.module.css'

const { VITE_ACCESS_KEY } = import.meta.env

// MUESTRA IMÁGENES EN EL FONDO DEL PROYECTO, CAMBIAN CADA 1 MINUTO
const Background = ( {children, handleClick} )=> {
    // Array de imágenes a mostrar
    const [img, setImg] = useState([])
    // Indice del array de imagenes donde está la imagen a motrar
    const [ind, setInd] = useState( -2 )
    // Cantidad de imagenes que se motrarán en el background
    const cantImgs = 10
    // Variable utilizada para cargar las imágenes por primera y única vez al iniciar este componente
    let addImages = false

    // OBTIENE LAS IMÁGENES DE LA API Y LAS CARGA EN EL ARRAY DE IMÁGENES
    const imgBackground = async ( )=> { 
        try{
            const apiRoot = 'https://api.unsplash.com' 
            const URL = `${ apiRoot }/photos/random/?client_id=${ VITE_ACCESS_KEY }&count=${cantImgs}&query=wallpaper`
            const { data } = await axios(URL)

            // Carga las imágenes de fondo
            setImg(data)
            // Setea el indice del array de imagenes en cero
            setInd(0)
            // Dispara por primera vez el evento para cambiar el indice del array de imagenes cada 1 minuto
            selectImage()
            // Carga las primeras imagenes/tarjetas aleatorias
            handleClick('')
        } catch ( error ) {
            // Setea el indice en -1 para disparar la imagen de fondo por defecto
            setInd( -1 )
            // Envia el error generado a la funcion de cargar imágenes para su posterior control
            handleClick('', error.message)
        }
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
        } 
    }, [])
    
    return(
        <div className= { styles.background }>
            {/* Img se llama cada vez que el valor de ind es cambiado por la funcion selectImage */}
            {
                // Si es -2 es porque a´´un no se hizo nungún tipo de control ni pedido a la API
                // Si el indice es mayor o igual a cero, el pedido a la API fué correcto y muestra las imagenes cargadas
                //  Si el índice es -1, falló el pedido a la API y muestra la imagen por defecto
                ind !== -2
                ? ind >= 0
                    ? <img className= { styles.image } src= { img[ind]?.urls?.full? img[ind]?.urls?.full : '' } alt='Imagen de fondo' />
                    : <img className= { styles.image } src= { backgroundImg } alt='Imagen de fondo' />
                : null
            }
            { children }
        </div>
    )
}

export default Background