import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Tab from './tab'

class Tabs extends Component {
    constructor(props) {
        super(props)

        const { children, startIndex } = this.props
        const index = startIndex > children.length ? 0 : startIndex
        this.state = {
            selectedIndex: index,
        }
    }

    componentWillReceiveProps({ startIndex }) {
        this.setState({ selectedIndex: startIndex })
    }

    onTabSelect(selectedIndex) {
        this.setState({ selectedIndex })
    }

    renderTabs() {
        return this.props.children.map((item, index) => (
            <Tab
                key={`tab-bar-item-${index}`}
                active={this.state.selectedIndex === index}
                index={index}
                label={item.props.label}
                onClick={() => {this.onTabSelect(index)}}
            />
        ), this)
    }

    render() {
        const sliderStyle = {
            '--tab-number': this.props.children.length,
            left: `${this.state.selectedIndex / this.props.children.length * 100}%`,
        }
        return (
            <nav className="c-tab-bar u-flex-row u--center" data-index={this.state.selectedIndex}>
                {this.renderTabs()}
                <span className={'c-tab-slider'} style={sliderStyle}></span>
            </nav>
        )
    }
}

Tabs.propTypes = {
    /**
     * Children elements of the Tabs components, consist of Tab
     */
    children: PropTypes.arrayOf(PropTypes.element).isRequired,
    /**
     * Start index of the selected tab, start from 0
     */
    startIndex: PropTypes.number,
}

Tabs.defaultProps = {
    startIndex: 0,
}

export { Tab }
export default Tabs
