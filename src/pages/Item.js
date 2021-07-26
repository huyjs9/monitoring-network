import { filter } from 'lodash';
import { Icon } from '@iconify/react';
import { sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
import roundFilterList from '@iconify/icons-ic/round-filter-list';

import { Link as RouterLink } from 'react-router-dom';
// material
import {
	Card,
	Table,
	Stack,
	Avatar,
	Button,
	Checkbox,
	TableRow,
	TableBody,
	TableCell,
	Container,
	Typography,
	TableContainer,
	TablePagination,
} from '@material-ui/core';
// components
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import SearchNotFound from '../components/SearchNotFound';
import {
	ItemListHead,
	ItemListToolbar,
	ItemMoreMenu,
	ItemDialog,
	ItemListHeadInterface,
} from '../components/_dashboard/item';
//
import USERLIST from '../_mocks_/user';
import { useSelector } from 'react-redux';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
	{ id: 'name', label: 'Name', alignRight: false },
	{ id: 'itemid', label: 'ItemID', alignRight: false },
	{ id: 'lastvalue', label: 'Last Value', alignRight: false },
	{ id: 'units', label: 'Units', alignRight: false },
	{ id: '' },
];

const TABLE_HEAD_INTERFACE = [
	{ id: 'id', label: 'Index', alignRight: false },
	{ id: 'description', label: 'Description', alignRight: false },
	{ id: 'stt', label: 'Status', alignRight: false },
	{ id: 'bitr', label: 'Bits Recieved (bps)', alignRight: false },
	{ id: 'bits', label: 'Bits Sent (bps)', alignRight: false },
	{ id: 'speed', label: 'Speed', alignRight: true },
	{ id: '' },
];

// const TABLE_HEAD = [
// 	{ id: 'name', label: 'Name', alignRight: false },
// 	{ id: 'company', label: 'Company', alignRight: false },
// 	{ id: 'role', label: 'Role', alignRight: false },
// 	{ id: 'isVerified', label: 'Verified', alignRight: false },
// 	{ id: 'status', label: 'Status', alignRight: false },
// 	{ id: '' },
// ];

// ----------------------------------------------------------------------

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

function applySortFilter(array, comparator, query) {
	const stabilizedThis = array.map((el, index) => [el, index]);
	stabilizedThis.sort((a, b) => {
		const order = comparator(a[0], b[0]);
		if (order !== 0) return order;
		return a[1] - b[1];
	});
	if (query) {
		return filter(
			array,
			(_user) =>
				_user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
		);
	}
	return stabilizedThis.map((el) => el[0]);
}

export default function User() {
	const [page, setPage] = useState(0);
	const [pageInterface, setPageInterface] = useState(0);
	const [order, setOrder] = useState('asc');
	const [selected, setSelected] = useState([]);
	const [orderBy, setOrderBy] = useState('name');
	const [filterName, setFilterName] = useState('');
	const [rowsPerPage, setRowsPerPage] = useState(5);
	const [rowsPerPageInterface, setRowsPerPageInterface] = useState(5);
	const [open, setOpen] = useState(false);
	const itemData = useSelector((state) => state.item);

	const handleRequestSort = (event, property) => {
		const isAsc = orderBy === property && order === 'asc';
		setOrder(isAsc ? 'desc' : 'asc');
		setOrderBy(property);
	};

	const handleSelectAllClick = (event) => {
		if (event.target.checked) {
			const newSelecteds = itemData.map((n) => n.name);
			setSelected(newSelecteds);
			return;
		}
		setSelected([]);
	};

	useEffect(() => {
		console.log('30s lay ItemData', itemData);
	}, [itemData]);

	// const handleSelectAllClick = (event) => {
	// 	if (event.target.checked) {
	// 		const newSelecteds = USERLIST.map((n) => n.name);
	// 		setSelected(newSelecteds);
	// 		return;
	// 	}
	// 	setSelected([]);
	// };

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
				selected.slice(selectedIndex + 1)
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

	const handleFilterByName = (event) => {
		setFilterName(event.target.value);
	};

	//--------------------//

	const handleChangePageInterface = (event, newPage) => {
		setPageInterface(newPage);
	};

	const handleChangeRowsPerPageInterface = (event) => {
		setRowsPerPageInterface(parseInt(event.target.value, 10));
		setPageInterface(0);
	};

	const emptyRows =
		page > 0 ? Math.max(0, (1 + page) * rowsPerPage - itemData.length) : 0;

	// const emptyRows =
	// 	page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

	// const filteredUsers = applySortFilter(
	// 	USERLIST,
	// 	getComparator(order, orderBy),
	// 	filterName
	// );

	const filteredUsers = applySortFilter(
		itemData,
		getComparator(order, orderBy),
		filterName
	);

	const isUserNotFound = filteredUsers.length === 0;

	const handleClickOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	//Table 2
	let interfacebits = itemData.filter((number) =>
		number.name.includes('Interface' && 'Bits sent')
	);
	let interfacebitr = itemData.filter((number) =>
		number.name.includes('Interface' && 'Bits received')
	);
	let operation = itemData.filter((number1) =>
		number1.name.includes('Operational')
	);

	let array = [];
	for (let i = 0; i < interfacebits.length; i++) {
		let object = {};
		object['description'] = interfacebitr[i].name.replace(
			': Bits received',
			''
		);
		object['status'] = operation[i].lastvalue;
		object['bitrecieved'] = interfacebitr[i].lastvalue;
		object['bitsent'] = interfacebits[i].lastvalue;
		array.push(object);
	}

	return (
		<Page title="Item | Monitoring-UI">
			<Container>
				<Stack
					direction="row"
					alignItems="center"
					justifyContent="space-between"
					mb={5}
				>
					<Typography variant="h4" gutterBottom>
						Item
					</Typography>
					<Button
						variant="contained"
						// component={RouterLink}
						// to="#"
						onClick={() => handleClickOpen()}
						startIcon={<Icon icon={roundFilterList} />}
					>
						Host
					</Button>
				</Stack>
				<ItemDialog onClose={handleClose} open={open} />
				<Card>
					<ItemListToolbar
						numSelected={selected.length}
						filterName={filterName}
						onFilterName={handleFilterByName}
					/>

					<Scrollbar>
						<TableContainer sx={{ minWidth: 800 }}>
							<Table>
								<ItemListHead
									order={order}
									orderBy={orderBy}
									headLabel={TABLE_HEAD}
									rowCount={itemData.length}
									// rowCount={USERLIST.length}
									numSelected={selected.length}
									onRequestSort={handleRequestSort}
									onSelectAllClick={handleSelectAllClick}
								/>
								<TableBody>
									{filteredUsers
										.slice(
											page * rowsPerPage,
											page * rowsPerPage + rowsPerPage
										)
										.filter((item) => item.lastvalue > -1)
										.map((row) => {
											const {
												itemid,
												name,
												lastvalue,
												units,
											} = row;
											const isItemSelected =
												selected.indexOf(name) !== -1;

											return (
												<TableRow
													hover
													key={itemid}
													tabIndex={-1}
													role="checkbox"
													selected={isItemSelected}
													aria-checked={
														isItemSelected
													}
												>
													<TableCell padding="checkbox">
														<Checkbox
															checked={
																isItemSelected
															}
															onChange={(event) =>
																handleClick(
																	event,
																	name
																)
															}
														/>
													</TableCell>
													<TableCell
														component="th"
														scope="row"
														padding="none"
														width="50%"
													>
														<Stack
															direction="row"
															alignItems="center"
															spacing={2}
														>
															{/* <Avatar
																alt={name}
																src={avatarUrl}
															/> */}
															<Typography
																variant="subtitle2"
																noWrap
															>
																{name}
															</Typography>
														</Stack>
													</TableCell>

													<TableCell align="left">
														{itemid}
													</TableCell>
													<TableCell align="left">
														{Math.round(
															lastvalue * 100
														) / 100}
													</TableCell>
													<TableCell align="left">
														{units}
													</TableCell>

													{/* <TableCell align="left">
														{role}
													</TableCell>
													<TableCell align="left">
														{isVerified
															? 'Yes'
															: 'No'}
													</TableCell>
													<TableCell align="left">
														<Label
															variant="ghost"
															color={
																(status ===
																	'banned' &&
																	'error') ||
																'success'
															}
														>
															{sentenceCase(
																status
															)}
														</Label>
													</TableCell> */}

													{/* <TableCell align="right">
														<UserMoreMenu />
													</TableCell> */}
												</TableRow>
											);
										})}
									{emptyRows > 0 && (
										<TableRow
											style={{ height: 53 * emptyRows }}
										>
											<TableCell colSpan={6} />
										</TableRow>
									)}
								</TableBody>
								{isUserNotFound && (
									<TableBody>
										<TableRow>
											<TableCell
												align="center"
												colSpan={6}
												sx={{ py: 3 }}
											>
												<SearchNotFound
													searchQuery={filterName}
												/>
											</TableCell>
										</TableRow>
									</TableBody>
								)}
							</Table>
						</TableContainer>
					</Scrollbar>

					<TablePagination
						rowsPerPageOptions={[5, 10, 25]}
						component="div"
						count={itemData.length}
						// count={USERLIST.length}
						rowsPerPage={rowsPerPage}
						page={page}
						onPageChange={handleChangePage}
						onRowsPerPageChange={handleChangeRowsPerPage}
					/>
				</Card>

				{/*--------------------------------------------------*/}
				{/*Table 2 */}
				<Card style={{ marginTop: 10 }}>
					<Scrollbar>
						<TableContainer sx={{ minWidth: 800 }}>
							<Table>
								<ItemListHeadInterface
									// order={order}
									// orderBy={orderBy}
									headLabel={TABLE_HEAD_INTERFACE}
									// rowCount={USERLIST.length}
									// numSelected={selected.length}
									onRequestSort={handleRequestSort}
									// onSelectAllClick={handleSelectAllClick}
								/>
								<TableBody>
									{array
										.slice(
											pageInterface *
												rowsPerPageInterface,
											pageInterface *
												rowsPerPageInterface +
												rowsPerPageInterface
										)
										.map((row, index) => {
											const {
												description,
												status,
												bitrecieved,
												bitsent,
											} = row;
											// const isItemSelected =
											// 	selected.indexOf(name) !== -1;

											return (
												<TableRow
													hover
													key={index}
													tabIndex={-1}
													role="checkbox"
													// selected={isItemSelected}
												>
													<TableCell padding="checkbox">
														{/* <Checkbox
															checked={
																isItemSelected
															}
															onChange={(event) =>
																handleClick(
																	event,
																	name
																)
															}
														/> */}
													</TableCell>
													<TableCell
														component="th"
														scope="row"
														padding="none"
														width="5%"
													>
														<Stack
															// direction="row"
															alignItems="center"
															spacing={2}
														>
															{/* <Avatar
																alt={name}
																src={avatarUrl}
															/> */}
															<Typography
																variant="subtitle2"
																noWrap
															>
																{index + 1}
															</Typography>
														</Stack>
													</TableCell>

													<TableCell align="left">
														{description}
													</TableCell>
													<TableCell align="center">
														<Label
															variant="ghost"
															color={
																(status <= 1 &&
																	'success') ||
																'error'
															}
														>
															{status <= 1
																? sentenceCase(
																		'up'
																  )
																: sentenceCase(
																		'down'
																  )}
														</Label>
													</TableCell>
													<TableCell align="left">
														{bitrecieved}
													</TableCell>

													<TableCell align="left">
														{bitsent}
													</TableCell>
													<TableCell align="right">
														1000
													</TableCell>
													{/* <TableCell align="left">
														<Label
															variant="ghost"
															color={
																(status ===
																	'banned' &&
																	'error') ||
																'success'
															}
														>
															{sentenceCase(
																status
															)}
														</Label>
													</TableCell> */}

													{/* <TableCell align="right">
														<UserMoreMenu />
													</TableCell> */}
												</TableRow>
											);
										})}
									{/* {emptyInterfaceRows > 0 && (
										<TableRow
											style={{
												height: 53 * emptyInterfaceRows,
											}}
										>
											<TableCell colSpan={6} />
										</TableRow>
									)} */}
								</TableBody>
							</Table>
						</TableContainer>
					</Scrollbar>

					<TablePagination
						rowsPerPageOptions={[5, 10, 25]}
						component="div"
						count={array.length}
						// count={USERLIST.length}
						rowsPerPage={rowsPerPageInterface}
						page={pageInterface}
						onPageChange={handleChangePageInterface}
						onRowsPerPageChange={handleChangeRowsPerPageInterface}
					/>
				</Card>
			</Container>
		</Page>
	);
}
