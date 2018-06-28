import request from '@/utils/request'

//供应商列表
export function supplierList(query) {
    return request({
      url: '/supplier/list',
      method: 'get',
      params: query
    })
}

//删除
export function removeSupplier(id) {
  return request({
    url: '/supplier/remove',
    method: 'get',
    params: id
  })
}

//批量删除
export function batchRemoveSupplier(ids) {
    return request({
      url: '/supplier/batchremove',
      method: 'get',
      params: ids
    })
}