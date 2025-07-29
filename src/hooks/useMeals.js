import { useInfiniteQuery } from '@tanstack/react-query'
import axios from 'axios'

const fetchMeals = async ({ pageParam = 1, queryKey }) => {
    const [_key, filters] = queryKey
    const res = await axios.get(`https://meal-nest-server-inky.vercel.app//meals`, {
        params: { ...filters, page: pageParam }
    })
    return res.data
}

export const useMeals = (filters) => {
    return useInfiniteQuery({
        queryKey: ['meals', filters],
        queryFn: fetchMeals,
        getNextPageParam: (lastPage, pages) => lastPage.hasMore ? pages.length + 1 : undefined,
    })
}

