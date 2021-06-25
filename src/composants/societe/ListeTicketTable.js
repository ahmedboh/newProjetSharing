import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import { useState ,useEffect} from 'react';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import  'bootstrap/dist/css/bootstrap.min.css';
import Tooltip from '@material-ui/core/Tooltip';
import { useHistory } from "react-router-dom";
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import ReactToExcel from 'react-html-table-to-excel';


const rows = [];
function chargerRows(raisonSociale, ref, nature, priorite, dateCreation,etat) {
 rows.push({raisonSociale, ref, nature, priorite, dateCreation,etat})
}

function descendingComparator(a, b, orderBy) {
   var val1=orderBy!=='dateCreation'?b[orderBy]:(new Date(b[orderBy])).getTime()
   var val2=orderBy!=='dateCreation'?a[orderBy]:(new Date(a[orderBy])).getTime()
    if (val1<val2) {
      return -1;
    }
    if (val1>val2) {
      return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  console.log(stabilizedThis.length)
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: 'raisonSociale',  label: 'Raison Sociale' },
  { id: 'ref', label: 'Réference' },
  { id: 'nature', label: 'Nature' },
  { id: 'priorite', label: 'Priorite' },
  { id: 'dateCreation', label: 'Date de Creation' },
  { id: 'etat', label: 'Etat' },
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
 
  return (
    <TableHead>
      <TableRow className='headtableTicket' >
        {headCells.map((headCell) => (
          <TableCell key={headCell.id} >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}>
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell align="center" >Actions</TableCell>
      </TableRow>
    </TableHead>
  );
}

const useStyles = makeStyles(() => ({
   paper: {
    width: '100%',
  },
  table: {
    minWidth: 750,
  },
}));

const ListeTicketTable=(props) =>{
  let history = useHistory();
  const{listeTicket,supprimerTicket}=props
  const classes = useStyles();
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('ref');

 

  const charger=()=>{
  
    listeTicket.map((data)=>{chargerRows(data.IDclient.raisonSociale,data.ref,data.nature,data.priorite,data.dateCreation,data.etat)})

  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  }; 

  useEffect(() => {
    rows.splice(0)
    charger()
  },[listeTicket]);

  return (
    <div className='boxLIteTicketTable'>
      <Paper className={classes.paper}>
      <span  style={{margin:'5px'}}>
          <ReactToExcel  className='btn btn-outline-success' table="table" filename="listeDesTickets" sheet="sheet 1" buttonText="Exporter"/>
      </span>  
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size='small'
            aria-label="enhanced table"
            id="table"
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .map((row, index) => {
                  return (
                    <TableRow hover key={index} >
                      <TableCell> {row.raisonSociale}</TableCell>
                      <TableCell >{row.ref}</TableCell>
                      <TableCell>{row.nature}</TableCell>
                      <TableCell >{row.priorite}</TableCell>
                      <TableCell >{new Date(row.dateCreation).toLocaleDateString()}</TableCell>
                      <TableCell >{row.etat}</TableCell>
                      <TableCell align='center' >
                      <Tooltip title='Ouvrir ce Ticket'   arrow>
                        <IconButton color="primary" size='small' onClick={()=>{ history.push("/affecter",{interv:listeTicket[index],contrat:'contrat'})}} component="span" >
                            <OpenInNewIcon  />
                        </IconButton>
                      </Tooltip>  
                      <Tooltip title='Supprimer ce Ticket'   arrow>
                        <IconButton color="secondary" size='small' onClick={()=>{supprimerTicket(listeTicket[index]._id)}} component="span" >
                            <DeleteIcon  />
                        </IconButton>
                      </Tooltip>  
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
}
export default ListeTicketTable;