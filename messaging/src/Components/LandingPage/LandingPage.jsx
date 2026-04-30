export default function LandingPage(){

    return (
        <>
            <header>
                <span id={styles.logo}>
                    Heyyyyah
                </span>
                <div className={styles.authOptions}>
                    <button>
                        Sign In
                    </button>
                    <button>
                        Sign Up
                    </button>
                </div>
            </header>
            <main>
                <h1>Welcome to heyyyyah</h1>
                <h2>The place where you get in touch with randos.</h2>
                <button>Get Connecting!</button>
            </main>
        </>
    )
}