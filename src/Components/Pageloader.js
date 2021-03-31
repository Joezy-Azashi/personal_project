import React from 'react'
import HashLoader from 'react-spinners/HashLoader'
import DialogContent from '@material-ui/core/DialogContent';

function Pageloader(){
    return(
        <DialogContent style={{padding: "40px"}}>
            <div className="row justify-content-center">
                <HashLoader size={70} color="#3f51b5" loading/>
            </div>
        </DialogContent>
    )
}

export default Pageloader