import styles from './SearchBar.module.css'
import { useEffect, useState } from 'react'

const SearchBar = ( { handleClick, searchWord } )=> {
    const [ input, setInput ] = useState( '' )
    const [ filter, setFilter ] = useState('')

    const handleChange = event => {
        setInput( event.target.value )
    }

    const handleClickFilter = ()=>{
        handleClick(input)
        setFilter(input.toUpperCase())
        setInput('')
    }

    const handleClearFilter = ()=> {
        handleClick('')
        setFilter('')
        setInput('')
    }

    useEffect( ()=> {
        if( searchWord ) setFilter( searchWord.toUpperCase() )
    }, [searchWord] )
    return(
        <div className= { styles.contentSearch }>
            <div className= { styles.search_box }>
                <input 
                    className= { styles.search_box_input } 
                    placeholder= 'Buscar imágenes ...' 
                    type="text"
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