import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { FaUserFriends, FaFighterJet, FaTrophy, FaTimesCircle } from 'react-icons/fa'
import ThemeContext from '../contexts/theme'

function Instructions() {

    const theme = React.useContext(ThemeContext)

    return (
        <div className="instructions-container">
            <h1 className="center-text header-lg">Instructions</h1>
            <ol className="container-sm grid center-text battle-instructions">
                <li>
                    <h3 className="header-sm">Enter two GitHub users</h3>
                    <FaUserFriends className={`bg-${theme}`} color="rgb(255,191,116)" size={140} />
                </li>
                <li>
                    <h3 className="header-sm">Battle</h3>
                    <FaFighterJet className={`bg-${theme}`} color="#727272" size={140} />
                </li>
                <li>
                    <h3 className="header-sm">See the winner</h3>
                    <FaTrophy className={`bg-${theme}`} color="rgb(255,215,0)" size={140} />
                </li>
            </ol>
        </div>
    )
}

function PlayerInput({ onSubmit, label }) {

    const [username, setUsername] = React.useState('')
    const theme = React.useContext(ThemeContext)

    const handleChange = e => {
        e.persist()
        setUsername(e.target.value)
    }

    const handleSubmit = e => {
        e.preventDefault()
        onSubmit(username)
    }

    return (
        <form className="column player" onSubmit={handleSubmit}>
            <label htmlFor="username" className="player-label">{label}</label>
            <div className="row player-inputs">
                <input
                    type="text"
                    id="username"
                    className={`input-${theme}`}
                    placeholder="github username"
                    autoComplete="off"
                    value={username}
                    onChange={handleChange}></input>
                    <button className={`btn btn-${theme === 'light' ? 'dark' : 'light'}`} type="submit" disabled={!username}>Submit</button>
            </div>
        </form>
    )
}

PlayerInput.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired
}

function PlayerPreview({ username, onReset, label }) {

    const theme = React.useContext(ThemeContext)

    return (
        <div className="column player">
            <h3 className="player-label">{label}</h3>
            <div className={`row bg-${theme}`}>
                <div className="player-info">
                    <img src={`https://github.com/${username}.png?size=200`} alt={`Avatar for ${username}`} className="avatar-small"/>
                    <a href={`https://github.com/${username}`} className="link">{username}</a>
                </div>
                <button className="button btn-clear" onClick={onReset}><FaTimesCircle color="rgba(194, 57, 42)" size={26} /></button>
            </div>
        </div>
    )
}

PlayerPreview.propTypes = {
    username: PropTypes.string.isRequired,
    onReset: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired
}

export default function Battle() {

    const [playerOne, setPlayerOne] = React.useState(null)
    const [playerTwo, setPlayerTwo] = React.useState(null)

    return (
        <>
            <Instructions />
            <div className="players-container">
                <div className="center-text header-lg">Players</div>
                <div className="row space-around">
                    {!playerOne ?
                        <PlayerInput label="PlayerOne" onSubmit={player => setPlayerOne(player)} /> :
                        <PlayerPreview username={playerOne} label="Player One" onReset={() => setPlayerOne(null)} />
                    }
                    {!playerTwo ?
                        <PlayerInput label="PlayerOne" onSubmit={player => setPlayerTwo(player)} /> :
                        <PlayerPreview username={playerTwo} label="Player Two" onReset={() => setPlayerTwo(null)} />
                    }
                </div>
                {playerOne && playerTwo && (
                    <Link className="btn btn-dark btn-space" to={{ pathname: '/battle/results', search: `?playerOne=${playerOne}&playerTwo=${playerTwo}` }}>Battle</Link>
                )}
            </div>
        </>
    )
}