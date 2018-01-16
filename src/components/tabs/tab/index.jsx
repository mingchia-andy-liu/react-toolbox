import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

class Tab extends Component {
    render() {
        const classnames = classNames(
            'c-tab-item',
            'u-flex-col',
            'u--center',
            {
                'c-tab-item--active': this.props.active,
            }
        )
        return (
            <div className={classnames} onClick={this.props.onClick}>
                <label>
                    {this.props.label}
                </label>
            </div>
        )
    }
}

Tab.propTypes = {
    label: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired,
    onClick: PropTypes.func,
}

Tab.defaultProps = {
    label: '',
    active: false,
}

export default Tab
