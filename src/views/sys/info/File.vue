<template>
  <div>
    <div style="width: 360px">
      <el-upload
          class="upload-demo"
          drag
          action="http://localhost:8088/file/upload"
          :headers="uploadHeaders"
          :on-success="success"
          :on-error="error"
          multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">文件最大不能超过20MB</div>
      </el-upload>
    </div>
    <div>
    </div>
  </div>

</template>

<script>
import Element from 'element-ui'
export default {
  name: "File",
  data(){
    return {
      uploadHeaders:{"token":localStorage.getItem('token')}
    }
  },
  methods: {
    success(response) {
      if(response.code === '500'){
        Element.Message({
          message: response.message || '文件上传失败,请重试',
          type: 'warning',
          duration: 5000
        })
      } else {
        Element.Message({
          message: '文件上传成功',
          type: 'success',
          duration: 5000
        })
      }
    },
    error(response) {
      Element.Message({
        message: response.message || '文件上传失败,请重试',
        type: 'warning',
        duration: 5000
      })
    }
  },
  created() {
  }
}
</script>

<style scoped>

</style>
