// Imports
import React, { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"
import {
    Font,
    Form,
    Input,
    Alert,
    Autocomplete,
    PageLoading,
    InputCheck,
} from "tsx-library-julseb"

import { AuthContext } from "../../context/auth"
import artistService from "../../api/artist.service"

import Page from "../../components/layouts/Page"

const NewArtist = () => {
    const { user } = useContext(AuthContext)
    const navigate = useNavigate()

    // Get all countries, and filter cities by selected country
    const [allCountries, setAllCountries] = useState([])
    const [allCities, setAllCities] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetch(
            "https://raw.githubusercontent.com/JulSeb42/js-utils/master/lib/allCities.json"
        )
            .then(res => res.json())
            .then(res => {
                setAllCountries([
                    ...new Set(res.map(city => city.country).sort()),
                ])
                setAllCities(res)
                setIsLoading(false)
            })
            .catch(err => console.log(err))
    }, [])

    const [inputs, setInputs] = useState({
        name: "",
        styles: "",
        picture: "",
        instagram: "",
    })
    const [country, setCountry] = useState("")
    const [city, setCity] = useState("")
    const [handpoke, setHandpoke] = useState(false)
    const [shop, setShop] = useState(false)
    const [errorMessage, setErrorMessage] = useState(undefined)

    const [filteredCountries, setFilteredCountries] = useState("")
    const [filteredCities, setFilteredCities] = useState("")

    const handleInputs = e =>
        setInputs({ ...inputs, [e.target.id]: e.target.value })

    const handleHandpoke = e => {
        if (e.target.checked) {
            setHandpoke(true)
        } else {
            setHandpoke(false)
        }
    }

    const handleShop = e => {
        if (e.target.checked) {
            setShop(true)
        } else {
            setShop(false)
        }
    }

    const handleFilterCountry = e => {
        setCountry(e.target.value)
        setFilteredCountries(e.target.value)
    }

    const handleFilterCity = e => {
        setCity(e.target.value)
        setFilteredCities(e.target.value)
    }

    let resultsCountries = allCountries
        .filter(country => {
            return country
                .toLowerCase()
                .includes(filteredCountries.toLowerCase())
        })
        .sort()

    let resultsCities

    if (country !== "") {
        resultsCities = allCities
            .filter(city => city.country === country)
            .filter(city =>
                city.name.toLowerCase().includes(filteredCities.toLowerCase())
            )
            .map(city => city.name)
            .sort()
    }

    if (country === "") {
        resultsCities = allCities
            .filter(city =>
                city.name.toLowerCase().includes(filteredCities.toLowerCase())
            )
            .map(city => city.name)
            .sort()
    }

    const handleClickCountry = e => {
        setCountry(e.target.innerText)
    }

    const handleClickCity = e => {
        setCity(e.target.innerText)
    }

    const handleSubmit = e => {
        e.preventDefault()

        const requestBody = {
            ...inputs,
            city,
            country,
            shop,
            handpoke,
            poster: user._id,
        }

        artistService
            .newArtist(requestBody)
            .then(() => navigate(-1))
            .catch(err => setErrorMessage(err.response.data.message))
    }

    return (
        <Page title="Add a new artist" mainWidth={400}>
            {isLoading ? (
                <PageLoading />
            ) : (
                <>
                    <Font.H1>Add a new artist</Font.H1>

                    <Form
                        btnPrimary="Add a new artist"
                        btnCancel={-1}
                        onSubmit={handleSubmit}
                    >
                        <Input
                            label="Name"
                            id="name"
                            onChange={handleInputs}
                            value={inputs.name}
                        />

                        <Input
                            label="Styles"
                            id="styles"
                            helperBottom="Separate all styles with a comma"
                            onChange={handleInputs}
                            value={inputs.styles}
                        />

                        <Autocomplete
                            label="Country"
                            id="country"
                            onChange={handleFilterCountry}
                            value={country}
                            items={resultsCountries}
                            onMouseDown={handleClickCountry}
                            index={20}
                        />

                        <Autocomplete
                            label="City"
                            id="city"
                            onChange={handleFilterCity}
                            value={city}
                            items={resultsCities}
                            onMouseDown={handleClickCity}
                        />

                        <Input
                            label="Picture"
                            id="picture"
                            onChange={handleInputs}
                            value={inputs.picture}
                        />

                        <Input
                            label="Instagram"
                            id="instagram"
                            onChange={handleInputs}
                            value={inputs.instagram}
                        />

                        <InputCheck
                            label="Handpoke"
                            id="handpoke"
                            type="checkbox"
                            justify="start"
                            name="toggle-handpoke"
                            onChange={handleHandpoke}
                            value={handpoke}
                            defaultChecked={handpoke}
                            toggle
                        />

                        <InputCheck
                            label="This is a shop"
                            id="shop"
                            type="checkbox"
                            justify="start"
                            name="toggle-shop"
                            onChange={handleShop}
                            value={shop}
                            defaultChecked={shop}
                            toggle
                        />
                    </Form>

                    {errorMessage && (
                        <Alert as={Font.P} color="danger">
                            {errorMessage}
                        </Alert>
                    )}
                </>
            )}
        </Page>
    )
}

export default NewArtist
