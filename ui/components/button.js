import React from 'react'

let ButtonStyle = {
  display : "flex",
  textAlign: "center",
  background: "transparent",
  marginRight: 3,
  border: '1px solid #DAAD',
  display: "inline-block",
  borderRadius: "4px",
  padding: "1rem",
  cursor: "pointer",  
  color: "blue",
  minWidth: "10em"
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
      _linkStyle.background = "rgba(0, 0,127,0.1)";
    }

    return (<span onMouseEnter={this.mouseOver.bind(this)} onMouseLeave={this.mouseOut.bind(this)} onClick={this.props.onClick} style={_linkStyle}>{this.props.children}</span>)
  }
}

export default Button