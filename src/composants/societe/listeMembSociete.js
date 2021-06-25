import { useEffect, useState } from 'react';
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
import ReactToExcel from 'react-html-table-to-excel';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';

import Loader from './../Loader';
const  ListeMembSocietes=()=> {
  const [rows , setRows ]=useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const listeMemebre=async()=>{
    const res =await Axios.get(`membSociete`)
    setRows(res.data.data);
    setIsLoading(false);
  }
  const suprimerMembre = async(id) => {
    const res=await Axios.delete(`membSociete/${id}`)
    listeMemebre()
    handleClose();
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

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
    <Loader isLoading={isLoading} />
    <AppBar  xs={12} color="default" style={{position: 'relative',zIndex:0,marginBottom:20}}>
        <Toolbar >
          <Typography variant="h6" style={{paddingLeft:'40%'}} color="inherit" noWrap>
            Liste de membre de societè 
          </Typography>
        </Toolbar>
      </AppBar>
      <span  style={{margin:'5px'}}>
          <ReactToExcel  className='btn btn-outline-success' table="table" filename="listeMembresSociété" sheet="sheet 1" buttonText="Exporter"/>
      </span>  
    <TableContainer component={Paper} style={{marginTop:'2px'}}>
      <Table size='small' className={classes.table} aria-label="custom pagination table" id="table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Nom</StyledTableCell>
            <StyledTableCell align="center">Prénom</StyledTableCell>
            <StyledTableCell align="center">Rôle</StyledTableCell>
            <StyledTableCell align="center">Email</StyledTableCell>
            <StyledTableCell align="center">Login</StyledTableCell>
            <StyledTableCell align="center">Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row) => (
            <TableRow key={row._id} className={classes.root}>
            <TableCell style={{ width: 160 }} align="center">
              {row.nom}
            </TableCell>
            <TableCell style={{ width: 160 }} align="center">
              {row.prenom}
            </TableCell>
            <TableCell style={{ width: 160 }} align="center">
              {row.role.map((r,index)=>(row.role.length===index+1?r: r+'/') )}
            </TableCell>
            <TableCell style={{ width: 160 }} align="center">
              {row.email}
            </TableCell>
            <TableCell style={{ width: 160 }} align="center">
              {row.login}
            </TableCell>
            <TableCell style={{ width: 160 }} align="center">
              <Tooltip title='Modifier ce membre'  arrow>
                <IconButton color="primary" size='small'style={{color:'orange'}}  component="span" onClick={() => {
                  history.push("/ModifierMembSociete",{membSociete:row})
                }}>
                  <UpdateIcon />
                </IconButton> 
              </Tooltip> 
              <Tooltip title='Supprimer ce membre'  arrow>
                <IconButton size='small' color="secondary" component="span" onClick={handleClickOpen}>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>  
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description" >
                <DialogTitle id="alert-dialog-title">{`Vous voulez supprimer l'utilisateur ${row.nom} ${row.prenom}?`}</DialogTitle>
                <DialogActions>
                  <Button onClick={handleClose} color="secondary">
                    annuler
                  </Button>
                  <Button onClick={() => {suprimerMembre(row._id)}} color="primary" autoFocus>
                    confirmer
                  </Button>
                </DialogActions>
              </Dialog> 
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