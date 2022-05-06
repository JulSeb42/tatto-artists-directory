// Packages
import React, { useState, useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Font, Form, Input, Alert } from "tsx-library-julseb"

// API
import { AuthContext } from "../../context/auth"
import authService from "../../api/auth.service"

// Components
import Page from "../../components/layouts/Page"

const Login = () => {
    const { loginUser } = useContext(AuthContext)
    const navigate = useNavigate()

    // Form items
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
    })
    const [errorMessage, setErrorMessage] = useState("")

    // Form handles
    const handleChange = e => setInputs({ ...inputs, [e.target.id]: e.target.value})

    // Submit form
    const handleSubmit = e => {
        e.preventDefault()

        authService
            .login(inputs)
            .then(res => {
                loginUser(res.data.authToken)
                navigate(-1)
            })
            .catch(err => {
                const errorDescription = err.response.data.message
                setErrorMessage(errorDescription)
            })
    }

    return (
        <Page title="Login" template="form">
            <Font.H1>Log in</Font.H1>

            <Form btnPrimary="Login" onSubmit={handleSubmit}>
                <Input
                    label="Email"
                    id="email"
                    type="email"
                    onChange={handleChange}
                    value={inputs.email}
                    autoFocus
                />

                <Input
                    label="Password"
                    id="password"
                    password
                    iconPassword
                    onChange={handleChange}
                    value={inputs.password}
                />
            </Form>

            {errorMessage && (
                <Alert as={Font.P} color="danger">
                    {errorMessage}
                </Alert>
            )}

            <Font.P>
                <Link to="/login/forgot-password">I forgot my password.</Link>
            </Font.P>

            <Font.P>
                You don't have an account? <Link to="/signup">Sign up</Link>.
            </Font.P>
        </Page>
    )
}

export default Login
