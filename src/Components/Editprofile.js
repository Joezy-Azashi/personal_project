import React, {useState, useEffect} from 'react'
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import DialogTitle from '@material-ui/core/DialogTitle';
import { getCurrentUser } from '../services/auth'
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Api from '../services/Api';

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
        const result = await Api().patch(`/profile/${id}`, profiledetails)
        .then((response) => {
            setTimeout(() => {
                window.location.assign('/profile')
            }, 1000)
        }).catch((error) => {
            console.log("error")
        })
    }

      useEffect(() => {
        console.log("DATA FOR PROFILE",profiletopass )
      }, [])

    return (
        <DialogContent>
            <DialogTitle id="alert-dialog-title">{"Edit Profile"}</DialogTitle>
            <form onSubmit={editprofile}>
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
    )
}

export default Editprofile
