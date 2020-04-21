import React from 'react';

const Footer = (props) => {
    return(
        <nav className="navbar  navbar-expand-sm navbar-dark navbar-custom">
            <ul className="navbar-nav flex-row mb-2 text-right">
                <li className="nav-item active mx-3">
                    <a className="nav-link" rel="prev" href="/Home">Privacy</a>
                </li>
                <li className="nav-item active mx-3">
                    <a className="nav-link" rel="help" href="/Home">Accesibility</a>
                </li>
                <li className="nav-item active mx-3">
                    <a className="nav-link" rel="help" href="/Home">Terms of use</a>
                </li>
            </ul>
        </nav>
    );
}

export default Footer;