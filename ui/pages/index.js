import Link from 'next/link'
import Layout from "../components/layout";

class FluidInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      focused: false,
      value: ""
    };
    this.onInput = this.props.onInput;
  }

  focusField() {
    const { focused } = this.state;
    this.setState({
      focused: !focused
    });
  }
  handleChange(event) {
    const { target } = event;
    const { value } = target;
    this.onInput(value);
    this.setState({
      value: value
    });
  }
  render() {
    const { type, label, style, id } = this.props;
    const { focused, value } = this.state;
    
    let inputClass = "fluid-input";
    if (focused) {
      inputClass += " fluid-input--focus";
    } else if (value != "") {
      inputClass += " fluid-input--open";
    }
    
    return (
      <div className={inputClass} style={style}>
        <div className="fluid-input-holder">
          
          <input 
            className="fluid-input-input"
            type={type}
            id={id}
            onFocus={this.focusField.bind(this)}
            onBlur={this.focusField.bind(this)}
            onChange={this.handleChange.bind(this)}
            autoComplete="off"
          />
          <label className="fluid-input-label" forhtml={id}>{label}</label>
          
        </div>autocomplete
      </div>
    );
  }
}

class Button extends React.Component {
  render() {
    return (
      <div className={`button ${this.props.buttonClass}`} onClick={this.props.onClick}>
        {this.props.buttonText}
      </div>
    );
  }
}



class LoginContainer extends React.Component {
  constructor(props) {
    super(props)
  }
 
  onUserName(userName) {
    console.log(userName)
  }

  onUserPassword(password) {
    console.log(password)
  }

  render() {
    const style = {
      margin: "15px 0"
    };
    return (
      <div className="login-container">
        <div className="title">
         //H4ckM3
        </div>
        {/* <FluidInput type="text" label="name" id="name" style={style} onInput={this.onUserName}/> */}
        <FluidInput type="password" label="<secret>" id="password" style={style} onInput={this.onUserPassword}/>
        <Link href="/description"><Button buttonText="Hit Me" buttonClass="login-button"  onClick={this.props.onClick}/></Link>
      </div>
    );
  }
}


export default () => (
    <Layout>
    <LoginContainer/>
    </Layout>
)
