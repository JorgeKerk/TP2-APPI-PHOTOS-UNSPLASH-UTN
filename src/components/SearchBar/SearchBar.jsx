import styles from './SearchBar.module.css'
import { useEffect, useState } from 'react'

// BARRA DE BÚSQUEDA DE IMAGENES
const SearchBar = ( { handleClick, searchWord } )=> {
    // 'handleClick' es la funcion que trae las imagenes de la API al azar si no hay palabra seleccionada, 
    //  o filtrado por la palabra seleccionada
    // 'searchWord' es la palabra seleccionada al hacer click en un Topic. Puede o no estar

    // Valor que se ingresa por teclado en la barra de búsqueda
    const [ input, setInput ] = useState( '' )
    // palabra seleccionada que filtra las imagenes a mostrar
    const [ filter, setFilter ] = useState('')

    // CARGA LOS VALORES IGRESADOS A LA VARIABLE DE ESTADO input
    const handleChange = event => {
        setInput( event.target.value )
    }

    // FILTRA LAS IMÁGENES DE ACUERDO A UNA PALABRA INGRESADA POR LA BARRA DE BÚSQUEDA
    const handleClickFilter = ()=>{
        // Realiza la búsqueda de las imagenes con la palabra ingresada
        handleClick(input)
        // Guarda la palabra ingresada que filtra las imágenes
        setFilter(input.toUpperCase())
        // Borra la palabra ingresada en la barra de búsqueda
        setInput('')
    }

    // QUITA EL FILTRO INGRESADO POR LA BARRA DE BÚSQUEDA
    const handleClearFilter = ()=> {
        // Muestra cualquier imagen al azar
        handleClick('')
        // Limpia las variables de estado
        setFilter('')
        setInput('')
    }

    useEffect( ()=> {
        // Si la búsca se realiza al seleccionar un Topic, filtra las imagenes con el Topic seleccionado
        if( searchWord ) setFilter( searchWord.toUpperCase() )
    }, [ searchWord ] )

    return(
        <div className= { styles.contentSearch }>
            <div className= { styles.search_box }>
                <input 
                    className= { styles.search_box_input } 
                    placeholder= 'Buscar imágenes ...' 
                    type='text'
                    onChange= { handleChange }
                    value= { input } />
                <button className= { styles.search_box_btn } onClick= { handleClickFilter } >Buscar</button>
                <div className={ styles.filter } >
                    <p className={ styles.textFilter } >Filtrar por: </p>
                    {filter && 
                        <div className= { styles.wordSearch } >
                            <p>{filter}</p>
                            <button onClick={handleClearFilter}>X</button>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default SearchBar