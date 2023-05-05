import React, { useEffect, useState } from 'react'
import Layout from '../container/Layout'
import { Products } from './Products'
import { Productss } from './../models/Products';
import axios from 'axios';
import { Filter } from '../models/Filters';
import { SetUserAction } from './../redux/action/userAction';

export const ProductBackend = () => {
  const [products, setProducts] = useState<Productss[]>([])
  const [filters, setFilters] = useState({s:'',sort:'',page:1})
  const [lastPage, setLastPage] = useState(0)
  useEffect(() => {
    (
      async () => {
        const arr = []
        if (filters.s) {
          arr.push(`s=${filters.s}`)
        }
        if (filters.sort) {
          arr.push(`sort=${filters.sort}`)
        }
        if (filters.page){
          arr.push(`page=${filters.page}`)
        }
        console.log(arr)
        const {data} = await axios.get(`product/backend/?${arr.join('&')}`)
        console.log(`product/backend?${arr.join('&')}/`)
        // if i add ...products after ...data.data the new products load above the products shown
        setProducts(filters.page === 1 ? data.data : [...data.data,...products])
        setLastPage(data.meta.last_page)
      }
    )()
  }, [filters])
  return (
    <Layout>
      <Products products={products} filter={filters} setFilter={setFilters} lastpage={lastPage}/>
    </Layout>
  )
}
