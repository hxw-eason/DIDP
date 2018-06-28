import Mock from 'mockjs'
import { param2Obj } from '@/utils'

let List = []
const count = 100

for (let i = 0; i < count; i++) {
    List.push(Mock.mock({
      id: '@increment',
      supplierBH: '@word(10)',
      supplierBM: '@string(number, 10)',
      supplierName: '@cname()',
      supplierYWLX: '测试类型',
      supplierAddress: '@region',
      supplierZZBM: '@string(number, 10)',
      supplierGJ: '中国',
      supplierSF: '广东省',
      supplierCS: '广州市',
      supplierAddr: '中国广东省广州市白云区',
      supplierSBH: '@string(number, 10)',
      supplierYHZH: '@string(number, 11)',
      supplierYHMC: '中国银行',
      supplierZHMC: '南航一路',
      systemNmae: '成本管理系统',
      'selstype|1': ['是', '否'],
    //   importance: '@integer(1, 3)',
    //   'type|1': ['CN', 'US', 'JP', 'EU'],
    //   'status|1': ['published', 'draft', 'deleted'],
    //   display_time: '@datetime',
    //   comment_disabled: true,
    //   pageviews: '@integer(300, 5000)',
    //   image_uri,
    //   platforms: ['a-platform']
    }))
}

export default {
    //供应商列表
    getList: config => {
        // console.log('config.url=' + config.url)
        let { supplierBH, selstype, supplierBM, supplierName, page = 1, limit = 20 } = param2Obj(config.url)
    
        let mockList = List.filter(item => {
          if (supplierBH && item.supplierBH.indexOf(supplierBH) < 0) return false
          if (supplierBM && item.supplierBM.indexOf(supplierBM) < 0) return false
          if (supplierName && item.supplierName.indexOf(supplierName) < 0) return false
          if (selstype && item.selstype !== selstype) return false
          return true
        })

        const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

        return {
            total: mockList.length,
            items: pageList
        }
    },
    //删除
    remove: config => {
        let { id } = param2Obj(config.url)
        // console.log('id=' + id)
        // List = List.filter(function(val){
        //     return val.id!=id;  //把这个id对应的对象从数组里删除
        // })
        List = List.filter(item => item.id != id )   //把这个id对应的对象从数组里删除
        // return true
        // console.log("List.length= " + List.length)
    },
    //批量删除
    batchRemove: config => {
        // console.log("sdddsff")
        console.log('config.url=' + config.url)
        let { ids } = param2Obj(config.url)
        console.log("ids==" + ids)
        // ids = ids.split(',')
        // console.log("idssplit()==" + ids)
        List = List.filter(item => !ids.includes(item.id))  //把这个id对应的对象从数组里删除
        
        // console.log("List==" + List)
        // return List
    }
}

  