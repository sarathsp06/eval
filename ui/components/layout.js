import Header from "./header"

const layoutStyle = {
  margin: 20,
  height: '800px',
}

const Layout = (props) => (
  <div>
  <Header/>
  <div style={layoutStyle}>
    {props.children}
  </div>
  </div>
)

export default Layout