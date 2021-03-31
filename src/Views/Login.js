import React, {useState} from 'react'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import Typography from '@material-ui/core/Typography';
import { Alert } from '@material-ui/lab';
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
import Dialog from '@material-ui/core/Dialog';
import * as auth from '../services/auth';
import Pageloader from '../Components/Pageloader';

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

function Login(){
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

    const handleClickShowPassword = () => {
      setPassvalue({ ...passvalue, showPassword: !passvalue.showPassword });
    };

    const handleChange = (prop) => (event) => {
      setPassvalue({ ...passvalue, [prop]: event.target.value });
    };

    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

    const log = (e) => {
        e.preventDefault()
        
        const logDetails = {
            email,
            password: passvalue.password
        }
        if(email == '' || passvalue.password == ''){
          setAlert({
            open: true,
            message: 'Email & Password fields cannot be empty',
            severity: 'error'
        })
          closeAlert()
        }else{
          setOpen(true)
        auth.loginUser(logDetails)
        .then((response) => {
          setOpen(false)
          setAlert({
            open: true,
            message: 'Login successfull',
            severity: 'success'
        })
          setTimeout(() =>{
            window.location.assign('/home')
          }, 1000)
            
        }).catch((error) => {
          console.log("ttt", error.message)
          setOpen(false)
          if(error.message === "Request failed with status code 401"){
            setAlert({
              open: true,
              message: 'No active account found with this credentials',
              severity: 'error'
          })
          closeAlert()
          }else if(error.message === "Network Error"){
            setAlert({
              open: true,
              message: 'Network Error',
              severity: 'error'
          })
          closeAlert()
          }
          else{
            setAlert({
              open: true,
              message: 'Login unsuccessfull, try again',
              severity: 'error'
          })
          closeAlert()
          }
        })
      }
    }

    return(
        <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOpenIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
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
        <form className={classes.form} onSubmit={log} noValidate>
          <TextField
            type="email"
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
              onChange={handleChange('password')}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
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
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
            id="rememberMe"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Login
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="/forgotpassword" className="footlink" variant="body2">
                <p>Forgot password?</p>
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signup" className="footlink" variant="body2">
                <p>Don't have an account? Sign Up</p>
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
    )
}

export default Login
