import request from '@/utils/request'

const IndexUrl= 'goods'; //
export function getGoods() {
  return request({
    url: IndexUrl,
    method: 'get'
  })
}