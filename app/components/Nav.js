import React from 'react'
import { NavLink } from 'react-router-dom'
import ThemeContext from '../contexts/theme'

const activeStyle = {
    color: 'rgb(187, 46, 31)'
}

export default function Nav({ toggleTheme }) {

    const theme = React.useContext(ThemeContext)

    return (
        <nav className="row space-between">
            <ul className="row nav">
                <li><NavLink className="nav-link" to="/" exact activeStyle={activeStyle}>Populer</NavLink></li>
                <li><NavLink className="nav-link" to="/battle" activeStyle={activeStyle}>Battle</NavLink></li>
            </ul>
            <button className="btn-clear" style={{ fontSize: 30 }} onClick={toggleTheme}>
                {theme === 'light' ? '🔦' : '💡 '}
            </button>
        </nav>
    )
}