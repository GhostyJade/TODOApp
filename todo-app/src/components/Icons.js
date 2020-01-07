import React, { Component } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export class Icon extends Component {
    render() {
        return (
            <FontAwesomeIcon icon={this.props.icon} color={this.props.color}/>
        )
    }
}