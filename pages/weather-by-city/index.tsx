import React from 'react'
import { useRouter } from 'next/router'
import { makeStyles } from '@material-ui/core'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'

import WithFetch from '../../helpers/with-fetch'
import { WeatherForecastResponse } from '../../types'
import Frame from '../../components/frame'

const useStyles = makeStyles({
	root: {
		display: 'flex',
		flexDirection: 'column'
	},
	headerContent: {
		display: 'flex',
		justifyContent: 'center',
		marginTop: 100
	},
	forecastContent: {
		display: 'flex',
		justifyContent: 'space-around',
		flexWrap: 'wrap',
		margin: 100
	},
	forecastItem: {
		display: 'flex',
		flexDirection: 'column'
	},
	card: {
		margin: 10,
	},
	cardMedia: {
		height: 180,
		width: 180
	}
})

const WeatherByCity = () => {
	const classes = useStyles(undefined)

	const router = useRouter()
	const { woeid } = router.query

	return (
		<Frame>
			<WithFetch<WeatherForecastResponse> endpoint={`/api/weather?location=${woeid}`}>
				{({ data, loading }) => {
					if (loading) {
						return <>{'Loading fresh forecast...'}</>
					}

					if (data === undefined) {
						return <>{"Sorry, but I didn't find any forecast..."}</>
					}

					return (
						<div className={classes.root}>
							<div className={classes.headerContent}>
								<Typography variant={'h3'}>{`Forecast for ${data.title}`}</Typography>
							</div>
							<div className={classes.forecastContent}>
								{data.consolidated_weather.map(forecast => (
									<Card className={classes.card} key={forecast.id}>
										<CardMedia
											className={classes.cardMedia}
											image={`https://www.metaweather.com/static/img/weather/${forecast.weather_state_abbr}.svg`}
										/>
										<CardContent className={classes.forecastItem}>
											<Typography gutterBottom variant={'h5'} component={'h2'}>{forecast.applicable_date}</Typography>
											<Typography>{forecast.weather_state_name}</Typography>
											<Typography>{Math.round(forecast.min_temp)} &#8451;</Typography>
										</CardContent>
									</Card>
								))}
							</div>
						</div>
					)
				}}
			</WithFetch>
		</Frame>
	)
}

// hack so Nextjs renders this page on BE
WeatherByCity.getInitialProps = () => ({})

export default WeatherByCity
