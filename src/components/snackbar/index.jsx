import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

class SnackBar extends Component {
    constructor(props) {
        super(props)

        this.state = {
            active: false
        }
    }

    componentDidMount() {
        this.props.onOpen !== null && this.props.onOpen(this.getChildrenProps());
    }

    componentWillUnmount() {
        this.props.onClose !== null && this.props.onClose(this.getChildrenProps());
    }

    render() {
        const {
            className,
            timeout,
            label,
            type,
            onTimeout,
            onClick,
            ...rest
        } = this.props

        return (
            <div className="container">
                <span className="content">snackbar</span>
            </div>
        )
    }
}

SnackBar.PropTypes = {
    /**
     * Additional class name to provide custom styling.
     */
    className: PropTypes.string,
    /**
     * The duration in ms of the snackbar.
     */
    timeout: PropTypes.number,
    /**
     * Text to display in the content.
     */
    label: PropTypes.string,
    /**
     * The type of the snackbar.
     */
    type: PropTypes.oneOf(['accept', 'warn', 'cancel']),
    /**
     * The callback function when finish the set timeout.
     */
    onTimeout: PropTypes.func,
    /**
     * Callback function that will be called when the toast is opened.
     */
    onOpen: PropTypes.func,
    /**
     * Callback function that will be called when the toast is closed.
     */
    onClose: PropTypes.func,
}

const noop = () => {}

SnackBar.defaultProps = {
    timeout: 1000,
    onTimeout: noop,
    onOpen: noop,
    onClose: noop,
    type: 'accept'
}

export default SnackBar
