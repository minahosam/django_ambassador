import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Layout from '../container/Layout'

export const Rankings = () => {
  const [rankings,setRankings] = useState([])
  useEffect(() => {
    (
      async () => {
        const {data} = await axios.get('rank/')
        setRankings(data)
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
          {Object.keys(rankings).map((key:any,index:number) => {
            return (
              <TableRow key={key}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{key}</TableCell>
                <TableCell>{rankings[key]}</TableCell>
                {/* <TableCell>{value[key]}</TableCell> */}
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </Layout>
  )
}
