import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { FaUserFriends, FaFighterJet, FaTrophy, FaTimesCircle } from 'react-icons/fa'
import { ThemeConsumer } from '../contexts/theme'

function Instructions() {
    return (
        <ThemeConsumer>
            {({ theme }) => (
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
            )}
        </ThemeConsumer>
    )
}

class PlayerInput extends React.Component {

    state = {
        username: ''
    }

    handleChange = (event) => {

        event.persist()

        this.setState({
            username: event.target.value
        })
    }

    handleSubmit = (event) => {

        event.preventDefault()

        this.props.onSubmit(this.state.username)
    }

    render() {
        return (
            <ThemeConsumer>
                {({ theme }) => (
                    <form className="column player" onSubmit={this.handleSubmit}>
                        <label htmlFor="username" className="player-label">{this.props.label}</label>
                        <div className="row player-inputs">
                            <input
                                type="text"
                                id="username"
                                className={`input-${theme}`}
                                placeholder="github username"
                                autoComplete="off"
                                value={this.state.username}
                                onChange={this.handleChange}></input>
                                <button className={`btn btn-${theme === 'light' ? 'dark' : 'light'}`} type="submit" disabled={!this.state.username}>Submit</button>
                        </div>
                    </form>
                )}
            </ThemeConsumer>
        )
    }
}

PlayerInput.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired
}

function PlayerPreview({ username, onReset, label }) {

    return (
        <ThemeConsumer>
            {({ theme }) => (
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
            )}
        </ThemeConsumer>
    )
}

PlayerPreview.propTypes = {
    username: PropTypes.string.isRequired,
    onReset: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired
}

export default class Battle extends React.Component {
    
    state = {
        playerOne: null,
        playerTwo: null
    }

    handleSubmit = (id, player) => {
        this.setState({
            [id]: player
        })
    }

    handleReset = (id) => {
        this.setState({
            [id]: null
        })
    }

    render() {

        const { playerOne, playerTwo } = this.state

        return (
            <>
                <Instructions />
                <div className="players-container">
                    <div className="center-text header-lg">Players</div>
                    <div className="row space-around">
                        {!playerOne ?
                            <PlayerInput label="PlayerOne" onSubmit={player => this.handleSubmit('playerOne', player)} /> :
                            <PlayerPreview username={playerOne} label="Player One" onReset={() => this.handleReset('playerOne')} />
                        }
                        {!playerTwo ?
                            <PlayerInput label="PlayerOne" onSubmit={player => this.handleSubmit('playerTwo', player)} /> :
                            <PlayerPreview username={playerTwo} label="Player Two" onReset={() => this.handleReset('playerTwo')} />
                        }
                    </div>
                    {playerOne && playerTwo && (
                        <Link className="btn btn-dark btn-space" to={{ pathname: '/battle/results', search: `?playerOne=${playerOne}&playerTwo=${playerTwo}` }}>Battle</Link>
                    )}
                </div>
            </>
        )
    }
}