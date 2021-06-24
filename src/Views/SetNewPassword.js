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

function SetNewPassword() {
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

    const [passvalue, setPassvalue] = useState({
        password: '',
        showPassword: false
      })
      const[conpassvalue, setConpassvalue] = useState({
        confirm_password: '',
        showPassword: false
      })
    
      const handleClickShowPassword1 = () => {
        setPassvalue({ ...passvalue, showPassword: !passvalue.showPassword });
      };
      const handleClickShowPassword2 = () => {
        setConpassvalue({ ...conpassvalue, showPassword: !conpassvalue.showPassword });
      };
    
      const handleChangepass = (prop) => (event) => {
        setPassvalue({ ...passvalue, [prop]: event.target.value });
      };
    
      const handleChangeconpass = (prop) => (event) => {
        setConpassvalue({ ...conpassvalue, [prop]: event.target.value })
      };
    
      const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };

      let url = window.location.href.split('/')

      const newpasswordset = async (e) => {
        e.preventDefault()
        const newpassdetails={
            password: passvalue.password,
            uidb64: url[4],
            token: url[5]
        }
        if (passvalue.password === '' || conpassvalue.confirm_password === ''){
            setAlert({
                open: true,
                message: 'Fields cannot be empty',
                severity: 'error'
            })
              closeAlert()
        } else if(passvalue.password != conpassvalue.confirm_password){
            setAlert({
                open: true,
                message: 'Password Mismatch, try again',
                severity: 'error'
            })
              closeAlert()
        } else {
            setOpen(true)
            const newpasspost = await Api().patch('/password-reset-complete/', newpassdetails)
            .then((response) => {
                setOpen(false)
                setAlert({
                    open: true,
                    message: 'New password set successfully',
                    severity: 'success'
                })
                  closeAlert()

                  setTimeout(() => {
                    window.location.assign('/')
                  },1000)
            })
            .catch((error) => {
                setOpen(false)
                if(error.message === "Request failed with status code 405"){
                    setAlert({
                      open: true,
                      message: 'Error in setting new password',
                      severity: 'error'
                  })
                  closeAlert()
                  }
            })
        }
        
      }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <RotateLeftIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Set New Password
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
        <form className={classes.form} onSubmit={newpasswordset} noValidate>
        <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined" fullWidth>
          <InputLabel htmlFor="outlined-adornment-password">New Password</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={passvalue.showPassword ? 'text' : 'password'}
              value={passvalue.password}
              onChange={handleChangepass('password')}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword1}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {passvalue.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={110}
            />
            </FormControl>

            <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined" fullWidth>
          <InputLabel htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
            <OutlinedInput
              id="outlined-adornment-confirm-password"
              type={conpassvalue.showPassword ? 'text' : 'password'}
              value={conpassvalue.confirm_password}
              onChange={handleChangeconpass('confirm_password')}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword2}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {conpassvalue.showPassword ? <Visibility /> : <VisibilityOff />}
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

export default SetNewPassword
