import React, { PureComponent } from 'react'

class Loader extends PureComponent {
    render() {
        return (
            <div className="u-flex-row u--center u-full-width u-full-height">
                <span className="c-loader"/>
            </div>
        )
    }
}

export default Loader
