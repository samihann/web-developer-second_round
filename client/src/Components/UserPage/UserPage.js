import React, {useEffect, useState}  from 'react';
import Navbar from '../Navbar/Navbar'
import axios from 'axios';
import {Table, Form, FormControl, FormGroup, DropdownButton, Dropdown, Button} from 'react-bootstrap'


export default function UserPage() {
    var [users, setUsers]= useState([])
    var [data, setData]= useState([])
    var [id, setId]= useState("")
    var [isUserSelected, setisUserSelected]= useState(false)
    var [userSelected, setUserSelected]= useState({})
    var [publication, setPublications]= useState([])
    var [title, setTitle] = useState("")
    var [year, setYear] = useState("")
    var [selectedAction, setSelectedAction] = useState("")
    var [addSuccess, setAddSuccess] = useState(false)
    var [updateSuccess, setUpdateSuccess] = useState(false)
    var [deleteSuccess, setDeleteSuccess] = useState(false)
    function selectUser(user) {
        console.log(user, "selected")
        setisUserSelected(true)
        
        data.map(item => {
            console.log(item, user)
            if (item.first_name===user){
                setUserSelected(item)
            }
        })
        console.log("userSlected",userSelected)
        axios.post("http://localhost:5000/publications/user",{'user': user})
        .then(response => {
            console.log(response.data,"for user")
            setPublications(response.data)
        })
        .catch(error => {
            console.log(error);
          });
    }

    const update = () => {
        setSelectedAction("update")
    }

    const create = () => {
        setSelectedAction("create")

    }

    const rowdelete = () => {
        setSelectedAction("delete")
    }

    useEffect(() => {
        console.log("in here")
      axios.get('http://localhost:5000/users/all')
      .then(response => {
        console.log(response.data)
        var data = response.data
        setData(response.data)
        var temp = []
        data.map(item => {
            temp.push(item.first_name)
        })
        setUsers(temp)
    
        })
      .catch(error => {
        console.log(error);
      });
      }, []);

      function updateTitle(e){
        e.preventDefault()
        setTitle(e.target.value)
        console.log(title)
      }

      function updateID(e){
        e.preventDefault()
        setId(e.target.value)
        console.log(title)
      }

      function updateYear(e){
        e.preventDefault()
        setYear(e.target.value)
        console.log(year)
      }

      const addEntry = () => {
        axios.post("http://localhost:5000/publications/user/add",{'userId': userSelected.id, 'title': title, 'year': year})
        .then(response => {
            setAddSuccess(true)
        })
        .catch(error => {
            console.log(error);
          });
      }

      const UpdateEntry = () => {
        axios.post("http://localhost:5000/publications/user/update",{'id': id, 'title': title, 'year': year})
        .then(response => {
            setUpdateSuccess(true)
        })
        .catch(error => {
            console.log(error);
          });
      }

      const UpdateDelete = () => {
        axios.post("http://localhost:5000/publications/user/delete",{'id': id})
        .then(response => {
            setDeleteSuccess(true)
        })
        .catch(error => {
            console.log(error);
          });
      }

  return (
      <>
        <Navbar/>
        {console.log("userpage")}
      <div className='UserWrapper' >
          <div className='UserContent'>
          <DropdownButton id="dropdown-basic-button" title="Choose Action: ">
              {users.map(item=> {
                  return(<Dropdown.Item as="button" onClick={e => selectUser(item)}>{item}</Dropdown.Item>)
              })}
            </DropdownButton>
          </div>
          {isUserSelected && (
              <>
              <span>{userSelected.first_name} has been selected.</span>
              <Table>
            <thead>
              <tr>
                <th>ID</th>
              <th>Title</th>
              <th>Year</th>
              </tr>
            </thead>
            <tbody>
            {publication.map(item => {
              return(
                <tr>
                <td>{item.id}</td>
                  <td>{item.title}</td>
                  <td>{item.year}</td>
                </tr>
              )
            })
            }
            </tbody>
          </Table>
            <span>Please Select the action to be taken.</span>
          <DropdownButton id="dropdown-basic-button" title="Choose Action:">
              <Dropdown.Item onClick={create}>Add Publication</Dropdown.Item>
              <Dropdown.Item onClick={rowdelete}>Delete Publication</Dropdown.Item>
              <Dropdown.Item onClick={update}>Update Publication</Dropdown.Item>
            </DropdownButton>
          
          {selectedAction==='create' && (
              <>
              <span>Please Input values</span>
              <Form>
                  <FormGroup className="mb-3">
                  <Form.Label>Title</Form.Label>
                  <Form.Control type="text" onChange={e=>updateTitle(e)}/>
                  <Form.Label>Year</Form.Label>
                  <Form.Control type="text" onChange={e=>updateYear(e)}/>
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

        {selectedAction==='update' && (
              <>
              <span>Please Input values</span>
              <Form>
                  <FormGroup className="mb-3">
                  <Form.Label>ID of Publication to Update</Form.Label>
                  <Form.Control type="text" onChange={e=>updateID(e)}/>
                  <Form.Label>Title</Form.Label>
                  <Form.Control type="text" onChange={e=>updateTitle(e)}/>
                  <Form.Label>Year</Form.Label>
                  <Form.Control type="text" onChange={e=>updateYear(e)}/>
                  <Button className="" variant="secondary" onClick={UpdateEntry}>
                    Submit
                </Button>
                  </FormGroup>
              </Form>
              {updateSuccess && (
                  <span>
                      The Entry is Updated!!
                  </span>
              )}
              </>
          )}

        {selectedAction==='delete' && (
              <>
              <span>Please Select the entry to delete </span>
              <Form>
                  <FormGroup className="mb-3">
                  <Form.Label>ID of Publication to delete</Form.Label>
                  <Form.Control type="text" onChange={e=>updateID(e)}/>
                  <Button className="" variant="secondary" onClick={UpdateDelete}>
                    Submit
                </Button>
                  </FormGroup>
              </Form>
              {deleteSuccess && (
                  <span>
                      The Entry is Deleted!!
                  </span>
              )}
              </>
          )}
          </>
          )}
      </div>
      </>
  );
}