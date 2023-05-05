import { Button, Table, TableBody, TableCell, TableFooter, TableHead, TablePagination, TableRow } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Layout from '../containers/Layout'
import { Links } from './../models/Link';
import axios from 'axios';
import { useParams } from 'react-router-dom'

export const Link = (props:any) => {
    const [links,setLinks] = useState<Links[]>([])
    const [page,setPage] = useState(0)
    const rowsPerPage = 5
    const { id } = useParams()
    useEffect(() => {
        (
            async () => {
                const {data} = await axios.get(`user/${id}/link/`)
                setLinks(data)
            }
        )()
    }, [id])
  return (
    <Layout>
      <Table className="table table-striped table-sm">
        <TableHead>
          <TableRow>
            <TableCell scope="col">id</TableCell>
            <TableCell scope="col">code</TableCell>
            <TableCell scope="col">orders</TableCell>
            <TableCell scope="col">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {links.slice(page*rowsPerPage,(page+1)*rowsPerPage).map(link => {
            return(
              <TableRow key={link.id}>
              <TableCell>{link.id}</TableCell>
              <TableCell>{link.code}</TableCell>
              <TableCell>{link.orders.length}</TableCell>
              <TableCell>{link.orders.reduce((s,o) => s+o.total,0)}</TableCell>
            </TableRow>  
            )
          })}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              // component="div"
              count={links.length}
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
