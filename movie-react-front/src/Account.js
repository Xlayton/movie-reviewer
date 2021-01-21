import React from "react"

export default class Account extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user_reviews: [],
            user_data: {}
        }
    }

    componentDidMount() {
        this.setState({
            user_data: {
                user_id: window.sessionStorage.getItem("userID")
            }
        }, () => {
            fetch(`http://localhost:8080/api/reviews?user_id=${this.state.user_data.user_id}`)
                .then(res => res.json())
                .then(data => this.setState({ user_reviews: data }))
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
                })})
        })
    }

    onEmailChange = (evt) => {
        let temp_user_data = {...this.state.user_data}
        temp_user_data.email = evt.target.value
        this.setState({user_data: temp_user_data})
    }
    onFNameChange = (evt) => {
        let temp_user_data = {...this.state.user_data}
        temp_user_data.fname = evt.target.value
        this.setState({user_data: temp_user_data})
    }
    onLNameChange = (evt) => {
        let temp_user_data = {...this.state.user_data}
        temp_user_data.lname = evt.target.value
        this.setState({user_data: temp_user_data})
    }
    onStreetChange = (evt) => {
        let temp_user_data = {...this.state.user_data}
        temp_user_data.street = evt.target.value
        this.setState({user_data: temp_user_data})
    }
    onCityChange = (evt) => {
        let temp_user_data = {...this.state.user_data}
        temp_user_data.city = evt.target.value
        this.setState({user_data: temp_user_data})
    }
    onStateChange = (evt) => {
        let temp_user_data = {...this.state.user_data}
        temp_user_data.state = evt.target.value
        this.setState({user_data: temp_user_data})
    }
    onZipCodeChange = (evt) => {
        let temp_user_data = {...this.state.user_data}
        temp_user_data.zip_code = evt.target.value
        this.setState({user_data: temp_user_data})
    }
    onPhoneChange = (evt) => {
        let temp_user_data = {...this.state.user_data}
        temp_user_data.phone = evt.target.value
        this.setState({user_data: temp_user_data})
    }
    onOldPassChange = (evt) => {
        let temp_user_data = {...this.state.user_data}
        temp_user_data.old_password = evt.target.value
        this.setState({user_data: temp_user_data})
    }
    onNewPassChange = (evt) => {
        let temp_user_data = {...this.state.user_data}
        temp_user_data.new_password = evt.target.value
        this.setState({user_data: temp_user_data})
    }
    onUsernameChange = (evt) => {
        let temp_user_data = {...this.state.user_data}
        temp_user_data.username = evt.target.value
        this.setState({user_data: temp_user_data})
    }
    onUpdateUser = () => {
        let body = new URLSearchParams({...this.state.user_data});
        console.log(body.toString())
        fetch(`http://localhost:8080/api/users`, {
            method: "PUT",
            body: body
        }).then(res => res.json())
        .then(data => console.log(data))
        .catch(err => {
            console.log(err)
            console.log("OHNO")
        })
    }

    render() {
        return (
            <>
                <div>
                    <label><span style={{color: "#f00"}}>*</span>Email: </label>
                    <input disabled type="email" value={this.state.user_data.email} onChange={this.onEmailChange} />
                </div>
                <div>
                    <label><span style={{color: "#f00"}}>*</span>Username: </label>
                    <input type="text" value={this.state.user_data.username} onChange={this.onUsernameChange} />
                </div>
                <div>
                    <label><span style={{color: "#f00"}}>*</span>First Name: </label>
                    <input type="text" value={this.state.user_data.fname} onChange={this.onFNameChange} />
                </div>
                <div>
                    <label><span style={{color: "#f00"}}>*</span>Last Name: </label>
                    <input type="text" value={this.state.user_data.lname} onChange={this.onLNameChange} />
                </div>
                <div>
                    <label><span style={{color: "#f00"}}>*</span>Street: </label>
                    <input type="text" value={this.state.user_data.street} onChange={this.onStreetChange} />
                </div>
                <div>
                    <label><span style={{color: "#f00"}}>*</span>City: </label>
                    <input type="text" value={this.state.user_data.city} onChange={this.onCityChange} />
                </div>
                <div>
                    <label><span style={{color: "#f00"}}>*</span>State: </label>
                    <input type="text" value={this.state.user_data.state} onChange={this.onStateChange} />
                </div>
                <div>
                    <label><span style={{color: "#f00"}}>*</span>Zip Code: </label>
                    <input type="text" value={this.state.user_data.zip_code} onChange={this.onZipCodeChange} />
                </div>
                <div>
                    <label><span style={{color: "#f00"}}>*</span>Phone: </label>
                    <input type="phone" value={this.state.user_data.phone} onChange={this.onPhoneChange} />
                </div>
                <div>
                    <label><span style={{color: "#f00"}}>*</span>Current Password: </label>
                    <input type="password" value={this.state.user_data.old_password} onChange={this.onOldPassChange} />
                </div>
                <div>
                    <label>New Password: </label>
                    <input type="password" value={this.state.user_data.new_password} onChange={this.onNewPassChange} />
                </div>
                <button onClick={this.onUpdateUser}>Update</button>
            </>
        );
    }
}