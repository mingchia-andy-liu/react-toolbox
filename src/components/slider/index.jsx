import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import _ from 'lodash'

/**
 * ```jsx
 * import Slider from 'components/slider'
 * ```
 * Sliders let users select a value from a continuous or discrete range of values by moving the slider thumb.
 * The smallest value is to the left, the largest to the right.
 */
class Slider extends Component {
    constructor(props) {
        super(props)

        this.state = {
            percent: this.props.percent,
            startX: 0,
            length: 0,
            dragging: false
        }

        // debounce the search every 300 ms
        this.onChangeCallbackHandler = _.debounce((value) => {
            this.props.onChange(value)
        }, 300)
        this.onClick = this.onClick.bind(this)
        this.onMoveHandler = this.onMoveHandler.bind(this)
        this.onDownHandler = this.onDownHandler.bind(this)
        this.onResizeHandler = this.onResizeHandler.bind(this)
        this.onMouseUpHandler = this.onMouseUpHandler.bind(this)
    }

    componentDidMount() {
        window.addEventListener('resize', this.onResizeHandler)
        this.onResizeHandler()

        // To stop sliding once user has stop dragging outside the element
        window.addEventListener('mouseup', this.onMouseUpHandler)
        window.addEventListener('mousemove', this.onMoveHandler)
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.onResizeHandler)
        window.removeEventListener('mouseup', this.onMouseUpHandler)
        window.removeEventListener('mousemove', this.onMoveHandler)
    }

    // Get the position of the slider in the browser
    onResizeHandler() {
        const { left, right } = this.trackNode.getBoundingClientRect()

        this.setState({ startX: left, length: right - left })
    }

    onDownHandler(e) {
        e.preventDefault()
        e.stopPropagation()
        this.onResizeHandler()
        this.onMove(e.clientX)
    }

    onMoveHandler(e) {
        if (!this.state.dragging) return
        e.preventDefault()
        e.stopPropagation()

        this.onMove(e.clientX)
    }

    onMouseUpHandler() {
        if (this.state.dragging) {
            this.setState({ dragging: false })
        }
    }

    // INTERNAL HANDLER
    onClick(e) {
        const percent = this.positionToPercent(e.clientX)
        this.setState({ percent, dragging: true })
        // this.props.onChange(this.percentToValue())
        this.onChangeCallbackHandler(this.percentToValue())
    }

    onMove(x) {
        // Handler for tap and drag
        const percent = this.positionToPercent(x)
        this.setState({ percent, dragging: true })
        this.onChangeCallbackHandler(this.percentToValue())
    }

    percentToValue() {
        return parseInt((this.state.percent * ((this.props.max - this.props.min) / 100))
                + this.props.min)
    }

    positionToPercent(x) {
        const { startX, length } = this.state
        const { step, stepValues } = this.props
        let percent = (x - startX) / length * 100
        if (percent > 100) {
            percent = 100
        } else if (percent < 0) {
            percent = 0
        }
        const numOfSteps = step ? stepValues.length - 1 : 100
        const stepSize = 1 / numOfSteps * 100
        percent = (Math.round(percent / stepSize) * stepSize)
        return percent
    }

    valueTextRow() {
        let valueText = (
            <div className="u-flex-row u--space-between u-text__size-14">
                <div>{this.props.min}</div>
                <div>{this.props.max}</div>
            </div>
        )
        if (this.props.step) {
            const length = this.props.stepValues.length - 1
            valueText = this.props.stepValues.map((text, index)=>{
                const percent = `${Math.round(index * (1 / length) * 100)}%`
                return (
                    <div
                        key={`slider-value-${index}`}
                        className="c-slider-rail-snap__text"
                        style={{left:percent}}
                    >
                        {text}
                    </div>
                )
            })
            valueText = (
                <div className="u-flex-row u--space-between u-text__size-14 c-slider-text">
                    {valueText}
                </div>
            )
        }
        return valueText
    }

    railSnaps() {
        if (this.props.step) {
            const length = this.props.stepValues.length - 1
            const railSnaps = this.props.stepValues.map((text, index) => {
                if (index !== length - 1) {
                    return (
                        <div className="c-slider-rail-snap" key={`railSnaps-${index}`} />
                    )
                }
            })
            return railSnaps
        }
    }

    render() {
        const percent = `${this.state.percent}%`
        const value = this.percentToValue()
        const knobPercent = this.knobNode
            ? `calc(${percent} - ${Math.round(this.knobNode.clientWidth / 2)}px)`
            : `calc(${percent} - 10px)`
        const knobClass = classNames({
            'c-slider-progress__knob': true,
            'c--active': this.state.dragging,
            'u-ripple' : this.state.dragging
        })
        const knobValueClass = classNames({
            'c-slider-value': true,
            'c--active': this.state.dragging
        })
        let knobValue = (<div></div>)
        if (!this.props.step) {
            knobValue = (
                <div className={knobValueClass} style={{left:knobPercent}}>
                    {parseInt(value)}
                </div>
            )
        }
        let valueText = this.valueTextRow()
        return (
            <div className="u-padding-h-sm u-full-width">
                <div className="u-flex-row"
                    onMouseDown={this.onDownHandler}
                    ref={(track) => { this.trackNode = track }}
                >
                    <div className="c-slider-bar u-full-width">
                         <div
                            className="c-slider-rail u-width-full"
                            onClick={this.onClick}
                            ref={(track) => { this.trackNode = track }}
                        >
                            {this.railSnaps()}
                        </div>
                        <div
                            className="c-slider-progress u-width-full"
                            style={{ width: percent }}
                            onClick={this.onClick}
                        />
                        <div
                            className={knobClass}
                            style={{ left: knobPercent }}
                            onMouseDown={this.onDownHandler}
                            ref={(knob) => { this.knobNode = knob }}
                        >
                        </div>
                        {knobValue}
                    </div>
                </div>
                {valueText}
            </div>
        )
    }
}

Slider.propTypes = {
    /**
     * Additional class name to provide custom styling.
     */
    className: PropTypes.string,
    /**
     * Minimum value permitted.
     */
    min: PropTypes.number,
    /**
     * Maximum value permitted.
     */
    max: PropTypes.number,
    /**
     * Starting thumb percentage.
     */
    percent: PropTypes.number,
    /**
     * Callback function that will be invoked when the slider value changes.
     */
    onChange: PropTypes.func,
    /**
     * If true, the slider will space evenly spaced based on the stepValues property value.
     * Noop otherwise.
     */
    step: PropTypes.bool,
    /**
     * The step size value when the knob is moved or increase/decrease is called.
     */
    stepValues: PropTypes.array
}

Slider.defaultProps = {
    min: 0,
    max: 100,
    percent: 0,
    onChange: function(){},
}


export default Slider
