import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'

class App extends Component {
  constructor(){
    super()
    this.state= {
      students: []
    }
  }

  componentDidMount(){
    axios.get('http://localhost:3000/getStudents')
    .then((response)=>{
      console.log(response)
      this.setState({
        students: response.data
      })
    });
  }

  handleSubmit(event){
    event.preventDefault();
    var studentName = document.getElementById("new-student").value;
    // console.dir(event.target)
    // we want to sent student name to server!!!
    // we CANNOT use get request....we need to use post!
    // there is an axios.post and there is just axios and then you hand it all the info ({})
    // axios always returns a promise,
    // so we will send data to the express server and wait for a json response
    // when we get it we will move forward
    axios({
      method: 'POST',
      url: "http://localhost:3000/addStudent",
      data: {
        //get this by req.body.studentName
        studentName: studentName
      }
    }).then((data)=>{
      console.log(data)
    })
  }


  render() {
    var studentsArray = this.state.students.map((student,index)=>{
      return(<li key={index}>{student.name}</li>)
    })
    return (
      <div className="App">
        <form onSubmit={this.handleSubmit}>
          <input type="text" id="new-student" placeholder="new student name" />
          <button type="submit">Add student</button>
        </form>
        <ul>
          {studentsArray}
        </ul>
      </div>
    );
  }
}

export default App;
