import React, { useState } from 'react'
import Link from 'next/link'
import { makeStyles } from '@material-ui/core'
import SearchInput from '../components/search-input'
import WithFetch from '../helpers/with-fetch'
import { SearchResult } from '../types'
import Frame from '../components/frame'

const useStyles = makeStyles({
	searchField: {
		display: 'flex',
		justifyContent: 'center',
		marginTop: 100
	},
	searchResults: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	}
})

const Root = () => {
	const classes = useStyles(undefined)
	const [searchQuery, setSearchQuery] = useState('')

	const handleSearchQuery = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		setSearchQuery(event.target.value)
	}

	return (
		<Frame>
			<div className={classes.searchField}>
				<SearchInput autoFocus value={searchQuery} onChange={handleSearchQuery} />
			</div>
			<div className={classes.searchResults}>
				{searchQuery !== '' && (
					<WithFetch<Array<SearchResult>> endpoint={`/api/search?q=${searchQuery}`}>
						{({ data, loading }) => {
							if (loading) {
								return <span>{'Loading cities...'}</span>
							}

							if (data === undefined) {
								return <span>{'Request failed, please try again'}</span>
							}

							if (data.length === 0) {
								return <span>{"Sorry, I didn't find such city :("}</span>
							}

							return (
								<>
									{data.map(result => (
										<div key={result.woeid}>
											<Link href={`/weather-by-city?woeid=${result.woeid}`}>
												<a>{result.title}</a>
											</Link>
										</div>
									))}
								</>
							)
						}}
					</WithFetch>
				)}
			</div>
		</Frame>
	)
}

export default Root
