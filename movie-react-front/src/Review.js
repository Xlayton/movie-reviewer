import React from 'react';
import ReviewStars from './components/ReviewStars';

//Gets and sets all info through parent.
export default class Review extends React.Component {
    constructor(props) {
        super(props);
        console.log(props)
        this.state = {
            movie: '',
            enableEdit: false
        }
    }

    enableEdit = () => {
        this.setState({ enableEdit: true })
    }

    render() {
        return (
            this.props.isEditable ?
                (<>
                    <div key={this.props.review_id}>
                    <button onClick={this.enableEdit}>Edit Review</button>
                        {this.state.enableEdit ? this.state.user_id : <p>User ID: {this.props.user_id}</p>}

                        {this.state.enableEdit ?
                            <ReviewStars score={this.props.rating} editable={true} onChange={(evt) => this.props.handleRating(evt, this.props.index)}/>
                            :  <ReviewStars score={this.props.rating} editable={false} />}

                        {this.state.enableEdit ? <textarea rows="10" cols="100" value={this.props.review_body} onChange={(evt) => this.props.handleReview(evt, this.props.index)} /> : <p>Review: {this.props.review_body}</p>}
                        <button onClick={() => {this.props.editReview(this.props.index);this.setState({enableEdit: false})}}>Submit</button>
                    </div>
                </>)
                :
                (<>
                    <div key={this.props.review_id}>
                        <p>User ID: {this.props.user_id}</p>
                        <p>Rating: {this.props.rating}</p>
                        <p>Review: {this.props.review_body}</p>
                    </div>
                </>)

        )
    }
}