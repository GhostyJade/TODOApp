import React, { Component } from 'react';
import { Icon } from './Icons';

class Header extends Component {
    render() {
        return (
            <header>
                <nav className="navbar is-fixed-top" role="navigation" aria-label="main navigation">
                    <div className="navbar-brand">
                        <a className="navbar-item" href="https://ghostyjade.com" target="_blank" rel="noopener noreferrer">GhostyJade</a>
                    </div>
                    <div className="navbar-item">
                        <a href="https://github.com/GhostyJade/TODOApp" target="_blank" rel="noopener noreferrer">
                            <Icon icon={['fab', 'github']} />
                            {this.props.appname}
                        </a>
                    </div>
                </nav>
            </header>
        );
    }
}

export default Header;