import React, { useEffect, useState } from 'react'
import Layout from '../containers/Layout'
import Menu from '../containers/Menu'
import Nav from '../containers/Nav'
import axios from 'axios';
import { User } from '../models/User';
import { Button, Pagination, Table, TableBody, TablePagination } from '@mui/material';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableFooter from '@mui/material/TableFooter';

const Users = () => {
  const [users,setUsers] = useState<User[]>([])
  const [page,setPage] = useState(0)
  const rowsPerPage = 5
  useEffect(() => {
    (
      async () => {
        const {data} = await axios.get('all-users/')
        console.log(data)
        setUsers(data)
      }
    )()
  }, [])
return (
    <Layout>
      <Table className="table table-striped table-sm">
        <TableHead>
          <TableRow>
            <TableCell scope="col">id</TableCell>
            <TableCell scope="col">Name</TableCell>
            <TableCell scope="col">Email</TableCell>
            <TableCell scope="col">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.slice(page*rowsPerPage,(page+1)*rowsPerPage).map(user => {
            return(
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.first_name} {user.last_name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Button variant="contained" disableElevation href={`/user/${user.id}/link`}>
                    VIEW
                  </Button>
                </TableCell>
            </TableRow>  
            )
          })}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              // component="div"
              count={users.length}
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

export default Users