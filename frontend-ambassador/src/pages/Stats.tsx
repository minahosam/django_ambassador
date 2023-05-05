import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Layout from '../container/Layout'

export const Stats = () => {
    const [state, setState] = useState([])
    useEffect(() => {
        (
            async () => {
                const {data} = await axios.get('stats/')
                setState(data)
            }
        )()
    }, [])    
  return (
    <Layout>
      <Table className="table table-striped table-sm">
        <TableHead>
          <TableRow>
            <TableCell scope="col">#</TableCell>
            <TableCell scope="col">Name</TableCell>
            <TableCell scope="col">Revenue</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {state.map((s:{code:string,revenue:number,id:number})=>{
                return(
                    <TableRow key={s.id}>
                        <TableCell>{`http:localhost:5000/${s.code}`}</TableCell>
                        <TableCell>{s.code}</TableCell>
                        <TableCell>{s.revenue}</TableCell>
                    </TableRow>
                )
            })}
        </TableBody>
      </Table>
    </Layout>
  )
}
