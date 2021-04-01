import React, { useState, useEffect } from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Editprofile from '../Components/Editprofile'
import Dialog from '@material-ui/core/Dialog';
import Api from '../services/Api'
import { getCurrentUser } from '../services/auth'

function Profile() {
    const [profile, setProfile] = useState()
    const [useData, setuseData] = useState(getCurrentUser())
    const [open, setOpen] = React.useState(false);
    const [profiletopass, setProfiletopass] = useState({})

    const handleClickOpen = () => {
        setOpen(true);
      };

      const handleClose = () => {
        setOpen(false);
      };

      const [alert, setAlert] = useState({
        open: false,
        message: '',
        severity: 'success'
    })

    const id = useData.id

    const profiledata = async () => {
        const result = await Api().get(`/profile/${id}/`)
        setProfile(result.data)
        setProfiletopass(result.data)
    }

    useEffect(() => {
        profiledata()
    }, [])    

    return(
        <div>
            <div className="row justify-content-between">
                <div className="mb-5">
                    <h2 className="ml-3"><strong>PROFILE</strong></h2>
                </div>
                <div className="mr-3">
                    <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={() =>{
                        handleClickOpen()
                        setProfiletopass(profiletopass)
                    }}
                    >
                        <strong>Edit</strong>
                    </Button>
                </div>
            </div>
            <div className="row">
                <div className="col-md-3 col-lg-3 mb-3">
                    <div>
                            <img src="/images/LK.jpg"
                            className="profileImage"
                            width="100%"
                            height="auto"
                            alt="picture"
                            />
                    </div>
                </div>
                <div className="col-md-9 col-lg-9 mb-4">
                <div>
                        <Card variant="outlined" className="profile-card">
                            <CardContent>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <h3 className="bolder">{profile?.username || "Not Provided"}</h3>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-4">
                                        <label><strong>Email</strong></label>
                                        <div>
                                            <p>{profile?.email || "Not Provided"}</p>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <label><strong>Phone Number</strong></label>
                                        <div>
                                            <p>{profile?.Phone_number || "Not Provided"}</p>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <label><strong>Location</strong></label>
                                        <div>
                                            <p>{profile?.location || "Not Provided"}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                    <label><strong>Description</strong></label>
                                    <p>{profile?.description || "Not Provided"}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
            <Dialog
            open={open}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            disableBackdropClick 
            >
                <Editprofile profiletopass={profiletopass} handleClose={handleClose}/>
            </Dialog>
        </div>
    )
}

export default Profile