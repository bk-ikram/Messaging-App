import { postSignUp } from '../../api/requests';

export default function SignUp(user){

    const isLoggedIn = Object.keys(user).length > 0;

    return (
        <>

            <h2>Register a new account</h2>
            <form action="/signup" method="post">
                <p>
                    <label >First Name:</label>
                    <input name="firstname" type="text" minLength="5" maxLength="30" required />
                </p>
                <p>
                    <label >Last Name:</label>
                    <input name="lastname" type="text" minLength="5" maxLength="30" required/>
                </p>
                <p>
                    <label >Username:</label>
                    <input name="username" type="text" minLength="5" maxLength="30" required/>
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

