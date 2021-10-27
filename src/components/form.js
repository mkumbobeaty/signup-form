import logo from '../asserts/logo.png';

const SignInForm = () => {
    return (
        <>
            <div className="signInForm">
                <img src={logo} className="logo" alt="logo" />
                <h1>Sign Up with email</h1>
            </div>
        </>
    );
}

export default SignInForm;