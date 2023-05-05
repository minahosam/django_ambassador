import { Button, TextField } from '@mui/material'
import React, { SyntheticEvent, useEffect, useState } from 'react'
import Layout from '../containers/Layout'
import axios from 'axios';
import { Navigate, useParams } from 'react-router-dom';
import { useTabsList } from '@mui/base';

export const ProductsCreate = (props:any) => {
    const [title,setTitle] = useState('')
    const [description,setDescription] = useState('')
    const [price,setPrice] = useState('')
    const [image,setImage] = useState('')
    const [redirect,setRedirect] = useState(false)
    const {id} =useParams()
    console.log(id)
    useEffect(() => {
        if(id){
            (
                async () => {
                    console.log(`products/${id}/`)
                    // const {data} = await axios.get(`products/${id}/`)
                    const {data} = await axios.get(`products/${id}/`)
                    setTitle(data.title)
                    setDescription(data.description)
                    setImage(data.image)
                    setPrice(data.price)
                }
            )()
        }
    }, [id,setTitle,setDescription,setImage,setPrice])
    const Add = async (e:SyntheticEvent) => {
        e.preventDefault()
        const data = {title,description,price,image}
        if (id) {
            await axios.put(`products/${id}/`,data)
        } else {
            await axios.post('products/',data)            
        }
        setRedirect(true)
    }
    if (redirect) {
        return <Navigate to='/products'/>
    }
  return (
    <Layout>
        <form onSubmit={Add}>
            <div className='mb-3'>
                <TextField label='title' value={title} onChange={(e)=>setTitle(e.target.value)}/>
            </div>
            <div className='mb-3'>
                <TextField label='description' rows={5} multiline value={description} onChange={(e)=>setDescription(e.target.value)}/>
            </div>
            <div className='mb-3'>
                <TextField label='price' value={price} onChange={(e)=>setPrice(e.target.value)}/>
            </div>
            <div className='mb-3'>
                <TextField label='image' value={image} onChange={(e)=>setImage(e.target.value)}/>
            </div>
            <Button variant='contained' color='primary' type='submit'>sobmit</Button>
        </form>
    </Layout>
    )
}
