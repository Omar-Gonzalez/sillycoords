import React, {Component} from 'react';
import './App.css';
import {Stage, Layer, Rect, Text} from 'react-konva';
import Konva from 'konva';


class Player extends Component {
    constructor(props) {
        super(props)

        this.state = {
            position: {
                x: props.player.position.x,
                y: props.player.position.y
            },
            dimensions: {
                w: 10,
                h: 10
            },
            color: 'black'
        }
    }

    componentWillReceiveProps = (newProps) => {
        this.setState({
            position: {
                x: newProps.player.position.x,
                y: newProps.player.position.y
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
            />
        )
    }
}

class App extends Component {
    handleMouseClick = (e) => {
        this.setState({
            player: {
                position: {
                    x: e.evt.layerX,
                    y: e.evt.layerY
                }
            }
        })
    }

    state = {
        player: {
            position: {
                x: 10,
                y: 10
            }
        }
    }

    render() {
        return (
            <Stage onClick={this.handleMouseClick} width={window.innerWidth} height={window.innerHeight}>
                <Layer>
                    <Player player={this.state.player}/>
                </Layer>
            </Stage>
        );
    }
}

export default App;
