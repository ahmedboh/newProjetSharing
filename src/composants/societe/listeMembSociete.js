import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { useHistory } from "react-router-dom";
import {TablePaginationActions ,StyledTableCell,useStyles2} from './TablePaginationActions'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import UpdateIcon from '@material-ui/icons/Update';

const  ListeMembSocietes=()=> {
  const [rows , setRows ]=useState([]);
  const listeMemebre=()=>{
    Axios.get(`http://localhost:3001/api/v1/membSociete`)
        .then(res => {
          const membSocietes = res.data.data;
          setRows( membSocietes );
          console.log(rows);
    })
  }
  useEffect(() => {
    listeMemebre()
  }, []);

  let history = useHistory();
  const classes = useStyles2();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  
  return (
    <>
    <AppBar  xs={12} color="default" style={{position: 'relative',zIndex:0,marginBottom:20}}>
        <Toolbar >
          <Typography variant="h6" style={{paddingLeft:'40%'}} color="inherit" noWrap>
            Liste de membre de societè 
          </Typography>
        </Toolbar>
      </AppBar>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="custom pagination table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Nom</StyledTableCell>
            <StyledTableCell align="center">Prenom</StyledTableCell>
            <StyledTableCell align="center">Role</StyledTableCell>
            <StyledTableCell align="center">Email</StyledTableCell>
            <StyledTableCell align="center">Login</StyledTableCell>
            <StyledTableCell align="center">Modifier</StyledTableCell>
            <StyledTableCell align="center">supprimer</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row) => (
            <TableRow key={row._id} className={classes.root}>
            <TableCell component="th" scope="row" align="center">
              {row.nom}
            </TableCell>
            <TableCell style={{ width: 160 }} align="center">
              {row.prenom}
            </TableCell>
            <TableCell style={{ width: 160 }} align="center">
              {row.role}
            </TableCell>
            <TableCell style={{ width: 160 }} align="center">
              {row.email}
            </TableCell>
            <TableCell style={{ width: 160 }} align="center">
              {row.login}
            </TableCell>
            <TableCell style={{ width: 160 }} align="center">
              <IconButton color="primary" component="span" onClick={() => {
                history.push("/ModifierMembSociete",{idMembSociete:row._id})
              }}>
                <UpdateIcon />
              </IconButton>  
            </TableCell>
            <TableCell style={{ width: 160 }} align="center">
              <IconButton color="secondary" component="span" onClick={() => {
                Axios.delete(`http://localhost:3001/api/v1/membSociete/${row._id}`)
                  .then(res => {
                    console.log(res);
                    listeMemebre();
                  });
              }}>
                <DeleteIcon />
              </IconButton>  
            </TableCell>
          </TableRow>
          ))}

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={4}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { 'aria-label': 'ligne par page' },
                native: true,
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
    </>
  );
}
export default ListeMembSocietes;