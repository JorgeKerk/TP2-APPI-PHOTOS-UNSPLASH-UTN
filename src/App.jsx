import './App.css'
import axios from 'axios'
import { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { SearchBar, ViewImages, Loader, Background, Title } from './components'
import AOS from 'aos'
import 'aos/dist/aos.css'

// Extensión para poder descargar archivos ( en este caso, imágenes )
AOS.init()

function App() {
  // Variable que indica la carga por primera y única vez de las imagenes al azar al iniciar la página 
  let cargarImagenes = true
  // Imágenes traídas de la API, ya sean al azar o filtradas por una palabra o frase
  const [ images, setImages ] = useState( [] )
  // Palabra o frase que filtra las imágenes
  const [ searchWord, setSearchWord ] = useState( '' )
  
  
  const handleClick = async (character)=> {
    const API_ROOT = 'https://api.unsplash.com' 
    // API KEY
    const { VITE_ACCESS_KEY } = import.meta.env;
    // Númer de imagenes traídas de la API por cada petición (GET) 
    const IMAGES_PER_REQUEST = 4 

    const URL = `${ API_ROOT }/photos/random/?client_id=${ VITE_ACCESS_KEY }&count=${ IMAGES_PER_REQUEST }&query=${ character }`
1
    try{
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
    } catch( error ){
      window.alert( error.message )
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

  useEffect(()=> {
    // Al iniciar la página, carga por primera vez las imágenes al azar
    if( cargarImagenes ) {
      cargarImagenes = false
      handleClick('')
    }
  }, [ cargarImagenes ])
  
  return (
    <div className= "App" >
      <Background>
        <div className= "headerContain" >
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
      </Background>
    </div>
  )
}

export default App
