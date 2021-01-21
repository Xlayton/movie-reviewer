import React from 'react'

export default class ReviewStars extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            score: 0,
            size: 50,
        }
        // this.handleReview = this.handleReview.bind(this);
    }

    componentDidMount() {
        if (this.props.score) {
            this.setState({
                score: this.props.score,
                size: (this.props.size ? this.props.size : 50)
            })
        }
    }


    handleChange() {
        console.log("index",this.props.index);
            this.props.onScoreChange(this.state.score, this.props.index);
    }

    setScore(score) {
        if (this.props.editable) {
            if ((score === 1) && (this.state.score === 1)) {
                this.setState({
                    score: 0
                }, () => this.handleChange())
            } else {
                this.setState({
                    score: score
                }, () => this.handleChange())
            }
        }
    }


    render() {
        return (
            <div className="ReviewStars">
                {/* {this.state.score} */}


                {this.state.score > 0 ?
                    <img className="FullStar" src="./assets/fullStar.png" width={this.state.size} value="0" alt="Full Star" onClick={() => this.setScore(1)} />
                    :
                    <img className="EmptyStar" src="./assets/emptyStar.png" width={this.state.size} value="0" alt="Empty Star" onClick={() => this.setScore(1)} />
                }
                {this.state.score > 1 ?
                    <img className="FullStar" src="./assets/fullStar.png" width={this.state.size} value="0" alt="Full Star" onClick={() => this.setScore(2)} />
                    :
                    <img className="EmptyStar" src="./assets/emptyStar.png" width={this.state.size} value="0" alt="Empty Star" onClick={() => this.setScore(2)} />
                }
                {this.state.score > 2 ?
                    <img className="FullStar" src="./assets/fullStar.png" width={this.state.size} value="0" alt="Full Star" onClick={() => this.setScore(3)} />
                    :
                    <img className="EmptyStar" src="./assets/emptyStar.png" width={this.state.size} value="0" alt="Empty Star" onClick={() => this.setScore(3)} />
                }
                {this.state.score > 3 ?
                    <img className="FullStar" src="./assets/fullStar.png" width={this.state.size} value="0" alt="Full Star" onClick={() => this.setScore(4)} />
                    :
                    <img className="EmptyStar" src="./assets/emptyStar.png" width={this.state.size} value="0" alt="Empty Star" onClick={() => this.setScore(4)} />
                }
                {this.state.score > 4 ?
                    <img className="FullStar" src="./assets/fullStar.png" width={this.state.size} value="0" alt="Full Star" onClick={() => this.setScore(5)} />
                    :
                    <img className="EmptyStar" src="./assets/emptyStar.png" width={this.state.size} value="0" alt="Empty Star" onClick={() => this.setScore(5)} />
                }

            </div>
        )
    }
}