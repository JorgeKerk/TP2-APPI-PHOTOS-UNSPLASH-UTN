import React, { useEffect, useState } from 'react';
import styles from './Background.module.css'

const Background = ( {children} )=> {
    const [img, setImg] = useState([])
    const [ind, setInd] = useState( 0 )
    const cantImgs = 20

    let addImages = false

    const ACCESS_KEY = 'wlsmAcUjbRx8GFvyl8AmjlKUprZKE1G8U74voEqrK9c'

    const imgBackground = async ()=> { 
            const apiRoot = 'https://api.unsplash.com' 
            const URL = `${ apiRoot }/photos/random/?client_id=${ ACCESS_KEY }&count=${cantImgs}&query=wallpaper`
            try{
                const res = await fetch(URL)
                const data = await res.json() 
                setImg(data)
                console.log(data) 
              } catch( error ){
                window.alert( error.message )
              }              
    }
    const selectImage = ()=>{
        setTimeout(()=>{
            const newInd = Math.floor( Math.random() * ( cantImgs ) )
            setInd( newInd )
            selectImage()
        },60000)
    }
    useEffect( ()=>{
        if( !addImages ){
            addImages = true
            imgBackground()
            selectImage()
        } 
    }, [])
    
    return(
        <div className= { styles.background }>
            <img className= { styles.image } src= { img[ind]?.urls?.full? img[ind]?.urls?.full : '' } alt="Imagen de fondo" />
            { children }
        </div>
    )
}

export default Background