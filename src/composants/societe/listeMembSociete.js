import React, { useEffect, useState } from 'react';
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

export default function ListeMembSocietes() {
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
            <TableRow className={classes.root}>
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
                <RestorePageIcon />
              </IconButton>  
            </TableCell>
            <TableCell style={{ width: 160 }} align="center">
              <IconButton color="secondary" component="span" onClick={() => {
                console.log(row._id);
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
  );
}