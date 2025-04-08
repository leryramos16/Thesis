import React, { useState, useEffect, useContext } from 'react';
import { styled, useTheme } from '@mui/material/styles'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import CardActionArea from '@mui/material/CardActionArea';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import Modal from '@mui/material/Modal';
import Chip from '@mui/material/Chip';
import Backdrop from '@mui/material/Backdrop';
import { Save, Edit, Delete, Add } from '@mui/icons-material';
import Select from 'react-select';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import axios from "axios";

//Pages
import Login from './Login';
import Content from './Content';

//Context
import UserContext from '../context/UserContext';

const customMultiSelectStyle = {
    clearIndicator: (ci) => ({
        ...ci
        // backgroundColor: '#383f48',
    }),
    dropdownIndicator: (ci) => ({
        ...ci
        // backgroundColor: "#383f48"
    }),
    indicatorsContainer: (ci) => ({
        ...ci,
        color: "red",
        // backgroundColor: "#383f48",
        position: "sticky",
        top: 0,
        height: "40px",
        zIndex: "100"
    }),
    control: (base) => ({
        ...base,
        height: 40,
        minHeight: 40,
        overflowX: "hidden",
        overflowY: "auto",
        borderRadiusTopRight: 0,
        borderRadiusBottomRight: 0,
        width: "100%"
        // backgroundColor: '#383f48',
    }),
    option: (provided, state) => ({
        ...provided,
        color: state.isSelected ? 'white' : 'black',
        padding: 20,
        zIndex: 1000
    }),
    singleValue: base => ({
        ...base,
        // color: "#fff"
    }),
    multiValue: (styles, { data }) => {
        return {
            ...styles,
            backgroundColor: "#1E8EFF",
        };
    },
    multiValueLabel: (styles, { data }) => ({
        ...styles,
        color: "#00000",
    }),
    input: base => ({
        ...base,
        // color: "#fff"
    }),
    menu: (provided) => ({ ...provided, zIndex: 9999 }),
};

const customSelectStyle = {
    container: base => ({
        ...base,
        flex: 1,
    }),
    control: base => ({
        ...base,
        height: 40,
        minHeight: 40,
        borderRadiusTopRight: 0,
        borderRadiusBottomRight: 0,
        // backgroundColor: '#383f48',
    }),
    option: (provided, state) => ({
        ...provided,
        color: state.isSelected ? 'white' : 'black',
        padding: 20,
        zIndex: 1000
    }),
    singleValue: base => ({
        ...base,
        // color: "#fff"
    }),
    input: base => ({
        ...base,
        // color: "#fff"
    }),
    menu: (provided) => ({ ...provided, zIndex: 9999 }),
};

const Inventory = (props) => {
    const [loader, setLoader] = useState(true);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [stockData, setStockData] = useState(null);
    const [selectedStock, setSelectedStock] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState([]);
    const [stockOptions, setStockOptions] = useState(null);
    const [id, setId] = useState(-1);
    const [name, setName] = useState(null);
    const [quantity, setQuantity] = useState(0);
    const [category, setCategory] = useState("");
    const [notifier, setNotifier] = useState(0);
    const [totalStocks, setTotalStocks] = useState(0);
    const [addModal, setAddModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [deletePopup, setDeletePopup] = useState(false);
    const [role, setRole] = useState("");
    const [page, setPage] = useState(0);

    useEffect(() => {
        const user = JSON.parse(sessionStorage.getItem('user'));
        setRole(user.role);
    }, []);

    useEffect(() => {
        var data = {
            selectedStock: !selectedStock ? [] : selectedStock,
            selectedCategory: !selectedCategory ? [] : selectedCategory,
            page: page
        };
        var route = "inventory/list";
        var url = window.apihost + route;
        console.log(url);
        // var token = sessionStorage.getItem("auth-token");
        // const user = JSON.parse(sessionStorage.getItem('user'));
        axios
            .post(url, data)
            .then(function (response) {
                // handle success
                if (Array.isArray(response.data)) {
                    setStockData(response.data);
                    setLoader(false);
                } else {
                    var obj = [];
                    obj.push(response.data);
                    setStockData(obj);
                    setLoader(false);
                }
            })
            .catch(function (error) {
                // handle error
                console.log(error);
                setLoader(false);
            })
            .finally(function () {
                // always executed
            });
    }, [page, selectedStock, selectedCategory, loader]);

    const stockList = stockData
        ? stockData.map((x) => ({
            id: x._id,
            name: x.name,
            quantity: x.quantity,
            category: x.category,
            notifier: x.notifier,
        }))
        : [];

    useEffect(() => {
        var route = "inventory/stock-options";
        var url = window.apihost + route;
        var token = sessionStorage.getItem("auth-token");
        axios
            .post(url, {
                headers: { "auth-token": token },
            })
            .then(function (response) {
                // handle success
                if (Array.isArray(response.data)) {
                    setStockOptions(response.data);
                } else {
                    var obj = [];
                    obj.push(response.data);
                    setStockOptions(obj);
                }
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function () {
                // always executed
            });
    }, [loader]);

    const stockOptionsList = stockOptions
        ? stockOptions.map((x) => ({
            id: x._id,
            name: x.name,
        }))
        : [];

    useEffect(() => {
        var route = "inventory/total-stocks";
        var url = window.apihost + route;
        // var token = sessionStorage.getItem("auth-token");
        axios
            .post(url)
            .then(function (response) {
                // handle success
                var total = response.data !== "" ? response.data : 0;
                setTotalStocks(total);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function () {
                // always executed
            });
    }, [stockOptions, selectedStock, selectedCategory, loader]);

    function categoryOptions() {
        var list = [
            { label: "Hair Care", value: "Hair Care" },
            { label: "Color", value: "Color" }
        ];
        return list;
    }

    function StockOption(item) {
        var list = [];
        if (item !== undefined || item !== null) {
            item.map((x) => {
                return list.push({
                    label: x.name,
                    value: x.id,
                });
            });
        }
        return list;
    }

    const handleAddStock = () => {
        var route = "inventory/";
        var url = window.apihost + route;
        var token = sessionStorage.getItem("auth-token");

        var data = {
            name: name,
            quantity: quantity,
            category: category ? category.value : "",
            notifier: notifier
        }

        console.log(JSON.stringify(data));

        setLoader(true);

        axios
            .post(url, data, {
                headers: {
                    "auth-token": token,
                },
            })
            .then(function (response) {
                // handle success
                toast.success(response.data.inventory + ' successfully saved.', {
                    position: "top-center"
                });
                setAddModal(false);
                setLoader(false);
                setId(-1);
                setName("");
                setQuantity(0);
                setCategory("");
                setNotifier(0);
            })
            .catch(function (error) {
                // handle error
                toast.error(JSON.stringify(error.response.data), {
                    position: "top-center"
                });
                setLoader(false);
            })
            .finally(function () {
                // always executed
            });
    }

    const handleCloseAddModal = () => {
        setAddModal(false);
        setName("");
        setQuantity(0);
        setCategory("");
        setNotifier(0);
    }

    const handleEditStock = () => {
        var route = `inventory/${id}`;
        var url = window.apihost + route;
        var token = sessionStorage.getItem("auth-token");

        var data = {
            // id: id,
            name: name,
            quantity: quantity,
            category: category ? category.value : "",
            notifier: notifier
        }

        setLoader(true);

        axios
            .put(url, data, {
                headers: {
                    "auth-token": token,
                },
            })
            .then(function (response) {
                // handle success
                toast.success(response.data.inventory + ' successfully saved.', {
                    position: "top-center"
                });
                setEditModal(false);
                setLoader(false);
                setId(-1);
                setName("");
                setQuantity(0);
                setCategory("");
                setNotifier(0);
            })
            .catch(function (error) {
                // handle error
                toast.error(JSON.stringify(error.response.data), {
                    position: "top-center"
                });
                setLoader(false);
            })
            .finally(function () {
                // always executed
            });
    }

    const handleOpenEditModal = (params) => {
        var ctgr = params.category !== "" ? { label: params.category, value: params.category } : [];
        setEditModal(true);
        setLoader(false);
        setId(params.id);
        setName(params.name);
        setQuantity(params.quantity);
        setCategory(ctgr);
        setNotifier(params.notifier);
    }

    const handleCloseEditModal = () => {
        setEditModal(false);
        setLoader(false);
        setId(-1);
        setName("");
        setQuantity(0);
        setCategory("");
        setNotifier(0);
    }

    const handleDeleteItem = () => {
        var url = window.apihost + `inventory/${id}`;
        var token = sessionStorage.getItem("auth-token");
        setLoader(true);
        axios
            .delete(url, {
                headers: { "auth-token": token },
            }).then(function (response) {
                // handle success
                toast.success('Stock successfully deleted.', {
                    position: "top-center"
                })
                setId(-1);
                setLoader(false);
                setDeletePopup(false);
            }).catch((err) => {
                if (err.response.status === 400) {
                    const error = {
                        status: err.response.status,
                        error: err.response.data,
                    };
                    alert(JSON.stringify(error));
                    setLoader(false);
                } else {
                    // alert(err.response.status + JSON.stringify(err.response.data));
                    const error = {
                        status: err.response.status,
                        error: JSON.stringify(err.response.data),
                    };
                    toast.error(JSON.stringify(error.response.data), {
                        position: "top-center"
                    });
                    setLoader(false);
                }
            });
    }

    const handleOpenDeletePopup = (id) => {
        setDeletePopup(true);
        setId(id);
    }

    const handleCloseDeleteModal = () => {
        setDeletePopup(false);
        setLoader(false);
        setId(-1);
        setName("");
        setQuantity(0);
        setCategory("");
        setNotifier(0);
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    return (
        <div
            style={{
                flexGrow: 1,
                backgroundColor: 'white',
                padding: 20,
                borderRadius: 10,
                height: '100%',
                minHeight: '90vh',
                maxHeight: '90vh'
            }}
        >
            <ToastContainer />
            <Button
                size="large"
                style={{ float: 'left' }}
                variant="contained"
                color="primary"
                startIcon={<Add />}
                onClick={() => setAddModal(true)}>Add Stock</Button>

            <div style={{
                float: 'right', width: '30%', zIndex: 100,
            }}>
                <Select
                    defaultValue={selectedStock}
                    options={StockOption(stockOptionsList)}
                    onChange={e => setSelectedStock(e)}
                    placeholder='Search...'
                    isClearable
                    isMulti
                    theme={(theme) => ({
                        ...theme,
                        // borderRadius: 0,
                        colors: {
                            ...theme.colors,
                            text: 'black',
                            primary25: '#66c0f4',
                            primary: '#B9B9B9',
                        },
                    })}
                    styles={customMultiSelectStyle}
                />
            </div>
            <div style={{
                float: 'right', width: '20%', zIndex: 100,
            }}>
                <Select
                    defaultValue={selectedCategory}
                    options={categoryOptions()}
                    onChange={e => setSelectedCategory(e)}
                    placeholder='Search Category'
                    isClearable
                    isMulti
                    theme={(theme) => ({
                        ...theme,
                        // borderRadius: 0,
                        colors: {
                            ...theme.colors,
                            text: 'black',
                            primary25: '#66c0f4',
                            primary: '#B9B9B9',
                        },
                    })}
                    styles={customMultiSelectStyle}
                />
            </div>

            <div style={{ padding: 10, backgroundColor: '#F4F4F4', marginTop: 60, height: '100', minHeight: '75vh', maxHeight: '75vh', overflowY: 'scroll' }}>
                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                    <TableContainer sx={{ maxHeight: 440 }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Quantity</TableCell>
                                    <TableCell>Category</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {stockList.length > 0 && loader === false && stockList.map(x =>
                                    <TableRow hover role="checkbox" tabIndex={-1} key={x.id}>
                                        <TableCell>{x.name}</TableCell>
                                        <TableCell>{x.quantity}</TableCell>
                                        <TableCell>{x.category}</TableCell>
                                        <TableCell>
                                            {x.quantity !== 0 && x.quantity <= x.notifier &&
                                                <Chip label="Low Stock" color="primary" style={{ backgroundColor: "orange"}} />
                                            }
                                            {x.quantity == 0 &&
                                                <Chip label="No Stock" color="error" />
                                            }
                                            {x.quantity > x.notifier &&
                                                <Chip label="Good" color="success" />
                                            }
                                        </TableCell>
                                        <TableCell>
                                            <ButtonGroup
                                                disableElevation
                                                variant="contained"
                                                aria-label="Disabled button group"
                                            >
                                                <Button size="small" onClick={() => handleOpenEditModal(x)}>Edit</Button>
                                                <Button
                                                    size="small"
                                                    disabled={role === "Administrator" ? false : true}
                                                    onClick={() => handleOpenDeletePopup(x.id)}
                                                >
                                                    Delete
                                                </Button>
                                            </ButtonGroup>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    {Object.keys(selectedStock).length === 0 &&
                        <TablePagination
                            // rowsPerPageOptions={[10, 25, 100]}
                            labelRowsPerPage=''
                            rowsPerPageOptions={[]}
                            component="div"
                            count={totalStocks}
                            rowsPerPage={20}
                            page={page}
                            onChangePage={handleChangePage}
                        // onChangeRowsPerPage={handleChangeRowsPerPage}
                        />
                    }
                </Paper>


                {loader === true &&
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: 200 }}>
                        <CircularProgress />
                    </div>
                }
                {stockList.length === 0 && loader !== true &&
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: 200 }}>
                        <h1 style={{ color: '#C4C4C4C4' }}>No Data Found</h1>
                    </div>
                }

                <Modal
                    aria-labelledby="spring-modal-title"
                    aria-describedby="spring-modal-description"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    open={addModal}
                    onClose={handleCloseAddModal}
                    //closeAfterTransition
                    //slots={{ backdrop: Backdrop }}
                    slotProps={{ backdrop: { timeout: 500 } }}

                //BackdropComponent={Backdrop}
                //BackdropProps={{timeout: 500,}}
                >
                    <Box
                        style={{
                            backgroundColor: 'whitesmoke',
                            border: '2px solid #000',
                            padding: '10px',
                            boxShadow: '1px 1px'
                        }}
                    >
                        <div>
                            <h1>Add Stock</h1>
                        </div>
                        <Divider />
                        <br />
                        <form noValidate autoComplete="off">
                            <div>
                                <label style={{ fontSize: '17px' }}><strong>Name</strong></label><br />
                                <TextField variant='outlined' size='small' fullWidth placeholder="Name" value={name} onChange={e => setName(e.target.value)} inputProps={{ 'aria-label': 'description' }} />
                            </div>

                            <br />

                            <div>
                                <label style={{ fontSize: '17px' }}><strong>Quantity</strong></label><br />
                                <TextField variant='outlined' size='small' type='number' fullWidth placeholder="Quantity" value={quantity} onChange={e => setQuantity(e.target.value)} inputProps={{ 'aria-label': 'description' }} />
                            </div>

                            <br />

                            <br />

                            <div>
                                <label style={{ fontSize: '17px' }}><b>Category</b></label>
                                <Select
                                    defaultValue={category}
                                    options={categoryOptions()}
                                    onChange={e => setCategory(e)}
                                    placeholder='Category...'
                                    // isClearable
                                    // isMulti
                                    theme={(theme) => ({
                                        ...theme,
                                        // borderRadius: 0,
                                        colors: {
                                            ...theme.colors,
                                            text: 'black',
                                            primary25: '#66c0f4',
                                            primary: '#B9B9B9',
                                        },
                                    })}
                                    styles={customSelectStyle}
                                />
                            </div>

                            <br />

                            <div>
                                <label style={{ fontSize: '17px' }}><strong>Notifier</strong></label><br />
                                <TextField variant='outlined' size='small' type='number' fullWidth placeholder="Notifier" value={notifier} onChange={e => setNotifier(e.target.value)} inputProps={{ 'aria-label': 'description' }} />
                            </div>

                            <br />

                            <div>
                                <Button
                                    size="large"
                                    // style={{ float: 'right' }}
                                    variant="contained"
                                    color="default"
                                    onClick={handleCloseAddModal}>
                                    <b>Cancel</b>
                                </Button>
                                <Button
                                    size="large"
                                    style={{ marginLeft: 10 }}
                                    variant="contained"
                                    color="default"
                                    startIcon={<Save />}
                                    onClick={handleAddStock}>
                                    <b>Submit</b>
                                </Button>
                            </div>
                        </form>
                    </Box>
                </Modal>

                <Modal
                    aria-labelledby="spring-modal-title"
                    aria-describedby="spring-modal-description"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    open={editModal}
                    //onClose={handleCloseEditModal}
                    closeAfterTransition
                    //slots={{ backdrop: Backdrop }}
                    slotProps={{ backdrop: { timeout: 500 } }}
                >
                    <Box
                        style={{
                            backgroundColor: 'whitesmoke',
                            border: '2px solid #000',
                            padding: '10px',
                            boxShadow: '1px 1px'
                        }}
                    >
                        <div>
                            <h1>Edit Employee</h1>
                        </div>
                        <Divider />
                        <br />
                        <form noValidate autoComplete="off">
                            <div>
                                <label style={{ fontSize: '17px' }}><strong>Name</strong></label><br />
                                <TextField variant='outlined' size='small' fullWidth placeholder="Name" value={name} onChange={e => setName(e.target.value)} inputProps={{ 'aria-label': 'description' }} />
                            </div>

                            <br />

                            <div>
                                <label style={{ fontSize: '17px' }}><strong>Quantity</strong></label><br />
                                <TextField variant='outlined' type="number" size='small' fullWidth placeholder="Quantity" value={quantity} onChange={e => setQuantity(e.target.value)} inputProps={{ 'aria-label': 'description' }} />
                            </div>

                            <br />

                            <div>
                                <label style={{ fontSize: '17px' }}><b>Category</b></label>
                                <Select
                                    defaultValue={category}
                                    options={categoryOptions()}
                                    onChange={e => setCategory(e)}
                                    placeholder='Category...'
                                    // isClearable
                                    // isMulti
                                    theme={(theme) => ({
                                        ...theme,
                                        // borderRadius: 0,
                                        colors: {
                                            ...theme.colors,
                                            text: 'black',
                                            primary25: '#66c0f4',
                                            primary: '#B9B9B9',
                                        },
                                    })}
                                    styles={customSelectStyle}
                                />
                            </div>

                            <br />

                            <div>
                                <label style={{ fontSize: '17px' }}><strong>Notifier</strong></label><br />
                                <TextField variant='outlined' type="number" size='small' fullWidth placeholder="Notifier" value={notifier} onChange={e => setNotifier(e.target.value)} inputProps={{ 'aria-label': 'description' }} />
                            </div>

                            <br />

                            <div>
                                <Button
                                    size="large"
                                    // style={{ float: 'right' }}
                                    variant="contained"
                                    color="default"
                                    onClick={handleCloseEditModal}>
                                    <b>Cancel</b>
                                </Button>
                                <Button
                                    size="large"
                                    style={{ marginLeft: 10 }}
                                    variant="contained"
                                    color="default"
                                    startIcon={<Save />}
                                    onClick={handleEditStock}>
                                    <b>Submit</b>
                                </Button>
                            </div>
                        </form>
                    </Box>
                </Modal>

                <Modal
                    aria-labelledby="spring-modal-title"
                    aria-describedby="spring-modal-description"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    open={deletePopup}
                    //onClose={handleCloseDeleteModal}
                    closeAfterTransition
                    //slots={{ backdrop: Backdrop }}
                    slotProps={{ backdrop: { timeout: 500 } }}
                >
                    <Box
                        style={{
                            backgroundColor: 'whitesmoke',
                            border: '2px solid #000',
                            padding: '10px',
                            boxShadow: '1px 1px'
                        }}
                    >
                        <div>
                            <h1>Warning</h1>
                        </div>
                        <Divider />
                        <br />

                        <p>Are you sure you want to delete this Item?</p>

                        <br />
                        <Divider />
                        <br />

                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button
                                size="large"
                                // style={{ float: 'right' }}
                                variant="contained"
                                color="default"
                                onClick={handleCloseDeleteModal}>
                                <b>Cancel</b>
                            </Button>
                            <Button
                                size="large"
                                style={{ marginLeft: 10 }}
                                variant="contained"
                                color='error'
                                startIcon={<Delete />}
                                onClick={handleDeleteItem}>
                                <b>Delete</b>
                            </Button>
                        </div>
                    </Box>
                </Modal>
            </div>
        </div>
    );
}

export default Inventory;