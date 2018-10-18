import React, {Component} from 'react';
import './App.css';
import {Stage, Layer, Rect, Circle, Text} from 'react-konva';
import Konva from 'konva';


class App extends Component {
    state = {
        rect: {
            dimensions: {
                w: 70,
                h: 70
            },
            position: {
                x: window.innerWidth / 2,
                y: window.innerHeight / 2
            }
        },
        circle: {
            position: {
                x: window.innerWidth / 2,
                y: window.innerHeight / 3
            },
            radius: 50
        },
        bricks: [
            {
                position: {
                    x: 20,
                    y: 20
                },
                dimensions: {
                    w: 40,
                    h: 20
                },
                color: Konva.Util.getRandomColor()
            },
            {
                position: {
                    x: 100,
                    y: 20
                },
                dimensions: {
                    w: 40,
                    h: 20
                },
                color: Konva.Util.getRandomColor()
            },
            {
                position: {
                    x: 200,
                    y: 20
                },
                dimensions: {
                    w: 40,
                    h: 20
                },
                color: Konva.Util.getRandomColor()
            },
        ]
    }

    render() {
        return (
            <Stage width={window.innerWidth} height={window.innerHeight}>
                <Layer>
                    {
                        this.state.bricks.map(brick =>
                            <Brick brick={brick}/>
                        )
                    }
                    <ARect rect={this.state.rect}/>
                    <ACircle circle={this.state.circle}/>
                </Layer>
            </Stage>
        );
    }
}

class ACircle extends Component {
    constructor(props) {
        super(props)

        this.state = {
            position: {
                x: props.circle.position.x,
                y: props.circle.position.y
            },
            radius: props.circle.radius,
            color: '#38aecf',
            scaling: false,
            beginScalingMouseY: 0
        }
    }

    handleDrag = (e) => {

        this.setState({
            position: {
                x: e.target.x(),
                y: e.target.y()
            }
        })
    }

    handleMouseDown = (e) => {
        console.log(e.evt.button)
        if (e.evt.button == 2) {
            this.setState({
                scaling: true,
                beginScalingMouseY: e.evt.clientY
            })
        }
    }

    handleMouseUp = (e) => {
        console.log(e.evt.button)
        if (e.evt.button == 2) {
            this.setState({
                scaling: false
            })
        }
    }

    handleMouseMove = (e) => {
        if (this.state.scaling) {
            let dif = e.evt.clientY - this.state.beginScalingMouseY
            let newRadius = this.state.radius + dif
            if (newRadius < 50) {
                return
            }
            this.setState({
                radius: newRadius
            })
        }
    }

    render() {
        return (
            <Circle
                x={this.state.position.x}
                y={this.state.position.y}
                radius={this.state.radius}
                fill={this.state.color}
                draggable
                onDragEnd={this.handleDrag}
                onMouseDown={this.handleMouseDown}
                onMOuseUp={this.handleMouseUp}
                onMouseMove={this.handleMouseMove}
            />
        )
    }
}

class ARect extends Component {
    constructor(props) {
        super(props)

        this.state = {
            position: {
                x: props.rect.position.x,
                y: props.rect.position.y
            },
            dimensions: {
                w: props.rect.dimensions.w,
                h: props.rect.dimensions.h
            },
            color: 'black'
        }
    }

    componentWillReceiveProps = (newProps) => {
        this.setState({
            position: {
                x: newProps.rect.position.x,
                y: newProps.rect.position.y
            },
            dimensions: {
                w: newProps.rect.dimensions.w,
                h: newProps.rect.dimensions.h
            }
        })
    }

    handleClick = (e) => {
        console.log('clicked on rect')
    }

    handleDragEnd = (e) => {
        this.setState({
            position: {
                x: e.target.x(),
                y: e.target.y()
            }
        })
    }

    render() {
        return (
            <Rect
                x={this.state.position.x}
                y={this.state.position.y}
                width={this.state.dimensions.w}
                height={this.state.dimensions.h}
                fill={this.state.color}
                draggable
                onDragEnd={this.handleDragEnd}
            />
        )
    }
}

class Brick extends Component {
    constructor(props) {
        super(props)

        let brick = props.brick

        console.log(brick.position)
        console.log(brick.dimensions)
        console.log(brick.color)

        this.state = {
            position: {
                x: brick.position.x,
                y: brick.position.y
            },
            dimensions: {
                w: brick.dimensions.w,
                h: brick.dimensions.h
            },
            color: brick.color
        }
    }

    render() {
        return (
            <Rect
                x={this.state.position.x}
                y={this.state.position.y}
                width={this.state.dimensions.w}
                height={this.state.dimensions.h}
                fill={this.state.color}
            />
        )
    }
}

export default App;
