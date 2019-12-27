import React, {Component} from 'react';

import '../style/header.css'

class Header extends Component {
    render() {
        return (
            <header className="App-Header">
                <a className="Header-Link" href="https://ghostyjade.com" target="_blank" rel="noopener noreferrer">GhostyJade</a>
            </header>
        );
    }
}

export default Header;