import fetch from 'node-fetch'

export default async (req, res) => {
	const { location } = req.query

	if (location === undefined) {
		res.status(400)
		res.end()
	}

	try {
		const result = await fetch(`https://www.metaweather.com/api/location/${location}`, {
			method: 'get',
			headers: {
				'Content-Type': 'application/json'
			}
		})

		const data = await result.json()

		if (result.ok) {
			res.status(200)
			res.send(data)
			return
		}

		res.status(400)
		res.send(data)
	} catch (error) {
		res.status(400)
		res.send(error)
	}
}