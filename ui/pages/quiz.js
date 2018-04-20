import Layout from "../components/layout"
import Button from "../components/button"

const quizStyles = ["master", "quiz", "grid"]


class Quiz extends React.Component {
    constructor(props) {
        super(props)
    }

    render = () => (
        <div className="container">
            <div className="quiz">
                <h2 className="quiz-question">{this.props.question}?</h2>
                <ul className="answers">
                    {(this.props.answers||[]).map((value, index) => (<li className="quiz-answer" key={index} id={`answer-${index}`}> {`${index} . ${value}`}</li>))}
                </ul>
            </div>
        </div>

    )
}


class Timer extends React.Component {
    render = () => {
        const timerStyle = {
            margin: "0px",
            padding: "2em",
            borderBottom: "2px solid #dddddd"
        };

        const secondsStyles = {
            fontSize: "200%",
            fontWeight: "200",
            lineHeight: "1.5",
            margin: "0px",
            color: "#666"
        };

        return (
            <div style={timerStyle} className="react-timer">
                <h3 style={secondsStyles} className="seconds"> 12:22 left </h3>
                <br />
            </div>
        )
    }
}




class TheGrid extends React.Component {
    constructor(props) {
        super(props)
        const { count, done, pass } = this.props
        this.count = count
    }

    render = () => (
        <ul className="grid-flex-container">
            {[...Array(this.count)].map((x, i) => (<li className="grid-flex-item" key={i}>{i}</li>))}
        </ul>
    )
}


class Logo extends React.Component {
    render = () => (
        <img src="/static/logo.jpg" data-reactid=".0.0" style={{ width: "100%" }} />
    )
}

class QuizLayout extends React.Component {
    constructor(props) {
        super(props);
    }
    render = () => (
        <Layout styles={quizStyles}>
            <nav className="nav left">
                <Logo />
            </nav>
            <section className="main">
                <Quiz
                    question="How many kilometers from miami beach to washington dc"
                    answers={["Kilometers and Kilometers","10 Hrs","npm install washington-dc-to-miami-beach","RTFM"]}
                />
            </section>
            <nav className="nav right">
                <Timer />
                <TheGrid count={40} done={[2, 34, 32]} />
            </nav>
        </Layout>
    )
}


export default QuizLayout