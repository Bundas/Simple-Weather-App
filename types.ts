export interface WeatherForDay {
	id: number
	weather_state_name: string
	weather_state_abbr: string
	wind_direction_compass: string
	created: Date
	applicable_date: string
	min_temp: number
	max_temp: number
	the_temp: number
	wind_speed: number
	wind_direction: number
	air_pressure: number
	humidity: number
	visibility: number
	predictability: number
}

export interface Parent {
	title: string
	location_type: string
	woeid: number
	latt_long: string
}

export interface WeatherForecastResponse {
	consolidated_weather: Array<WeatherForDay>
	time: Date
	sun_rise: Date
	sun_set: Date
	timezone_name: string
	parent: Parent
	title: string
	location_type: string
	woeid: number
	latt_long: string
	timezone: string
}

export interface SearchResult {
	title: string
	location_type: string
	woeid: number
	latt_long: string
}
