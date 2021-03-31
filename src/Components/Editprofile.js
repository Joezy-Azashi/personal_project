import React, {useState, useEffect} from 'react'
import DialogContent from '@material-ui/core/DialogContent';
import { Alert } from '@material-ui/lab';
import TextField from '@material-ui/core/TextField';
import DialogTitle from '@material-ui/core/DialogTitle';
import { getCurrentUser } from '../services/auth'
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Pageloader from '../Components/Pageloader'
import Dialog from '@material-ui/core/Dialog';
import Api from '../services/Api';
import CloseIcon from '@material-ui/icons/Close';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';

function Editprofile({profiletopass,handleClose}) {
    const [username, setUsername] = useState()
    const [Phone_number, setPhone_number] = useState()
    const [location, setLocation] = useState()
    const [description, setDescription] = useState()
    const [profile, setProfile] = useState()
    const [pro, setPro] = useState()
    const [useData, setUseData] = useState(getCurrentUser())

    const id = useData.id

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

      const editprofile = async (e) => {
          e.preventDefault()
        const profiledetails = {
            id: useData.id,
            username: pro?.username === '' ? pro?.username : username,
            Phone_number: pro?.Phone_number === '' ? pro?.Phone_number : Phone_number,
            location: pro?.location === '' ? pro?.location : location,
            description: pro?.description === '' ? pro?.description : description
        }
        console.log("profiledetails", profiledetails)
        setOpen(true)
        const result = await Api().patch(`/profile/${id}`, profiledetails)
        .then((response) => {
            setOpen(false)
            setAlert({
                        open: true,
                        message: 'Profile updated successfully',
                        severity: 'success'
                    })
                    closeAlert()
            setTimeout(() => {
                window.location.assign('/profile')
            }, 1500)
        }).catch((error) => {
            setOpen(false)
            setAlert({
                open: true,
                message: 'Profile updated unsuccessfully',
                severity: 'error'
                })
            closeAlert()
        })
    }

      useEffect(() => {
        console.log("DATA FOR PROFILE",profiletopass )
      }, [])

    return (
        <div>
        <DialogContent>
            <DialogTitle id="alert-dialog-title">{"Edit Profile"}</DialogTitle>
            <form onSubmit={editprofile}>
                <div className="row justify-content-center">
                    <img src="/images/LK.jpg"
                            className="profileImage"
                            width={200}
                            height={200}
                            alt="picture"
                            />
                </div>
                <div className="row">
                    <div className="col-md-12">
                    <TextField
                        fullWidth
                        id="outlined-multiline-static"
                        margin="normal"
                        defaultValue={profiletopass?.username || ''}
                        label="Username"
                        name="Username"
                        variant="outlined"
                        onChange={(e) => {setUsername(e.target.value)}}
                        />
                    </div>

                </div>
                <div className="row">
                    <div className="col-md-6">
                    <TextField
                        fullWidth
                        id="outlined-multiline-static"
                        margin="normal"
                        defaultValue={profiletopass?.Phone_number || ''}
                        label="Phone Number"
                        name="Phone_Number"
                        variant="outlined"
                        onChange={(e) => {setPhone_number(e.target.value)}}
                        />
                    </div>
                    <div className="col-md-6">
                    <TextField
                        fullWidth
                        id="outlined-multiline-static"
                        margin="normal"
                        defaultValue={profiletopass?.location || ''}
                        label="Location"
                        name="Location"
                        variant="outlined"
                        onChange={(e) => {setLocation(e.target.value)}}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <TextField
                        fullWidth
                        id="outlined-multiline-static"
                        margin="normal"
                        defaultValue={profiletopass?.description || ''}
                        label="Description"
                        name="Description"
                        multiline
                        rows={4}
                        variant="outlined"
                        onChange={(e) => {setDescription(e.target.value)}}
                        />
                    </div>
                </div>
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
                <DialogActions
                
                
                >
                <Button type="submit" color="primary">
                    <strong>Save</strong>
                </Button>
                <Button onClick={handleClose} color="primary" autoFocus>
                    <strong>Cancel</strong>
                </Button>
            </DialogActions>
            </form>
            
        </DialogContent>
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
    )
}

export default Editprofile
