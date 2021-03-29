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
    console.log(passvalue)
  };

  const handleChangeconpass = (prop) => (event) => {
    setConpassvalue({ ...conpassvalue, [prop]: event.target.value });
    console.log(conpassvalue)
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
        console.log(signupdetails)

        if(passvalue.password !== conpassvalue.confirm_password){
          setAlert({
              open: true,
              message: 'Password Mismatch, try again',
              severity: 'error'
          })
            closeAlert()
        } else if(email =='' || passvalue.password =='' || conpassvalue.confirm_password == ''){
          setAlert({
            open: true,
            message: 'Email, Password & Confirm Password fields cannot be empty',
            severity: 'error'
        })
          closeAlert()
        }else{
        const signupPost = await Api().post('/signup/', signupdetails)
        .then((response) => {
          setAlert({
            open: true,
            message: 'Sign up successfull',
            severity: 'success'
        })
            window.location.assign('/check-email')
        })
        .catch((error) => {
          setAlert({
            open: true,
            message: 'Sign up not successfull, try again',
            severity: 'error'
        })
        closeAlert()
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

          {/* <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            value={confirm_password}
            name="confirm_password"
            label="Confirm Password"
            type="password"
            id="confirm_password"
            autoComplete="confirm-password"
            onChange={(e) => {setConfirm_password(e.target.value)}}
          /> */}

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
    </Container>
  );
}