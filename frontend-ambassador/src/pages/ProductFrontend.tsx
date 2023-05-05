import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Layout from '../container/Layout'
import { Filter } from '../models/Filters';
import { Productss } from './../models/Products';
import { Products } from './Products';

export const ProductFrontend = () => {
    const [allProducts, setAllProducts] = useState<Productss[]>([])
    const [filteredProducts, setFilteredProducts] = useState<Productss[]>([])
    const [filters,setFilters] = useState<Filter>({s:'',sort:'',page:1})
    const [lastPage, setLastPage] = useState(0)
    const perPage = 3
    useEffect(() => {
        (
            async () => {
                const {data} = await axios.get('product/frontend/')
                setAllProducts(data)
                setFilteredProducts(data)
                setLastPage(Math.ceil(data.length / perPage))
            }
        )()
    }, [])

    useEffect(() => {
        let product = allProducts.filter(product => product.title.toLowerCase().indexOf(filters.s.toLowerCase()) >=0 ||
                        product.description.toLowerCase().indexOf(filters.s.toLowerCase()) >= 0
        )

        if (filters.sort === 'asc') {
            product.sort((a,b)=>{
                if (a.price > b.price) {
                    return 1
                }
                if (a.price < b.price) {
                    return -1
                }
                return 0
            })
        } else if (filters.sort === 'desc') {
            product.sort((a,b)=>{
                if (a.price > b.price) {
                    return -1
                }
                if (a.price < b.price) {
                    return 1
                }
                return 0
            })
            
        }
        setFilteredProducts(product.slice(0,filters.page * perPage))
        setLastPage(Math.ceil(product.length / perPage))

    }, [filters])

  return (
    <Layout>
        <Products products={filteredProducts} filter={filters} setFilter={setFilters} lastpage={lastPage} />
    </Layout>   
  )
}
 