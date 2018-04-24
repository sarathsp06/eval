import Layout from "../components/layout"
import Button from "../components/button"
import fetch from 'isomorphic-unfetch'


const quizStyles = ["master", "quiz", "grid"]

class Image extends React.Component {
    constructor(props){
        super(props)
    }
    render = () => (<img src={`/static/${this.props.item}${this.props.reduced != undefined ? "-or8" : ""}.png`} style={this.props.style} />)
}


class Quiz extends React.Component {
    constructor(props) {
        super(props)
        this.state = { selection: this.props.selection };

    }

    done = () => {
        this.props.done(this.props.index - 1, this.state.selection)
        this.setState({ selection: null })
        this.props.next()
    }

    onSelect = (event) => {
        this.setState({ selection: event.currentTarget.value })
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ selection: nextProps.selection })
    }

    render = () => {
        if (this.props.question == undefined) {
            return <div className="container"><Image reduced item="quiz"  style={{ width: "100%" }}/></div>
        }
        return (<div className="container">
            <div className="quiz">
                <h2 className="quiz-question">{this.props.index} {this.props.question}?</h2>
                <ul className="answers">
                    {(this.props.answers || []).map((value, index) => (<li
                        className={`quiz-answer ${this.state.selection == index ? "active" : ""}`}
                        onClick={this.onSelect}
                        value={index}
                        key={index}> {`${index} . ${value}`}</li>))}
                </ul>
                <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                    <Button onClick={this.props.prev}> Prev </Button>
                    <Button onClick={this.done}> NeXt </Button>
                </div>

            </div>
        </div>)
    }
}


class Timer extends React.Component {
    constructor(props) {
        super(props)
        var timeLeft = this.props.timeLeft
        this.setTimeLeft(timeLeft)
    }

    setTimeLeft = (timeLeft) => {
        if (timeLeft == null || typeof timeLeft == "undefined") {
            timeLeft = 0
        }
        this.state = {
            "timeLeft": timeLeft,
            "seconds": timeLeft % 60,
            "minutes": timeLeft / 60
        }
    }

    componentDidMount = () => {
        var intervalId = setInterval(this.timer, 1000);
        this.setState({ "intervalId": intervalId })
    }

    componentWillUnmount = () => {
        clearInterval(this.state.intervalId);
    }

    timer = () => {
        if (this.state.timeLeft == 0) {
            clearInterval(this.state.intervalId)
            return
        }
        const timeLeft = this.state.timeLeft - 1;
        const seconds = timeLeft % 60;
        const minutes = Math.floor(timeLeft / 60);
        this.setState({ seconds: seconds, minutes: minutes, timeLeft: timeLeft });
    }

    componentWillReceiveProps = (nextProps) => {
        var timeLeft = nextProps.timeLeft
        this.setTimeLeft(timeLeft)
    }

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
                <h3 style={secondsStyles} className="seconds"> {this.state.minutes + ':' + this.state.seconds + '   left'}</h3>
                <br />
            </div>

        )
    }
}

class TheGrid extends React.Component {
    constructor(props) {
        super(props)
    }

    onClick = (event) => {
        this.props.qindex(event.currentTarget.value)
    }

    render = () => {
        if (this.props.count == 1) {
            return <div className="grid-flex-container"><Image  reduced item="grid" style={{ width: "100%" }} /></div>
        }
        return (<ul className="grid-flex-container">
            {[...Array(this.props.count)].map((x, i) => {
                var className = "grid-flex-item"
                className = (i == this.props.current) ? "active " + className : className
                className = this.props.answers[i] != null ? "done " + className : className
                return (<li className={className} key={i} value={i} onClick={this.onClick}>{i + 1}</li>)
            })}
        </ul>)
    }
}


class Logo extends React.Component {
    render = () => (
        <img src="/static/logo.jpg" data-reactid=".0.0" style={{ width: "100%" }} />
    )
}

class QuizLayout extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            timeLeft: 0,
            "qindex": 0,
            "questions": [{}],
            "answers": [null]
        }
        this.setQuestion()
    }

    setQuestion = async () => {
        // this.state.questions = questions;
        const res = await fetch("https://demo8128430.mockable.io/questions")
        const data = await res.json()
        this.setState({ timeLeft: 3600, questions: data, answers: Array(data.length).fill(null) })
    }

    questionIndex = (index) => {
        this.setState({ qindex: index })
    }

    done = (index, answer) => {
        var answers = this.state.answers
        answers[index] = answer
        this.setState({ answers: answers })
    }

    next = () => {
        if (this.state.qindex == this.state.questions.length - 1) { return }
        this.setState({ "qindex": this.state.qindex + 1 })
    }
    prev = () => {
        if (this.state.qindex == 0) { return }
        this.setState({ "qindex": this.state.qindex - 1 })
    }

    render = () => {
        return (<Layout styles={quizStyles}>
            <nav className="nav left">
                <Logo />
            </nav>
            <section className="main">
                <Quiz
                    index={this.state.qindex + 1}
                    next={this.next}
                    prev={this.prev}
                    done={this.done}
                    selection={this.state.answers[this.state.qindex]}
                    question={this.state.questions[this.state.qindex].question}
                    answers={this.state.questions[this.state.qindex].answers}
                />

            </section>
            <nav className="nav right">
                <Timer timeLeft={this.state.timeLeft} />
                <TheGrid
                    count={this.state.questions.length}
                    qindex={this.questionIndex}
                    current={this.state.qindex}
                    answers={this.state.answers}
                />
            </nav>
        </Layout>);
    }
}


export default QuizLayout