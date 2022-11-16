import React, { useState ,useEffect}  from "react";
import Footer from "../Footer";

function Register(
) {

    // Creating newUser in Backend
    const addUsers = async(newUser) => {
        await fetch("http://localhost:4000/users", {
            method: "POST",
            body: JSON.stringify(newUser),
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
        })
        .then(handleResponse)
        .catch(handleError)
    };

    function handleError(err) {
            console.log(err)
    }

    function handleResponse(response) {
        console.log(JSON.stringify(response.json()))
    }

    const [newUser, setNewUser] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const handleChange = (event) => {
        const {name, value} = event.target;
        setNewUser((prevValue) => {
            return {
                ...prevValue, [name]:value
            }
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        addUsers(newUser);
        
    }
    return (
        <div>
            <form className="form">                   
                <ul>
                    <input type="text" name="username" placeholder="Username" value={newUser.username} onChange={handleChange}/>
                </ul>
                <ul>
                    <input type="email" name="email" placeholder="E-Mail" value={newUser.email} onChange={handleChange}/>
                </ul>
                <ul>
                    <input type="password" name="password" placeholder="Password" value={newUser.password} onChange={handleChange}/>
                </ul>
                <ul>
                    <input type="password" name="confirmPassword" placeholder="Confirm Password" value={newUser.confirmPassword} onChange={handleChange}/>
                </ul>
                <ul>
                    <button type="submit" onClick={handleSubmit}>Submit</button>
                </ul>
            </form>
            <Footer />
        </div>
    )
}

export default Register;
