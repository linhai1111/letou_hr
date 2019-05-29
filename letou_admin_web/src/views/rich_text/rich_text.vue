<template>
    <div>
      <div class="rich_box">
        <quill-editor v-model="content" ref="myQuillEditor" :options="options"></quill-editor>
      </div>

      <el-upload
        class="avatar-uploader"
        action=""
        :http-request="to_upload_img"
        :show-file-list="false"
        style="display: none"
      >
        <i class="el-icon-plus avatar-uploader-icon" id="imgInput"></i>
      </el-upload>

    </div>
</template>

<script>
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'
  import { quillEditor } from 'vue-quill-editor'
  import {upload_img} from "@/api/upload.js"
  import * as Quill from 'quill'    // 引入编辑器
    export default {
        name: "rich_text",
      data(){
          return{
            content:'',
            options:{
              placeholder: '请输入文本信息...',

            },
            addRange:[],
          }
      },
      components: {
        quillEditor
      },
      methods:{
        // 点击图片ICON触发事件
        imgHandler(state) {
          console.log(state)
          this.addRange = this.$refs.myQuillEditor.quill.getSelection()
          if (state) {
            // let fileInput = document.getElementById('imgInput')
            // fileInput.click() // 加一个触发事件
            // 选择并上传一张图片
            let fileInput = document.getElementById('imgInput')
            fileInput.click() // 加一个触发事件



          }
        },

        to_upload_img(formdata){
          return new Promise((resolve,reject)=>{
            upload_img(formdata).then(res=>{
              let value = res.key;
              this.addRange = this.$refs.myQuillEditor.quill.getSelection();
              this.$refs.myQuillEditor.quill.insertEmbed(this.addRange !== null ? this.addRange.index : 0, 'image', value, Quill.sources.USER)   // 调用编辑器的 insertEmbed 方法，插入URL
            })
          })
        }
      },
      mounted(){
        // 为图片ICON绑定事件  getModule 为编辑器的内部属性
        this.$refs.myQuillEditor.quill.getModule('toolbar').addHandler('image', this.imgHandler)
        this.$refs.myQuillEditor.quill.getModule('toolbar').addHandler('video', this.videoHandler)  // 为视频ICON绑定事件
      }

    }
</script>

<style scoped>
.rich_box{
  width: 800px;
  margin-left: 20px;
  margin-top: 20px;
  height: 500px;
}
</style>
