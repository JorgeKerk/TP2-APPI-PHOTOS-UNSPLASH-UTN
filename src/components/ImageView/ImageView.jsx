import React from 'react';
import styles from './ImageView.module.css';
import Tilt from 'react-parallax-tilt'
import { saveAs } from 'file-saver'

// MUESTRA LA IMAGEN EN FORMATO TRAJETA CON LOS DATOS ENVIADOS POR PROPS
const ImageView = ( { move, image, description, ubication, cam, topics, handleClickTopic } )=> {
    // 'move' indica de que lado aparece o desaparece la imagen al hacer scroll en la página
    // 'image, description, ubication, cam, topics' son datos de la imagen
    // 'handleClickTopic' es la funcion que se ejecuta al hacer click en un topic

    // DESCARGA LA IMAGEN SELECCIONADA
    const downloadImg = ()=> {
        saveAs( image, `${description}.jpeg` )
    }

    return(
        // Efecto desplazamiento de tarjeta al posicionar el mouse encima
        <Tilt>
            <div 
                className= { styles.content_image } 
                // seteos de desplazamiento de tarjeta al cargarse o al desvanecerse
                data-aos= { `zoom-in-${ move }` }
                data-aos-offset="200"
                data-aos-delay="50"
                data-aos-duration="500"
                data-aos-easing="ease-in-out"
                data-aos-mirror="true"
                data-aos-once="false"
            >
                <img src= { image } alt= { ubication } />
                {/* Boton de descarga de imagen */}
                <p className= { styles.downloadImg } onClick={ downloadImg } >↓</p>
                {/* Datos de la imagen */}
                <div className= { styles.visibility }>
                    <div>
                        <h5 > { ubication } <span className= { styles.descrip }>( Ubicación Fotografía )</span></h5>
                        <hr />
                        <h5 > { cam } <span className= { styles.descrip }>( Cámara )</span></h5>
                        <hr />
                    </div>
                    <div>
                        <span className= { styles.topic }><strong>Topics: </strong></span>
                        {   Object.getOwnPropertyNames(topics).length > 0 && 
                            Object.getOwnPropertyNames(topics).map( ( t, ind ) => 
                                // carga de Topics si los hubiere
                                <a href="#" className= { styles.link }
                                    key= { ind }
                                    onClick= { ( event )=> handleClickTopic( event.target.textContent )}
                                >
                                    { t + ' ' }
                                </a> 
                            )
                        }
                    </div>
                </div>
            </div>
        </Tilt>
    )
}

export default ImageView