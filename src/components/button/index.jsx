import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const getClassName = (className, inverse, disabled, theme) => {
    const names = classNames(
        'c-button',
        {
            'c-button--primary': theme === 'primary' && !disabled,
            'c-button--secondary': theme === 'secondary' && !disabled,
            'c-button--danger': theme === 'danger' && !disabled,
            'c-button--inverse': inverse && !disabled,
            'c-button--disabled': disabled
        },
        className
    )
    return names
}

const Button = ({ className, label, type, disabled, inverse, theme, ...rest }) => {
    return (
        <button
            className={getClassName(className, inverse, disabled, theme)}
            type={type}
            {...rest}
        >
            <span>{label}</span>
        </button>
    )
}

Button.propTypes = {
    /**
     * Additional class name to provide custom styling.
     */
    className: PropTypes.string,
    /**
     * The text string to use for the name of the button.
     */
    label: PropTypes.string.isRequired,
    /**
     * The theme of the button.
     */
    theme: PropTypes.oneOf(['primary', 'secondary', 'danger']),
    /**
     * The type of the button.
     */
    type: PropTypes.oneOf(['button', 'submit', 'reset', 'menu']),
    /**
     * If true, component will be disabled.
     */
    disabled: PropTypes.bool,
    /**
     * If true, the neutral colors are inverted.
     */
    inverse: PropTypes.bool
}

Button.defaultProps = {
    type: 'button',
    disabled: false
}

export default Button
