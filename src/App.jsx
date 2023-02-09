import { useEffect, useState } from 'react'
import './App.css'
import SearchBar from './components/SearchBar/SearchBar'
import ViewImages from './components/ViewImages/ViewImages'
import InfiniteScroll from 'react-infinite-scroll-component'
import Loader from './components/Loader/Loader'
import Background from './components/Background/Background'

const ACCESS_KEY = 'wlsmAcUjbRx8GFvyl8AmjlKUprZKE1G8U74voEqrK9c'
let cargarImagenes = true

function App() {
  const [ images, setImages ] = useState( [] )
  const [ searchChar, setSearchChar ] = useState( '' )

  const handleClick = async (character)=> {
    const apiRoot = 'https://api.unsplash.com' 
    const URL = `${ apiRoot }/photos/random/?client_id=${ ACCESS_KEY }&count=4&query=${character}`

    try{
      const res = await fetch(URL)
      const data = await res.json() 

      if( searchChar !== character ) {
        setSearchChar( character )
        setImages( data )
      } else {
        setImages( [...images, ...data] )
      } 

    } catch( error ){
      window.alert( error.message )
    }
  }

  const handleClickTopic = ( value )=>{
      window.scrollTo({
        top: 0, 
        behavior: 'smooth'
      })
    handleClick( value )
  }

  const handleNext =  ()=>{
    handleClick( searchChar )
  }

  useEffect(()=> {
    if( cargarImagenes ) {
      cargarImagenes = false
      handleClick('')
    }
  }, [images, cargarImagenes])

  return (
    <Background>
      <div className="App">
        <h1>GALERÍA DE IMÁGENES</h1>
        <SearchBar handleClick= { handleClick } />
        <div>
          <InfiniteScroll 
            dataLength={ images.length }
            next= { handleNext }
            hasMore= { true }
            loader={ <Loader /> }
            >
            { images.length !== 0 && <ViewImages images= { images } handleClickTopic= { handleClickTopic } /> }
          </InfiniteScroll>
        </div>
      </div>
    // </Background>
  )
}

export default App
