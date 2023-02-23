import styles from './ErrorMsg.module.css';

const ErrorMsg = ( { message } )=> {
    return(
        <div className= { styles.mainContainer } >
            <h1>{ message }</h1>
        </div>
    )
}

export default ErrorMsg