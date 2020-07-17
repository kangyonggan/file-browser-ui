<template>
  <div>
    <div class="actions">
      <span style="float: left;font-size: 20px;">位置：</span>
      <ul>
        <li>
          <router-link to="/">
            {{ rootPath }}
          </router-link>
        </li>
        <li
          v-for="(d, index) in dirs"
          :key="index"
        >
          <router-link :to="getFullDir(index) + d">
            {{ d }}
          </router-link>/
        </li>
      </ul>

      <div style="float: right;margin-right: 20px;margin-top: 4px;">
        <el-button
          size="small"
          @click="$refs['upload-file'].show(rootPath, dir)"
        >
          <i class="el-icon-upload" />
          上传文件
        </el-button>
      </div>
    </div>
    <table>
      <thead>
        <tr>
          <th align="left">
            名称
          </th>
          <th
            align="left"
            width="20%"
          >
            大小
          </th>
          <th
            align="left"
            width="20%"
          >
            最后修改时间
          </th>
        </tr>
      </thead>

      <tbody v-if="!loading">
        <tr
          v-for="(file, index) in files"
          :key="index"
        >
          <td>
            <router-link
              v-if="file.isDir"
              :to="'/' + dir + file.name"
            >
              <i class="el-icon-folder" />
              {{ file.name }}/
            </router-link>
            <a
              v-else
              target="_blank"
              :href="axios.defaults.baseURL + 'download/' + dir + encodeURIComponent(file.name)"
              style="cursor: pointer"
            >
              <i class="el-icon-download" />
              {{ file.name }}
            </a>
          </td>
          <td>
            <span v-if="file.isDir">
              -
            </span>
            <span v-else>
              {{ util.formatSize(file.size) }}
            </span>
          </td>
          <td>
            {{ util.formatTimestamp(file.time) }}
            <span style="font-size: 10px;">
              （{{ util.relativeTime(file.time) }}）
            </span>
          </td>
        </tr>
        <tr v-show="!files.length">
          <td
            colspan="3"
            style="text-align: center;"
          >
            没有文件
          </td>
        </tr>
      </tbody>

      <tbody v-else>
        <tr
          v-for="i in 20"
          :key="'svg-' + i"
        >
          <td
            v-for="j in 3"
            :key="'td-' + j"
          >
            <svg
              :width="(Math.random() * 40 + 40) + '%'"
              height="10px"
              style="background: #eaeced;border-radius: 5px;"
            />
          </td>
        </tr>
      </tbody>
    </table>

    <!--Upload file-->
    <upload-file-modal
      ref="upload-file"
      @reload="reload"
    />
  </div>
</template>

<script>
    import UploadFileModal from './upload-file-modal';

    export default {
        components: {UploadFileModal},
        data() {
            return {
                loading: false,
                rootPath: '',
                dir: '',
                dirs: [],
                files: []
            };
        },
        methods: {
            getFullDir(index) {
                let fullDir = '/';
                for (let i = 0; i < index; i++) {
                    fullDir += this.dirs[i] + '/';
                }
                return fullDir;
            },
            init(route) {
                this.dir = route.params.pathMatch;
                if (this.dir && !this.dir.endsWith('/')) {
                    this.dir += '/';
                }
                let dirs = this.dir.split('/');
                this.dirs = [];
                for (let i = 0; i < dirs.length; i++) {
                    if (dirs[i]) {
                        this.dirs.push(dirs[i]);
                    }
                }

                this.loading = true;
                this.axios.get('/?dir=' + this.dir).then(data => {
                    this.files = data.files;
                    this.rootPath = data.rootPath;
                }).catch(res => {
                    this.error(res.respMsg);
                }).finally(() => {
                    this.loading = false;
                });
            },
            reload() {
                this.init(this.$route);
            }
        },
        mounted() {
            this.init(this.$route);
        },
        beforeRouteUpdate(to, from, next) {
            this.init(to);
            next();
        }
    };
</script>

<style scoped lang="scss">
  .actions {
    line-height: 50px;

    ul {
      float: left;
      margin-top: 0;
      list-style: none;
      padding-left: 20px;

      li {
        float: left;

        a {
          color: #2e2e2e;
          font-size: 18px;
        }
      }
    }
  }

  table {
    width: 100%;
    border-top: 1px solid #d5d5d5;
    border-bottom: 1px solid #d5d5d5;
    padding-bottom: 10px;
    margin-bottom: 30px;

    th {
      line-height: 34px;
      font-weight: bold;
    }
  }
</style>

