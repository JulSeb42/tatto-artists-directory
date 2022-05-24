// Imports
import React from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"

import { AuthProviderWrapper } from "./context/auth"

import App from "./App"

import reportWebVitals from "./tests/reportWebVitals"

import "tsx-library-julseb/index.css"
import "./styles/root.css"

// Root
const root = createRoot(document.getElementById("root"))

root.render(
    <BrowserRouter>
        <AuthProviderWrapper>
            <App />
        </AuthProviderWrapper>
    </BrowserRouter>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
