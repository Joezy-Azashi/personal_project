import React from 'react'
import HashLoader from 'react-spinners/HashLoader'
import DialogContent from '@material-ui/core/DialogContent';

function Pageloader(){
    return(
        <DialogContent style={{height: "150px"}}>
            <div style={{ marginTop: "55px", marginLeft: "190px"}}>
                <HashLoader size={70} color="#3f51b5" loading/>
            </div>
        </DialogContent>
    )
}

export default Pageloader