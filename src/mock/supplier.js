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
      supplierAddr: '中国广东省广州市白云区机场路278号',
      supplierSBH: '@string(number, 10)',
      supplierYHZH: '@string(number, 11)',
      supplierYHMC: '中国银行',
      supplierZHMC: '南航一路',
      systemNmae: '成本管理系统',
      'selstype|1': ['是', '否'],

      'companyNumber|1': ['CAN','BBN','ANN'],
      'companyName|1': ['北京','上海','广州'],
      'companyType|1': ['总部','分公司','子公司'],
      'provinceType|1': ['广东省','上海','福建省','湖南省','海南省','湖北省'],
      companyPhone: '@string(number, 11)',
      companyEmail: '@string(number, 9)@qq.com',
      'companyBankName|1': ['广州分公司','北京分公司','上海分公司'],
      'companyBank|1': ['中国建设银行','中国银行','中国农业银行'],

      countryNumber: '@string(number, 2)',
      'countryName|1': ['中国','巴拿马','加拿大','美国','俄罗斯','日本'],
      'twoWord|1': ['CN','PA','CA','US','JP','RU'],
      'continent|1': ['亚洲','美洲','非洲','澳洲','欧洲'],
      'countryEingshName|1': ['China','Panama','Canada','united states','Russia','Japan'],
      'countryShortName|1': ['CHINA','Panama','Canada','USA','Russia','Japan'],
      'cooperationType|1': ['是', '否'],
      modifyTime: '@datetime()',

      cityName: '@city()',
      provinceName: '@province()',
    }))
}

export default {
    //列表
    getList: config => {
        // console.log('config.url=' + config.url)
        let { supplierBH, selstype, supplierBM, supplierName, supplierZZBM, companyNumber, companyName, continent, companyType, provinceType, companyPhone, companyEmail, companyBank, countryNumber, countryName, twoWord, countryEingshName, cooperationType, cityName, provinceName, page = 1, limit = 20 } = param2Obj(config.url)
    
        let mockList = List.filter(item => {
            if (supplierBH && item.supplierBH.indexOf(supplierBH) < 0) return false
            if (supplierBM && item.supplierBM.indexOf(supplierBM) < 0) return false
            if (supplierName && item.supplierName.indexOf(supplierName) < 0) return false
            if (supplierZZBM && item.supplierZZBM.indexOf(supplierZZBM) < 0) return false
            if (selstype && item.selstype !== selstype) return false

            if (companyNumber && item.companyNumber.indexOf(companyNumber) < 0) return false
            if (companyName && item.companyName.indexOf(companyName) < 0) return false
            if (companyPhone && item.companyPhone.indexOf(companyPhone) < 0) return false
            if (companyEmail && item.companyEmail.indexOf(companyEmail) < 0) return false
            if (companyBank && item.companyBank.indexOf(companyBank) < 0) return false
            if (companyType && item.companyType !== companyType) return false
            if (provinceType && item.provinceType !== provinceType) return false

            if (countryNumber && item.countryNumber.indexOf(countryNumber) < 0) return false
            if (countryName && item.countryName.indexOf(countryName) < 0) return false
            if (twoWord && item.twoWord.indexOf(twoWord) < 0) return false
            if (countryEingshName && item.countryEingshName.indexOf(countryEingshName) < 0) return false

            if (cityName && item.cityName.indexOf(cityName) < 0) return false
            if (provinceName && item.provinceName.indexOf(provinceName) < 0) return false
            if (continent && item.continent.indexOf(continent) < 0) return false
            if (cooperationType && item.cooperationType !== cooperationType) return false

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
    },
    //修改
    getInfo: (config) => {
        const { id } = param2Obj(config.url)
        for (const article of List) {
          if (article.id === +id) {
            return article
          }
        }
    },
    //新增
    createInfo: () => ({
        data: 'success'
    }),
    //更新
    updateInfo: () => ({
        data: 'success'
    })
}

  