import styles from './ViewImages.module.css'
import React from 'react';
import ImageView from '../ImageView/ImageView';

const ViewImages = ( { images, handleClickTopic } )=> {
    return(
        <div className= { styles.main_content } >
            <div className= { styles.main_content_grid } >
                { images.map( (image, key ) => 
                    <ImageView 
                        key= { key }
                        move= { key % 4 === 0? 'right' : key % 4 <= 2? 'up' : 'left' }
                        image= { image?.urls.regular }
                        description= { image?.description? image?.description : image?.id }
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