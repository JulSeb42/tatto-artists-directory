// Imports
import React, { useContext, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { Font, Form, Input, Alert } from "tsx-library-julseb"

// API
import { AuthContext } from "../../context/auth"
import userService from "../../api/user.service"

// Components
import Page from "../../components/layouts/Page"
import DangerZone from "../../components/DangerZone"

const EditAccount = ({ edited, setEdited }) => {
    const { user, setUser, setToken, logoutUser } = useContext(AuthContext)
    const navigate = useNavigate()

    // Form items
    const [inputs, setInputs] = useState({
        fullName: user.fullName,
    })
    const [errorMessage, setErrorMessage] = useState(undefined)

    // Form handles
    const handleChange = e =>
        setInputs({ ...inputs, [e.target.id]: e.target.value })

    // Submit form
    const handleSubmit = e => {
        e.preventDefault()

        userService
            .editAccount(user._id, inputs)
            .then(res => {
                setUser(res.data.user)
                setToken(res.data.authToken)
                setEdited(!edited)
                navigate(-1)
            })
            .catch(err => {
                setErrorMessage(err.response.data.message)
                console.log(err)
            })
    }

    // Delete account
    const handleDelete = e => {
        e.preventDefault()

        userService
            .deleteAccount(user._id)
            .then(() => {
                logoutUser()
                navigate("/goodbye")
            })
            .catch(err => console.log(err))
    }

    return (
        <Page title="Edit your account" mainWidth={400}>
            <Font.H1>Edit your account</Font.H1>

            <Form btnPrimary="Save changes" onSubmit={handleSubmit}>
                <Input
                    label="Full name"
                    id="fullName"
                    onChange={handleChange}
                    value={inputs.fullName}
                    autoFocus
                />

                <Input
                    label="Email"
                    value={user.email}
                    helperBottom="You can not edit your email"
                    disabled
                />
            </Form>

            {errorMessage && (
                <Alert as={Font.P} color="danger">
                    {errorMessage}
                </Alert>
            )}

            <Font.P>
                <Link to="/my-account/edit-password">Edit your password.</Link>
            </Font.P>

            <DangerZone
                textBtnOpen="Delete account"
                text="Are you sure you want to delete your account?"
                textBtnPrimary="Yes, delete my account"
                onClickPrimary={handleDelete}
            />
        </Page>
    )
}

export default EditAccount
