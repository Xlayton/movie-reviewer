import React from 'react'


class AdminTools extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      users: [],
      currentId: NaN,
      confirmDelete:false,
    }
  }


  componentDidMount() {
    this.getUsers();
    let currentId = parseInt(window.sessionStorage.getItem("userID"));
    // console.log(currentId)
    this.setState({
      currentId: currentId
    })
  }

  getUsers() {
    fetch('http://localhost:8080/api/users', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data) {
          console.log(data.length)
          this.setState({
            users: data
          })
        }
      })
  }

  deleteUser(id){
    // console.log(this.state.confirmDelete)
    if(this.state.confirmDelete){
      document.getElementById(id).innerHTML="Deleted";
      this.setState({
        confirmDelete:false
      })
      console.log(id);
      fetch('http://localhost:8080/api/users', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: new URLSearchParams({
          id: id,
        })
      })
      .then(res => res.json())
      .then(data => {
        if (data) {
          // console.log(data);
          this.getUsers();
        }
      })
    }
    else{
      document.getElementById(id).innerHTML="Confirm Delete";
      document.getElementById(id).style.backgroundColor="red";
      document.getElementById(id).style.color="white";
      this.setState({
        confirmDelete:true
      })
      setTimeout(()=>{
        if(document.getElementById(id)){
          this.setState({
            confirmDelete:false
          }, ()=>{
            document.getElementById(id).innerHTML="Delete User";
            document.getElementById(id).style.backgroundColor="";
            document.getElementById(id).style.color="";
          })
        }
      }, 3000)
    }
  }

  makeAdmin(id, isAdmin) {
    console.log(id, isAdmin);
    fetch('http://localhost:8080/api/admin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: new URLSearchParams({
        id: id,
        isAdmin: isAdmin,
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data) {
          console.log(data);
          this.getUsers();
        }
      })
  }

  render() {
    return (
      <div>
        <div className="userList">

          {this.state.users.map(user => (
            <div className="userRow" key={user[0]}>
              <p className="userAttribute">{user[0]}</p>
              <p className="userAttribute">{user[1]}</p>
              <p className="userAttribute">{user[2]}</p>
              <p className="userAttribute">{user[3]}</p>
              <p className="userAttribute">{user[8]}</p>
              <p className="userAttribute">{user[10]}</p>
              {user[11] === 1 ? (<p className="userAttribute">Admin</p>) : (<p className="userAttribute">User</p>)}
              {/* Ignore user one because this is the common test user */}
              {this.state.currentId !== user[0] && user[0]!==1?
                <>
                  <button id={user[0]} onClick={()=>this.deleteUser(user[0])}>Delete User</button>
                  <button onClick={() => { this.makeAdmin(user[0], (user[11] === 1)) }}>Toggle Admin</button>
                </>
                : ""}
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default AdminTools