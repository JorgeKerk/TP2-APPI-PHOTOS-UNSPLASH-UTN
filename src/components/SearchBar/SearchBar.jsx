import styles from './SearchBar.module.css'
import { useState } from 'react'

const SearchBar = ( { handleClick } )=> {
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
                <div className={styles.filter}>
                    <p>Filtrar por: </p>
                    {filter && <div><p>{filter}</p><button onClick={handleClearFilter}>X</button></div>}
                </div>
            </div>
        </div>
    )
}

export default SearchBar