import request from '@/utils/request'

import type { IParams } from './@types'

export const getMovieList = (params: IParams) => {
  return request.get('/movie/page', {
    params
  })
}

export const getMovieTag = () => {
  return request.get('/category/list/findByMovieOrTv?movie=true')
}
