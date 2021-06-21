import React, {useState} from 'react'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Alert } from '@material-ui/lab';
import Container from '@material-ui/core/Container';
import CloseIcon from '@material-ui/icons/Close';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Api from '../services/Api';
import { validEmail } from '../services/validation'

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
  }));

function Forgotpassword(){
    const classes = useStyles();

    const[email, setEmail] = useState('')
    const [alert, setAlert] = useState({
      open: false,
      message: '',
      severity: 'success'
  })

  const [open, setOpen] = React.useState(false);
  
    const handleClose = () => {
      setOpen(false);
    };

  const closeAlert = () => {
    setTimeout(() => {
        setAlert({
            open: false,
            message: '',
            severity: ''
        })
    }, 4000)
  }

    const forgot = async (e) => {
      e.preventDefault()
      const forgotdetails = {
        email,
        url: `${window.location.protocol}//${window.location.host}/setnewpassword/`
      }
        setOpen(true)
        if ((validEmail(email)) !== true) 
        return(
          setAlert({
            open: true,
            message: 'Email format not valid',
            severity: 'error'
        })
        )
        const forgotPost = await Api().post('/forgot-password/', forgotdetails)
      .then((response) => {
        setOpen(false)
        setAlert({
          open: true,
          message: 'Reset password link has been sent to your email',
          severity: 'success'
      })
      closeAlert()
      setTimeout(() => {
        window.location.assign('/')
      }, 3000)
      }).catch((error) => {

      })
      
    }

    return(
        <Container component="main" maxWidth="xs">
            <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <RotateLeftIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Forgot Password
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
        <form className={classes.form} onSubmit={forgot} noValidate>
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Send Email
          </Button>
          </form>
          </div>
        </Container>
    )
}

export default Forgotpassword