import styles from './ViewImages.module.css'
import React from 'react';
import ImageView from '../ImageView/ImageView';

// CONTENEDOR DE LAS IMAGENES/TARJETAS A VISUALIZAR
const ViewImages = ( { images, handleClickTopic } )=> {
    // 'images' contiene los datos de la imagen a visualizar. 
    // 'handleClickTopic' es una funcion que se ejecuta al hacer click en un Topic

    return(
        <div className= { styles.main_content } >
            <div className= { styles.main_content_grid } >
                { images.map( (image, key ) => 
                    // Imagen/tarjeta a visualizar
                    <ImageView 
                        key= { key }
                        move= { key % 4 === 0? 'right' : key % 4 <= 2? 'up' : 'left' }
                        image= { image?.urls.regular }
                        id= { image?.id }
                        description= { image?.description }
                        ubication= { image?.location?.name? image?.location?.name : 'no definido' }
                        cam= { image?.exif?.make? `${ image?.exif?.make } ${image?.exif?.model}` : 'no definido' }
                        topics= { image?.topic_submissions }
                        handleClickTopic= { handleClickTopic }
                    />
                )}
            </div>
        </div>
    )
}

export default ViewImages