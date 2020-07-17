<template>
  <el-dialog
    title="文件上传"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    width="600px"
    @close="close"
  >
    <div style="margin-bottom: 20px;">
      上传目录：{{ rootPath + params.dir }}
    </div>
    <el-upload
      drag
      :show-file-list="false"
      :action="axios.defaults.baseURL + 'upload'"
      :on-success="uploadSuccess"
      :before-upload="beforeUpload"
      :on-progress="onProgress"
      :data="params"
    >
      <div v-if="!fileName">
        <i class="el-icon-upload" />
        <div>
          拖拽 or <em>点击上传</em>
        </div>
      </div>
      <div
        v-else
        style="color: #2e2e2e;margin-top: 50px;"
      >
        <div><strong>{{ util.formatSize(size) }}</strong></div>
        <div style="margin-top: 10px;">
          {{ fileName }}
        </div>
        <el-progress
          style="width: 80%;margin: 15px auto;"
          :text-inside="true"
          :stroke-width="18"
          :percentage="percent"
          :status="status"
        />
      </div>
    </el-upload>
    <span slot="footer">
      <el-button
        @click="dialogVisible = false"
      >
        关闭
      </el-button>
    </span>
  </el-dialog>
</template>

<script>
    export default {
        data() {
            return {
                dialogVisible: false,
                rootPath: '',
                fileName: '',
                percent: 0,
                status: undefined,
                size: 0,
                params: {
                    dir: '',
                }
            };
        },
        methods: {
            show: function (rootPath, dir) {
                this.fileName = '';
                this.percent = 0;
                this.status = undefined;
                this.size = 0;
                this.rootPath = rootPath;
                this.params.dir = dir;
                this.dialogVisible = true;
            },
            beforeUpload(file) {
                this.fileName = file.name;
                this.percent = 0;
                this.status = undefined;
                this.size = file.size;
                return true;
            },
            onProgress(event) {
                this.percent = event.percent;
            },
            uploadSuccess(res) {
                if (res.respCo !== '0000') {
                    this.error(res.respMsg);
                    this.status = 'exception';
                    return;
                }
                this.status = 'success';
            },
            close() {
                this.$emit('reload');
            }
        }
    };
</script>

<style scoped lang="scss">
  /deep/ .el-dialog__body {
    padding: 5px 20px 10px 20px;
  }

  /deep/ .el-upload {
    width: 100% !important;

    .el-upload-dragger {
      width: 100% !important;
    }
  }
</style>