import { Accordion, AccordionDetails, AccordionSummary, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import React, { useEffect, useState } from 'react'
import Layout from './../containers/Layout';
import { Order } from './../models/Order';
import axios from "axios";

export const Orders = () => {
    const [orders,setOrders] = useState<Order[]>([])
    useEffect(() => {
        (
            async () => {
                const {data}= await axios.get('orders/')
                setOrders(data)
            }
        )()
    }, [setOrders])
  return (
    <Layout>
            {orders.map(order =>{
                return(
                    <Accordion key={order.id}>
                        <AccordionSummary>
                            {order.FullName} $ {order.total}
                        </AccordionSummary>
                        <AccordionDetails>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Id</TableCell>
                                        <TableCell>Product Title</TableCell>
                                        <TableCell>Price</TableCell>
                                        <TableCell>QTY</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {order.order_items.map(item => {
                                        return (
                                            <TableRow key={item.id}>
                                                <TableCell>{item.id}</TableCell>
                                                <TableCell>{item.product_title}</TableCell>
                                                <TableCell>{item.price}</TableCell>
                                                <TableCell>{item.quantity}</TableCell>
                                            </TableRow>
                                        )
                                    })}                                    
                                </TableBody>
                            </Table>
                        </AccordionDetails>
                    </Accordion>
                        
                )
            })}
    </Layout>
  )
}
