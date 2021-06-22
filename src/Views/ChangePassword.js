import React, {useState, useEffect} from 'react'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import clsx from 'clsx';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Alert } from '@material-ui/lab';
import Container from '@material-ui/core/Container';
import CloseIcon from '@material-ui/icons/Close';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Api from '../services/Api';
import Pageloader from '../Components/Pageloader';
import Dialog from '@material-ui/core/Dialog';

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: 'rgb(240,240,240)',
      padding: '20px',
      boxShadow: '3px 3px 15px #888888',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    textField: {
      marginTop: '18px'
    }
  }));

function ChangePassword() {

    const classes = useStyles();

    const [open, setOpen] = React.useState(false);
    const [alert, setAlert] = useState({
        open: false,
        message: '',
        severity: 'success'
    })

    const closeAlert = () => {
        setTimeout(() => {
            setAlert({
                open: false,
                message: '',
                severity: ''
            })
        }, 4000)
      }

      const handleClose = () => {
        setOpen(false);
      };

      const [currentpassvalue, setCurrentpassvalue] = useState({
        current_password: '',
        showPassword: false
      })
    
      const [newpassvalue, setNewpassvalue] = useState({
        new_password: '',
        showPassword: false
      })
      const[confirmpassvalue, setConfirmpassvalue] = useState({
        confirm_password: '',
        showPassword: false
      })
    
      const handleClickShowPassword1 = () => {
        setCurrentpassvalue({ ...currentpassvalue, showPassword: !currentpassvalue.showPassword });
      };
      
      const handleClickShowPassword2 = () => {
        setNewpassvalue({ ...newpassvalue, showPassword: !newpassvalue.showPassword });
      };
      const handleClickShowPassword3 = () => {
        setConfirmpassvalue({ ...confirmpassvalue, showPassword: !confirmpassvalue.showPassword });
      };
    
      const handleChangecurrentpass = (prop) => (event) => {
        setCurrentpassvalue({ ...currentpassvalue, [prop]: event.target.value });
      };

      const handleChangenewpass = (prop) => (event) => {
        setNewpassvalue({ ...newpassvalue, [prop]: event.target.value });
      };
    
      const handleChangeconfrimpass = (prop) => (event) => {
        setConfirmpassvalue({ ...currentpassvalue, [prop]: event.target.value })
      };
    
      const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };

    const changepassword = ((e) => {
        e.preventDefault();

    })

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <RotateLeftIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Change Password
        </Typography>
        <div>
                    <Collapse in={alert.open}>
                    <Alert
                        severity={`${alert.severity}`}
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    setAlert({
                                        open: false,
                                        message: '',
                                        severity: ''
                                    });
                                }}
                            >
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }
                    >
                        {alert.message}
                    </Alert>
                    </Collapse>
                </div>
        <form className={classes.form} onSubmit={changepassword} noValidate>
        <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined" fullWidth>
          <InputLabel htmlFor="outlined-adornment-password">Current Password</InputLabel>
            <OutlinedInput
              id="current_password"
              type={currentpassvalue.showPassword ? 'text' : 'password'}
              value={currentpassvalue.current_password}
              onChange={handleChangecurrentpass('current_password')}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword1}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {currentpassvalue.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={136}
            />
            </FormControl>

        <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined" fullWidth>
          <InputLabel htmlFor="outlined-adornment-password">New Password</InputLabel>
            <OutlinedInput
              id="new_password"
              type={newpassvalue.showPassword ? 'text' : 'password'}
              value={newpassvalue.new_password}
              onChange={handleChangenewpass('new_password')}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword2}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {newpassvalue.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={110}
            />
            </FormControl>

            <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined" fullWidth>
          <InputLabel htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
            <OutlinedInput
              id="confirm_password"
              type={confirmpassvalue.showPassword ? 'text' : 'password'}
              value={confirmpassvalue.confirm_password}
              onChange={handleChangeconfrimpass('confirm_password')}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword3}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {confirmpassvalue.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={135}
            />
            </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            OK 
          </Button>
          </form>
          <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="xs"
        fullWidth
        disableBackdropClick
      >
        <Pageloader/>
      </Dialog>
          </div>
        </Container>
    )
}

export default ChangePassword
