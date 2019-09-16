import Head from 'next/head'
import AppBar from '../components/app-bar'

export interface FrameProps {
	children: React.ReactNode
}

const Frame = ({ children }: FrameProps) => {
	return (
		<>
			<Head>
				<title>{'Weather App'}</title>
			</Head>
			<AppBar />
			{children}
		</>
	)
}

export default Frame