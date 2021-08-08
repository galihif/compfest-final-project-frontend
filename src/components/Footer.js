//Library
import React from 'react'

//Styles
import { 
    Navbar,
 } from 'react-bootstrap';

const Footer = () => {
    return (
        <div style={{ height: "12em", backgroundColor: "#0673A1" }} className="p-5">
            <div className="d-flex justify-content-center align-items-center">
                <h3 className="text-white">
                    WebsiteName
                </h3>
            </div>
            <p className="text-center text-white">© 2021 - NAGA Team COMPFEST 13</p>
        </div>
    )
}

export default Footer