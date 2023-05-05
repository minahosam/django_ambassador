import axios from 'axios';
import React, { useState } from 'react'
import { Productss } from '../models/Products'
import { Filter } from './../models/Filters';

export const Products = (props:{products:Productss[],filter:Filter,setFilter:(filter:Filter) => void,lastpage:number }) => {
    const [selected , setSelected] = useState<number[]>([])
    const [notify, setNotify] = useState({
        show:false,
        error:false,
        message:''
    })
    const search = (s:string) => {
        props.setFilter({...props.filter,s,page:1})
    }
    const sort = (sort:string) => {
        props.setFilter({...props.filter,sort,page:1})
    }
    const load = () => {
        props.setFilter({...props.filter,page:props.filter.page + 1})
    }

    const generate = async() => {
        try {
            const {data} = await axios.post('links/',{products:selected})
            setNotify({
                show:true,
                error:false,
                message:`your link generated successfully http://localhost:5000/${data.code}`
            })
        } catch (e) {
            setNotify({
                show:true,
                error:true,
                message:'you must logged in before'
            })
        } finally {
            setTimeout(() => {
                setNotify({
                    show:false,
                    error:false,
                    message:''
                })
            }, 3000);
        }
    }
    const select = (id:number) => {
        if (selected.some(s => s === id)) {
            setSelected(selected.filter(f => f !== id))
            return;
        }
        setSelected([...selected,id])
    }

    let button
    if (props.filter.page != props.lastpage) {
        button = (
            <div className="d-flex justify-content-center mt-4">
                <button className="btn btn-primary" onClick={load}>Load More</button>
            </div>
        )
    }
    let generateButton , info
    if (selected.length > 0) {
        generateButton = (
            <div className="input-group-append">
                <button className="btn btn-info" onClick={generate}>Generate Link</button>
            </div>
        )
    }

    if (notify.show) {
        info = (
            <div className="col-md-12 mb-4">
                <div className={notify.error ? "alert alert-danger" : "alert alert-info"} role="alert">
                    {notify.message}
                </div>
            </div>
        )
    }
  return (
    <>
        {info}
        <div className="col-md-12 mb-4 input-group">
            <input type="search" className="form-control" placeholder="Search..." aria-label="Search" onChange={e => search(e.target.value)}/>
            {generateButton}
            <div className="input-group-append">
                    <select className="form-select" onChange={e=> sort(e.target.value)}>
                        <option>Select</option>
                        <option value="asc">Price Ascending</option>
                        <option value="desc">Price Descending</option>
                    </select>
                </div>
        </div>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            {props.products.map(product =>{
                return (
                    <div className="col" key={product.id} onClick={() => select(product.id)}>
                        <div className={selected.some(s => s === product.id) ? "card shadow-sm selected" : "card shadow-sm"}>
                            <img src={product.image} height={200} alt=''/>
                            <div className="card-body">
                                <p className="card-text">{product.title}</p>
                                <div className="d-flex justify-content-between align-items-center">
                                    <small className="text-muted">{product.price}</small>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
        {button}
    </>
  )
}
