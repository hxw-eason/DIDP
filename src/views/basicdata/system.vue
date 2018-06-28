<template>
    <div class="app-container">
        <!--工具条-->
       <div class="filter-container suppliertoolbar">
           <el-row :gutter="20" class="mt10">
               <el-input @keyup.enter.native="handleFilter" v-model="listQuery.supplierBH" style="width: 200px;" class="filter-item" placeholder="系统代码" clearable></el-input>
               <el-input @keyup.enter.native="handleFilter" v-model="listQuery.supplierBM" style="width: 200px;" class="filter-item" placeholder="系统名称" clearable></el-input>
               <el-select class="filter-item" style="width: 130px" v-model="listQuery.selstype" placeholder="请选择">
                    <el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item">
                    </el-option>
                </el-select>
               <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查询</el-button>
               <el-button class="filter-item" type="primary" icon="el-icon-refresh">重置</el-button>
           </el-row>
           <el-row :gutter="20">
               <el-button class="filter-item" type="danger" @click="batchRemove" :disabled="this.multipleSelection.length===0">停用</el-button>
               <el-button class="filter-item" type="primary" @click="downloadSels" :disabled="this.multipleSelection.length===0" :loading="downloadLoading">导出已选择项</el-button>
               <el-button class="filter-item" type="primary" icon="el-icon-edit">新增</el-button>
           </el-row>
        </div>
        <el-table :data="supplierlistary" @selection-change="selsChange" v-loading.body="listLoading" ref="multipleTable" element-loading-text="拼命加载中..." fit highlight-current-row style="width: 100%">
            <el-table-column align="center" type="selection" width="55"></el-table-column>
            <!-- <el-table-column align="center" prop="id" label="序号" width="60">
                <template slot-scope="scope">
                    <span>{{scope.row.id}}</span>
                </template>
            </el-table-column> -->
            <el-table-column align="center" prop="supplierBH" label="系统代码" width="110"></el-table-column>
            <el-table-column align="center" prop="systemNmae" label="系统名称" width="110"></el-table-column>
            <el-table-column align="center" prop="supplierYWLX" label="系统描述" width="140"></el-table-column>
            <el-table-column align="center" prop="supplierZZBM" label="系统IP地址" width="110"></el-table-column>
            <el-table-column align="center" prop="supplierName" label="联系人" width="110"></el-table-column>
            <el-table-column align="center" prop="supplierYWLX" label="注册时间" width="160"></el-table-column>
            <el-table-column align="center" label="是否有效" width="110">
                <template slot-scope="scope">
                    <el-tag type="success" v-if="scope.row.selstype=='是'">{{scope.row.selstype}}</el-tag>
                    <el-tag type="danger" v-if="scope.row.selstype=='否'">{{scope.row.selstype}}</el-tag>
                </template>
            </el-table-column>
            
            <el-table-column align="center" label="操作" width="230" class-name="small-padding fixed-width">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">修改</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination-container">
            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>
        <!-- 修改，新增弹出框 -->
        <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
            <el-form :rules="rules" ref="dataForm" :model="temp" label-position="left" label-width="100px" style='width: 400px; margin-left:50px;'>
                <el-form-item label="系统代码：" prop="title">
                    <el-input v-model="temp.supplierBH"></el-input>
                </el-form-item>
                <el-form-item label="系统名称：" prop="title">
                    <el-input v-model="temp.systemNmae"></el-input>
                </el-form-item>
                <el-form-item label="系统IP地址：" prop="title">
                    <el-input v-model="temp.supplierZZBM"></el-input>
                </el-form-item>
                <el-form-item label="联系人：" prop="title">
                    <el-input v-model="temp.supplierName"></el-input>
                </el-form-item>
                <el-form-item label="系统描述：" prop="title">
                    <el-input v-model="temp.supplierYWLX"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <!-- <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">确定</el-button>
                <el-button v-else type="primary" @click="updateData">确定</el-button> -->
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { supplierList, batchRemoveSupplier, removeSupplier } from '@/api/supplier'

export default {
    name: 'supplier',
    data () {
        return {
            supplierlistary: null,
            total: null,
            listLoading: true,
            listQuery: {
                page: 1,
                limit: 20,
                supplierBH: undefined,
                supplierBM: undefined,
                supplierName: undefined,
                selstype: undefined,
            },
            multipleSelection: [],   //列表选中列
            downloadLoading: false,  //下载文件状态
            importanceOptions: ['是', '否'],
            //新增，修改弹窗
            temp: {
                supplierBH: '',
                systemNmae: '',
                supplierZZBM: '',
                supplierName: '',
                supplierYWLX: ''
            },
            dialogFormVisible: false,
            dialogStatus: '',
            textMap: {
                update: '修改',
                create: '新增'
            },
            rules: {
                supplierBH: [{ required: true, message: 'title is required', trigger: 'blur' }],
                systemNmae: [{ required: true, message: 'title is required', trigger: 'blur' }],
                supplierZZBM: [{ required: true, message: 'title is required', trigger: 'blur' }],
                supplierName: [{ required: true, message: 'title is required', trigger: 'blur' }],
                supplierYWLX: [{ required: true, message: 'title is required', trigger: 'blur' }]
            },
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
        //删除
        // remove: function (index, row) {
        //     this.$confirm('确认删除该记录吗?', '提示', {
        //         type: 'warning'
        //     }).then(() => {
        //         this.listLoading = true;
        //         //NProgress.start();
        //         console.log('row.id=' + row.id)
        //         let para = { id: row.id }
        //         // console.log('id=' + id)
        //         // console.log("11111")
        //         console.log("para= " + para)
        //         removeSupplier(para).then((res) => {
        //             this.listLoading = false
        //             //NProgress.done();
        //             this.$message({
        //                 message: '删除成功',
        //                 type: 'success',
        //                 duration: 2000
        //             });
        //             this.getList();
        //         });
        //     }).catch(() => {

        //     });
        // },
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
            import('@/vendor/Export2Excel').then(excel => {const tHeader = ['序号', '供应商编码', '供应商EBS编码', '供应商名称', '报帐系统业务类型']
                const filterVal = ['id', 'supplierBH', 'supplierBM', 'supplierName', 'supplierYWLX']
                const list = this.multipleSelection
                const data = this.formatJson(filterVal, list)
                excel.export_json_to_excel({
                    header: tHeader,
                    data,
                    filename: "供应商信息"
                })
                this.$refs.multipleTable.clearSelection()
                this.downloadLoading = false
            })
        },
        formatJson(filterVal, jsonData) {
            return jsonData.map(v => filterVal.map(j => v[j]))
        },
        //修改
        handleUpdate(row) {
            this.temp = Object.assign({}, row) // copy obj
            // this.temp.timestamp = new Date(this.temp.timestamp)
            this.dialogStatus = 'update'
            this.dialogFormVisible = true
            this.$nextTick(() => {
                this.$refs['dataForm'].clearValidate()
            })
        },
    }
}
</script>

<style lang="scss" scoped>
.mt10 {
    margin-bottom: 10px;
}
</style>


