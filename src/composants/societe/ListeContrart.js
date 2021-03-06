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
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {TablePaginationActions ,StyledTableCell,useStyles2} from './TablePaginationActions'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import UpdateIcon from '@material-ui/icons/Update';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tooltip from '@material-ui/core/Tooltip';

import '../../style/interv.css'
const ListeContrat=()=>{
    const [rows , setRows ]=useState([]);
    const [client, setClient] = useState("");
    const classes = useStyles2();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
    let history = useHistory();

    const listeContrat=async()=>{
        setClient(history.location.state.raisonSociale);
        const res = await Axios.get(`contrat/getContratsClient/${history.location.state.idClient}`)
        setRows( res.data.data );
    }
    const suprimerContrat = async(id) => {
      const res=await Axios.delete(`contrat/${id}`)
      listeContrat()
    }
    useEffect(() => {
     listeContrat()
    }, []);

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
           <b>{client}</b> : Liste des contrats 
          </Typography>
        </Toolbar>
      </AppBar>
    <TableContainer  component={Paper}>
      <Table size='small' className={classes.table} aria-label="custom pagination table">
        <TableHead>
          <TableRow>
           <StyledTableCell align="center">Type  </StyledTableCell>
            <StyledTableCell title={`Nombre de visites\nde maintenance\npr??ventive par ans` } align="center"> Visites pr??ventives   </StyledTableCell>
            <StyledTableCell title={`Nombre de visites\nde maintenance\ncurative par ans` }  align="center">Visites curatives </StyledTableCell>
            <StyledTableCell title={`Prix unitaire des\ninterventions\nsuppl??mentaires` }  className='StyledTableCell' align="center">Prix unitaire </StyledTableCell>
            <StyledTableCell align="center">Contact</StyledTableCell>
            <StyledTableCell align="center">N?? t??l??phone </StyledTableCell>
            <StyledTableCell align="center">Adresse email </StyledTableCell>
            <StyledTableCell align="center">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row) => (
            <TableRow key={row._id} className={classes.root}>
                <TableCell component="th" scope="row" align="center">
                  {row.type}
                </TableCell>
                <TableCell style={{ width: 200 }} align="center">
                  {row.visitesMainPreventive}
                </TableCell>
                <TableCell style={{ width: 160 }} align="center">
                  {row.visitesMainCurative}
                </TableCell>
                <TableCell style={{ width: 160 }} align="center">
                  {row.prixInterSupp}
                </TableCell>
                <TableCell style={{ width: 160 }} align="center">
                  {row.contact}
                </TableCell>
                <TableCell style={{ width: 160 }} align="center">
                {row.telContact}
                </TableCell>
                <TableCell style={{ width: 160 }} align="center">
                {row.emailContact}
                </TableCell>
                <TableCell style={{ width: 160 }} align="center">                
                  <Tooltip title='Modifier ce contrat'  arrow>
                    <IconButton size='small' style={{color:'orange'}} component="span"onClick={() => {
                      history.push("/modifierContrat",{idContrat:row._id,page:'/listeContrat',idClient:history.location.state.idClient,raisonSociale:history.location.state.raisonSociale})
                    }}>
                      <UpdateIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title='Modifier ce contrat'  arrow>   
                    <IconButton size='small' color="secondary" component="span" onClick={() => { suprimerContrat(row._id)}}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>  
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
          <TableRow >
          
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
    <Row style={{margin:"10px"}}>
    <Col> 
    <Button variant="outlined"
            color="secondary"  
            style={{width: '300px'}} 
            size="medium" 
            onClick={()=>{
              history.push('/ListeClients')
           }}
          >Retourner ?? liste </Button></Col>
      <Col sm={6}></Col>  
     <Col>  
     <Button  variant="outlined" 
              color="primary"
              style={{ width: '300px'}}  
              size="medium"
              onClick={()=>{
                history.push("/ajouterContrat/"+history.location.state.idClient+"/"+history.location.state.raisonSociale,{page:'/listeContrat',idClient:history.location.state.idClient})
              }}
             >Ajouter un nouveau </Button> </Col>
    </Row>  
    </>
  );
}

export default  ListeContrat;