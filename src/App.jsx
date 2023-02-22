import './App.css'
import { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { SearchBar, ViewImages, Loader, Background, Title } from './components'
import AOS from 'aos'
import 'aos/dist/aos.css'

AOS.init()

const { VITE_ACCESS_KEY } = import.meta.env;

let cargarImagenes = true

function App() {
  const [ images, setImages ] = useState( [] )
  const [ searchWord, setSearchWord ] = useState( '' )

  const handleClick = async (character)=> {
    const apiRoot = 'https://api.unsplash.com' 
    const URL = `${ apiRoot }/photos/random/?client_id=${ VITE_ACCESS_KEY }&count=4&query=${character}`

    try{
      const res = await fetch(URL)
      const data = await res.json() 

      if( searchWord !== character ) {
        setSearchWord( character )
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
    setSearchWord( value )
    handleClick( value )
  }

  const handleNext =  ()=>{
    handleClick( searchWord )
  }

  useEffect(()=> {
    if( cargarImagenes ) {
      cargarImagenes = false
      handleClick('')
    }
  }, [cargarImagenes])
  
  return (
    <div className="App">
      <Background>
      <div className= "headerContain" >
        <Title />
        <SearchBar handleClick= { handleClick } searchWord= { searchWord } />
      </div>
      <div className= 'images' >
        <InfiniteScroll 
          dataLength={ images.length }
          next= { handleNext }
          hasMore= { true }
          loader={ <Loader /> }
          >
          { images.length !== 0 && <ViewImages images= { images } handleClickTopic= { handleClickTopic } /> }
        </InfiniteScroll>
      </div>
      </Background>
    </div>
  )
}

export default App
