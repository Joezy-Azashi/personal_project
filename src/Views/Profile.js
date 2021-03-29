import React from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

function Profile() {
    return(
        <div>
            <div><h1><strong>PROFILE</strong></h1></div>
            <div className="row">
                <div className="col-md-9 col-lg-9">
                <div>
                        <Card variant="outlined" className="profile-card">
                            <CardContent>
                                <div className="row">
                                    <div className="">
                                        <div className="form-group">
                                            <h3 className="bolder">John Smith</h3>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
                <div className="col-md-3 col-lg-3">
                <div className="">
                        <img src=""
                        className="profileImage"
                        width={200}
                        height={200}
                        alt="Profile picture"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile