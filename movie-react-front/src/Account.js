import React from "react"
import ReviewList from "./ReviewList"

export default class Account extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user_reviews: [],
            user_data: {},
            movie_posters: undefined
        }
    }

    componentDidMount() {
        this.setState({
            user_data: {
                user_id: parseInt(window.sessionStorage.getItem("userID"))
            }
        }, () => {
            console.log(this.state.user_data)
            fetch(`http://localhost:8080/api/users?user_id=${this.state.user_data.user_id}`)
                .then(res => res.json())
                .then(data => {
                    this.setState({
                        user_data: {
                            ...this.state.user_data,
                            username: data[0][1],
                            fname: data[0][2],
                            lname: data[0][3],
                            street: data[0][4],
                            city: data[0][5],
                            state: data[0][6],
                            zip_code: data[0][7],
                            email: data[0][8],
                            phone: data[0][10],
                            old_password: "",
                            new_password: ""
                        }
                    })
                })
            fetch(`http://localhost:8080/api/reviews/?user_id=${this.state.user_data.user_id}`)
                .then(res => res.json())
                .then(data => {
                    if (Array.isArray(data)) {
                        data.forEach(review => {
                            if (parseInt(this.props.user_id) === review[1]) {
                                this.setState({ userHasReview: true, user_review_id: review[1] })
                            }
                        })
                        console.log("REVIEWS HERE", data)
                        this.setState({
                            user_reviews: data
                        }, () => {
                            this.state.user_reviews.forEach(review => {
                                fetch(`https://api.themoviedb.org/3/movie/${review[2]}?api_key=77c34d76c76368a57135c21fcb3db278`)
                                    .then(res => res.json())
                                    .then(data => {
                                        console.log(data)
                                        let temp_posters;
                                        if (this.state.movie_posters) {
                                            temp_posters = [...this.state.movie_posters];
                                        } else {
                                            temp_posters = []
                                        }
                                        temp_posters.push(data.poster_path);
                                        console.log(temp_posters)
                                        this.setState({
                                            movie_posters: temp_posters,
                                        })
                                    })
                            })
                        });
                    }
                })
        })
    }

    onEmailChange = (evt) => {
        let temp_user_data = { ...this.state.user_data }
        temp_user_data.email = evt.target.value
        this.setState({ user_data: temp_user_data })
    }
    onFNameChange = (evt) => {
        let temp_user_data = { ...this.state.user_data }
        temp_user_data.fname = evt.target.value
        this.setState({ user_data: temp_user_data })
    }
    onLNameChange = (evt) => {
        let temp_user_data = { ...this.state.user_data }
        temp_user_data.lname = evt.target.value
        this.setState({ user_data: temp_user_data })
    }
    onStreetChange = (evt) => {
        let temp_user_data = { ...this.state.user_data }
        temp_user_data.street = evt.target.value
        this.setState({ user_data: temp_user_data })
    }
    onCityChange = (evt) => {
        let temp_user_data = { ...this.state.user_data }
        temp_user_data.city = evt.target.value
        this.setState({ user_data: temp_user_data })
    }
    onStateChange = (evt) => {
        let temp_user_data = { ...this.state.user_data }
        temp_user_data.state = evt.target.value
        this.setState({ user_data: temp_user_data })
    }
    onZipCodeChange = (evt) => {
        let temp_user_data = { ...this.state.user_data }
        temp_user_data.zip_code = evt.target.value
        this.setState({ user_data: temp_user_data })
    }
    onPhoneChange = (evt) => {
        let temp_user_data = { ...this.state.user_data }
        temp_user_data.phone = evt.target.value
        this.setState({ user_data: temp_user_data })
    }
    onOldPassChange = (evt) => {
        let temp_user_data = { ...this.state.user_data }
        temp_user_data.old_password = evt.target.value
        this.setState({ user_data: temp_user_data })
    }
    onNewPassChange = (evt) => {
        let temp_user_data = { ...this.state.user_data }
        temp_user_data.new_password = evt.target.value
        this.setState({ user_data: temp_user_data })
    }
    onUsernameChange = (evt) => {
        let temp_user_data = { ...this.state.user_data }
        temp_user_data.username = evt.target.value
        this.setState({ user_data: temp_user_data })
    }

    validateCredentials = () => {
        var validations = [];
        //STREET
        let streetReg = /^[ \w]{3,}([A-Za-z]\.?)/;
        if (!streetReg.test(this.state.user_data.street)) {
            validations.push({ field: "street", message: "The Street is invalid" })
        }

        //STATE
        let stateReg = /^(?:(A[KLRZ]|C[AOT]|D[CE]|FL|GA|HI|I[ADLN]|K[SY]|LA|M[ADEINOST]|N[CDEHJMVY]|O[HKR]|P[AR]|RI|S[CD]|T[NX]|UT|V[AIT]|W[AIVY]))$/;
        if (!stateReg.test(this.state.user_data.state)) {
            validations.push({ field: "state", message: "The State is invalid" })
        }

        //ZIP CODE
        let zipCodeReg = /^\d{5}$/;
        if (!zipCodeReg.test(this.state.user_data.zip_code)) {
            validations.push({ field: "zip_code", message: "The Zip Code is invalid" })
        }
        //PHONE
        let phoneReg = /^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$/;
        if (!phoneReg.test(this.state.user_data.phone)) {
            validations.push({ field: "phone", message: "The Phone number is invalid" })
        }
        //EMAIL
        let emailReg = /^(?:[A-Za-z0-9!#$%&'*+\-/=?^_`{|}~])(?:\.?[A-Za-z0-9!#$%&'*+\-/=?^_`{|}~]+)+\@(?:[A-Za-z0-9!#$%&'*+\-/=?^_`{|}~]+(?=\.))(?:\.?[A-Za-z0-9!#$%&'*+\-/=?^_`{|}~])+/
        console.log(this.state.user_data.email)
        if (!emailReg.test(this.state.user_data.email)) {
            validations.push({ field: "email", message: "The Email is invalid" })
        }

        return validations;
    }

    renderValidation = valArr => {
        let tempState = { ...this.state };
        for (let i = 0; i < Object.keys(this.state).length; i++) {
            if (Object.keys(tempState)[i].includes("Error")) {
                tempState[Object.keys(tempState)[i]] = undefined;
            }
        }
        this.setState(tempState);

        for (let i = 0; i < valArr.length; i++) {
            let newState = {};
            newState[`${valArr[i].field}Error`] = valArr[i].message;
            this.setState(newState);
        }
    }
    onUpdateUser = () => {
        const errors = this.validateCredentials()
        if(errors.length === 0) {
            this.renderValidation(errors)
            let body = new URLSearchParams({ ...this.state.user_data });
            fetch(`http://localhost:8080/api/users`, {
                method: "PUT",
                body: body
            }).then(res => res.json())
                .then(data => console.log(data))
                .catch(err => {
                    console.log(err)
                    console.log("OHNO")
                })
        } else {
            this.renderValidation(errors)
        }
    }

    handleReview = (evt, i) => {
        let temp_reviews = [...this.state.user_reviews];
        let review = temp_reviews[i];
        review[3] = evt.target.value
        this.setState({ user_reviews: temp_reviews });
    }

    handleRating = (evt, i) => {
        let temp_reviews = [...this.state.user_reviews];
        let review = temp_reviews[i];
        review[4] = evt;
        console.log("New Score", review[4]);
        this.setState({ user_reviews: temp_reviews });
    }

    editReview = (index) => {
        let body = new URLSearchParams({
            review_id: this.state.user_reviews[index][0],
            review_body: this.state.user_reviews[index][3],
            rating: this.state.user_reviews[index][4]
        });

        console.log(body.toString())
        fetch('http://localhost:8080/api/reviews', {
            method: "PUT",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: body
        }).then(res => res.json())
            .then(data => {
                console.log(data)
                this.refreshReviews();
            })
            .catch(console.log)
    }

    refreshReviews = () => {
        if (this.state.user_data.user_id) {
            fetch(`http://localhost:8080/api/reviews/?user_id=${this.state.user_data.user_id}`)
                .then(res => res.json())
                .then(data => {
                    if (Array.isArray(data)) {
                        data.forEach(review => {
                            if (parseInt(this.props.user_id) === review[1]) {
                                this.setState({ userHasReview: true, user_review_id: review[1] })
                            }
                        })
                        this.setState({
                            user_reviews: data
                        });
                    }
                })
        }
    }

    render() {
        return (
            <>
                <div>
                    {this.state.emailError ? <p style={{ color: "#ED4337" }}>{this.state.emailError}</p> : undefined}
                    <label><span style={{ color: "#f00" }}>*</span>Email: </label>
                    <input type="email" value={this.state.user_data.email} onChange={this.onEmailChange} />
                </div>
                <div>
                    <label><span style={{ color: "#f00" }}>*</span>Username: </label>
                    <input type="text" value={this.state.user_data.username} onChange={this.onUsernameChange} />
                </div>
                <div>
                    <label><span style={{ color: "#f00" }}>*</span>First Name: </label>
                    <input type="text" value={this.state.user_data.fname} onChange={this.onFNameChange} />
                </div>
                <div>
                    <label><span style={{ color: "#f00" }}>*</span>Last Name: </label>
                    <input type="text" value={this.state.user_data.lname} onChange={this.onLNameChange} />
                </div>
                <div>
                    {this.state.streetError ? <p style={{ color: "#ED4337" }}>{this.state.streetError}</p> : undefined}
                    <label><span style={{ color: "#f00" }}>*</span>Street: </label>
                    <input type="text" value={this.state.user_data.street} onChange={this.onStreetChange} />
                </div>
                <div>
                    <label><span style={{ color: "#f00" }}>*</span>City: </label>
                    <input type="text" value={this.state.user_data.city} onChange={this.onCityChange} />
                </div>
                <div>
                    {this.state.stateError ? <p style={{ color: "#ED4337" }}>{this.state.stateError}</p> : undefined}
                    <label><span style={{ color: "#f00" }}>*</span>State: </label>
                    <input type="text" value={this.state.user_data.state} onChange={this.onStateChange} />
                </div>
                <div>
                    {this.state.zip_codeError ? <p style={{ color: "#ED4337" }}>{this.state.zip_codeError}</p> : undefined}
                    <label><span style={{ color: "#f00" }}>*</span>Zip Code: </label>
                    <input type="text" value={this.state.user_data.zip_code} onChange={this.onZipCodeChange} />
                </div>
                <div>
                    {this.state.phoneError ? <p style={{ color: "#ED4337" }}>{this.state.phoneError}</p> : undefined}
                    <label><span style={{ color: "#f00" }}>*</span>Phone: </label>
                    <input type="phone" value={this.state.user_data.phone} onChange={this.onPhoneChange} />
                </div>
                <div>
                    <label><span style={{ color: "#f00" }}>*</span>Current Password: </label>
                    <input type="password" value={this.state.user_data.old_password} onChange={this.onOldPassChange} />
                </div>
                <div>
                    <label>New Password: </label>
                    <input type="password" value={this.state.user_data.new_password} onChange={this.onNewPassChange} />
                </div>
                <button onClick={this.onUpdateUser}>Update</button>

                <ReviewList movie_posters={this.state.movie_posters} editReview={this.editReview} handleRating={this.handleRating} handleReview={this.handleReview} reviews={this.state.user_reviews} user_review_id={this.state.user_data.user_id} refreshReviews={this.refreshReviews} />
            </>
        );
    }
}