import React, { useState, useEffect } from 'react';
import * as ReactDOM from 'react-dom';
import makeStyles from '@mui/styles/makeStyles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import CardActionArea from '@mui/material/CardActionArea';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TablePagination from '@mui/material/TablePagination';
import Input from '@mui/material/Input';
import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';
import { Save, Edit, Delete, Add } from '@mui/icons-material';
import { useSpring, animated } from 'react-spring';
import Select from 'react-select';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { TextField } from '@mui/material';
import Box from '@mui/material/Box';

import axios from "axios";
//const axios = require("axios");
const moment = require("moment");

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        height: '100%',
        minHeight: '90vh',
        maxHeight: '90vh'
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalPaper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

const Fade = React.forwardRef(function Fade(props, ref) {
    const { in: open, children, onEnter, onExited, ...other } = props;
    const style = useSpring({
        from: { opacity: 0 },
        to: { opacity: open ? 1 : 0 },
        onStart: () => {
            if (open && onEnter) {
                onEnter();
            }
        },
        onRest: () => {
            if (!open && onExited) {
                onExited();
            }
        },
    });

    return (
        <animated.div ref={ref} style={style} {...other}>
            {children}
        </animated.div>
    );
});

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

const Employee = () => {
    const classes = useStyles();
    const [loader, setLoader] = useState(true);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [employeeData, setEmployeeData] = useState(null);
    const [selectedEmployee, setSelectedEmployee] = useState([]);
    const [employeeOptions, setEmployeeOptions] = useState(null);
    const [id, setId] = useState(-1);
    const [employeeNo, setEmployeeNo] = useState("");
    const [firstName, setFirstName] = useState("");
    const [middleName, setMiddleName] = useState("");
    const [lastName, setLastName] = useState("");
    const [suffix, setSuffix] = useState("");
    const [contactNo, setContactNo] = useState("");
    const [gender, setGender] = useState("");
    const [address, setAddress] = useState("");
    const [addModal, setAddModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [deletePopup, setDeletePopup] = useState(false);
    const [totalEmp, setTotalEmp] = useState(0);
    const [name, setName] = useState("");
    const [role, setRole] = useState("");
    const [page, setPage] = useState(0);

    useEffect(() => {
        //const user = JSON.parse(sessionStorage.getItem('user'));
        //setRole(user.role);
        setRole("Admin");
        setName("Lery");
    }, []);

    useEffect(() => {
        var data = {
            selectedEmployee: !selectedEmployee ? [] : selectedEmployee,
            page: page
        };
        var route = "employees/list";
        var url = window.apihost + route;
        // var token = sessionStorage.getItem("auth-token");
        // const user = JSON.parse(sessionStorage.getItem('user'));
        axios
            .post(url, data)
            .then(function (response) {
                // handle success
                if (Array.isArray(response.data)) {
                    setEmployeeData(response.data);
                    setLoader(false);
                } else {
                    var obj = [];
                    obj.push(response.data);
                    setEmployeeData(obj);
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
    }, [page, selectedEmployee, loader]);

    const employeeList = employeeData
        ? employeeData.map((x) => ({
            id: x._id,
            employeeNo: x.employeeNo,
            firstName: x.firstName,
            middleName: x.middleName,
            lastName: x.lastName,
            suffix: x.suffix,
            department: x.department,
            contactNo: x.contactNo,
            gender: x.gender,
            address: x.address,
        }))
        : [];

    useEffect(() => {
        var route = "employees/employee-options";
        var url = window.apihost + route;
        var token = sessionStorage.getItem("auth-token");
        axios
            .post(url, {
                headers: { "auth-token": token },
            })
            .then(function (response) {
                // handle success
                if (Array.isArray(response.data)) {
                    setEmployeeOptions(response.data);
                } else {
                    var obj = [];
                    obj.push(response.data);
                    setEmployeeOptions(obj);
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

    const employeeOptionsList = employeeOptions
        ? employeeOptions.map((x) => ({
            id: x._id,
            name: x.lastName + " " + x.firstName + " " + x.middleName + " " + x.suffix + " - (" + x.employeeNo + ")",
        }))
        : [];

    function EmployeeOption(item) {
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

    useEffect(() => {
        var route = "employees/total-employees";
        var url = window.apihost + route;
        // var token = sessionStorage.getItem("auth-token");
        axios
            .post(url)
            .then(function (response) {
                // handle success
                var total = response.data !== "" ? response.data : 0;
                setTotalEmp(total);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function () {
                // always executed
            });
    }, [employeeOptions, selectedEmployee, loader]);

    function GenderOption() {
        var list = [
            { label: "Male", value: "Male" },
            { label: "Female", value: "Female" }
        ];
        return list;
    }

    const handleAddEmployee = () => {
        var route = "employees/";
        var url = window.apihost + route;
        var token = sessionStorage.getItem("auth-token");

        var data = {
            employeeNo: employeeNo,
            firstName: firstName,
            middleName: middleName,
            lastName: lastName,
            suffix: suffix,
            contactNo: contactNo,
            gender: gender ? gender.value : "",
            address: address,
        }

        setLoader(true);

        axios
            .post(url, data, {
                headers: {
                    "auth-token": token,
                },
            })
            .then(function (response) {
                // handle success
                toast.success(response.data.employee + ' successfully saved.', {
                    position: "top-center"
                });
                setAddModal(false);
                setLoader(false);
                setId(-1);
                setEmployeeNo("");
                setFirstName("");
                setMiddleName("");
                setLastName("");
                setSuffix("");
                setGender("");
                setContactNo("");
                setGender("");
                setAddress("");
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
        setEmployeeNo("");
        setFirstName("");
        setMiddleName("");
        setLastName("");
        setSuffix("");
        setGender("");
        setContactNo("");
        setAddress("");
    }

    const handleEditEmployee = () => {
        var route = `employees/${id}`;
        var url = window.apihost + route;
        var token = sessionStorage.getItem("auth-token");

        var data = {
            // id: id,
            employeeNo: employeeNo,
            firstName: firstName,
            middleName: middleName,
            lastName: lastName,
            suffix: suffix,
            contactNo: contactNo,
            gender: gender ? gender.value : "",
            address: address,
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
                toast.success(response.data.employee + ' successfully saved.', {
                    position: "top-center"
                });
                setEditModal(false);
                setLoader(false);
                setId(-1);
                setEmployeeNo("");
                setFirstName("");
                setMiddleName("");
                setLastName("");
                setSuffix("");
                setGender("");
                setContactNo("");
                setAddress("");
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
        var gndr = params.gender !== "" ? { label: params.gender, value: params.gender } : [];
        setEditModal(true);
        setLoader(false);
        setId(params.id);
        setEmployeeNo(params.employeeNo);
        setFirstName(params.firstName);
        setMiddleName(params.middleName);
        setLastName(params.lastName);
        setSuffix(params.suffix);
        setGender(gndr);
        setContactNo(params.contactNo);
        setAddress(params.address);
    }

    const handleCloseEditModal = () => {
        setEditModal(false);
        setLoader(false);
        setId(-1);
        setEmployeeNo("");
        setFirstName("");
        setMiddleName("");
        setLastName("");
        setSuffix("");
        setGender("");
        setContactNo("");
        setAddress("");
    }

    const handleDeleteItem = () => {
        var url = window.apihost + `employees/${id}`;
        var token = sessionStorage.getItem("auth-token");
        setLoader(true);
        axios
            .delete(url, {
                headers: { "auth-token": token },
            }).then(function (response) {
                // handle success
                toast.success('Employee successfully deleted.', {
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
        setEmployeeNo("");
        setFirstName("");
        setMiddleName("");
        setLastName("");
        setSuffix("");
        setContactNo("");
        setAddress("");
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };


    return (
        <div className={classes.root}>

            <ToastContainer />
            <Button
                size="large"
                style={{ float: 'left' }}
                variant="contained"
                color="primary"
                startIcon={<Add />}
                onClick={() => setAddModal(true)}>Add Employee</Button>

            <div style={{
                float: 'right', width: '30%', zIndex: 100,
            }}>
                <Select
                    defaultValue={selectedEmployee}
                    options={EmployeeOption(employeeOptionsList)}
                    onChange={e => setSelectedEmployee(e)}
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

            <div style={{ padding: 10, backgroundColor: '#F4F4F4', marginTop: 60, height: '100', minHeight: '75vh', maxHeight: '75vh', overflowY: 'scroll' }}>
                <Grid container spacing={3}>
                    {employeeList.length > 0 && loader === false && employeeList.map(x =>
                        <Grid item xs={3}>
                            <Card>
                                <CardActionArea>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {x.lastName + " " + x.firstName + " " + x.middleName + " " + x.suffix}
                                        </Typography>
                                        <Typography gutterBottom variant="p" component="h3">
                                            Employee No: {x.employeeNo}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            Gender: {x.gender} <br />
                                            Contact No: {x.contactNo} <br />
                                            Address: {x.address}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions>
                                    <Button size="small" color="primary" onClick={() => handleOpenEditModal(x)}>
                                        Edit
                                    </Button>
                                    <Button
                                        size="small"
                                        color="primary"
                                        disabled={role === "Administrator" ? false : true}
                                        onClick={() => handleOpenDeletePopup(x.id)}
                                    >
                                        Delete
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    )}
                </Grid>
                {loader === true &&
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: 200 }}>
                        <CircularProgress />
                    </div>
                }
                {employeeList.length === 0 && loader !== true &&
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: 200 }}>
                        <h1 style={{ color: '#C4C4C4C4' }}>No Data Found</h1>
                    </div>
                }
            </div>

            {Object.keys(selectedEmployee).length === 0 &&
                <TablePagination
                    // rowsPerPageOptions={[10, 25, 100]}
                    labelRowsPerPage=''
                    rowsPerPageOptions={[]}
                    component="div"
                    count={totalEmp}
                    rowsPerPage={20}
                    page={page}
                    onChangePage={handleChangePage}
                // onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            }

            <Modal
                aria-labelledby="spring-modal-title"
                aria-describedby="spring-modal-description"
                className={classes.modal}
                open={addModal}
                onClose={handleCloseAddModal}
                //closeAfterTransition
                //slots={{ backdrop: Backdrop }}
                slotProps={{ backdrop: { timeout: 500 } }}

            //BackdropComponent={Backdrop}
            //BackdropProps={{timeout: 500,}}
            >
                    <Box className={classes.modalPaper}>
                        <div>
                            <h1>Add Employee</h1>
                        </div>
                        <Divider />
                        <br />
                        <form noValidate autoComplete="off">
                            <div>
                                <label style={{ fontSize: '17px' }}><strong>Employee No</strong></label><br />
                                <TextField variant='outlined' size='small' fullWidth placeholder="Employee No" value={employeeNo} onChange={e => setEmployeeNo(e.target.value)} inputProps={{ 'aria-label': 'description' }} />
                            </div>

                            <br />

                            <div>
                                <label style={{ fontSize: '17px' }}><strong>First Name</strong></label><br />
                                <TextField variant='outlined' size='small' fullWidth placeholder="First Name" value={firstName} onChange={e => setFirstName(e.target.value)} inputProps={{ 'aria-label': 'description' }} />
                            </div>

                            <br />

                            <div>
                                <label style={{ fontSize: '17px' }}><strong>Middle Name / Middle Initial</strong></label><br />
                                <TextField variant='outlined' size='small' fullWidth placeholder="Middle Name" value={middleName} onChange={e => setMiddleName(e.target.value)} inputProps={{ 'aria-label': 'description' }} />
                            </div>

                            <br />

                            <div>
                                <label style={{ fontSize: '17px' }}><strong>Last Name</strong></label><br />
                                <TextField variant='outlined' size='small' fullWidth placeholder="Last Name" value={lastName} onChange={e => setLastName(e.target.value)} inputProps={{ 'aria-label': 'description' }} />
                            </div>

                            <br />

                            <div>
                                <label style={{ fontSize: '17px' }}><strong>Suffix</strong></label><br />
                                <TextField variant='outlined' size='small' fullWidth placeholder="Suffix" value={suffix} onChange={e => setSuffix(e.target.value)} inputProps={{ 'aria-label': 'description' }} />
                            </div>

                            <br />

                            <br />

                            <div>
                                <label style={{ fontSize: '17px' }}><b>Gender</b></label>
                                <Select
                                    defaultValue={gender}
                                    options={GenderOption()}
                                    onChange={e => setGender(e)}
                                    placeholder='Gender...'
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
                                <label style={{ fontSize: '17px' }}><strong>Contact No</strong></label><br />
                                <TextField type="number" variant='outlined' size='small' fullWidth placeholder="Contact No" value={contactNo} onChange={e => setContactNo(e.target.value)} inputProps={{ 'aria-label': 'description' }} />
                            </div>
                            <br />

                            <div>
                                <label style={{ fontSize: '17px' }}><strong>Address</strong></label><br />
                                <TextField variant='outlined' size='small' fullWidth placeholder="Address" value={address} onChange={e => setAddress(e.target.value)} inputProps={{ 'aria-label': 'description' }} />
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
                                    onClick={handleAddEmployee}>
                                    <b>Submit</b>
                                </Button>
                            </div>
                        </form>
                    </Box>
            </Modal>


            <Modal
                aria-labelledby="spring-modal-title"
                aria-describedby="spring-modal-description"
                className={classes.modal}
                open={editModal}
                //onClose={handleCloseEditModal}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{ backdrop: { timeout: 500 } }}
            >
                    <div className={classes.modalPaper}>
                        <div>
                            <h1>Edit Employee</h1>
                        </div>
                        <Divider />
                        <br />
                        <form noValidate autoComplete="off">
                            <div>
                                <label style={{ fontSize: '17px' }}><strong>Employee No</strong></label><br />
                                <TextField variant='outlined' size='small' fullWidth placeholder="Employee No" value={employeeNo} onChange={e => setEmployeeNo(e.target.value)} inputProps={{ 'aria-label': 'description' }} />
                            </div>

                            <br />

                            <div>
                                <label style={{ fontSize: '17px' }}><strong>First Name</strong></label><br />
                                <TextField variant='outlined' size='small' fullWidth placeholder="First Name" value={firstName} onChange={e => setFirstName(e.target.value)} inputProps={{ 'aria-label': 'description' }} />
                            </div>

                            <br />

                            <div>
                                <label style={{ fontSize: '17px' }}><strong>Middle Name</strong></label><br />
                                <TextField variant='outlined' size='small' fullWidth placeholder="Middle Name" value={middleName} onChange={e => setMiddleName(e.target.value)} inputProps={{ 'aria-label': 'description' }} />
                            </div>

                            <br />

                            <div>
                                <label style={{ fontSize: '17px' }}><strong>Last Name</strong></label><br />
                                <TextField variant='outlined' size='small' fullWidth placeholder="Last Name" value={lastName} onChange={e => setLastName(e.target.value)} inputProps={{ 'aria-label': 'description' }} />
                            </div>

                            <br />

                            <div>
                                <label style={{ fontSize: '17px' }}><strong>Suffix</strong></label><br />
                                <TextField variant='outlined' size='small' fullWidth placeholder="Suffix" value={suffix} onChange={e => setSuffix(e.target.value)} inputProps={{ 'aria-label': 'description' }} />
                            </div>

                            <br />

                            <div>
                                <label style={{ fontSize: '17px' }}><b>Gender</b></label>
                                <Select
                                    defaultValue={gender}
                                    options={GenderOption()}
                                    onChange={e => setGender(e)}
                                    placeholder='Gender...'
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
                                <label style={{ fontSize: '17px' }}><strong>Contact No</strong></label><br />
                                <TextField type="number" variant='outlined' size='small' fullWidth placeholder="Contact No" value={contactNo} onChange={e => setContactNo(e.target.value)} inputProps={{ 'aria-label': 'description' }} />
                            </div>
                            <br />

                            <div>
                                <label style={{ fontSize: '17px' }}><strong>Address</strong></label><br />
                                <TextField variant='outlined' size='small' fullWidth placeholder="Address" value={address} onChange={e => setAddress(e.target.value)} inputProps={{ 'aria-label': 'description' }} />
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
                                    onClick={handleEditEmployee}>
                                    <b>Submit</b>
                                </Button>
                            </div>
                        </form>
                    </div>
            </Modal>

            <Modal
                aria-labelledby="spring-modal-title"
                aria-describedby="spring-modal-description"
                className={classes.modal}
                open={deletePopup}
                //onClose={handleCloseDeleteModal}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{ backdrop: { timeout: 500 } }}
            >
                    <div className={classes.modalPaper}>
                        <div>
                            <h1>Warning</h1>
                        </div>
                        <Divider />
                        <br />

                        <p>Are you sure you want to delete this employee?</p>

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
                                color='secondary'
                                startIcon={<Delete />}
                                onClick={handleDeleteItem}>
                                <b>Delete</b>
                            </Button>
                        </div>
                    </div>
            </Modal>
        </div>
    );
}

export default Employee;