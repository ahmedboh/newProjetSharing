import React, { useEffect, useState } from 'react';
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
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
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

  const [open1, setOpen1] = React.useState(false);
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
    const [open, setOpen] = useState(false);
    const classes = useRowStyles();
    return (
      <>
        <TableRow className={classes.root}>
          <TableCell style={{ width: 10 }}>
            <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell style={{ width: 160 }} align="center">
            {row.raisonSociale}
          </TableCell>
          <TableCell style={{ width: 160 }} align="center">
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
          <TableCell style={{ width: 200 }} align="center">
          <IconButton color="primary" component="span" onClick={() => {
            history.push("/listeContrat",{idClient:row._id,raisonSociale:row.raisonSociale})
          }}>
            <ListAltIcon />
          </IconButton>
          
          <IconButton component="span"onClick={() => {
            history.push("/ModifierClient",{idClient:row._id})
          }}>
            <UpdateIcon />
          </IconButton>  
          
          <IconButton color="secondary" component="span" onClick={handleClickOpen}>
            <DeleteIcon />
          </IconButton>
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
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={9}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box margin={1}>
                <Typography variant="h6" gutterBottom component="div">
                  Détaille
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                    <TableCell align="center">n° Registre Commérce</TableCell>
                      <TableCell align="center">Code TVA</TableCell>
                      <TableCell align="center">Login</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow key={row.nRegistreCommerce}>
                      <TableCell component="th" scope="row" align="center">
                        {row.nRegistreCommerce}
                      </TableCell>
                      <TableCell align="center">{row.codeTVA}</TableCell>
                      <TableCell align="center">{row.login}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
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
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="custom pagination table" id="table">
        <TableHead>
          <TableRow>
            <StyledTableCell />
            <StyledTableCell align="center">Raison Sociale</StyledTableCell>
            <StyledTableCell align="center">Adresse</StyledTableCell>
            <StyledTableCell align="center">Télèphone</StyledTableCell>
            <StyledTableCell align="center">Fax</StyledTableCell>
            <StyledTableCell align="center">Email</StyledTableCell>
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
    <ReactToExcel
      className="btn"
      table="table"
      filename="listeClients"
      sheet="sheet 1"
      buttonText="Export excel"
    />
    </>
  );
}

export default ListeClients;