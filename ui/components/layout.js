import Header from "./header"

const layoutStyle = {
  margin: 10,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: '100vh',
  backgroundColor: "azure"
}


const Layout = (props) => (
  <div>
    <Header styles={props.styles || []} />
    <div style={layoutStyle}>
      {props.children}
    </div>
  </div>
)

export default Layout