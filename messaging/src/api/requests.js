

async function getPosts(apiFetch){
    return apiFetch("/api/posts");
}

async function postLogin(formJson){
    const res = await fetch("/api/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formJson),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) throw new Error(data.message || "Login failed");

    return data;
}

async function postSignUp(apiFetch, formJson){
    //return apiFetch("/api/posts");
    const res = await fetch("/api/signup",{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formJson),
    });
    
    const data = await res.json().catch(() => ({}));

    if (!res.ok) throw new Error(data.message || "Signup failed");

    return data;
}


export {
    getPosts,
    postLogin,
    postSignUp
};