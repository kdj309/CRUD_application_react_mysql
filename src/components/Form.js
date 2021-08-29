import React, { useState, useEffect } from 'react'
import axios from 'axios'
export default function Form() {
    const [Name, setName] = useState("")
    const [Email, setEmail] = useState("")
    const [PhoneNumber, setPhoneNumber] = useState("")
    const [users, setusers] = useState([])
    const [updatecondition, setupdatecondition] = useState(false)
    function fetchusers() {
        axios.get("http://localhost:3001/api/select").then((data) => {
            console.log(data.data)
            setusers(data.data)
        }).catch((error) => {
            console.log(error)
        })
    }
    function submithandler() {
        //e.preventDefault()
        axios.post('http://localhost:3001/api/insert', { Username: Name, Useremail: Email, Usernumber: PhoneNumber }).then(() => {
            console.log("successfuly inserted")
            fetchusers()
        }).catch((error) => {
            console.log(error)
        })
        setName(" ")
        setEmail(" ")
        setPhoneNumber(" ")
    }
    function deletehandler(index) {
        axios.delete(`http://localhost:3001/api/delete/${index}`).then(() => {
            console.log("deleted successfully")
            fetchusers()
        }).catch((error) => {
            console.log(error)
        })

    }
    function updatehandler() {
        let index = document.getElementById("hidden").value
        console.log(index)
        axios.post(`http://localhost:3001/api/update`, { Userid: index, NewUsername: Name, NewUseremail: Email, Newphoneno: PhoneNumber }).then(() => {
            console.log("successfuly updated")
            setupdatecondition((previous) => !previous)
            fetchusers()
        }).catch((error) => {
            console.log(error)
        })
        setName(" ")
        setEmail(" ")
        setPhoneNumber(" ")
    }
    function updatebtn(id, username, useremail, usernumber) {
        setName(username)
        setEmail(useremail)
        setPhoneNumber(usernumber)
        setupdatecondition(true)
        document.getElementById("hidden").value = id
    }
    function sorthandler() {
        axios.get("http://localhost:3001/api/sort").then((data) => {
            console.log(data.data)
            setusers(data.data)
        }).catch((error) => {
            console.log(error)
        })
    }
    useEffect(() => {
        fetchusers()
    }, [])
    //http://localhost:3001/
    return (
        <>
            <h1 className="display-3 my-3 text-center" >Contact List</h1>
            <div className="container border border-dark py-4 px-3">
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={Email} onChange={(e) => { setEmail(e.target.value) }} id="exampleInputEmail1" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Name</label>
                    <input type="text" className="form-control" value={Name} onChange={(e) => { setName(e.target.value) }} id="exampleInputPassword1" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">phone Number</label>
                    <input type="number" className="form-control" value={PhoneNumber} onChange={(e) => { setPhoneNumber(e.target.value) }} id="exampleInputPassword1" />
                </div>
                <input type="hidden" id="hidden" />
                {
                    updatecondition ? <button onClick={updatehandler} type="button" className="btn btn-primary">update</button> : <button onClick={submithandler} type="button" className="btn btn-primary">Submit</button>
                }
            </div>
            <div className="container-fluid my-3 py-3 px-2">
                <h4 className="display-6">Here the list goes</h4>
                <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" onClick={sorthandler} />
                    <label class="form-check-label" for="flexSwitchCheckDefault">sort by name</label>
                </div>
                <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">No.</th>
                                <th scope="col">Name</th>
                                <th scope="col">Eamil</th>
                                <th scope="col">Phone No</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => {
                                return (
                                    <>
                                        <tr key={index}>
                                            <th scope="row">{index + 1}</th>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                            <td>{user.number}</td>
                                            <td><div className="d-flex justify-content-evenly">
                                                <button onClick={() => { deletehandler(user.id) }} className="btn btn-danger my-2">Delete</button>
                                                <button onClick={() => updatebtn(user.id, user.name, user.email, user.number)} className="btn btn-primary my-2">Edit</button>
                                            </div></td>
                                        </tr>
                                    </>
                                )
                            })

                            }


                        </tbody>
                    </table>
                </div>

            </div>
        </>
    )
}
