import fetch from 'node-fetch'

export default async (req, res) => {
	const { q } = req.query

	if (q === undefined) {
		res.status(400)
		res.end()
		return
	}

	try {
		const result = await fetch(`https://www.metaweather.com/api/location/search/?query=${q}`, {
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
