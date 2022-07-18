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
import EditIcon from '@material-ui/icons/Edit';

function Editprofile({profiletopass,handleClose}) {
    const [username, setUsername] = useState('')
    const [Phone_number, setPhone_number] = useState('')
    const [location, setLocation] = useState('')
    const [description, setDescription] = useState('')
    const [pic, setPic] = useState({})
    const [uploadImage, setUploadImage] = useState()
    const [useData, setUseData] = useState(getCurrentUser())
    const option = {
        compressedLink:
        "https://testersdock.com/wp-content/uploads/2017/09/file-upload-1280x640.png",
      originalImage: "",
      originalLink: "",
      clicked: false,
      uploadImage: false
    }

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
      
    //   const handleImg = (event) => {
    //     setUploadImage({uploadImage: event.target.files[0]});
    //     const setOption = {
    //         originalLink: URL.createObjectURL(uploadImage),
    // //   originalImage: imageFile,
    // //   outputFileName: imageFile.name,
    //   uploadImage: true
    //     }
    //   }

      const editprofile = async (e) => {
          e.preventDefault()

        const profiledetails = {
            id: id,
            username: username === '' ? profiletopass?.username : username,
            Phone_number: Phone_number === '' ? profiletopass?.Phone_number : Phone_number,
            location: location === '' ? profiletopass?.location : location,
            description: description === '' ? profiletopass?.description : description,
            // pic: pic === '' ? profiletopass?.pic : uploadImage.uploadImage
        }
     
        setOpen(true)
        const result = await Api().put(`/profile/${id}/`, profiledetails)
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
                message: 'Profile updated unsuccessfully, try again',
                severity: 'error'
                })
            closeAlert()
        })
    }

    return (
        <div>
        <DialogContent>
            <DialogTitle id="alert-dialog-title">{"Edit Profile"}</DialogTitle>
            <form onSubmit={editprofile}>
                <div className="row justify-content-center">
                    {uploadImage &&
                    [uploadImage].map(file => {
                        return( 
                        <img src={URL.createObjectURL(file.uploadImage)}
                            className="profileImage"
                            width="100%"
                            height="auto"
                            alt="picture"
                            />
                            )
                    }) ||
                    <img src={profiletopass?.pic ? profiletopass?.pic : "images/profile.png"}
                        className="profileImage"
                        width="100%"
                        height="auto"
                        alt="picture"
                        />
                    }
                </div>
                <div className="row justify-content-center file-input mt-3">
                    <input
                            id="file"
                            className="file"
                            accept="image/x-png,image/gif,image/jpeg"
                            type="file"
                            />
                    <label for="file">Edit Image <EditIcon className="ml-2"/></label>
                </div>
                <div className="row">
                    <div className="col-md-12">
                    <TextField
                        fullWidth
                        id="outlined-multiline-static"
                        margin="normal"
                        defaultValue={profiletopass?.username || username}
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
                        defaultValue={profiletopass?.Phone_number || Phone_number}
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
                        defaultValue={profiletopass?.location || location}
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
                        defaultValue={profiletopass?.description || description}
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
                <Button onClick={handleClose} style={{color: "#FFFFFF", backgroundColor: "#3f51b5"}} autoFocus>
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
