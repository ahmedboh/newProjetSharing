import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import Axios from 'axios';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";

function createDatamoin(nomClient, Jan, Fev, Mar, Avr, Mai, Juin, Juil, Aôu, Sep, Oct, Nov, Dec) {
  return { nomClient, Jan, Fev, Mar, Avr, Mai, Juin, Juil, Aôu, Sep, Oct, Nov, Dec };
}

const rows = [];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
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
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [];

function EnhancedTableHead(props) {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: '1 1 100%',
  },
}));

const useStyles1 = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

const inter ="";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

export default function TableauStatAnnee() {
  const [dataannée,setDataannée]=useState({année:"",labels:[],datasets:[],totale:0})
  const [Filters,setFilters]=useState({year:0,IDclient:"",IDintervenant:""})
  const [listeAnnees,setListeAnnees]=useState([])
  const [listeIntervenants,setListeIntervenants]=useState([])
  const [listeClients,setListeClients]=useState([])
  const [labels]=useState([])
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const EnhancedTableToolbar = (props) => {
    const classes = useToolbarStyles();
    const { numSelected } = props;
    const classes1 = useStyles1();
    const [open, setOpen] = React.useState(false);
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const menuItemIntervenants= listeIntervenants.map((inter)=>{return <MenuItem value={inter._id} key={inter._id}>{inter.nom+' '+inter.prenom}</MenuItem>});
    const menuItemClients= listeClients.map((client)=>{return <MenuItem value={client._id} key={client._id}>{client.raisonSociale}</MenuItem>});
    return (
      <Toolbar
        className={clsx(classes.root, {
          [classes.highlight]: numSelected > 0,
        })}
      >
        {numSelected > 0 ? (
          <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
            {numSelected} selected
          </Typography>
        ) : (
          <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
            Statistiques
          </Typography>
        )}
  
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <>
          <Tooltip title="Filter list">
            <IconButton aria-label="filter list" onClick={handleClickOpen}>
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        <Dialog disableBackdropClick disableEscapeKeyDown open={open} onClose={handleClose}>
          <DialogTitle>Séléctioner</DialogTitle>
          <DialogContent>
            <form className={classes1.container}>
            <FormControl className={classes1.formControl}>
                <InputLabel id="demo-dialog-select-label">Client</InputLabel>
                <Select
                  labelId="demo-dialog-select-label"
                  id="demo-dialog-select"
                  onChange={(event)=>{handleFilters(event.target.value,'IDclient')}}
                  input={<Input />}
                >
                  <MenuItem value="0">
                    <em>None</em>
                  </MenuItem>
                  {menuItemClients}
                </Select>
              </FormControl>
              <FormControl className={classes1.formControl}>
                <InputLabel id="demo-dialog-select-label">Intervenant</InputLabel>
                <Select
                  labelId="demo-dialog-select-label"
                  id="demo-dialog-select"
                  onChange={(event)=>{handleFilters(event.target.value,'IDintervenant')}}
                  input={<Input />}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {menuItemIntervenants}
                </Select>
              </FormControl>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
          </>
        )}
      </Toolbar>
    );
  };
  
  EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
  };
  
  const handleFilters = async (filters, category) => {
    console.log(filters,category);
    const newFilters = { ...Filters }
    newFilters[category] = filters;
    setFilters(newFilters);
    getStatAnnées(newFilters);
  }
  
  useEffect(() => {
    getStatAnnées(Filters);
    getClients();
    getIntervenants();
  }, [])

  const getClients =async ()=>{
    const res= await Axios.get(`client`)
    setListeClients(res.data.data)
  }
  const getIntervenants =async ()=>{
    const res= await Axios.get(`membSociete/getMembSocietesRole/${"In"}`)
    setListeIntervenants(res.data.data)
  }
  const getStatAnnées = async(filt)=>{
    const res=await Axios.post('statistique',{"year":0})
    rows.splice(0, rows.length);
    res.data.data.labels.map((val)=>{
    getStat(val,filt) 
    })   
  }
  const getStat = async(année,filter)=>{
    const newFilters = { ...filter }
    newFilters["year"] = année;
    const res=await Axios.post('statistique',newFilters)
    const newData = { ...dataannée }
    newData['année']=année
    newData['datasets']=res.data.data.values
    newData['totale']=res.data.data.somme
    labels.splice(0, labels.length);
    labels.push(res.data.data.labels)
    rows.push(createDatamoin(année,res.data.data.values[0],res.data.data.values[1],res.data.data.values[2],res.data.data.values[3],res.data.data.values[4],res.data.data.values[5],res.data.data.values[6],res.data.data.values[7],res.data.data.values[8],res.data.data.values[9],res.data.data.values[10],res.data.data.values[11]))
    setDataannée(newData) 
    getheadCells();    
  }
  const getheadCells =()=>{
    headCells.splice(0, headCells.length);
    headCells.push ({ id: 'année', numeric: false, disablePadding: true, label: 'Année' })
    labels[0].map((val)=>{ 
      headCells.push ({ id: val, numeric: true, disablePadding: false, label: val }) 
    }) 
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
const contenu = (row) => {
  var tab=[];
  for (let key in row) {
   if (key !== 'nomClient')
    tab.push(row[key]);
}
return tab;}

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.nomClient)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.name}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>
                      <TableCell component="th" id={labelId} scope="row" padding="none">
                        {row.nomClient}
                      </TableCell>
                      {
                      Filters["year"] === 0 ?
                      contenu(row).map((val)=>(<TableCell align="right">{val}</TableCell>))
                      :
                      <>
                      <TableCell align="right">{row.Jan}</TableCell>
                      <TableCell align="right">{row.Fev}</TableCell>
                      <TableCell align="right">{row.Mar}</TableCell>
                      <TableCell align="right">{row.Avr}</TableCell>
                      <TableCell align="right">{row.Mai}</TableCell>
                      <TableCell align="right">{row.Juin}</TableCell>
                      <TableCell align="right">{row.Juil}</TableCell>
                      <TableCell align="right">{row.Aôu}</TableCell>
                      <TableCell align="right">{row.Sep}</TableCell>
                      <TableCell align="right">{row.Oct}</TableCell>
                      <TableCell align="right">{row.Nov}</TableCell>
                      <TableCell align="right">{row.Dec}</TableCell>
                      </>
                }         
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
