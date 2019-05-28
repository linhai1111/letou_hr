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
          <el-input v-model="trade_from1.title" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="submit_add_trade1()">确 定</el-button>
      </div>
    </el-dialog>


    <el-dialog title="添加二级行业" :visible.sync="dialogFormVisible2" width="30%">
      <el-form :model="form">
        <el-form-item label="所属一级行业" :label-width="formLabelWidth">
          <el-select v-model="trade_from2.p_id" placeholder="请选择所属一级行业">
            <el-option :label="item.title" :value="item.id" v-for="(item,index) in data2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="行业名称" :label-width="formLabelWidth">
          <el-input v-model="trade_from2.title" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="submit_add_trade2()">确 定</el-button>
      </div>
    </el-dialog>


    <el-dialog title="添加三级行业" :visible.sync="dialogFormVisible3" width="30%">
      <el-form :model="form">
        <el-form-item label="所属一级行业" :label-width="formLabelWidth">
          <el-select v-model="trade2_id" placeholder="请选择所属一级行业">
            <el-option  :label="item.title" :value="index"   v-for="(item,index) in data2" ></el-option>

          </el-select>
        </el-form-item>
        <el-form-item label="所属二级行业" :label-width="formLabelWidth">
          <el-select v-model="trade_from3.p_id" placeholder="请选择所属二级行业">
            <el-option  :label="item.title" :value="item.id"   v-for="(item,index) in trade2_data" ></el-option>

          </el-select>
        </el-form-item>
        <el-form-item label="行业名称" :label-width="formLabelWidth">
          <el-input v-model="trade_from3.title" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible3 = false">取 消</el-button>
        <el-button type="primary" @click="submit_add_trade3()">确 定</el-button>
      </div>
    </el-dialog>



  </div>
</template>

<script>
  import {get_trade_list,add_trade} from "@/api/setting";

  export default {

    data() {
      return {
        filterText: '',
        data2: [],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        dialogFormVisible1: false,
        dialogFormVisible2: false,
        dialogFormVisible3: false,
        trade_from1:{
          title:'',
          p_id:0
        },
        trade_from2:{
          title:'',
          p_id:''
        },
        trade_from3:{
          title:'',
          p_id:''
        },
        form: {
          name: ''
        },
        formLabelWidth: '120px',
        trade2_id:'',
        trade2_data:[]
      }
    },
    watch: {
      filterText(val) {
        this.$refs.tree2.filter(val)
      },
      trade2_id(n){
        console.log(this.data2[n])
        this.trade2_data = this.data2[n].children;
      }
    },

    methods: {
      init() {
        get_trade_list().then(res => {
          this.data2 = res.data
        })
      },
      filterNode(value, data) {
        if (!value) return true
        return data.label.indexOf(value) !== -1
      },
      submit_add_trade1() {
        console.log("submit_add_trade1");
        console.log(this.trade_from1.title);
        let params = {
          title:this.trade_from1.title,
          lv:1,
          p_id:this.trade_from1.p_id
        };
        add_trade(params).then(res=>{
          console.log(res)
          this.dialogFormVisible1 = false;
          this.init();
        })
      },
      submit_add_trade2() {
        console.log(this.trade_from2)
        let params = {
          title:this.trade_from2.title,
          lv:2,
          p_id:this.trade_from2.p_id
        };
        add_trade(params).then(res=>{
          console.log(res)
          this.dialogFormVisible1 = false;
          this.init();
        })
      },
      submit_add_trade3() {
        console.log(this.trade_from3)
        let params = {
          title:this.trade_from3.title,
          lv:3,
          p_id:this.trade_from3.p_id
        };
        add_trade(params).then(res=>{
          console.log(res)
          this.dialogFormVisible1 = false;
          this.init();
        })
      }
    },
    created() {
      this.init();
    }
  }
</script>

