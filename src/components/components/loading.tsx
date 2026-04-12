"use client"

import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Styles from './loading.module.css';

export default function Loading() {

    return (
        <>
            <div className={Styles.container}>
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        </>
    )
}