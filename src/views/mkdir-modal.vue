<template>
  <el-dialog
    title="创建文件夹"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    width="600px"
    @close="close"
  >
    <el-form
      ref="form"
      :model="params"
      :rules="rules"
    >
      <el-form-item
        label="父文件夹"
      >
        <el-input
          :value="rootPath + params.parentDir"
          readonly
        />
      </el-form-item>
      <el-form-item
        label="文件夹名称"
        prop="dir"
      >
        <el-input
          v-model="params.dir"
          placeholder="请输入文件夹名称"
          clearable
        />
      </el-form-item>
    </el-form>

    <span slot="footer">
      <el-button
        v-loading="loading"
        type="primary"
        @click="submit"
      >
        提交
      </el-button>
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
                loading: false,
                rootPath: '',
                params: {
                    parentDir: '',
                    dir: ''
                },
                rules: {
                    dir: [
                        {required: true, message: '文件夹名称是必填项'}
                    ]
                }
            };
        },
        methods: {
            show: function (rootPath, parentDir) {
                this.rootPath = rootPath;
                this.params.parentDir = parentDir;
                this.params.dir = '';
                this.dialogVisible = true;
            },
            close() {
                this.$emit('reload');
            },
            submit() {
                this.$refs.form.validate((valid) => {
                    if (!valid) {
                        return;
                    }

                    this.loading = true;
                    this.axios.post('mkdir', this.params).then(() => {
                        this.dialogVisible = false;
                    }).catch(res => {
                        this.error(res.respMsg);
                    }).finally(() => {
                        this.loading = false;
                    });
                });
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