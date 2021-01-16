import React from 'react';

export default class Review extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            movie: '',
            enableEdit: false
        }
    }
    
    render() {
        return (
            this.props.isEditable && this.state.enableEdit ?
            (<>
                <div key={this.props.review_id}>
                    <button onClick={this.enableEdit}>Edit Review</button>
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