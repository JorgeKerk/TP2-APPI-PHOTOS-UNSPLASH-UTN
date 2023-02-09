import React from 'react';
import styles from './ImageView.module.css';
import Tilt from 'react-parallax-tilt'

const ImageView = ( {image, ubication, cam, topics, handleClickTopic } )=> {
    const styleDesc = {
        padding: 0,
        margin: 0,
    }
    const styleGroupTopic = {
        padding: 0,
        margin: '0 0 1rem 0',
    }

    return(
        <Tilt>
            <div className= { styles.content_image } >
                <img src= { image } className="card-img-top" alt= { ubication }/>
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