import React from 'react'
import Link from 'next/link'
import { AppBar, Toolbar, Typography, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(() => ({
	root: {
		flexGrow: 1
	},
	title: {
		textDecoration: 'none',
		color: 'white'
	}
}))

const Bar = () => {
	const classes = useStyles(undefined)

	return (
		<div className={classes.root}>
			<AppBar position={'static'}>
				<Toolbar>
					<Typography variant="h6">
						<Link href={'/'}>
							<a className={classes.title}>{'Simple Weather App'}</a>
						</Link>
					</Typography>
				</Toolbar>
			</AppBar>
		</div>
	)
}

export default Bar
