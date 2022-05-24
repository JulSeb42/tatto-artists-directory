// Imports
import React, { useContext, useState } from "react"
import { Link, NavLink } from "react-router-dom"
import { Button } from "tsx-library-julseb"

import { AuthContext } from "../../../context/auth"

import siteData from "../../../data/siteData"

import { Container, MenuButton, Nav, MenuLinkStyled } from "./styles"

const Header = () => {
    const { isLoggedIn, logoutUser } = useContext(AuthContext)

    // Mobile menu
    const [isOpen, setIsOpen] = useState(false)

    return (
        <Container>
            <MenuLinkStyled as={Link} to="/" logo>
                {siteData.name}
            </MenuLinkStyled>

            <MenuButton
                width={28}
                height={20}
                onClick={() => setIsOpen(!isOpen)}
                color="currentColor"
                open={isOpen}
            />

            <Nav isOpen={isOpen}>
                <MenuLinkStyled to="/">Home</MenuLinkStyled>

                {isLoggedIn ? (
                    <>
                        <Button to="/new-artist">Add a new artist</Button>
                        
                        <MenuLinkStyled as={NavLink} to="/my-account">My account</MenuLinkStyled>

                        <MenuLinkStyled as="button" onClick={logoutUser}>Log out</MenuLinkStyled>
                    </>
                ) : (
                    <>
                        <MenuLinkStyled to="/signup">Sign up</MenuLinkStyled>

                        <MenuLinkStyled to="/login">Login</MenuLinkStyled>
                    </>
                )}
            </Nav>
        </Container>
    )
}

export default Header
