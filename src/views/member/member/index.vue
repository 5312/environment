<template>
  <div class="ele-body">
    <el-card shadow="never">
      <!-- 搜索表单 -->
      <el-form :model="table.where" label-width="77px" class="ele-form-search"
               @keyup.enter.native="$refs.table.reload()" @submit.native.prevent>
        <el-row :gutter="15">
          <el-col :md="6" :sm="12">
            <el-form-item label="专家姓名:">
              <el-input v-model="table.where.realname" placeholder="请输入姓名" clearable/>
            </el-form-item>
          </el-col>
          <el-col :md="9" :sm="12">
            <div class="ele-form-actions">
              <el-button type="primary" @click="$refs.table.reload()" icon="el-icon-search" class="ele-btn-icon">查询
              </el-button>
              <el-button @click="(table.where={})&&$refs.table.reload()">重置</el-button>
              <el-button @click="showEdit=true" type="primary" icon="el-icon-plus" class="ele-btn-icon" v-if="permission.includes('sys:member:add')">添加</el-button>
              <el-button @click="remove()" type="danger" icon="el-icon-delete" class="ele-btn-icon" v-if="permission.includes('sys:member:dall')">批量删除</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
      <!-- 数据表格 -->
      <ele-data-table ref="table" :config="table" :choose.sync="choose" height="calc(100vh - 265px)" highlight-current-row>
        <template slot-scope="{index}">
          <el-table-column type="selection" width="45" align="center" fixed="left"/>
          <el-table-column type="index" :index="index" label="编号" width="60" align="center" fixed="left" show-overflow-tooltip/>
          <el-table-column label="照片" min-width="60" align="center">
            <template slot-scope="{row}">
              <el-avatar shape="square" :size="35" :src="row.avatar"/>
            </template>
          </el-table-column>
          <el-table-column prop="realname" label="姓名"  show-overflow-tooltip min-width="130"/>
           <el-table-column label="性别" min-width="60" align="center" sortable="custom">
            <template slot-scope="{row}">
              <el-tag :type="['primary','success','warning'][row.gender-1]" size="mini">{{ ['男', '女', '保密'][row.gender-1] }}</el-tag>
            </template>
          </el-table-column>

          <el-table-column label="专注领域" min-width="100" align="center">
            <template slot-scope="{row}">
              <el-tag :type="['primary','success','warning', 'danger', 'info'][row.member_level-1]" size="mini">
                {{ ['电机节能', '煤炭工业', '绿色照明', '余热利用', '建筑节能'][row.member_level-1] }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="danwei" label="所在单位" show-overflow-tooltip min-width="200"   >
          </el-table-column>
          <el-table-column prop="zhiwu" label="单位职务"   >
          </el-table-column>
          <el-table-column prop="zhicheng" label="职称"  >
            <template slot-scope="{row}">
              <el-tag :type="['primary','success','warning', 'danger', 'info'][row.zhicheng-1]" size="mini">
                {{ ['教授', '研究员', '高工'][row.zhicheng-1] }}
              </el-tag>
            </template>
          </el-table-column>

          <!--
          <el-table-column prop="status" label="会员状态" sortable="custom" :resizable="false" min-width="120">
            <template slot-scope="{row}">
              <el-switch v-model="row.status" @change="editStatus(row)" :active-value="1" :inactive-value="2"/>
            </template>
          </el-table-column>

          -->
          <el-table-column label="录入时间" sortable="custom" show-overflow-tooltip align="center" min-width="160">
            <template slot-scope="{row}">{{ row.create_time*1000 | toDateString }}</template>
          </el-table-column>

           <el-table-column label="操作" width="130px" align="center" :resizable="false"  fixed="right">
            <template slot-scope="{row}">
              <el-link @click="edit(row)" icon="el-icon-edit" type="primary" :underline="false" v-if="permission.includes('sys:member:edit')">修改</el-link>
              <el-popconfirm title="确定要删除此专家吗？" @confirm="remove(row)" class="ele-action">
                <el-link slot="reference" icon="el-icon-delete" type="danger" :underline="false" v-if="permission.includes('sys:member:delete')">删除</el-link>
              </el-popconfirm>
            </template>
          </el-table-column>
        </template>
      </ele-data-table>
    </el-card>
    <!-- 编辑弹窗 -->
    <el-dialog :title="editForm.id?'修改专家':'添加专家'" :visible.sync="showEdit" width="800px"
               @closed="editForm={}" :destroy-on-close="true" custom-class="ele-dialog-form" :lock-scroll="false">
      <el-form :model="editForm" ref="editForm" :rules="editRules" label-width="100px">
        <el-form-item label="专家图片:">
          <uploadImage :limit="1" v-model="editForm.avatar"></uploadImage>
        </el-form-item>
        <el-row :gutter="15">
          <el-col :sm="12">

            <el-form-item label="专家姓名:" prop="realname">
              <el-input v-model="editForm.realname" placeholder="请输入专家姓名" clearable/>
            </el-form-item>


            <el-form-item label="所在单位:" prop="danwei">
              <el-input v-model="editForm.danwei" placeholder="请输入单位名称" clearable/>
            </el-form-item>


            <el-form-item label="出生日期:" prop="gender">
              <el-date-picker
                v-model="editForm.birthday"
                type="date"
                placeholder="选择出生日期"
                size="small"
                value-format="yyyy-MM-dd"
                format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>

            <el-form-item label="所在城市:" prop="city">
              <el-cascader v-model="city" :options="cityData.cityData" clearable popper-class="ele-pop-wrap-higher"/>
            </el-form-item>
          </el-col>
          <el-col :sm="12">
            <el-form-item label="专家领域" prop="member_level" :rules="{
                    required: true, message: '所属领域不能为空', trigger: 'change'
                  }">
              <el-select filterable clearable v-model="editForm.member_level" size="small" placeholder="-请选择专家领域-" class="ele-block">
                <el-option v-for="item in memberLevelList" :key="item.id" :label="item.name" :value="item.id"/>
              </el-select>
            </el-form-item>
            <el-form-item label="单位职务:" prop="zhiwu">
              <el-input v-model="editForm.zhiwu" placeholder="请输所在单位职务" clearable/>
            </el-form-item>

            <el-form-item label="职称:" prop="zhicheng">
              <el-select v-model="editForm.zhicheng" placeholder="请选择职称" class="ele-block" clearable>
                <el-option label="教授" :value="1"/>
                <el-option label="研究员" :value="2"/>
                <el-option label="高工" :value="3"/>
              </el-select>
            </el-form-item>
            <el-form-item label="性别:" prop="gender">
              <el-select v-model="editForm.gender" placeholder="请选择性别" class="ele-block" clearable>
                <el-option label="男" :value="1"/>
                <el-option label="女" :value="2"/>
              </el-select>
            </el-form-item>



            <!--
            <el-form-item label="会员状态:" prop="status">
              <el-select v-model="editForm.status" placeholder="请选择会员状态" class="ele-block" clearable>
                <el-option label="正常" :value="1"/>
                <el-option label="禁用" :value="2"/>
              </el-select>
            </el-form-item>

            -->
          </el-col>
        </el-row>
        <el-form-item label="个人简介:">
          <el-input v-model="editForm.intro" placeholder="请输入个人简介" :rows="2" type="textarea"/>
        </el-form-item>
        <el-form-item label="学术论文:">
          <el-input v-model="editForm.signature" placeholder="请输入个人签名" :rows="2" type="textarea"/>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="showEdit=false">取消</el-button>
        <el-button type="primary" @click="save">保存</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import cityData from "@/utils/cityData";
import uploadImage from "@/components/uploadImage";
import { mapGetters } from "vuex";
export default {
  name: "SysMember",
  data() {
    return {
      /* citySelect */
      cityData: cityData,  // 省市区数据
      city: [],  // 选中的省市区
      provinceCity: [],  // 选中的省市
      province: [],  // 选中的省
      table: {url: "/member/index", where: {}},  // 表格配置
      choose: [],  // 表格选中数据
      showEdit: false,  // 是否显示表单弹窗
      editForm: {},  // 表单数据
      editRules: {  // 表单验证规则
        realname: [
          {required: true, message: "请输入专家姓名", trigger: "blur"}
        ],
        sort: [
          {required: true, message: "请输入排序", trigger: "blur"}
        ]
      },
      memberLevelList: []  // 会员等级
    };
  },
  computed: {
    ...mapGetters(["permission"])
  },
  components: {uploadImage},
  mounted() {
    this.getMemberLevelList(); // 查询职级列表
  },
  methods: {
    /* 显示编辑 */
    edit(row) {
      this.editForm = Object.assign({}, row);
      this.showEdit = true;
      // 取值赋予城市组件
      this.city = row.city;
    },
    /* 保存编辑 */
    save() {
      this.$refs["editForm"].validate((valid) => {
        if (valid) {
          const loading = this.$loading({lock: true});
          this.editForm = Object.assign({}, this.editForm, {
            city: this.city
          });
          this.$http.post("/member/edit", this.editForm).then(res => {
            loading.close();
            if (res.data.code === 0) {
              this.showEdit = false;
              this.$message({type: "success", message: res.data.msg});
              this.$refs.table.reload();
            } else {
              this.$message.error(res.data.msg);
            }
          }).catch(e => {
            loading.close();
            this.$message.error(e.message);
          });
        } else {
          return false;
        }
      });
    },
    /* 删除 */
    remove(row) {
      if (!row) {  // 批量删除
        if (this.choose.length === 0) {
          return this.$message.error("请至少选择一条数据"); 
        }
        let ids = this.choose.map(d => d.id);
        this.$confirm('确定要删除选中的专家吗?', '提示', {type: 'warning'}).then(() => {
          const loading = this.$loading({lock: true});
          this.$http.post("/member/delete", {id: ids}).then(res => {
            loading.close();
            if (res.data.code === 0) {
              this.$message({type: "success", message: res.data.msg});
              this.$refs.table.reload();
            } else {
              this.$message.error(res.data.msg);
            }
          }).catch(e => {
            loading.close();
            this.$message.error(e.message);
          });
        }).catch(() => 0);
      } else {  // 单个删除
        const loading = this.$loading({lock: true});
        this.$http.post("/member/delete", {id: row.id}).then(res => {
          loading.close();
          if (res.data.code === 0) {
            this.$message({type: "success", message: res.data.msg});
            this.$refs.table.reload();
          } else {
            this.$message.error(res.data.msg);
          }
        }).catch(e => {
          loading.close();
          this.$message.error(e.message);
        });
      }
    },
    /* 更改状态 */
    editStatus(row) {
      const loading = this.$loading({lock: true});
      let params = Object.assign({}, row);
      this.$http.post("/member/status", params).then(res => {
        loading.close();
        if (res.data.code === 0) {
          this.$message({type: "success", message: res.data.msg});
        } else {
          row.status = !row.status ? 2 : 1;
          this.$message.error(res.data.msg);
        }
      }).catch(e => {
        loading.close();
        this.$message.error(e.message);
      });
    },
    /**
     * 获取职级列表
     */
    getMemberLevelList() {
      this.$http.get("/memberlevel/getMemberLevelList").then(res => {
        if (res.data.code === 0) {
          this.memberLevelList = res.data.data;
        } else {
          this.$message.error(res.data.msg);
        }
      }).catch(e => {
        this.$message.error(e.message);
      });
    }
  }
};
</script>

<style scoped>
.ele-block >>> .el-upload, .ele-block >>> .el-upload-dragger {
  width: 100%;
}
</style>
