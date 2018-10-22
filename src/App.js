import React, {Component} from 'react';
import './App.css';
import {Stage, Layer, Rect, Line, Circle, Text} from 'react-konva';
import Konva from 'konva';


class App extends Component {
    state = {
        activeBoard: 'Vector'
    }

    setActiveBoard = (board) => {
        this.setState({
            activeBoard: board
        })
    }

    render() {
        return (
            <Stage width={window.innerWidth} height={window.innerHeight}>
                <Menu setActiveBoard={this.setActiveBoard}/>
                {
                    (() => {
                        if (this.state.activeBoard === 'Brush') {
                            return <BrushBoardLayer/>
                        }
                        if (this.state.activeBoard === 'Vector') {
                            return <VectorBoardLayer/>
                        }
                        if (this.state.activeBoard === 'Rectangle') {
                            return <RectBoardLayer/>
                        }
                        if (this.state.activeBoard === 'Circle') {
                            return <CircleBoardLayer/>
                        }
                    })()
                }
            </Stage>
        );
    }
}


class Menu extends Component {
    constructor(props) {
        super(props)

        this.state = {
            menuItems: [
                'Brush',
                'Vector',
                'Rectangle',
                'Circle',
            ],
            setActiveBoard: props.setActiveBoard
        }
    }

    setActiveBoard = (e) => {
        this.state.setActiveBoard(e.target.getAttr('text'))
    }

    render() {
        return (
            <Layer>
                {
                    this.state.menuItems.map((item, index) =>
                        <Text text={item}
                              x={(index * window.innerWidth / this.state.menuItems.length) + 70}
                              y={30}
                              fontSize={20}
                              onClick={this.setActiveBoard}
                        />
                    )
                }
            </Layer>
        )
    }
}


class BrushBoardLayer extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isDrawing: false,
            pixels: [],
            colorIcons: [
                '#d84315',
                '#ffeb3b',
                '#388e3c',
                '#1e88e5',
                '#212121',
                '#ffffff'
            ],
            brushColor: '#212121'
        }
    }

    mouseMoveHandler = (e) => {
        if (e.evt.buttons >= 1) {
            let pixels = this.state.pixels
            pixels.push({
                x: e.evt.clientX,
                y: e.evt.clientY
            })
            this.setState({
                pixels: pixels
            })
        }
    }

    clearBoard = () => {
        this.setState({
            pixels: []
        })
    }

    setBrushColor = (e) => {
        this.setState({
            brushColor: e.target.getAttr('fill')
        })
    }

    render() {
        return (
            <Layer>
                <Rect
                    x={30}
                    y={80}
                    width={window.innerWidth - 60}
                    height={window.innerHeight - 100}
                    fill={'#ededed'}
                    onMouseMove={this.mouseMoveHandler}
                />
                {/*clear board icon*/}
                <Circle
                    x={60}
                    y={110}
                    radius={20}
                    fill={'#29b6f6'}
                    onClick={this.clearBoard}
                />
                {/*color brushes*/}
                {
                    this.state.colorIcons.map((color, index) =>
                        <Circle
                            fill={color}
                            radius={15}
                            x={60}
                            y={60 * index + 190}
                            onClick={this.setBrushColor}
                        />
                    )
                }
                <Text text={'X'} x={53} y={102} fontSize={20} fill={'white'} onClick={this.clearBoard}/>
                {
                    this.state.pixels.map(pixel =>
                        <Circle
                            x={pixel.x}
                            y={pixel.y}
                            radius={5}
                            color={'custom color'}
                            fill={this.state.brushColor}
                        />
                    )
                }
            </Layer>
        )
    }
}


class VectorBoardLayer extends Component {
    constructor(props) {
        super(props)

        this.state = {
            coords: [],
            lines:[]
        }
    }

    drawVector = (e) => {
        let coords = this.state.coords
        let lines = this.state.lines
        coords.push(e.evt.clientX)
        coords.push(e.evt.clientY)

        coords.map((point, index)=>{
            if(index % 4 === 0){
                lines.push(1)
                this.setState({
                    lines:lines
                })
            }
        })
        console.log(coords)
        console.log(this.state.lines)
    }

    render() {
        return (
            <Layer>
                <Rect
                    x={30}
                    y={80}
                    width={window.innerWidth - 60}
                    height={window.innerHeight - 100}
                    fill={'black'}
                    onClick={this.drawVector}
                />
                {
                    this.state.lines.map(line =>
                        <Line
                            x={0}
                            y={0}
                            points={this.state.coords}
                            stroke={'white'}
                            tension={0}
                        />
                    )
                }
            </Layer>
        )
    }

}

class RectBoardLayer extends Component {
    constructor(props) {
        super(props)

    }

    render() {
        return (
            <Layer>
                <Rect
                    x={30}
                    y={80}
                    width={window.innerWidth - 60}
                    height={window.innerHeight - 100}
                    fill={'#ededed'}
                />
            </Layer>
        )
    }

}

class CircleBoardLayer extends Component {
    constructor(props) {
        super(props)

    }

    render() {
        return (
            <Layer>
                <Rect
                    x={30}
                    y={80}
                    width={window.innerWidth - 60}
                    height={window.innerHeight - 100}
                    fill={'#ededed'}
                />
            </Layer>
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

export default App;
