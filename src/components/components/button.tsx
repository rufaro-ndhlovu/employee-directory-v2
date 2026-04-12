import React from "react";
import styles from './button.module.css';

export default function ButtonComp({text, style, onClick }) {

    return (
        <div> 
            <button style={style} onClick={onClick} className={styles.button}>
                {text}
            </button>
        </div>
    )
}