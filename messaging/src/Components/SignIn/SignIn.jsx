import { postLogin } from '../../api/requests';
import { useContext } from 'react';
import { AuthContext } from '../App/App'



async function handleLogIn(e, setUser, setToken){
    e.preventDefault(); //prevent page refresh
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    try{
        const response = await postLogin(formJson);
        const { token, user } = ( response || {});
        if(token){
            setToken(token);
            localStorage.setItem("odinBlogToken", token);
            localStorage.setItem("odinBlogUser",JSON.stringify(user));
            setUser(user);
        }
    }
    catch(err){
        console.error(err.message);
    }
    
    return;
}

export default function SignIn(user){
    const { setUser, setToken} = useContext(AuthContext);
    const isLoggedIn = Object.keys(user).length > 0;

    return (
        <>

            <form onSubmit={(e) => handleLogIn(e,setUser, setToken)}>
                <p>
                    <label htmlFor="username">Username:  </label>
                    <input name="username" id="username" type="text" />
                </p>
                <p>
                    <label htmlFor="password">Password:  </label>
                    <input name="password" id="password" type="password" />
                </p>
                <button type="submit">Log In</button>
            </form>
        </>
    ) 
}