import { postSignUp } from '../../api/requests';
import {useContext} from "react";

import { AuthContext } from '../App/App'


export default function SignUp(){
    
    const { setUser, setToken, apiFetch } = useContext(AuthContext);
    
    async function handleSignup(e){
        console.log("signup handler entered");
        e.preventDefault();
        const formData = new FormData(e.target);
        const formJson = Object.fromEntries(formData.entries());
        console.log("The json data is", formJson);
        try{
            const response = await postSignUp(apiFetch, formJson);
            const { token, user } = ( response || {});
            if(token){
                setToken(token);
                localStorage.setItem("messagingToken", token);
                localStorage.setItem("messagingUser", JSON.stringify(user));
                setUser(user);
            }
        }
        catch(err){
            console.error(err.message);
        }

        return;
    }
    return (
        <>

            <h2>Register a new account</h2>
            <form onSubmit={handleSignup}>
                <p>
                    <label >Username:</label>
                    <input name="username" type="text" minLength="5" maxLength="30" required/>
                </p>
                <p>
                    <label >Email:</label>
                    <input name="email" type="email" minLength="5" maxLength="30" required/>
                </p>
                <p>
                    <label >Password:</label>
                    <input name="password" type="password" minLength="5" maxLength="30" required/>
                </p>
                <p>
                    <label >Confirm Password:</label>
                    <input name="conf-password" type="password" minLength="5" maxLength="30" required/>
                </p>
                <button type="submit">Register</button>
        </form>
        </>
    ) 
}

/**/