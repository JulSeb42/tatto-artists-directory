// Packages
import React from "react"
import PropTypes from "prop-types"
import { Helmet, Wrapper, Main } from "tsx-library-julseb"

// Components
import Header from "./Header"

// Data
import siteData from "../../data/siteData"

const Page = ({ title, description, keywords, cover, template, children }) => {
    return (
        <>
            <Helmet
                title={`${title} | ${siteData.name}`}
                description={description}
                keywords={[siteData.keywords, keywords]}
                siteName={siteData.name}
                favicon={siteData.favicon}
                author={siteData.author}
                type={siteData.type}
                cover={cover || siteData.cover}
                language={siteData.language}
            />

            <Header />

            <Wrapper template={template}>
                <Main template={template}>{children}</Main>
            </Wrapper>
        </>
    )
}

Page.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    keywords: PropTypes.array,
    cover: PropTypes.string,
    template: PropTypes.string,
    children: PropTypes.any,
}

export default Page
