import request from '@/utils/request'

import type { IParams } from './@types'

export const getTVList = (params: IParams) => {
  return request.get('/tv/page', {
    params
  })
}

export const getTvTag = () => {
  return request.get('/category/list/findByMovieOrTv?tv=true')
}
