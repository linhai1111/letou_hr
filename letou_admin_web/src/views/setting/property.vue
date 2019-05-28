<template>
  <div class="dashboard-container">
    <el-row>
      <el-col :span="24">
        <el-button type="primary" @click="dialogFormVisible = true">添加企业性质</el-button>
      </el-col>
    </el-row>
    <br>
    <el-table
      :data="tableData"
      v-loading="loading"
      border
      style="width: 100%">
      <el-table-column
        prop="id"
        label="ID"
        width="180">
      </el-table-column>
      <el-table-column
        prop="title"
        label="企业性质"
        width="180">
      </el-table-column>
      <el-table-column
        prop=""
        label="操作">
        <template slot-scope="scope">
          <el-button @click.native.prevent="deleteRow(scope.$index, tableData)" size="small" type="danger">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加福利 弹框 -->
    <el-dialog title="添加企业性质" :visible.sync="dialogFormVisible" width="30%">
      <el-form :model="form">
        <el-form-item label="企业性质名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit_add_delfare">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import { get_property_list, del_property, add_property } from '@/api/setting.js'

  export default {
    name: 'welfare',
    data() {
      return {
        tableData: [],
        loading: true,
        dialogFormVisible: false,
        form: {
          name: ''
        },
        formLabelWidth: '120px'
      }
    },
    methods: {
      init() {
        get_property_list().then(res => {
          // console.log(res)
          this.tableData = res.data
          this.loading = false
        })
      },
      deleteRow($index, tabledata) {
        // console.log($index, tabledata)
        let item = tabledata[$index]
        del_property(item).then(res => {
          this.init()
        })
      },
      submit_add_delfare() {
        add_property({ title: this.form.name }).then(res => {
          this.init()
          this.dialogFormVisible = false;
        })
      }
    },
    created() {
      console.log('property created')
      this.init()
    },

  }
</script>

<style lang="scss" scoped>
  .dashboard {
    &-container {
      margin: 30px;
    }

    &-text {
      font-size: 30px;
      line-height: 46px;
    }
  }
</style>
