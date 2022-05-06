// Packages
import React, { useState, useContext, useEffect } from "react"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import { Font, Form, Input, Alert, Autocomplete } from "tsx-library-julseb"
import { getRandomString, passwordRegex } from "ts-utils-julseb"

// API
import { AuthContext } from "../../context/auth"
import authService from "../../api/auth.service"

// Components
import Page from "../../components/layouts/Page"

const Signup = () => {
    const { loginUser } = useContext(AuthContext)
    const navigate = useNavigate()

    // Get all cities
    const [allCities, setAllCities] = useState([])
    const [filteredCities, setFilteredCities] = useState("")

    useEffect(() => {
        axios
            .get(
                "https://raw.githubusercontent.com/JulSeb42/js-utils/master/src/allCities.json"
            )
            .then(res =>
                setAllCities(
                    res.data.map(city => `${city.name}, ${city.country}`)
                )
            )
            .catch(err => console.log(err))
    }, [])

    console.log(allCities)

    // Form items
    const [inputs, setInputs] = useState({
        fullName: "",
        email: "",
        password: "",
    })
    const [city, setCity] = useState("")
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

    const handleFilterLocation = e => {
        setCity(e.target.value)
        setFilteredCities(e.target.value)
    }

    let resultsCities = allCities.filter(city => {
        return city.toLowerCase().includes(filteredCities.toLowerCase())
    })

    const handleClickSuggestion = e => {
        setCity(e.target.innerText)
    }

    // Submit form
    const handleSubmit = e => {
        e.preventDefault()

        const requestBody = {
            ...inputs,
            city,
            verifyToken: getRandomString(20),
        }

        authService
            .signup(requestBody)
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
        <Page title="Sign up" template="form">
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

                <Autocomplete
                    label="City"
                    id="city"
                    onChange={handleFilterLocation}
                    value={city}
                    items={resultsCities}
                    onMouseDown={handleClickSuggestion}
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
