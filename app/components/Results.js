import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { FaCompass, FaBriefcase, FaUsers, FaUserFriends, FaCode, FaUser } from 'react-icons/fa'
import { battle } from '../utils/api'
import Card from './Card'
import Loading from './Loading'
import Tooltip from './Tooltip'
import queryString from 'query-string'

function ProfileList({ profile }) {
    return (
        <ul className="card-list">
            <li>
                <FaUser color="rgb(239, 115, 115)" size={22} />
                {profile.name}
            </li>
            {profile.location && <li>
                <Tooltip text="User's location">
                    <FaCompass color="rgb(144, 148, 255)" size={22} />
                    {profile.location}
                </Tooltip>
            </li>}
            {profile.company && <li>
                <Tooltip text="User's company">
                    <FaBriefcase color="#795548" size={22} />
                    {profile.company}
                </Tooltip>
            </li>}
            <li>
                <FaUsers color="rgb(129, 195, 245)" size={22} />
                {profile.followers.toLocaleString()} followers
            </li>
            <li>
                <FaUserFriends color="rgb(64, 195, 183)" size={22} />
                {profile.following.toLocaleString()} following
            </li>
        </ul>
    )
}

ProfileList.propTypes = {
    profile: PropTypes.object.isRequired
}

function ResultsReducer(state, action) {
    switch (action.type) {
        case 'success':
            return { ...state, winner: action.winner, loser: action.loser, error: null, loading: false }
        case 'error':
            return { ...state, error: action.message, loading: false }
        default:
            throw new Error('Undefined action type!')
    }
}

export default function Results({ location: { search } }) {

    const { playerOne, playerTwo } = queryString.parse(search)

    const [state, dispatch] = React.useReducer(ResultsReducer, {
        winner: null,
        loser: null,
        error: null,
        loading: true
    })

    React.useEffect(() => {
        battle([playerOne, playerTwo])
            .then(players => dispatch({ type: 'success', winner: players[0], loser: players[1] }))
            .catch(({ message }) => dispatch({ type: error, message }))
    }, [playerOne, playerTwo])

    const { winner, loser, error, loading } = state

    if (loading) {
        return <Loading />
    }

    if (error) {
        return <p className="center-text error">{error}</p>
    }

    return (
        <>
            <div className="grid space-around container-sm">
                <Card
                    header={winner.score === loser.score ? 'Tie' : 'Winner'}
                    subHeader={`Score: ${winner.score.toLocaleString()}`}
                    avatar={winner.profile.avatar_url}
                    href={winner.profile.html_url}
                    name={winner.profile.login}>

                    <ProfileList profile={winner.profile} />
                </Card>
                <Card
                    header={winner.score === loser.score ? 'Tie' : 'Loser'}
                    subHeader={`Score: ${loser.score.toLocaleString()}`}
                    avatar={loser.profile.avatar_url}
                    href={loser.profile.html_url}
                    name={loser.profile.login}>

                    <ProfileList profile={loser.profile} />
                </Card>
            </div>
            <Link className="btn btn-dark btn-space" to="/battle">
                Reset
            </Link>
        </>
    )
}