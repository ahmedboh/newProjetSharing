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
import { useHistory } from "react-router-dom";
import {TablePaginationActions ,StyledTableCell,useStyles2} from './TablePaginationActions'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import UpdateIcon from '@material-ui/icons/Update';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import CancelIcon from '@material-ui/icons/Cancel';
import Loader from './../Loader';
import ReactToExcel from 'react-html-table-to-excel';

const  ListeRapportsIntervenant=(props)=> {
  const {user}=props
  const [rows , setRows ]=useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const listeRapports=async()=>{
    const res = await Axios.get(`rapportInter/getRapportIntersIntervenant/${user._id}`)
    setRows( res.data.data );
    setIsLoading(false);
  }
  useEffect(() => {
    listeRapports()
  }, []);

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
  function Row(props) {
    const { row } = props;
    const [clientDemandeur , setClientDemandeur]=useState([]);
    const classes = useStyles2();
    const getClientDemandeur = async() => {
      const res = await Axios.get(`client/${row.IDTicket.IDclient}`)
      setClientDemandeur( res.data.data.raisonSociale );
    }
    useEffect(() => {
      getClientDemandeur()
    }, []);
    const attachement=row.nomAttachement===undefined
        ?<CancelIcon />
        :<IconButton color="primary" component="span" onClick={() => {
          history.push("/LirePDF",{idRapport:row._id})
        }}>
          <AttachFileIcon />
        </IconButton>
    let history = useHistory();
    return (
      <>
        <TableRow key={row._id} className={classes.root}>
            <TableCell style={{ width: 160 }} align="center">
              {clientDemandeur}
            </TableCell>
            <TableCell style={{ width: 160 }} align="center">
              {row.IDTicket.objet}
            </TableCell>
            <TableCell style={{ width: 160 }} align="center">
              {row.dateCreation} {row.heureCreation}
            </TableCell>
            <TableCell style={{ width: 160 }} align="center">
              {row.dateDebut} {row.heureDebut}
            </TableCell>
            <TableCell style={{ width: 160 }} align="center">
              {row.dateFin} {row.heureFin}
            </TableCell>
            <TableCell style={{ width: 160 }} align="center">
              {row.detailinter}
            </TableCell>
            <TableCell style={{ width: 160 }} align="center">
            {attachement}
            </TableCell>
            <TableCell style={{ width: 160 }} align="center">
              <IconButton color="primary" component="span" onClick={() => {
                history.push("/ModifierRapportInter",{idRapportInter:row._id})
              }}>
                <UpdateIcon />
              </IconButton>   
            </TableCell>
        </TableRow>
      </>
    );
  }
  
  return (
    <>
    <Loader isLoading={isLoading} />
    <AppBar  xs={12} color="default" style={{position: 'relative',zIndex:0,marginBottom:20}}>
        <Toolbar >
          <Typography variant="h6" style={{paddingLeft:'40%'}} color="inherit" noWrap>
            Liste des rapports d'intervention
          </Typography>
        </Toolbar>
      </AppBar>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="custom pagination table" id="table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Client</StyledTableCell>
            <StyledTableCell align="center">Objet intervention</StyledTableCell>
            <StyledTableCell align="center">Date Creation</StyledTableCell>
            <StyledTableCell align="center">Date Debut</StyledTableCell>
            <StyledTableCell align="center">Date Fin</StyledTableCell>
            <StyledTableCell align="center">Description intervention</StyledTableCell>
            <StyledTableCell align="center">Fichier attacher</StyledTableCell>
            <StyledTableCell align="center">Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row) => (
            row.IDTicket&&
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
    <ReactToExcel
      className="btn"
      table="table"
      filename="listeMembresSociété"
      sheet="sheet 1"
      buttonText="Export excel"
    />
    </>
  );
}
export default ListeRapportsIntervenant;