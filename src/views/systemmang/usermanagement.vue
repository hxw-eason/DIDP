<template>
    <div class="app-container">
        <!--工具条-->
       <div class="filter-container suppliertoolbar">
           <el-row :gutter="20" class="mt10">
               <label class="el-form-item__label">登录账号:</label>
               <el-input @keyup.enter.native="handleFilter" v-model="listQuery.supplierBH" style="width: 200px;" class="filter-item" placeholder="请输入登录账号" clearable></el-input>
               <label class="el-form-item__label">用户姓名:</label>
               <el-input @keyup.enter.native="handleFilter" v-model="listQuery.supplierName" style="width: 200px;" class="filter-item" placeholder="请输入用户姓名" clearable></el-input>
               <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查询</el-button>
               <el-button class="filter-item" type="primary" icon="el-icon-refresh">重置</el-button>
           </el-row>
           <el-row :gutter="20">
               <el-button class="filter-item" type="danger" @click="batchRemove" :disabled="this.multipleSelection.length===0">删除</el-button>
               <el-button class="filter-item" type="primary" @click="downloadSels" :disabled="this.multipleSelection.length===0" :loading="downloadLoading">导出已选择项</el-button>
               <el-button class="filter-item" type="primary" icon="el-icon-edit" @click="handleCreate">新增</el-button>
           </el-row>
        </div>
        <el-table :data="supplierlistary" @selection-change="selsChange" v-loading.body="listLoading" ref="multipleTable" element-loading-text="拼命加载中..." fit highlight-current-row style="width: 100%">
            <el-table-column align="center" type="selection" width="55"></el-table-column>
            <el-table-column align="center" label="登录账号">
                <template slot-scope="scope">
                    <span>{{scope.row.supplierBH}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="用户姓名">
                 <template slot-scope="scope">
                    <span>{{scope.row.supplierName}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="所属部门">
                <template slot-scope="scope">
                    <span>{{scope.row.companyType}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" prop="companyPhone" label="联系电话" width="130"></el-table-column>
            <el-table-column align="center" prop="supplierSBH" label="联系手机" width="130"></el-table-column>
            <el-table-column align="center" prop="companyEmail" label="联系邮箱" width="180"></el-table-column>
            <el-table-column align="center" prop="supplierYHZH" label="传真" width="130"></el-table-column>
            <el-table-column align="center" prop="selstype" label="是否锁定"></el-table-column>
            <el-table-column align="center" prop="supplierYWLX" label="描述说明"></el-table-column>
            <el-table-column align="center" label="操作" width="110" class-name="small-padding fixed-width" fixed="right">
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
            <el-form :rules="rules" ref="dataForm" :model="temp" label-position="right" label-width="110px" class="dialog-form">
                <div class="form-list">
                    <el-row :gutter="20">
                        <el-col :span="24">
                            <h3 style="text-align: left;">基本信息</h3>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="登录账号:" prop="supplierBH">
                                <el-input v-model="temp.supplierBH"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="用户姓名:" prop="supplierName">
                                <el-input v-model="temp.supplierName"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="所属部门:" prop="companyType">
                                <el-input v-model="temp.companyType"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="联系电话:" prop="companyPhone">
                                <el-input v-model="temp.companyPhone"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="联系手机:" prop="supplierSBH">
                                <el-input v-model="temp.supplierSBH"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="联系邮箱:" prop="companyEmail">
                                <el-input v-model="temp.companyEmail"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="传真:" prop="supplierYHZH">
                                <el-input v-model="temp.supplierYHZH"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="是否锁定:" prop="selstype">
                                <el-select class="filter-item" v-model="temp.selstype" placeholder="请选择">
                                    <el-option v-for="item in selstypeOptions" :key="item" :label="item" :value="item">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item label="描述说明:" prop="supplierYWLX">
                                <el-input v-model="temp.supplierYWLX"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </div>
                <div class="form-list">
                    <el-row :gutter="20">
                        <el-col :span="24">
                            <h3 style="text-align: left;">用户角色</h3>
                        </el-col>
                        <el-form-item label="用户拥有角色:" prop="changeType">
                            <el-checkbox-group v-model="temp.changeType" class="phoneGroup">
                                <!-- <el-checkbox label="管理员" name=""></el-checkbox>
                                <el-checkbox label="租赁处" name=""></el-checkbox>
                                <el-checkbox label="规划部" name=""></el-checkbox>
                                <el-checkbox label="总经办" name=""></el-checkbox>
                                <el-checkbox label="税务部" name=""></el-checkbox>
                                <el-checkbox label="审核" name=""></el-checkbox>
                                <el-checkbox label="审批" name=""></el-checkbox> -->
                                <el-checkbox v-for="city in changeOptions" :label="city" :key="city">{{city}}</el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                    </el-row>
                </div>
                
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">确定</el-button>
                <el-button v-else type="primary" @click="updateData">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { supplierList, batchRemoveSupplier, removeSupplier, createInfo, updateInfo } from '@/api/supplier'

export default {
    name: 'usermanagement',
    data () {
        return {
            supplierlistary: null,
            total: null,
            listLoading: true,
            listQuery: {
                page: 1,
                limit: 20,
                supplierBH: undefined,
                companyName: undefined,
            },
            multipleSelection: [],   //列表选中列
            downloadLoading: false,  //下载文件状态
            selstypeOptions: ['是','否'],
            changeOptions: ['管理员', '租赁处', '规划部', '总经办','税务部', '审核', '审批'],
            //修改
            temp: {
                supplierBH: '',
                supplierName: '',
                companyType: '',
                companyPhone: '',
                supplierSBH: '',
                companyEmail: '',
                supplierYHZH: '',
                selstype: '',
                supplierYWLX: '',
                changeType: [],
            },
            
            dialogFormVisible: false,
            dialogStatus: '',
            textMap: {
                update: '修改用户管理信息',
                create: '新增用户管理信息'
            },
            rules: {
                supplierBH: [{ required: true, message: '登录账号必填', trigger: 'blur' }],
                supplierName: [{ required: true, message: '用户姓名必填', trigger: 'blur' }],
                companyType: [{ required: true, message: '所属部门必填', trigger: 'blur' }],
                companyPhone: [{ required: true, message: '联系电话必填', trigger: 'blur' }],
                supplierSBH: [{ required: true, message: '联系手机必填', trigger: 'blur' }],
                companyEmail: [{ required: true, message: '联系邮箱必填', trigger: 'blur' }],
                supplierYHZH: [{ required: true, message: '传真必填', trigger: 'blur' }],
                selstype: [{ required: true, message: '是否锁定必选', trigger: 'blur' }],
                changeType: [
                        { type: 'array', required: true, message: '请至少选择一个可选角色', trigger: 'change' }
                   ],
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
            import('@/vendor/Export2Excel').then(excel => {const tHeader = ['分子公司代码', '分子公司名称', '分子公司类型', '联系人', '联系电话']
                const filterVal = ['companyNumber', 'companyName', 'companyType', 'supplierName', 'companyPhone']
                const list = this.multipleSelection
                const data = this.formatJson(filterVal, list)
                excel.export_json_to_excel({
                    header: tHeader,
                    data,
                    filename: "分子公司信息"
                })
                this.$refs.multipleTable.clearSelection()
                this.downloadLoading = false
            })
        },
        formatJson(filterVal, jsonData) {
            return jsonData.map(v => filterVal.map(j => v[j]))
        },
        //显示修改弹出层
        handleUpdate(row) {
            this.temp = Object.assign({}, row) // copy obj
            // this.temp.timestamp = new Date(this.temp.timestamp)
            this.dialogStatus = 'update'
            this.dialogFormVisible = true
            this.$nextTick(() => {
                this.$refs['dataForm'].clearValidate()
            })
        },
        //确定修改
        updateData() {
            this.$refs['dataForm'].validate((valid) => {
                if (valid) {
                    const tempData = Object.assign({}, this.temp)
                    // tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
                    updateInfo(tempData).then(() => {
                        for (const v of this.supplierlistary) {
                            if (v.id === this.temp.id) {
                                const index = this.supplierlistary.indexOf(v)
                                this.supplierlistary.splice(index, 1, this.temp)
                                break
                            }
                        }
                        this.dialogFormVisible = false
                        this.$notify({
                        title: '成功',
                        message: '更新成功',
                        type: 'success',
                        duration: 2000
                        })
                    })
                }
            })
        },
        //新增
        resetTemp() {
            this.temp = {
                companyNumber: '',
                companyName: '',
                companyType: '',
                supplierName: '',
                companyPhone: '',
                companyEmail: '',
                companyBankName: '',
                companyBank: '',
                supplierYHZH: '',
                supplierAddr: '',
            }
        },
        //新增弹窗
        handleCreate() {
            this.resetTemp()
            this.dialogStatus = 'create'
            this.dialogFormVisible = true
            this.$nextTick(() => {
                this.$refs['dataForm'].clearValidate()
            })
        },
        //新增
        createData() {
            this.$refs['dataForm'].validate((valid) => {
                if (valid) {
                    this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
                    this.temp.author = 'hxw'
                    createInfo(this.temp).then(() => {
                        this.supplierlistary.unshift(this.temp)
                        this.dialogFormVisible = false
                        this.$notify({
                        title: '成功',
                        message: '创建成功',
                        type: 'success',
                        duration: 2000
                        })
                    })
                }
            })
        },
    }
}
</script>

<style lang="scss" scoped>
.mt10 {
    margin-bottom: 10px;
}
.dialog-form .form-list {
    border-radius: 5px;
    border: 1px solid #dcdfe6;
    padding-left: 15px;
    padding-right: 15px;
    margin-bottom: 15px;
    
}
.phoneGroup .el-checkbox {
    margin-left: 0!important;
    margin-right: 15px;
}
</style>


