import React from 'react'
import PropTypes from 'prop-types'
import { fetchPopulerRepos } from '../utils/api'
import { FaUser, FaStar, FaCodeBranch, FaExclamationTriangle } from 'react-icons/fa'
import Card from './Card'
import Loading from './Loading'
import Tooltip from './Tooltip'

function LanguagesNav({ selected, onUpdateLanguage }) {

    const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python']

    return (
        <ul className="flex-center">
            {languages.map(language => (
                <li key={language}>
                    <button
                        className="btn-clear nav-link"
                        style={{ color: language === selected ? 'rgb(187, 46, 31)' : null }}
                        onClick={() => onUpdateLanguage(language)}>
                        {language}
                    </button>
                </li>
            ))}
        </ul>
    )
}

LanguagesNav.propTypes = {
    selected: PropTypes.string.isRequired,
    onUpdateLanguage: PropTypes.func.isRequired
}

function ReposGrid({ repos }) {
    return (
        <ul className="grid space-around">
            {repos.map((repo, index) => {
                const { owner, html_url, stargazers_count, forks, open_issues } = repo
                const { login, avatar_url } = owner

                return (
                    <li key={html_url}>
                        <Card
                            header={String(++index)}
                            avatar={avatar_url}
                            href={html_url}
                            name={login}>

                            <ul className="card-list">
                                <li>
                                    <Tooltip text="Github username">
                                        <FaUser color="rgb(255, 191, 116)" size={22} />
                                        <a href={`https://github.com/${login}`}>{login}</a>
                                    </Tooltip>
                                </li>
                                <li>
                                    <FaStar color="rgb(255, 215, 0)" size={22} />
                                    {stargazers_count.toLocaleString()} start
                                </li>
                                <li>
                                    <FaCodeBranch color="rgb(129, 195, 245)" size={22} />
                                    {forks.toLocaleString()} forks
                                </li>
                                <li>
                                    <FaExclamationTriangle color="rgb(241, 138, 147)" size={22} />
                                    {open_issues.toLocaleString()} open issues
                                </li>
                            </ul>
                        </Card>
                    </li>
                )
            })}
        </ul>
    )
}

ReposGrid.propTypes = {
    repos: PropTypes.array.isRequired
}

function populerReducer(state, action) {
    switch (action.type) {
        case 'success':
            return { ...state, [action.selectedLanguage]: action.repos, error: null}
        case 'error':
            return { ...state, error: action.error.message }
        default:
            throw new Error('Undefined action type!')
    }
}

export default function Populer() {

    const [selectedLanguage, setSelectedLanguage] = React.useState('All')
    const [state, dispatch] = React.useReducer(populerReducer, { error: null })
    const fetchedLanguages = React.useRef([])

    React.useEffect(() => {
        if (!fetchedLanguages.current.includes(selectedLanguage)) {
            fetchedLanguages.current.push(selectedLanguage)
            
            fetchPopulerRepos(selectedLanguage)
                .then(repos => dispatch({ type: 'success', selectedLanguage, repos }))
                .catch(error => dispatch({ type: 'error', error }))
        }
    }, [selectedLanguage])

    return (
        <>
            <LanguagesNav selected={selectedLanguage} onUpdateLanguage={setSelectedLanguage} />
            {!state[selectedLanguage] && !state.error && <Loading text="Fetching" />}
            {state.error && <p className="center-text error">{state.error}</p>}
            {state[selectedLanguage] && <ReposGrid repos={state[selectedLanguage]} />}
        </>
    )
}