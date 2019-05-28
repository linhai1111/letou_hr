<template>
  <div class="app-container">

    <el-row>
      <el-col :span="24">
        <el-button type="primary" @click="dialogFormVisible1 = true">添加一级行业</el-button>
        <el-button type="primary" @click="dialogFormVisible2 = true">添加二级行业</el-button>
        <el-button type="primary" @click="dialogFormVisible3 = true">添加三级行业</el-button>
      </el-col>
    </el-row>

    <el-tree
      ref="tree2"
      :data="data2"
      :props="defaultProps"
      :filter-node-method="filterNode"
      class="filter-tree"
      default-expand-all
    />

    <!-- 添加行业 -->
    <el-dialog title="添加一级行业" :visible.sync="dialogFormVisible1" width="30%">
      <el-form :model="form">
        <el-form-item label="行业名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit_add_delfare">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="添加二级行业" :visible.sync="dialogFormVisible2" width="30%">
      <el-form :model="form">

        <el-form-item label="所属一级行业" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="行业名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>




      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit_add_delfare">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="添加三级行业" :visible.sync="dialogFormVisible3" width="30%">
      <el-form :model="form">

        <el-form-item label="所属一级行业" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="所属二级行业" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="行业名称" :label-width="formLabelWidth">
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
  import { get_trade_list } from "@/api/setting";

export default {

  data() {
    return {
      filterText: '',
      data2:'',
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      dialogFormVisible1: false,
      dialogFormVisible2: false,
      dialogFormVisible3: false,
      form: {
        name: ''
      },
      formLabelWidth: '120px'
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val)
    }
  },

  methods: {
    init(){
      get_trade_list().then(res=>{
        this.data2 = res.data;
      })
    },
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    }
  },
  created() {
    this.init();
  }
}
</script>

