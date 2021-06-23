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
import AttachFileIcon from '@material-ui/icons/AttachFile';
import Typography from '@material-ui/core/Typography';
import { useHistory } from "react-router-dom";
import {TablePaginationActions ,StyledTableCell,useStyles2} from './TablePaginationActions'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CancelIcon from '@material-ui/icons/Cancel';
import ReactToExcel from 'react-html-table-to-excel';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Loader from './../Loader';
import CheckBoxType from '../filtrage/CheckBoxType'
import CheckDate from '../filtrage/CheckDate'
import CheckAutoComplete from '../filtrage/CheckAutoComplete'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const  ListeRapportsInterventions=()=> {
  const [rows , setRows ]=useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [Filters, setFilters] = useState({})


  const listeRapports=async(ob)=>{
   const res =await Axios.post(`rapportInter/getAll`,ob)
    setRows( res.data.data );
    setIsLoading(false);
  }
  const handleFilters = (filters, category) => {
    const newFilters = { ...Filters }
    newFilters[category] = filters
    listeRapports({filters:newFilters}) 
    setFilters(newFilters)
}
  useEffect(() => {
    listeRapports({filters:Filters})
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
  function RowTable(props) {
    const { row } = props;
    const classes = useStyles2();
    const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };


    
    const suprimerRapport = async(id) => {
      const res=await Axios.delete(`rapportInter/${id}`)
      listeRapports()
      handleClose();
    }



    const attachement=row.IDTicket.IDclient.raisonSociale.length<5
        ?<CancelIcon size='small' />
        :<IconButton size='small' color="primary" component="span" onClick={() => {
          history.push("/LirePDF",{idRapport:row._id})
        }}>
          <AttachFileIcon />
        </IconButton>
    let history = useHistory();
    return (
      <>
        <TableRow key={row._id} className={classes.root} >
            <TableCell style={{ width: 160 }} align="center">
              {row.IDTicket.IDclient.raisonSociale}
            </TableCell>
            <TableCell style={{ width: 220 }} align="center">
              {row.IDintervenant.nom} {row.IDintervenant.prenom}
            </TableCell>
            <TableCell style={{ width: 220 }} align="center">
              {row.IDTicket.objet}
            </TableCell>
            <TableCell style={{ width: 160 }}>
              {new Date(row.dateCreation).toLocaleDateString()} {new Date(row.dateCreation).toLocaleTimeString().substring(0,5)}
            </TableCell>
            <TableCell style={{ width: 160 }} >
              {new Date(row.dateDebut).toLocaleDateString()} {new Date(row.dateDebut).toLocaleTimeString().substring(0,5)}
            </TableCell>
            <TableCell style={{ width: 160 }}>
              {new Date(row.dateFin).toLocaleDateString()}  {new Date(row.dateFin).toLocaleTimeString().substring(0,5)}
            </TableCell>
            <TableCell  align="center">
      
                {attachement}
             
            </TableCell>
            <TableCell  align="center">
            <IconButton color="secondary" style={{height:'10px'}} component="span" onClick={handleClickOpen}>
                <DeleteIcon  />
              </IconButton> 
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description" >
                <DialogTitle id="alert-dialog-title">{`Vous voulez supprimer le rapport de l'intervention du client ${row.IDintervenant.nom} ${row.IDintervenant.prenom} et de l'intervenant ${row.IDTicket.IDclient.raisonSociale}?`}</DialogTitle>
                <DialogActions>
                  <Button onClick={handleClose} color="secondary">
                    annuler
                  </Button>
                  <Button onClick={() => { suprimerRapport(row._id)}} color="primary" autoFocus>
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
    <Loader isLoading={isLoading} />
    <AppBar  xs={12} color="default" style={{position: 'relative',zIndex:0,marginBottom:20}}>
        <Toolbar >
          <Typography variant="h6" style={{paddingLeft:'40%'}} color="inherit" noWrap>
            Liste des rapports d'intervention
          </Typography>
        </Toolbar>
      </AppBar>
      <div style={{marginLeft:'4%'}}  >  
        <Row >
        <Col lg={3} style={{paddingTop:'5px'}}>    
        <CheckAutoComplete type="clients"  sty={false} label={'Client demandeur '} handleFilters={handleFilters}></CheckAutoComplete>
        </Col>
        <Col lg={3} style={{paddingTop:'5px'}}>    
        <CheckAutoComplete  type="intervenants" sty={false} label={'intervenant'}handleFilters={handleFilters}></CheckAutoComplete>
        </Col>
        <Col lg={3} style={{paddingTop:'15px'}}>    
        <CheckBoxType label='attachement' data={['Avec ','Sans']}  handleFilters={handleFilters}></CheckBoxType>

        </Col> 
        <Col lg={3}  >  
         <CheckDate     handleFilters={handleFilters}></CheckDate>
        </Col>
        </Row>
       </div><br/>
       
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="custom pagination table" id="table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Client</StyledTableCell>
            <StyledTableCell align="center">Intervenant</StyledTableCell>
            <StyledTableCell align="center">Objet de ticket </StyledTableCell>
            <StyledTableCell align="center">Date Création</StyledTableCell>
            <StyledTableCell align="center">Date Debut</StyledTableCell>
            <StyledTableCell align="center">Date Fin</StyledTableCell>
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
            <RowTable key={row._id} row={row} />
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
export default ListeRapportsInterventions;              
              