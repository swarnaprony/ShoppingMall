import React, {useState, useEffect} from "react";
import Footer from "./Footer";
import Header from "./Header";

function App() {

    const [users, setUsers] = useState([{
        username: "",
        email: "",
        password: ""
    }])

    //GET Method
    useEffect(() => {
        fetch("http://localhost:4000")
        .then(res => res.json()
        .then(data => {
            setUsers(data)
        })
        .catch((err) => {
            console.log(err.message);
        })
        );
    },[]);

    //Post Method
    const addUsers = async(newUser) => {
        await fetch("http://localhost:4000", {
            method: "POST",
            body: JSON.stringify({
                username: newUser.username,
                email: newUser.email,
                password: newUser.password
            }),
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
            },
        })
        .then((response) => response.json())
        .then((data) => {
            setUsers((prevValue) => [data, ...prevValue]);
        })
        .catch((err) => {
            console.log(err.message);
        });
    };

    const [newUser, setNewUser] = useState({
        username: "",
        email: "",
        password: ""
    })
    
    const handleChange= (event) => {
        const {name, value} = event.target;
        setNewUser((preValue) => {
            return {
                ...preValue, [name]:value
        }});
        console.log(newUser)

    }
    
    const handleSubmit = (event) => {
        addUsers(newUser);
        event.preventDefault();
    };


    return (
        <div>
            <Header />
            <form className="form">
                <input type="text" name="username" onChange={handleChange} value={users.username} placeholder="Username" />
                <input type="email" name="email" onChange={handleChange} value={users.email} placeholder="E-Mail" />
                <input type="password" name="password" onChange={handleChange} value={users.password} placeholder="Password" />
                <button type="submit" onClick={handleSubmit}>Submit</button>
            </form>
            <Footer />
        </div>
    )
}

export default App;