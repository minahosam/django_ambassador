import { Table, TableHead, TableRow, TableCell, TableBody, Button, TableFooter, TablePagination } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Layout from '../containers/Layout'
import { Productss } from '../models/Products'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useParams } from 'react-router-dom';


export const Products = () => {
    const [products,setProducts] = useState<Productss[]>([])
    const [page,setPage] = useState(0)
    const rowsPerPage = 4
    const id = useParams()
    useEffect(() => {
        (
            async () => {
                const {data} = await axios.get('products/')
                setProducts(data)
            }
        )()
    }, [setProducts])
    const del = async(id:number) => {
        if (window.confirm('Are you sure you want to delete')) {
            await  axios.delete(`products/${id}`)
            setProducts(products.filter(p => p.id !== id))
        }
    }
return (
<Layout>
    <div className="pt-3 pb-2 mb-3 border-bottom">
        <Button variant="contained" color='primary' href='/product/create' > ADD  </Button>
    </div>
    <Table className="table table-striped table-sm">
        <TableHead>
            <TableRow>
                <TableCell scope="col">id</TableCell>
                <TableCell scope="col">image</TableCell>
                <TableCell scope="col">title</TableCell>
                <TableCell scope="col">description</TableCell>
                <TableCell scope="col">Action</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {products.slice(page*rowsPerPage,(page+1)*rowsPerPage).map(product => {
            return(
            <TableRow key={product.id}>
                <TableCell>{product.id}</TableCell>
                <TableCell><img src={product.image} width={50} height={50}/></TableCell>
                <TableCell>{product.title}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>
                    <ToggleButtonGroup>
                            <Button variant="contained" color='primary' href={`/product/edit/${product.id}`}>EDIT</Button>
                            <Button variant="contained" color='warning' onClick={() => del(product.id)} > DELETE </Button>
                    </ToggleButtonGroup>
                </TableCell>
            </TableRow> 
            ) 
            })} 
        </TableBody> 
        <TableFooter>
            <TableRow>
                <TablePagination 
                // component="div" 
                    count={products.length} 
                    color='primary' 
                    page={page}
                    onPageChange={(e,newPage)=>{setPage(newPage)}}
                    rowsPerPage={rowsPerPage}
                    rowsPerPageOptions={[]}
                    />
            </TableRow>
        </TableFooter>
    </Table>
</Layout>

)
}