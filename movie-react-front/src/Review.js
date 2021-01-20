import React from 'react';

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
        this.setState({review_body: evt.target.value});
    }

    handleRating = evt => {
        //TODO have this update through prop
        this.setState({rating: evt.target.value});
    }

    enableEdit = () => {
        this.setState({enableEdit: true})
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

                    {this.state.enableEdit ? <select value={this.props.rating} onChange={this.handleRating}>
                        <option value="1">1 Star</option>
                        <option value="2">2 Stars</option>
                        <option value="3">3 Stars</option>
                        <option value="4">4 Stars</option>
                        <option value="5">5 Stars</option>
                    </select>          : <p>Rating: {this.props.rating}</p>}
                    
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