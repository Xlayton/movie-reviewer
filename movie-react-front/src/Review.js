import React from 'react';
import ReviewStars from './components/ReviewStars';

//Gets and sets all info through parent.
export default class Review extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            movie: '',
            enableEdit: false
        }
    }

    handleReview = evt => {
        //TODO have this update through prop
        this.setState({ review_body: evt.target.value });
    }

    handleRating = evt => {
        //TODO have this update through prop
        this.setState({ rating: evt});
    }

    enableEdit = () => {
        this.setState({ enableEdit: true })
    }

    editReview = () => {
        if(this.state.userHasReview && this.state.review_id) {
        fetch('http://localhost:8080/api/reviews', {
            method: "PUT",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: new URLSearchParams({
                review_id: this.state.review_id,
                review_body: this.state.review_body,
                rating: this.state.rating
            })
        }).then(res => res.json())
        .then(data => {
            this.setState({enableEdit: false});
            this.props.refreshReviews();
        })
        .catch(console.log)
    }
    }

    render() {
        return (
            this.props.isEditable ?
                (<>
                    <button onClick={this.enableEdit}>Edit Review</button>
                    <div key={this.props.review_id}>
                        {this.state.enableEdit ? this.state.user_id : <p>User ID: {this.props.user_id}</p>}

                        {this.state.enableEdit ?
                            <ReviewStars score={this.props.rating} editable={true} onChange={this.handleRating }/>
                            :  <ReviewStars score={this.props.rating} editable={false} />}

                        {this.state.enableEdit ? <textarea rows="10" cols="100" value={this.props.review_body} onChange={this.handleReview} /> : <p>Review: {this.props.review_body}</p>}
                        <button onClick={this.editReview}>Submit</button>
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