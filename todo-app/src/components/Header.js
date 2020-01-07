import React, { Component } from 'react';

class Header extends Component {
    render() {
        return (
            <header>
                <nav className="navbar is-fixed-top" role="navigation" aria-label="main navigation">
                    <div className="navbar-brand">
                        <a className="navbar-item" href="https://ghostyjade.com" target="_blank" rel="noopener noreferrer">GhostyJade</a>
                        <p className="navbar-item">{this.props.appname}</p>
                    </div>
                </nav>
            </header>
        );
    }
}

export default Header;