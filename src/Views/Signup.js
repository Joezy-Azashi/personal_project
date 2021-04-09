import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { Alert } from '@material-ui/lab';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CloseIcon from '@material-ui/icons/Close';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import clsx from 'clsx';
import OutlinedInput from '@material-ui/core/OutlinedInput';
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

export default function Signup() {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  
  const handleClose = () => {
    setOpen(false);
  };

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

  const [email, setEmail] = useState('')
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

    const sign = async (e) => {
        e.preventDefault()
        const signupdetails = {
          email,
          password: passvalue.password,
          confirm_password: conpassvalue.confirm_password}

        if(passvalue.password !== conpassvalue.confirm_password){
          setAlert({
              open: true,
              message: 'Password Mismatch, try again',
              severity: 'error'
          })
            closeAlert()
        } else if(email ==='' || passvalue.password ==='' || conpassvalue.confirm_password === ''){
          setAlert({
            open: true,
            message: 'Email, Password & Confirm Password fields cannot be empty',
            severity: 'error'
        })
          closeAlert()
        }else{
          setOpen(true)
        const signupPost = await Api().post('/signup/', signupdetails)
        console.log("signupPost", signupPost)
        .then((response) => {
          setOpen(false)
          setAlert({
            open: true,
            message: 'Sign up successfull',
            severity: 'success'
        })
            setTimeout(() => {
              window.location.assign('/check-email')
            },1000)
            
        })
        .catch((error) => {
          console.log("test",error.message)
          setOpen(false)
          if(error.message === "Request failed with status code 400"){
            setAlert({
              open: true,
              message: 'This email has been signed up already',
              severity: 'error'
          })
          closeAlert()
          }else if(error.message === "Network Error"){
            setAlert({
              open: true,
              message: 'OOPS! please check your internet connection',
              severity: 'error'
          })
          closeAlert()
          }else{
            setAlert({
              open: true,
              message: 'Sign up not successfull, try again',
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
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
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
        <form className={classes.form} onSubmit={sign} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            value={email}
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(e) => {setEmail(e.target.value)}}
          />

          <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined" fullWidth>
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
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
              labelWidth={70}
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
            Sign Up
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/" className="footlink" variant="body2">
                <p>Have an account? Login</p>
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
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
    </Container>
  );
}