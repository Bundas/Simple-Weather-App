import React, { useEffect, useState } from 'react'
import fetch from 'node-fetch'

export enum HttpMethod {
	GET = 'get',
	POST = 'post'
}

interface WithFetchProvidedProps<TData extends object> {
	loading: boolean
	data: TData | undefined
}

export interface WithFetchProps<TData extends object> {
	endpoint: string
	method?: HttpMethod
	children: (props: WithFetchProvidedProps<TData>) => React.ReactNode
}

const withFetch = <TData extends object>({ children, endpoint, method = HttpMethod.GET }: WithFetchProps<TData>) => {
	const [isLoading, setLoading] = useState(true)
	const [fetchedData, setFetchedData] = useState<TData | undefined>(undefined)

	useEffect(() => {
		const controller = new AbortController()
		const handleFetch = async () => {
			setLoading(true)

			try {
				const result = await fetch(endpoint, {
					method,
					headers: {
						'Content-Type': 'application/json'
					},
					signal: controller.signal
				})

				const data = (await result.json()) as TData
				if (result.ok) {
					setFetchedData(data)
				}
			} catch (error) {
				if (error.name === 'AbortError') {
					console.log('Request canceled')
					return
				}

				setFetchedData(undefined)
			}

			setLoading(false)
		}

		handleFetch()
		return () => controller.abort()
	}, [endpoint, method])

	return <>{children({ data: fetchedData, loading: isLoading })}</>
}

export default withFetch
