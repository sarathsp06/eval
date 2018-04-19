import React from 'react'

let ButtonStyle = {
  background: "#b5c6d5",
  marginRight: 3,
  border: '2px solid #DAAD',
  display: "inline-block",
  borderRadius: "4px",
  padding: "2px",
  cursor: "pointer",
  color: "white"
}

class Button extends React.Component {  
  constructor () {
    console.log("Constructor")
    super();
    this.state = {hover: false}
  }

  mouseOver() {
    this.setState({ hover: true });
  }

  mouseOut() {
    this.setState({ hover: false });
  }

  render() {
    let _linkStyle =  Object.assign({},ButtonStyle);
    if (this.state.hover) {
      _linkStyle.background = "#ffff00";
    }

    return (<span onMouseEnter={this.mouseOver.bind(this)} onMouseLeave={this.mouseOut.bind(this)} onClick={this.props.onClick} style={_linkStyle}>{this.props.children}</span>)
  }
}

export default Button