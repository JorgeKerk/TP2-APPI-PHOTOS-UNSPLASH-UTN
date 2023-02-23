import './App.css'
import axios from 'axios'
import { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { SearchBar, ViewImages, Loader, Background, Title, ErrorMsg } from './components'
import AOS from 'aos'
import 'aos/dist/aos.css'

// Extensión para poder descargar archivos ( en este caso, imágenes )
AOS.init()

function App() {
  // Imágenes traídas de la API, ya sean al azar o filtradas por una palabra o frase
  const [ images, setImages ] = useState( [] )
  // Palabra o frase que filtra las imágenes
  const [ searchWord, setSearchWord ] = useState( '' )
  
  const [ errorMsg, setErrorMsg ] = useState( '' )
  
  
  const handleClick = async (character, msgError = '')=> {
    // 'character' es la palabra o frase que filtran las imagenes pedidas a la API
    //  Si está vacio, las imagenes son aleatorias
    // 'msgError' se genera si falló el pedido a la API en el componente Background
    // Si 'msgError' no está vacío, se genera un error, se catura, y se guarda para mostrarlo por pantalla (rederizarlo)

    try {
      if( msgError ) throw Error( msgError )

      const API_ROOT = 'https://api.unsplash.com' 
      // API KEY
      const { VITE_ACCESS_KEY } = import.meta.env
      // Númer de imagenes traídas de la API por cada petición (GET) 
      const IMAGES_PER_REQUEST = 4 

      const URL = `${ API_ROOT }/photos/random/?client_id=${ VITE_ACCESS_KEY }&count=${ IMAGES_PER_REQUEST }&query=${ character }`
1
      const { data } = await axios( URL )
      
      if( searchWord !== character ) {
        // carga la aplabra que filtra las imágenes
        setSearchWord( character )
        // Carga las imágenes traídas de la API pisando/borrando las imagenes ya cargadas en la variable de estado 'images'
        setImages( data )
      } else {
        // Agraga las imagenes traídas de la API a las imagenes ya cargadas en la variable de estado 'images'
        setImages( ( currentState ) => [ ...currentState, ...data ] )
      } 
    } catch (error) {
      //  Se captura el error y se guarda en una variable de estado para luego renderizarlo
      setErrorMsg( error.message )
    }
  }

  // AL HACER CLICK EN UN TOPIC, VUELVE AL INICIO DE LA PÁGINA Y CARGA LAS IMAGENES RELACIONADAS CON ESE TOPIC
  const handleClickTopic = ( value )=>{
      window.scrollTo({
        top: 0, 
        behavior: 'smooth'
      })
    setSearchWord( value )
    handleClick( value )
  }

  // UTILIZADA PARA EL SCROLL INFINITO, SIGUE BUSCANDO IMÁGENES CON LA PALABRA SELECCIONADA.
  // SI 'searchWord' ESTÁ VACIO, TRAE IMÁGENES AL AZAR
  const handleNext =  ()=>{
    handleClick( searchWord )
  }
  
  return (
    <div className= 'App' >
      <Background handleClick= { handleClick }>
        <div className= 'headerContain' >
          <Title />
          <SearchBar handleClick= { handleClick } searchWord= { searchWord } />
        </div>
        <div className= 'images' >
          <InfiniteScroll 
            dataLength={ images.length }
            next= { handleNext } // Funcion que trae mas imágenes al scrollear
            hasMore= { true } // hace el scroll infinito
            loader={ <Loader /> } // Animacion que se muestra cuando se trada en cargar los datos
            >
            { images.length !== 0 && <ViewImages images= { images } handleClickTopic= { handleClickTopic } /> }
          </InfiniteScroll>
        </div>
        {/* Si hay error, se muestra por pantalla */}
        { errorMsg && <ErrorMsg message= { errorMsg } />}
      </Background>
    </div>
  )
}

export default App
