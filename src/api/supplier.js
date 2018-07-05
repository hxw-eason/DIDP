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

//新增
export function createInfo(data) {
  return request({
    url: '/supplier/createinfo',
    method: 'post',
    data
  })
}

//更新
export function updateInfo(data) {
  return request({
    url: '/supplier/updateinfo',
    method: 'post',
    data
  })
}