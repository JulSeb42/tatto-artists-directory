// Imports
import React, { useState, useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Font, Form, Input, Alert } from "tsx-library-julseb"
import { passwordRegex } from "js-utils-julseb"

import { AuthContext } from "../../context/auth"
import authService from "../../api/auth.service"

import Page from "../../components/layouts/Page"

const Signup = () => {
    const { loginUser } = useContext(AuthContext)
    const navigate = useNavigate()

    // Form items
    const [inputs, setInputs] = useState({
        fullName: "",
        email: "",
        password: "",
    })
    const [validation, setValidation] = useState("not-passed")
    const [errorMessage, setErrorMessage] = useState(undefined)

    // Form handles
    const handleChange = e => {
        setInputs({
            ...inputs,
            [e.target.id]: e.target.value,
        })

        if (e.target.id === "password" && passwordRegex.test(e.target.value)) {
            setValidation("passed")
        } else {
            setValidation("not-passed")
        }
    }

    // Submit form
    const handleSubmit = e => {
        e.preventDefault()

        authService
            .signup(inputs)
            .then(res => {
                loginUser(res.data.authToken)
                navigate("/thank-you")
            })
            .catch(err => {
                const errorDescription = err.response.data.message
                setErrorMessage(errorDescription)
            })
    }

    return (
        <Page title="Sign up" mainWidth={400}>
            <Font.H1>Create an account</Font.H1>

            <Form btnPrimary="Create your account" onSubmit={handleSubmit}>
                <Input
                    label="Full name"
                    id="fullName"
                    onChange={handleChange}
                    value={inputs.fullName}
                    autoFocus
                />

                <Input
                    label="Email"
                    id="email"
                    type="email"
                    onChange={handleChange}
                    value={inputs.email}
                />

                <Input
                    label="Password"
                    id="password"
                    password
                    iconPassword
                    onChange={handleChange}
                    value={inputs.password}
                    validationText="Password must be at least 6 characters long and must contain at least one number, one lowercase and one uppercase letter."
                    validation={validation}
                />
            </Form>

            {errorMessage && (
                <Alert as={Font.P} color="danger">
                    {errorMessage}
                </Alert>
            )}

            <Font.P>
                You already have an account? <Link to="/login">Log in</Link>.
            </Font.P>
        </Page>
    )
}

export default Signup
