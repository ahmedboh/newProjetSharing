import  { useEffect, useState } from 'react';
import Axios from 'axios';
import { makeStyles} from '@material-ui/core/styles';
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
import ListAltIcon from '@material-ui/icons/ListAlt';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { useHistory } from "react-router-dom";
import {TablePaginationActions ,StyledTableCell,useStyles2} from './TablePaginationActions'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import UpdateIcon from '@material-ui/icons/Update';
import ReactToExcel from 'react-html-table-to-excel';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

const ListeClients=()=> {
    const [rows , setRows ]=useState([]);

    const listecl=async()=>{
      const res =await Axios.get(`client`)
      setRows( res.data.data );
    }
useEffect(() => {
  listecl()
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

  const useRowStyles = makeStyles({
    root: {
      '& > *': {
        borderBottom: 'unset',
      },
    },
  });

  const [open1, setOpen1] = useState(false);
  const handleClickOpen = () => {
    setOpen1(true);
  };
  const handleClose = () => {
    setOpen1(false);
  };
  const suprimerClient = async(id) => {
    const res=await Axios.delete(`client/${id}`)
    listecl()
    handleClose();
  }
  function Row(props) {
    const { row } = props;
    const classes = useRowStyles();
    return (
      <>
        <TableRow className={classes.root}>
          <TableCell style={{ width: 160 }} align="center">
            {row.raisonSociale}
          </TableCell>
          <TableCell style={{ width: 200,fontSize:'12px' }} align="center">
            {row.adresse}
          </TableCell>
          <TableCell style={{ width: 160 }} align="center">
            {row.tel}
          </TableCell>
          <TableCell style={{ width: 160 }} align="center">
            {row.fax}
          </TableCell>
          <TableCell style={{ width: 160 }} align="center">
            {row.email}
          </TableCell>
          <TableCell style={{ width: 160 }}  align="center">
              {row.nRegistreCommerce}
          </TableCell>
          <TableCell style={{ width: 160,fontSize:'12px'  }}  align="center">{row.codeTVA}</TableCell>
          <TableCell style={{ width: 160 }}  align="center">{row.login}</TableCell>
          <TableCell style={{ width: 160 }} align="center">

          <Tooltip title='Liste des contrats '  arrow>
            <IconButton  size="small" color="primary" component="span" onClick={() => {
              history.push("/listeContrat",{page:'/listeContrat',idClient:row._id,raisonSociale:row.raisonSociale})
            }}>
              <ListAltIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title='Modifier ce client '  arrow>
            <IconButton size="small"  style={{color:'orange'}} component="span"onClick={() => {
              history.push("/ModifierClient",{idClient:row._id})
            }}>
              <UpdateIcon />
            </IconButton>  
          </Tooltip>
          <Tooltip title='Supprimer ce client'  arrow>
            <IconButton  size="small" color="secondary" component="span" onClick={handleClickOpen}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
          <Dialog
                open={open1}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description" >
                <DialogTitle id="alert-dialog-title">{`Vous voulez supprimer l'utilisateur ${row.raisonSociale}?`}</DialogTitle>
                <DialogActions>
                  <Button onClick={handleClose} color="secondary">
                    annuler
                  </Button>
                  <Button onClick={()=>suprimerClient(row._id)} color="primary" autoFocus>
                    confirmer
                  </Button>
                </DialogActions>
          </Dialog>  
          </TableCell>
        </TableRow>        
      </>
    );
  }
  
  return (
    <>
    <AppBar  xs={12} color="default" style={{position: 'relative',zIndex:0,marginBottom:20}}>
        <Toolbar >
          <Typography variant="h6" style={{paddingLeft:'45%'}} color="inherit" noWrap>
            Liste de clients
          </Typography>
        </Toolbar>
      </AppBar>
      <span  style={{margin:'5px'}}>
          <ReactToExcel  className='btn btn-outline-success' table="table" filename="listeClients" sheet="sheet 1" buttonText="Exporter"/>
      </span>
    <TableContainer component={Paper} style={{marginTop:'2px'}}>
      <Table size="small" className={classes.table} aria-label="custom pagination table" id="table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Raison Sociale</StyledTableCell>
            <StyledTableCell align="center">Adresse</StyledTableCell>
            <StyledTableCell align="center">Télèphone</StyledTableCell>
            <StyledTableCell align="center">Fax</StyledTableCell>
            <StyledTableCell align="center">Email</StyledTableCell>
            <StyledTableCell align="center">n° Registre</StyledTableCell>
            <StyledTableCell align="center">Code TVA</StyledTableCell>
            <StyledTableCell align="center">Login</StyledTableCell>
            <StyledTableCell align="center">Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row) => (
            <Row key={row._id} row={row} />
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
              colSpan={6}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
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

export default ListeClients;