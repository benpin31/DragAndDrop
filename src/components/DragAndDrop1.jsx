import React, { Component } from "react";

import "./../styles/DragAndDrop1.css";

export default class DragAndDrop1 extends Component {
  state = {
    targeted: null,
    initialMousePosition: null,
    initialPositions: [{ id: "s1" }, { id: "s2" }],
    styles: ["s1", "s2"].map((id) => {
      return { id: id, position: "static", left: 0, top: 0 };
    }),
  };

  handleMouseMove = (event) => {
    event.preventDefault();

    if (event.buttons === 1) {
      const {
        targeted,
        styles,
        initialPositions,
        initialMousePosition,
      } = this.state;

      const style = styles.find((style) => style.id === targeted);
      const initialPosition = initialPositions.find(
        (pos) => pos.id === targeted
      );

      style.position = "fixed";
      style.left =
        initialPosition.initialLeft + event.clientX - initialMousePosition[0];
      style.top =
        initialPosition.initialTop + event.clientY - initialMousePosition[1];

      this.setState({ styles });
    }
  };

  handleSetInitialPosition = (event) => {
    const { initialPositions } = this.state;

    const pos = initialPositions.find((pos) => pos.id === event.target.id);
    pos.initialLeft = event.target.getBoundingClientRect().left;
    pos.initialTop = event.target.getBoundingClientRect().top;

    this.setState({
      targeted: event.target.id,
      initialPositions: initialPositions,
      initialMousePosition: [event.clientX, event.clientY],
    });
  };

  getStyle(id) {
    const { position, left, top } = this.state.styles.find(
      (style) => style.id === id
    );
    return { position, left, top };
  }

  render() {
    return (
      <div className="DragAndDrop1__container">
        <div
          className="square"
          id="s1"
          onMouseDown={this.handleSetInitialPosition}
          onMouseMove={this.handleMouseMove}
          style={this.getStyle("s1")}
        ></div>
        <div
          className="square"
          id="s2"
          onMouseDown={this.handleSetInitialPosition}
          onMouseMove={this.handleMouseMove}
          style={this.getStyle("s2")}
        ></div>
      </div>
    );
  }
}
