import React, { useState, useEffect, useCallback } from "react"
import { Breadcrumb } from "matx"
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { lighten, makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Checkbox from '@material-ui/core/Checkbox'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import DeleteIcon from '@material-ui/icons/Delete'
import FilterListIcon from '@material-ui/icons/FilterList'
import MailIcon from '@material-ui/icons/Mail'

import { Button, TextField } from "@material-ui/core"

import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'

import { useHistory } from 'react-router-dom'
import { context as c } from '../../../context'
import axios from 'axios'

const session = sessionStorage.getItem("sessionMember")


// const createData = (email, name, stock_qty, is_activate_member, exit) => {
//   return { email, name, stock_qty, is_activate_member, exit };
// }


// const rows = [];

//  const descendingComparator = (a, b, orderBy) => {
//   if (b[orderBy] < a[orderBy]) {
//     return -1;
//   }
//   if (b[orderBy] > a[orderBy]) {
//     return 1;
//   }
//   return 0;
// }

// const getComparator = (order, orderBy) => {
//   return order === 'desc'
//     ? (a, b) => descendingComparator(a, b, orderBy)
//     : (a, b) => -descendingComparator(a, b, orderBy);
// }

// const stableSort = (array, comparator) => {
//   const stabilizedThis = array.map((el, index) => [el, index]);
//   stabilizedThis.sort((a, b) => {
//     const order = comparator(a[0], b[0]);
//     if (order !== 0) return order;
//     return a[1] - b[1];
//   });
//   return stabilizedThis.map((el) => el[0]);
// }

// const headCells = [
//   { id: 'email', numeric: false, disablePadding: true, label: '계정' },
//   { id: 'name', numeric: true, disablePadding: false, label: '이름' },
//   { id: 'stock_qty', numeric: true, disablePadding: false, label: '보유주식 수' },
//   { id: 'is_activate_member', numeric: true, disablePadding: false, label: '활성 여부' },
//   { id: 'probability_churn', numeric: true, disablePadding: false, label: '이탈 확률' },
// ];

// const EnhancedTableHead = (props) => {
//   const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
//   const createSortHandler = (property) => (event) => {
//     onRequestSort(event, property);
//   };

//   return (
//     <TableHead>
//       <TableRow>
//         <TableCell padding="checkbox">
//           <Checkbox
//             indeterminate={numSelected > 0 && numSelected < rowCount}
//             checked={rowCount > 0 && numSelected === rowCount}
//             onChange={onSelectAllClick}
//             inputProps={{ 'aria-label': 'select all desserts' }}
//           />
//         </TableCell>
//         {headCells.map((headCell) => (
//           <TableCell
//             key={headCell.id}
//             align={headCell.numeric ? 'right' : 'left'}
//             padding={headCell.disablePadding ? 'none' : 'default'}
//             sortDirection={orderBy === headCell.id ? order : false}
//           >
//             <TableSortLabel
//               active={orderBy === headCell.id}
//               direction={orderBy === headCell.id ? order : 'asc'}
//               onClick={createSortHandler(headCell.id)}
//             >
//               {headCell.label}
//               {orderBy === headCell.id ? (
//                 <span className={classes.visuallyHidden}>
//                   {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
//                 </span>
//               ) : null}
//             </TableSortLabel>
//           </TableCell>
//         ))}
//       </TableRow>
//     </TableHead>
//   );
// }

// EnhancedTableHead.propTypes = {
//   classes: PropTypes.object.isRequired,
//   numSelected: PropTypes.number.isRequired,
//   onRequestSort: PropTypes.func.isRequired,
//   onSelectAllClick: PropTypes.func.isRequired,
//   order: PropTypes.oneOf(['asc', 'desc']).isRequired,
//   orderBy: PropTypes.string.isRequired,
//   rowCount: PropTypes.number.isRequired,
// };

// const useToolbarStyles = makeStyles((theme) => ({
//   root: {
//     paddingLeft: theme.spacing(2),
//     paddingRight: theme.spacing(1),
//   },
//   highlight:
//     theme.palette.type === 'light'
//       ? {
//           color: theme.palette.secondary.main,
//           backgroundColor: lighten(theme.palette.secondary.light, 0.85),
//         }
//       : {
//           color: theme.palette.text.primary,
//           backgroundColor: theme.palette.secondary.dark,
//         },
//   title: {
//     flex: '1 1 100%',
//   },
// }));

// const EnhancedTableToolbar = (props) => {
//   const classes = useToolbarStyles();
//   const { numSelected } = props;

//   const clickDelete = () => {
//     // 체크박스 선택된 행 있는지 확인 후 삭제 로직
//     alert('프로모션 메일 발송!')
//   }

//   return (
//     <Toolbar
//       className={clsx(classes.root, {
//         [classes.highlight]: numSelected > 0,
//       })}
//     >
//       {numSelected > 0 ? (
//         <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
//           {numSelected} selected
//         </Typography>
//       ) : (
//         <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
//           특별 관리 회원
//         </Typography>
//       )}

//       {numSelected > 0 ? (
//         <Tooltip title="Delete">
//           <IconButton aria-label="delete">
//             <MailIcon onClick={clickDelete} />
//           </IconButton>
//         </Tooltip>
//       ) : null
//       // (
//       //   <Tooltip title="Filter list">
//       //     <IconButton aria-label="filter list">
//       //       <FilterListIcon />
//       //     </IconButton>
//       //   </Tooltip>
//       // )
//       }
//     </Toolbar>
//   );
// };

// EnhancedTableToolbar.propTypes = {
//   numSelected: PropTypes.number.isRequired,
// };

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  container: {
    padding: '20px'
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
  float_right: {
    float: 'right',
    padding: '20px'
  }
}));

// const Admin = () => {
//   const classes = useStyles();
//   const [order, setOrder] = useState('asc');
//   const [orderBy, setOrderBy] = useState('exit');
//   const [selected, setSelected] = useState([]);
//   const [page, setPage] = useState(0);
//   const [dense, setDense] = useState(false);
//   const [rowsPerPage, setRowsPerPage] = useState(5);

//   const [data, setData] = useState([])
//   const history = useHistory()


//   useEffect(() => {
//     if (session == 'admin@stockpsychic.com'){
//       axios.get(`http://localhost:8080/api/highchurnmembers`)
//       .then(res => {
//         setData(res.data)
//       })
//       .catch(e => {
//         alert('list Fail')
//         throw(e)
//       })
//     }else{
//       alert('접근 권한이 없습니다.')
//       history.push('/')
//     }
      
//   }, [])

//   const handleRequestSort = (event, property) => {
//     const isAsc = orderBy === property && order === 'asc';
//     setOrder(isAsc ? 'desc' : 'asc');
//     setOrderBy(property);
//   };

//   const handleSelectAllClick = (event) => {
//     if (event.target.checked) {
//       const newSelecteds = data.map((n) => n.name);
//       setSelected(newSelecteds);
//       return;
//     }
//     setSelected([]);
//   };

//   const handleClick = (event, name) => {
//     const selectedIndex = selected.indexOf(name);
//     let newSelected = [];

//     if (selectedIndex === -1) {
//       newSelected = newSelected.concat(selected, name);
//     } else if (selectedIndex === 0) {
//       newSelected = newSelected.concat(selected.slice(1));
//     } else if (selectedIndex === selected.length - 1) {
//       newSelected = newSelected.concat(selected.slice(0, -1));
//     } else if (selectedIndex > 0) {
//       newSelected = newSelected.concat(
//         selected.slice(0, selectedIndex),
//         selected.slice(selectedIndex + 1),
//       );
//     }

//     setSelected(newSelected);
//   };

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const handleChangeDense = (event) => {
//     setDense(event.target.checked);
//   };

//   const isSelected = (name) => selected.indexOf(name) !== -1;

//   const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

//   return (
//     <div className="m-sm-30">
//     <div  className="mb-sm-30">
//       <Breadcrumb
//         routeSegments={[
//           { name: "관리자 페이지" }
//         ]}
//       />
//     </div>
//     <div className={classes.root}>
//       <Paper className={classes.paper}>
//         <EnhancedTableToolbar numSelected={selected.length} />
//         <TableContainer className={classes.container}>
//           <Table
//             className={classes.table}
//             aria-labelledby="tableTitle"
//             size={dense ? 'small' : 'medium'}
//             aria-label="enhanced table"
//           >
//             <EnhancedTableHead
//               classes={classes}
//               numSelected={selected.length}
//               order={order}
//               orderBy={orderBy}
//               onSelectAllClick={handleSelectAllClick}
//               onRequestSort={handleRequestSort}
//               rowCount={data.length}
//             />
//             <TableBody>
//               {stableSort(data, getComparator(order, orderBy))
//                 .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                 .map((row, index) => {
//                   const isItemSelected = isSelected(row.name);
//                   const labelId = `enhanced-table-checkbox-${index}`;

//                   return (
//                     <TableRow
//                       hover
//                       onClick={(event) => handleClick(event, row.name)}
//                       role="checkbox"
//                       aria-checked={isItemSelected}
//                       tabIndex={-1}
//                       key={row.name}
//                       selected={isItemSelected}
//                     >
//                       <TableCell padding="checkbox">
//                         <Checkbox
//                           checked={isItemSelected}
//                           inputProps={{ 'aria-labelledby': labelId }}
//                         />
//                       </TableCell>
//                       <TableCell component="th" id={labelId} scope="row" padding="none">
//                         {row.email}
//                       </TableCell>
//                       <TableCell align="right">{row.name}</TableCell>
//                       <TableCell align="right">{row.stock_qty}</TableCell>
//                       <TableCell align="right">{row.is_active_member == 0 ? 'N' : 'Y'}</TableCell>
//                       <TableCell align="right">{(row.probability_churn * 100).toFixed(2)}%</TableCell>
//                     </TableRow>
//                   );
//                 })}
//               {emptyRows > 0 && (
//                 <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
//                   <TableCell colSpan={6} />
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>
//         <TablePagination
//           rowsPerPageOptions={[5, 10]}
//           component="div"
//           count={data.length}
//           rowsPerPage={rowsPerPage}
//           page={page}
//           onChangePage={handleChangePage}
//           onChangeRowsPerPage={handleChangeRowsPerPage}
//         />
//       </Paper>
//     </div>
//     <MemberList/>
//     </div>
    
//   );
// }


// ==============================================================================================================
// ==============================================================================================================
// ================================================== 회원 관리 ==================================================
// ==============================================================================================================
// ==============================================================================================================


const descendingComparatorForMember = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

const getComparatorForMember = (order, orderBy) => {
  return order === 'desc'
    ? (a, b) => descendingComparatorForMember(a, b, orderBy)
    : (a, b) => -descendingComparatorForMember(a, b, orderBy);
}

const stableSortForMember = (array, comparator) => {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCellsForMembers = [
  { id: 'email', numeric: false, disablePadding: true, label: '계정' },
  { id: 'name', numeric: true, disablePadding: false, label: '이름' },
  { id: 'gender', numeric: true, disablePadding: false, label: '성별' },
  { id: 'age', numeric: true, disablePadding: false, label: '나이' },
  { id: 'stock_qty', numeric: true, disablePadding: false, label: '보유주식 수' },
  { id: 'is_active_member', numeric: true, disablePadding: false, label: '활성 여부' },
  { id: 'probability_churn', numeric: true, disablePadding: false, label: '이탈 확률' },
];

const EnhancedTableHeadForMember = (props) => {
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
        {headCellsForMembers.map((headCell) => (
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

EnhancedTableHeadForMember.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStylesForMember = makeStyles((theme) => ({
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

const Admin = () => {
  const classes = useStyles();
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('exit');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [data, setData] = useState([])
  const history = useHistory()

  const [choice, setChoice] = useState('email')

  useEffect(() => {
    if (session == 'admin@stockpsychic.com'){
      getMembers()
    }else{
      alert('접근 권한이 없습니다.')
      history.push('/')
    }
      
  }, [])

  const getMembers = useCallback(async e => {
    try{
      const req = {
        method: c.get,
        url: `${c.url}/api/members`
      }
      const res = await axios(req)
      setData(res.data)
    }catch (err) {
      alert('FAIL')
      throw(err)
    }
  })

  const memberSearch = useCallback(async e => {
    try{
      const searchInput = document.getElementById('searchInput').value
      if(searchInput == ''){
        getMembers()
      }else if(choice == 'email'){
        const req = {
          method: c.get,
          url: `${c.url}/api/member/${searchInput}`,
        }
        const res = await axios(req)
        if (res.data == null){
          alert('검색에 해당하는 회원이 존재하지 않습니다.')
          return
        }else{
          setData(res.data)
        }
      }else if(choice == 'name'){
        const req = {
          method: c.get,
          url: `${c.url}/api/member-by-name/${searchInput}`,
        }
        const res = await axios(req)
        console.log(res.data)
        if (res.data == null){
          alert('검색에 해당하는 회원이 존재하지 않습니다.')
          return
        }else{
          setData(res.data)
        }
      }
    }catch(err){
      throw(err)
    }
  })

  const choice_option = [
    { label: "이메일", value: "email" },
    { label: "이름", value: "name" }
  ]

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = data.map((n) => n.name);
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

  const isSelected = (email) => selected.indexOf(email) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

  return (
    <div className="m-sm-30">
     <div  className="mb-sm-30">
       <Breadcrumb
         routeSegments={[
           { name: "관리자 페이지" }
         ]}
       />
     </div>
    <div className={classes.root}>
      <Paper className={classes.paper}>
      <EnhancedTableToolbarForMember numSelected={selected.length} />
        <TableContainer className={classes.container}>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
            aria-label="enhanced table"
          >
            <EnhancedTableHeadForMember
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={data.length}
            />
            <TableBody>
              {stableSortForMember(data, getComparatorForMember(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.email)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.email}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>
                      <TableCell component="th" id={labelId} scope="row" padding="none">
                        {row.email}
                      </TableCell>
                      <TableCell align="right">{row.name}</TableCell>
                      <TableCell align="right">{row.gender}</TableCell>
                      <TableCell align="right">{row.age}</TableCell>
                      <TableCell align="right">{row.stock_qty}</TableCell>
                      <TableCell align="right">{row.is_active_member == 0 ? 'N' : 'Y'}</TableCell>
                      <TableCell align="right">{(row.probability_churn * 100).toFixed(2)}%</TableCell>
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
        <TableContainer className={classes.container}>
          <Table className={classes.table}>
            <TableRow fullWidth style={{verticalAlign: "middle"}}>
              <TableCell style={{verticalAlign: "middle"}} fullWidth>
                <FormControl style={{width: "20%"}} variant="outlined" className={classes.formControl}>
                  <Select
                    native
                    value={choice}
                    onChange={(e) => {setChoice(e.target.value)}}
                    validators={["required"]} errorMessages={["this field is required"]}
                  >
                    {choice_option.map((row, idx) => (
                      <option value={row.value}>{row.label}</option>
                    ))}
                  </Select>
                </FormControl>&nbsp;&nbsp;
                <TextField style={{width: "60%"}} id="searchInput" placeholder="회원 검색" variant="outlined"/>&nbsp;&nbsp;
                <Button style={{width: "10%"}} className="capitalize mr-10 lg" variant="contained" color="primary" type="submit" onClick={memberSearch}>search</Button>
              </TableCell>
              <TableCell width="50%">
                <TablePagination
                  rowsPerPageOptions={[5, 10, 20, 30]}
                  component="div"
                  count={data.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                />  
              </TableCell>
            </TableRow>
          </Table>
        </TableContainer>
      </Paper>
      
    </div>
    </div>
  )
}

const EnhancedTableToolbarForMember = (props) => {
  const classes = useToolbarStylesForMember();
  const { numSelected } = props;

  const clickMail = () => {
    alert('프로모션 발송')
  }

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
          회원 관리
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="mail">
            <MailIcon onClick={clickMail} />
          </IconButton>
        </Tooltip>
      ) : null
      }
    </Toolbar>
  );
};

export default Admin
