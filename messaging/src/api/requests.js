

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

    return res.json();
}

async function postSignUp(apiFetch){
    //return apiFetch("/api/posts");
}


export {
    getPosts,
    postLogin,
    postSignUp
};