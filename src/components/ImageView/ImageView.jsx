import React from 'react';
import styles from './ImageView.module.css';
import Tilt from 'react-parallax-tilt'
import { saveAs } from 'file-saver'

const ImageView = ( { move, image, description, ubication, cam, topics, handleClickTopic } )=> {
    const styleDesc = {
        padding: 0,
        margin: 0,
    }
    const styleGroupTopic = {
        padding: 0,
        margin: '0 0 1rem 0',
    }
    const downloadImg = ()=> {
        saveAs( image, `${description}.jpeg` )
    }

    return(
        <Tilt>
            <div 
                className= { styles.content_image } 
                data-aos= { `zoom-in-${ move }` }
                data-aos-offset="200"
                data-aos-delay="50"
                data-aos-duration="500"
                data-aos-easing="ease-in-out"
                data-aos-mirror="true"
                data-aos-once="false"
            >
                <img src= { image } className="card-img-top" alt= { ubication } />
                <p className= { styles.downloadImg } onClick={ downloadImg } >↓</p>
                <div className= { styles.visibility }>
                    <div className="card-body" style={styleDesc} >
                        <h5 className="list-group card-title"> { ubication } <span className= { styles.descrip }>( Ubicación Fotografía )</span></h5>
                        <hr />
                        <h5 className="list-group card-title"> { cam } <span className= { styles.descrip }>( Cámara )</span></h5>
                        <hr />
                    </div>
                    <div className="card-body" style={styleGroupTopic}>
                        <span className= { styles.topic }><strong>Topics: </strong></span>
                        {   Object.getOwnPropertyNames(topics).length > 0 && 
                            Object.getOwnPropertyNames(topics).map( ( t, ind ) => 
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