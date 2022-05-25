<template>
  <div class="ele-body">
    <el-card shadow="never" body-style="padding:0;" style="overflow: visible">
      <div style="padding: 15px 15px 0 15px">
        <!-- 工具栏 -->
        <div class="ele-table-tool">
          <div class="ele-table-tool-title">
            <el-upload
              :http-request="uploadFile"
              :action="
                $http.defaults.baseURL +
                '/file/upload?directoryId=' +
                this.directoryId
              "
              :headers="$http.defaults.headers.common"
              :on-success="uploadSuccess"
              :disabled="false"
              :show-file-list="false"
              class="ele-inline-block ele-action"
            >
              <el-button
                type="primary"
                icon="el-icon-upload2"
                class="ele-btn-icon"
                size="small"
                >上传文件</el-button
              >
            </el-upload>
            <el-button
              icon="el-icon-folder-add"
              class="ele-btn-icon"
              size="small"
              @click="showEdit = true"
              >新建文件夹
            </el-button>
            <template v-if="checked.length">
              <el-button
                :disabled="checked.length > 1"
                @click="view(checked[0])"
                icon="el-icon-view"
                class="ele-btn-icon"
                size="small"
                >预览
              </el-button>
              <el-button
                type="danger"
                icon="el-icon-delete"
                class="ele-btn-icon hidden-xs-only"
                size="small"
                @click="remove"
                >删除
              </el-button>
            </template>
          </div>
          <div class="ele-table-tool-right">
            <!-- 搜索框 -->
            <div class="ele-file-tool-search hidden-xs-only">
              <el-input
                placeholder="搜索您的文件"
                v-model="search"
                size="small"
              >
                <el-button
                  slot="append"
                  @click="searchFunc"
                  icon="el-icon-search"
                />
              </el-input>
            </div>
            <!-- 排序方式切换 -->
            <el-dropdown @command="onSortClick">
              <span class="el-dropdown-link">
                <i
                  class="el-icon-_filter ele-file-tool-btn"
                  title="排序方式"
                ></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <!-- <el-dropdown-item command="name">
                  <span :class="['ele-file-sort-item ele-text-primary',{'active':sort==='name'}]">
                    <i :class="['ele-file-sort-item-icon',{'el-icon-top':order==='asc'},{'el-icon-bottom':order==='desc'}]"></i>
                    <span>文件名</span>
                  </span>
                </el-dropdown-item> -->
                <el-dropdown-item command="length">
                  <span
                    :class="[
                      'ele-file-sort-item ele-text-primary',
                      { active: sort === 'length' },
                    ]"
                  >
                    <i
                      :class="[
                        'ele-file-sort-item-icon',
                        { 'el-icon-top': order === 'asc' },
                        { 'el-icon-bottom': order === 'desc' },
                      ]"
                    ></i>
                    <span>大小</span>
                  </span>
                </el-dropdown-item>
                <el-dropdown-item command="update_time">
                  <span
                    :class="[
                      'ele-file-sort-item ele-text-primary',
                      { active: sort === 'update_time' },
                    ]"
                  >
                    <i
                      :class="[
                        'ele-file-sort-item-icon',
                        { 'el-icon-top': order === 'asc' },
                        { 'el-icon-bottom': order === 'desc' },
                      ]"
                    ></i>
                    <span>修改日期</span>
                  </span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <!-- 显示方式切换 -->
            <!-- <i :class="['ele-file-tool-btn',{'el-icon-_nav':!grid},{'el-icon-_menu':grid}]"
               title="显示方式"></i> -->
            <!-- <i @click="grid=!grid" :class="['ele-file-tool-btn',{'el-icon-_nav':!grid},{'el-icon-_menu':grid}]"
               title="显示方式"></i> -->
          </div>
        </div>
        <!-- 文件目录面包屑 -->
        <div class="ele-file-breadcrumb-group ele-cell">
          <div class="ele-cell-content ele-cell">
            <div
              v-if="directory.length"
              @click="back"
              class="ele-file-breadcrumb-back ele-text-primary"
            >
              返回上一级
            </div>
            <div class="ele-file-breadcrumb-list ele-cell-content ele-cell">
              <div
                @click="listAll"
                :class="[
                  'ele-file-breadcrumb-item ele-cell',
                  { 'ele-text-primary': directory.length },
                ]"
              >
                <div class="ele-file-breadcrumb-item-title">全部文件</div>
                <i v-if="directory.length" class="el-icon-arrow-right"></i>
              </div>
              <div
                v-for="(item, index) in directory"
                :key="index"
                @click="listDir(index)"
                :class="[
                  'ele-file-breadcrumb-item ele-cell',
                  { 'ele-text-primary': index !== directory.length - 1 },
                ]"
              >
                <div class="ele-file-breadcrumb-item-title">{{ item }}</div>
                <i
                  v-if="index !== directory.length - 1"
                  class="el-icon-arrow-right"
                ></i>
              </div>
            </div>
          </div>
          <div class="hidden-xs-only">已全部加载，共{{ data.length }}个</div>
        </div>
      </div>
      <!-- 文件列表 -->
      <div v-loading="loading" style="min-height: 400px">
        <ele-file-list
          :data="data"
          :checked.sync="checked"
          :grid="grid"
          @item-click="onItemClick"
          :sort="sort"
          :order="order"
          @sort-change="onSortChange"
        >
          <template slot="tool" slot-scope="{ item }">
            <i class="el-icon-edit ele-text-primary" @click="view(item)"
              >修改</i
            >
            <el-dropdown-item class="item" @click.native="remove(item)"
              >删除</el-dropdown-item
            >
            <!-- <i class="el-icon-edit ele-text-primary" @click.stop="view(item)" title="修改">修改</i>
            <i class="el-icon-share ele-file-list-item-tool ele-text-primary" title="分享" v-if="hide"></i> -->
            <!-- <el-dropdown class="ele-file-list-item-tool">
            <i class="el-icon-more ele-text-primary"></i>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>移动到</el-dropdown-item>
                <el-dropdown-item>复制到</el-dropdown-item>
                <el-dropdown-item @click.native="remove(item)">删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown> -->
          </template>
        </ele-file-list>
      </div>

      <el-pagination
        @current-change="pageFunc()"
        layout="prev, pager, next"
        :page-size="pageSize"
        :current-page.sync="currentPage"
        :total="total"
      >
      </el-pagination>

      <!-- 用于图片预览 -->
      <el-image
        ref="previewImage"
        v-if="currentImage"
        class="ele-file-image-preview"
        :src="currentImage"
        :preview-src-list="previewList"
      ></el-image>
    </el-card>

    <!-- 设置任务状态弹窗 -->
    <!-- <el-dialog title="新建文件夹" :visible.sync="showEdit" width="450px"
               @closed="editForm={}" :destroy-on-close="true" :lock-scroll="false"> -->
    <el-dialog
      :title="editForm.id ? '修改文件夹' : '新建文件夹'"
      :visible.sync="showEdit"
      width="450px"
      @closed="editForm = {}"
      :destroy-on-close="true"
      :lock-scroll="false"
    >
      <el-form
        :model="editForm"
        ref="editForm"
        :rules="editRules"
        label-width="120px"
      >
        <el-form-item label="文件夹名称:" prop="name">
          <el-input
            v-model="editForm.name"
            placeholder="请输入文件夹名称"
            clearable
          />
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="showEdit = false">取消</el-button>
        <el-button type="primary" @click="saveDir()">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import EleFileList from "@/components/EleFileList"
import axios from "axios"
export default {
  name: "DemoFile",
  components: { EleFileList },
  data () {
    return {
      total: 0,
      pageSize: 10,
      currentPage: 1,
      loading: true, // 加载状态
      grid: false, // 是否网格展示
      data: [], // 文件列表数据
      checked: [], // 选中数据
      directory: [], // 文件目录面包屑数据
      directoryArr: [], // 文件目录面包屑数据
      currentImage: "", // 图片预览文件
      search: "", // 搜索
      sort: "", // 排序字段
      order: "", // 排序方式
      hide: false, //分享图标
      editForm: {}, // 表单数据
      editRules: {
        // 表单验证规则
        name: [
          { required: true, message: "文件夹名称不能为空", trigger: "blur" },
        ],
      },
      showEdit: false, // 是否显示表单弹窗
      directoryId: 0, // 当前文件夹名称
    }
  },
  computed: {
    /* 图片预览列表 */
    previewList () {
      return this.data.filter((d) => d.url).map((d) => d.url)
    },
  },
  mounted () {
    this.query()
  },
  methods: {
    searchFunc () {
      this.query(this.search)
    },
    pageFunc () {
      this.query()
    },
    /* 查询文件列表 */
    query (search = "") {
      this.checked = []
      this.data = []
      this.loading = true
      this.$http
        .get("/file/index", {
          params: {
            name: search,
            // directory: this.directory.join('/'),
            directoryId: this.directoryId,
            sort: this.sort,
            order: this.order,
            page: this.currentPage,
            limit: this.pageSize,
          },
        })
        .then((res) => {
          this.loading = false
          console.log(res.data)
          if (res.data.code === 0) {
            this.total = res.data.count
            res.data.data.forEach((d) => {
              // 文件地址加baseURL
              // if (d.url) d.url = this.$setting.baseURL + '/' + d.url;
              // if (d.thumbnail) d.thumbnail = this.$setting.baseURL + '/' + d.thumbnail;
              // 文件大小格式化
              if (d.directory == 0) d.length = "-"
              else d.length = this.getFileSize(d.length)
              // 修改时间格式化
              if (d.update_time)
                d.update_time = this.$util.toDateString(d.update_time)
              // 文件夹参数
              d.isDirectory = d.directory == 0 ? true : false
            })
            this.data = res.data.data
          } else {
            this.$message.error(res.data.msg)
          }
        })
        .catch((e) => {
          this.loading = false
          this.$message.error(e.message)
        })
    },
    uploadFile (file) {
      let formdata = new window.FormData()
      formdata.append("file", file.file)
      axios({
        method: "POST",
        url: "/file/uploadFile?directoryId=" + this.directoryId,
        data: formdata,
        timeout: 1000000,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then((res) => {
          if (res.data.code == 0) {
            this.$message({ type: "success", message: res.data.msg })
            this.query()
          } else {
            this.$message.error(res.data.msg)
          }
        })
        .catch((e) => {
          this.$message.error(e.message)
        })
    },
    /* item点击事件 */
    // 文件夹点击事件
    onItemClick (item) {
      console.log(item)
      if (item.directory == 0) {
        // 文件夹
        // 当前文件夹ID
        this.directoryId = item.id
        // console.log(item.id)
        this.directory.push(item.name)
        this.directoryArr.push(item.id)
        this.query()
      } else if (item.url) {
        // 在这里加 图片判断
        if (!/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(item.url)) {
          console.log("不是图片！")
          window.open(item.url)
          return
        }
        this.currentImage = item.url
        this.$nextTick(() => {
          if (this.$refs.previewImage)
            this.$refs.previewImage.showViewer = true
        })
      } else if (this.checked.indexOf(item) !== -1) {
        this.checked.splice(this.checked.indexOf(item), 1)
      } else {
        this.checked.push(item)
      }
    },
    /* 返回上级 */
    back () {
      this.directory.splice(this.directory.length - 1, 1)
      this.directoryArr.splice(this.directoryArr.length - 1, 1)
      this.directoryId = this.directoryArr[this.directoryArr.length - 1]
      this.query()
    },
    /* 全部文件 */
    listAll () {
      if (!this.directory.length) return
      this.directoryId = 0
      this.directory = []
      this.directoryArr = []
      this.query()
    },
    /* 回到指定目录 */
    listDir (index) {
      if (index === this.directory.length - 1) return
      this.directory.splice(index + 1, 1)
      this.directoryId = this.directoryArr[index]
      this.query()
    },
    /* 创建文件夹 */
    // 保存编辑
    saveDir () {
      const loading = this.$loading({ lock: true })
      this.$http
        .post("/file/saveDir", {
          directoryId: this.directoryId,
          name: this.editForm.name,
        })
        .then((res) => {
          loading.close()
          if (res.data.code === 0) {
            this.showEdit = false
            this.$message({ type: "success", message: res.data.msg })
            this.query()
          } else {
            this.$message.error(res.data.msg)
          }
        })
        .catch((e) => {
          loading.close()
          this.$message.error(e.message)
        })
    },
    // 修改文件名称
    view (row) {
      // const loading = this.$loading({ lock: true });
      //   console.log(this.item.id)
      // if (item.url) window.open(item.url);
      // if (item.directory == 0) return this.onItemClick(item);
      this.editForm = Object.assign({}, row)
      this.showEdit = true
      // console.log(this.editForm.id)
      this.directoryId = this.editForm.id
    },
    /* 文件大小格式化 */
    getFileSize (value) {
      if (value < 1024) return value + "B"
      else if (value < 1024 * 1024) return (value / 1024).toFixed(1) + "KB"
      else if (value < 1024 * 1024 * 1024)
        return (value / 1024 / 1024).toFixed(1) + "M"
      else return (value / 1024 / 1024 / 1024).toFixed(1) + "G"
    },
    /* 排序方式切换 */
    onSortClick (command) {
      if (this.sort === command) {
        this.order = { asc: "desc", desc: "asc" }[this.order]
      } else {
        this.order = "asc"
        this.sort = command
      }
      this.query()
    },
    /* 文件列表排序方式改变 */
    onSortChange (obj) {
      this.order = obj.order
      this.sort = obj.sort
      this.query()
    },

    // 选择文件后预览按钮点击事件

    /* 文件上传成功 */
    uploadSuccess (res) {
      if (res.code === 0) {
        this.$message({ type: "success", message: res.msg })
        // this.directory = [res.dir.replace(/\//, '')];
        this.query()
      } else {
        this.$message.error(res.msg)
      }
    },
    /**
     * 删除文件
     */
    remove (row) {
      if (!row.id) {
        // 批量删除
        if (this.checked.length === 0) {
          return this.$message.error("请至少选择一个文件")
        }
        let ids = this.checked.map((d) => d.id)
        this.$confirm("确定要删除选中的文件吗?", "提示", { type: "warning" })
          .then(() => {
            const loading = this.$loading({ lock: true })
            this.$http
              .post("/file/delete", { id: ids })
              .then((res) => {
                loading.close()
                if (res.data.code === 0) {
                  this.$message({ type: "success", message: res.data.msg })
                  this.query()
                } else {
                  this.$message.error(res.data.msg)
                }
              })
              .catch((e) => {
                loading.close()
                this.$message.error(e.message)
              })
          })
          .catch(() => 0)
      } else {
        // 单个删除
        const loading = this.$loading({ lock: true })
        this.$http
          .post("/file/delete", { id: row.id })
          .then((res) => {
            console.log(row.id)
            loading.close()
            if (res.data.code === 0) {
              this.$message({ type: "success", message: res.data.msg })
              this.query()
            } else {
              this.$message.error(res.data.msg)
            }
          })
          .catch((e) => {
            loading.close()
            this.$message.error(e.message)
          })
      }
    },
  },
};
</script>

<style scoped>
/** 文件目录面包屑 */
.ele-file-breadcrumb-group {
  font-size: 13px;
  padding: 2px 0 6px 0;
  line-height: 1;
}

.ele-file-breadcrumb-back {
  padding-right: 10px;
  border-right: 2px solid hsla(0, 0%, 60%, 0.2);
}

.ele-file-breadcrumb-back:hover,
.ele-file-breadcrumb-item.ele-text-primary:hover
  > .ele-file-breadcrumb-item-title {
  text-decoration: underline;
  cursor: pointer;
}

/* 图片预览组件 */
.ele-file-image-preview >>> img.el-image__inner {
  display: none;
}

.ele-file-image-preview >>> .el-image__error {
  display: none;
}

/* 图标按钮 */
.ele-file-tool-btn {
  cursor: pointer;
  font-size: 22px;
  display: inline-block;
  vertical-align: middle;
  margin-left: 10px;
}

/* 搜索框 */
.ele-file-tool-search {
  display: inline-block;
  vertical-align: middle;
  background-color: hsla(0, 0%, 60%, 0.15);
  border-radius: 32px;
}

.ele-file-tool-search >>> .el-input-group__append,
.ele-file-tool-search >>> .el-input__inner {
  background-color: transparent;
  border: none;
}

.ele-file-tool-search >>> .el-input-group__append {
  padding: 0;
}

.ele-file-tool-search >>> .el-input-group__append .el-button {
  margin: 0;
  padding: 7px 16px 7px 10px;
  border: none;
}

.ele-file-tool-search >>> .el-input-group__append .el-button > i {
  font-size: 16px;
  font-weight: 600;
}

.ele-file-tool-search >>> .el-input__inner {
  width: 200px;
  padding-right: 0;
  box-sizing: border-box;
}

/* 排序下拉 */
.ele-file-sort-item:not(.active) .ele-file-sort-item-icon {
  visibility: hidden;
}

.ele-file-sort-item .ele-file-sort-item-icon {
  font-weight: 600;
}

.ele-file-sort-item:not(.active) {
  color: inherit;
}
.item {
  color: #f00;
}
</style>