import React from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import InputBase, { InputBaseProps } from '@material-ui/core/InputBase'
import Icon from '@material-ui/core/Icon'
import SearchIcon from '@material-ui/icons/Search'

const useStyles = makeStyles(() =>
	createStyles({
		root: {
			padding: '2px 4px',
			display: 'flex',
			alignItems: 'center',
			width: 400,
		},
		input: {
			flex: 1,
			paddingLeft: 20
		},
		icon: {
			padding: 10,
		},
	}),
);

const SearchInput = (props: InputBaseProps) => {
	const classes = useStyles(undefined)

	return (
		<Paper className={classes.root}>
			<InputBase
				className={classes.input}
				placeholder="Enter a city..."
				inputProps={{ 'aria-label': 'enter a city' }}
				{...props}
			/>
			<Icon className={classes.icon} aria-label="search">
				<SearchIcon />
			</Icon>
		</Paper>
	)
}

export default SearchInput