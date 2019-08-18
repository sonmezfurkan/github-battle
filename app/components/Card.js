import React from 'react'
import PropTypes from 'prop-types'
import ThemeContext from '../contexts/theme'

export default function Card({ header, subHeader, avatar, href, name, children }) {

    const theme = React.useContext(ThemeContext)

    return (
        <div className={`card bg-${theme}`}>
            <h4 className="header-lg center-text">
                {header}
            </h4>
            <img src={avatar} alt={`Avatar for ${name}`} className="avatar"/>
            {subHeader &&  <h4 className="center-text">{subHeader}</h4>}
            <h2 className="center-text">
                <a href={href} className="link">{name}</a>
            </h2>
            {children}
        </div>
    )
}

Card.propTypes = {
    header: PropTypes.string.isRequired,
    subHeader: PropTypes.string,
    avatar: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
}