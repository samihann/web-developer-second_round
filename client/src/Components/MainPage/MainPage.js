import React, {useEffect, useState} from 'react';
import Navbar from '../Navbar/Navbar'
import axios from 'axios';
import {Table, Form, FormControl, FormGroup, DropdownButton, Dropdown, Button} from 'react-bootstrap'
import './mainpage.css'

export default function MainPage() {
  var [users, setUsers] = useState([])
  var [action, setAction] = useState("")
  var [email, setEmail] = useState("")
  var [firstName, setFirstName] = useState("")
  var [lastName, setLastName] = useState("")
  var [addSuccess, setAddSuccess] = useState(false)
  const createUser = () => {
    setAction("create")
  }

  const deleteUser = () => {
    setAction("delete")
  }

  useEffect(() => {
    console.log("in here")
  axios.get('http://localhost:5000/users/all')
  .then(response => {
    console.log(response.data)
    var data = response.data
    setUsers(data)

    })
  .catch(error => {
    console.log(error);
  });
  }, []);

  function updateEmail(e){
    e.preventDefault()
    setEmail(e.target.value)
  }

  function updateFirstName(e){
    e.preventDefault()
    setFirstName(e.target.value)
  }

  function updateLastName(e){
    e.preventDefault()
    setLastName(e.target.value)
  }

  const addEntry = () => {
    axios.post("http://localhost:5000/users/add",{'email': email, 'first': firstName, 'last': lastName})
    .then(response => {
        setAddSuccess(true)
    })
    .catch(error => {
        console.log(error);
      });
  }

  return (
    <>
    <Navbar/>
      <div className='MainWrapper' >
          {console.log("Mainpage")}
          <div className='MainContent'>
          <div className='MainTable'>
          <Table>
          <thead>
              <tr>
              <th>ID</th>
              <th>Email</th>
              <th>First Name</th>
              <th>Last Name</th>
              </tr>
            </thead>
            <tbody>
            {users.map(item => {
              return(
                <tr>
                  <td>{item.id}</td>
                  <td>{item.email}</td>
                  <td>{item.first_name}</td>
                  <td>{item.last_name}</td>
                </tr>
              )
            })
            }
            </tbody>
          </Table>
          </div>
          </div>
          <div className='MainAction'>
            <DropdownButton id="dropdown-basic-button" title="Choose Action: ">
              <Dropdown.Item onClick={createUser}>Create User</Dropdown.Item>
            </DropdownButton>
          </div>
          {action=="create" && (
            <>
            <span>Please Input values</span>
            <Form>
                <FormGroup className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="text" onChange={e=>updateEmail(e)}/>
                <Form.Label>FirstName</Form.Label>
                <Form.Control type="text" onChange={e=>updateFirstName(e)}/>
                <Form.Label>LastName</Form.Label>
                <Form.Control type="text" onChange={e=>updateLastName(e)}/>
                <Button className="" variant="secondary" onClick={addEntry}>
                  Submit
              </Button>
                </FormGroup>
            </Form>
            {addSuccess && (
                <span>
                    The Entry is added!!
                </span>
            )}
            </>
          )}
      </div>
      </>
  );
}
