import type { NextPage } from 'next'
import Image from 'next/image'
import React, { useEffect } from 'react';
import Router from 'next/router'
import styles from '../styles/Auth.module.css'  

const Auth: NextPage = () => {
    
    useEffect(() =>{
        if(localStorage.getItem('user')){
            Router.push('/')
        }
    })

    return (
        <div className={styles.grid}>
            <div className={`${styles.item_a}`}>
                <div>
                    <Image alt='' width="130%" height="130vh" src={"/tekkadan.svg"} />
                    <div className={`${styles.text}`}>Sexo</div>
                </div>
            </div>
            <div className={`${styles.item_b}`}></div>
        </div>
    )
}

export default Auth