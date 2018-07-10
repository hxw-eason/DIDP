<template>
    <div class="app-container">
        <!--工具条-->
       <div class="filter-container suppliertoolbar">
           <el-row :gutter="20" class="mt10">
               <label class="el-form-item__label">办事处编号:</label>
               <el-input @keyup.enter.native="handleFilter" v-model="listQuery.supplierBH" style="width: 180px;" class="filter-item" placeholder="请输入办事处编号" clearable></el-input>
               <label class="el-form-item__label">办事处名称:</label>
               <el-input @keyup.enter.native="handleFilter" v-model="listQuery.companyType" style="width: 160px;" class="filter-item" placeholder="请输入办事处名称" clearable></el-input>
               <label class="el-form-item__label">所属城市:</label>
               <el-select class="filter-item" style="width: 130px" v-model="listQuery.companyName" placeholder="请选择">
                    <el-option v-for="item in companyNameOptions" :key="item" :label="item" :value="item">
                    </el-option>
                </el-select>
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
            <el-table-column align="center" label="办事处编号" width="110">
                <template slot-scope="scope">
                    <span>{{scope.row.supplierBH}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="办事处名称" width="140">
                 <template slot-scope="scope">
                    <span>{{scope.row.companyType}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" prop="companyName" label="所属城市" width="120"></el-table-column>
            <el-table-column align="center" prop="countryName" label="所属国家" width="130"></el-table-column>
            <el-table-column align="center" prop="continent" label="所属大洲" width="100"></el-table-column>
            <el-table-column align="center" prop="supplierName" label="联系人" width="120"></el-table-column>
            <el-table-column align="center" prop="companyPhone" label="联系电话" width="120"></el-table-column>
            <el-table-column align="center" prop="supplierSBH" label="传真" width="120"></el-table-column>
            <el-table-column align="center" prop="supplierAddr" label="地址" width=""></el-table-column>
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
            <el-form :rules="rules" ref="dataForm" :model="temp" label-position="right" label-width="130px">
                <el-row :gutter="40">
                    <el-col :span="12">
                        <el-form-item label="办事处编号:" prop="supplierBH">
                            <el-input v-model="temp.supplierBH"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="办事处名称:" prop="companyType">
                            <el-input v-model="temp.companyType"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="所属城市:" prop="companyName">
                            <el-select v-model="temp.companyName" placeholder="请选择">
                                <el-option v-for="item in companyNameOptions" :key="item" :label="item" :value="item">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="所属国家:" prop="countryName">
                            <el-select v-model="temp.countryName" placeholder="请选择">
                                <el-option v-for="item in countryNameOptions" :key="item" :label="item" :value="item">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="所属大洲:" prop="continent">
                            <el-select v-model="temp.continent" placeholder="请选择">
                                <el-option v-for="item in continentOptions" :key="item" :label="item" :value="item">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="联系人:">
                            <el-input v-model="temp.supplierName"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="联系电话:">
                            <el-input v-model="temp.companyPhone"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="传真:">
                            <el-input v-model="temp.supplierSBH"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="地址:">
                            <el-input v-model="temp.supplierAddr"></el-input>
                        </el-form-item>
                    </el-col>
                    
                </el-row>
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
    name: 'company',
    data () {
        return {
            supplierlistary: null,
            total: null,
            listLoading: true,
            listQuery: {
                page: 1,
                limit: 20,
                supplierBH: undefined,
                companyType: undefined,
                companyName: undefined,
            },
            multipleSelection: [],   //列表选中列
            downloadLoading: false,  //下载文件状态
            continentOptions: ['亚洲','美洲','非洲','澳洲','欧洲'],
            companyNameOptions: ['北京','上海','广州'],
            countryNameOptions: ['中国','巴拿马','加拿大','美国','俄罗斯','日本'],

            //修改
            temp: {
                supplierBH: '',
                companyType: '',
                companyName: '',
                countryName: '',
                continent: '',
                supplierName: '',
                companyPhone: '',
                supplierSBH: '',
                supplierAddr: '',
            },
            
            dialogFormVisible: false,
            dialogStatus: '',
            textMap: {
                update: '修改办事处信息',
                create: '新增办事处信息'
            },
            rules: {
                supplierBH: [{ required: true, message: '办事处编号必填', trigger: 'blur' }],
                companyType: [{ required: true, message: '办事处名称必填', trigger: 'blur' }],
                companyName: [{ required: true, message: '所属城市必选', trigger: 'blur' }],
                countryName: [{ required: true, message: '所属国家必选', trigger: 'blur' }],
                continent: [{ required: true, message: '所属大洲必选', trigger: 'blur' }],
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
            import('@/vendor/Export2Excel').then(excel => {const tHeader = ['办事处编号', '办事处名称', '所属城市', '所属国家', '所属大洲']
                const filterVal = ['supplierBH', 'companyType', 'companyName', 'countryName', 'continent']
                const list = this.multipleSelection
                const data = this.formatJson(filterVal, list)
                excel.export_json_to_excel({
                    header: tHeader,
                    data,
                    filename: "办事处信息"
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
                supplierBH: '',
                companyType: '',
                companyName: '',
                countryName: '',
                continent: '',
                supplierName: '',
                companyPhone: '',
                supplierSBH: '',
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
</style>


