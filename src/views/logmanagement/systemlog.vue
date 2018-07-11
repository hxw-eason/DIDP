<template>
    <div class="app-container">
        <!--工具条-->
       <div class="filter-container suppliertoolbar">
           <el-row :gutter="20" class="mt10">
               <label class="el-form-item__label">IP地址:</label>
               <el-input @keyup.enter.native="handleFilter" v-model="listQuery.companyNumber" style="width: 200px;" class="filter-item" placeholder="请输入IP地址" clearable></el-input>
               <label class="el-form-item__label">操作用户:</label>
               <el-input @keyup.enter.native="handleFilter" v-model="listQuery.supplierName" style="width: 160px;" class="filter-item" placeholder="请输入操作用户" clearable></el-input>
               <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查询</el-button>
               <el-button class="filter-item" type="primary" icon="el-icon-refresh">重置</el-button>
           </el-row>
           <el-row :gutter="20">
               <el-button class="filter-item" type="danger" @click="batchRemove" :disabled="this.multipleSelection.length===0">删除</el-button>
               <el-button class="filter-item" type="primary" @click="downloadSels" :disabled="this.multipleSelection.length===0" :loading="downloadLoading">导出已选择项</el-button>
           </el-row>
        </div>
        <el-table :data="supplierlistary" @selection-change="selsChange" v-loading.body="listLoading" ref="multipleTable" element-loading-text="拼命加载中..." fit highlight-current-row style="width: 100%">
            <el-table-column align="center" type="selection" width="55"></el-table-column>
            <el-table-column align="center" label="IP地址" >
                <template slot-scope="scope">
                    <span>{{scope.row.companyNumber}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="操作用户" >
                 <template slot-scope="scope">
                    <span>{{scope.row.supplierName}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" prop="" label="请求方法"></el-table-column>
            <el-table-column align="center" prop="" label="请求参数"></el-table-column>
            <el-table-column align="center" prop="modifyTime" label="开始时间"></el-table-column>
            <el-table-column align="center" prop="modifyTime" label="结束时间"></el-table-column>
            <el-table-column align="center" prop="" label="耗时"></el-table-column>
            <el-table-column align="center" prop="supplierYWLX" label="失败原因"></el-table-column>
        </el-table>
        <div class="pagination-container">
            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
import { supplierList, batchRemoveSupplier, removeSupplier, createInfo, updateInfo } from '@/api/supplier'

export default {
    name: 'company',
    data () {
        return {
            supplierlistary: null,
            total: null,
            listLoading: true,
            listQuery: {
                page: 1,
                limit: 20,
                companyNumber: undefined,
                supplierName: undefined,
            },
            multipleSelection: [],   //列表选中列
            downloadLoading: false,  //下载文件状态
            
        }
    },
    created () {
        this.getList()
    },
    methods: {
        getList() {
            this.listLoading = true
            supplierList(this.listQuery).then(response => {
                this.supplierlistary = response.data.items
                this.total = response.data.total
                this.listLoading = false
            })
        },
        handleSizeChange(val) {
            this.listQuery.limit = val
            this.getList()
        },
        handleCurrentChange(val) {
            this.listQuery.page = val
            this.getList()
        },
        //查询
        handleFilter() {
            this.listQuery.page = 1
            this.getList()
        },
        //选中状态
        selsChange: function (val) {
            this.multipleSelection = val;
        },
        //批量删除
        batchRemove() {
            let ids = this.multipleSelection.map(item => item.id).toString()  //获取所有选中行的id组成的字符串
            // var ids = this.sels.map(item => item.id).join()   //获取所有选中行的id组成的字符串，以逗号分隔
            console.log("ids：" + ids)
            this.$confirm('确认删除选中记录吗？', '提示', {
                type: 'warning'
            }).then(() => {
                this.listLoading = true;
                console.log("1111111111111")
                //NProgress.start();
                let para = { ids: ids }
                console.log("333333333333")
                console.log("para：" + para)
                batchRemoveSupplier(para).then((res) => {
                    console.log("res=" + res)
                    this.listLoading = false
                    //NProgress.done();
                    this.$message({
                        message: '删除成功',
                        type: 'success',
                        duration: 2000
                    });
                    this.getList();
                });
            }).catch(() => {

            });
        },
        //下载已选择项
        downloadSels() {
            this.downloadLoading = true
            import('@/vendor/Export2Excel').then(excel => {const tHeader = ['主数据类型', '主数据主键id', '主数据编码', '接收系统', '推送时间']
                const filterVal = ['dataType', 'id', 'supplierSBH', 'companyNumber', 'modifyTime']
                const list = this.multipleSelection
                const data = this.formatJson(filterVal, list)
                excel.export_json_to_excel({
                    header: tHeader,
                    data,
                    filename: "主数据接收日志"
                })
                this.$refs.multipleTable.clearSelection()
                this.downloadLoading = false
            })
        },
        formatJson(filterVal, jsonData) {
            return jsonData.map(v => filterVal.map(j => v[j]))
        },
    }
}
</script>

<style lang="scss" scoped>
.mt10 {
    margin-bottom: 10px;
}
</style>


