import {useEffect, EffectCallback} from 'react'

export const useDidMount = (callback: EffectCallback) => {
	useEffect(callback, [])
}