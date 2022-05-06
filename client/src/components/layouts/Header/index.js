// Packages
import React, { useContext, useState } from "react"
import { Link, NavLink } from "react-router-dom"

// API
import { AuthContext } from "../../../context/auth"

// Data
import siteData from "../../../data/siteData"

// Styles
import { Container, MenuButton, Nav, MenuLinkStyled } from "./styles"

const Header = () => {
    const { isLoggedIn, logoutUser } = useContext(AuthContext)

    // Mobile menu
    const [isOpen, setIsOpen] = useState(false)

    // Menu link component => fix `as` prop with emotion
    const MenuLink = ({
        to,
        logo,
        children,
        onClick,
    }) => {
        return (
            <MenuLinkStyled
                as={
                    to && logo
                        ? Link
                        : to && !logo
                        ? NavLink
                        : "button"
                }
                to={to}
                logo={logo}
                onClick={onClick && onClick}
            >
                {children}
            </MenuLinkStyled>
        )
    }

    return (
        <Container>
            <MenuLink to="/" logo>
                {siteData.name}
            </MenuLink>

            <MenuButton
                width={28}
                height={20}
                onClick={() => setIsOpen(!isOpen)}
                color="currentColor"
                open={isOpen}
            />

            <Nav isOpen={isOpen}>
                <MenuLink to="/">Home</MenuLink>

                {isLoggedIn ? (
                    <>
                        <MenuLink to="/my-account">My account</MenuLink>

                        <MenuLink onClick={logoutUser}>Log out</MenuLink>
                    </>
                ) : (
                    <>
                        <MenuLink to="/signup">Sign up</MenuLink>

                        <MenuLink to="/login">Login</MenuLink>
                    </>
                )}
            </Nav>
        </Container>
    )
}

export default Header
