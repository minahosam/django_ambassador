import Head from 'next/head'
import React from 'react'

export const Layout =(props:any) => {
  return (
    <>
        <Head>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" 
        rel="stylesheet" 
        integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" 
        crossOrigin="anonymous"/>
        </Head>
        <div className="container">
            {props.children}
        </div>
    </>
  )
}
