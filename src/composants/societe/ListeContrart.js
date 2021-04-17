import { useEffect, useState } from 'react';
import Axios from 'axios';
import PropTypes from 'prop-types';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
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
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import DeleteIcon from '@material-ui/icons/Delete';
import RestorePageIcon from '@material-ui/icons/RestorePage';
import { useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));
const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };
  
  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const useStyles2 = makeStyles({
  table: {
    minWidth: 500,
  },
});

export default function ListeContrat() {
    const [rows , setRows ]=useState([]);
    const classes = useStyles2();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
    let history = useHistory();

    const listeContrat=()=>{
      Axios.get(`http://localhost:3001/api/v1/contrat/getContratsClient/${history.location.state.idClient}`)
      .then(res => {
        const clients = res.data.data;
        setRows( clients );
        })
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

  const useRowStyles = makeStyles({
    root: {
      '& > *': {
        borderBottom: 'unset',
      },
    },
  });

  function Row(props) {
    const { row } = props;
    const [open, setOpen] = useState(false);
    const classes = useRowStyles();
    return (
      <>
        <TableRow className={classes.root}>
          <TableCell component="th" scope="row" align="center">
            {row.type}
          </TableCell>
          <TableCell style={{ width: 160 }} align="center">
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
          {row.telContact}
          </TableCell>
          <TableCell style={{ width: 160 }} align="center">
          {row.emailContact}
          </TableCell>
          <TableCell style={{ width: 160 }} align="center">
          <IconButton component="span"onClick={() => {
            history.push("/modifierContrat",{idContrat:row._id,page:'/listeContrat',idClient:history.location.state.idClient})
          }}>
            <RestorePageIcon />
          </IconButton>      
          <IconButton color="secondary" component="span" onClick={() => {
            Axios.delete(`http://localhost:3001/api/v1/contrat/${row._id}`)
            .then(res => {
                listeContrat()
            });
          }}>
            <DeleteIcon />
          </IconButton>  
          </TableCell>
        </TableRow>
      </>
    );
  }
  
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="custom pagination table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Type de contrat </StyledTableCell>
            <StyledTableCell align="center">Nombre de visites de maintenance préventive par an</StyledTableCell>
            <StyledTableCell align="center">Nombre de visites de maintenance curative par an</StyledTableCell>
            <StyledTableCell align="center">Prix unitaire des interventions supplémentaires</StyledTableCell>
            <StyledTableCell align="center">Contact</StyledTableCell>
            <StyledTableCell align="center">Liste des contrats</StyledTableCell>
            <StyledTableCell align="center">N° téléphone contact</StyledTableCell>
            <StyledTableCell align="center">Adresse email contact</StyledTableCell>
            <StyledTableCell align="center">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row) => (
            <Row key={row.name} row={row} />
          ))}

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow style={{position:'absolute',width:'100%'}}>
          <Button variant="outlined" color="secondary"  style={{width: '300px', position:'relative',left:'10px' ,top :'5px'}} size="medium" onClick={()=>{
              history.push('/ListeClients')
          }}>Retourner à liste </Button>
            
            <TablePagination
               style={{ position:'relative',left:'80%' ,top :'-50px'}}
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
          <Button variant="outlined" color="primary"  style={{ width: '300px', position:'absolute',right:'10px' ,top :'5px' }}  size="medium"onClick={()=>{
                history.push("/ajouterContrat/"+history.location.state.idClient+"/"+history.location.state.raisonSociale,{page:'/listeContrat'})
          }}>Ajouter un nouveau </Button>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}