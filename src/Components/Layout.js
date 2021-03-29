import React from 'react'
import Navbar from './Navbar'

function Layout({page}){
    return(
        <div>
            <Navbar page={page}/>
        </div>
    )
}
export default Layout