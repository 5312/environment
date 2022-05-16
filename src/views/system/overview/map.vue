<template>
  <div class="container ele-body">
    <el-row>
      <el-card>
        <ul>
          <el-row>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <li>
                  <p>概况</p>
                  <div class="survey">
                    <ul>
                      <li>
                        <p>
                          <span>{{ qiye1.counts ? qiye1.counts : 0 }}</span
                          >家
                        </p>
                        <p>企业</p>
                      </li>
                      <li>
                        <p>
                          <span>{{
                            jiance1.counts1 + jiance1.counts2
                              ? jiance1.counts1 + jiance1.counts2
                              : 0
                          }}</span
                          >个
                        </p>
                        <p>监测点</p>
                      </li>
                      <li>
                        <p>
                          <span>{{
                            shebei1.counts1 + shebei1.counts2
                              ? shebei1.counts1 + shebei1.counts2
                              : 0
                          }}</span
                          >个
                        </p>
                        <p>设备在线</p>
                      </li>
                    </ul>
                  </div>
                </li>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <li>
                  <p>能源消耗</p>
                  <div class="survey energy">
                    <ul>
                      <li>
                        <p>
                          <span>{{ meidy.day ? meidy.day : 0 }}</span
                          >t
                        </p>
                        <p>折标煤</p>
                        <p>今日</p>
                      </li>
                      <li>
                        <p>
                          <span>{{ meidy.yday ? meidy.yday : 0 }}</span
                          >t
                        </p>
                        <p>折标煤</p>
                        <p>昨日</p>
                      </li>
                    </ul>
                  </div>
                </li>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <li>
                  <p>环境监测</p>
                  <div class="contaminated survey">
                    <p class="today">今日</p>
                    <ul>
                      <li>
                        <p>
                          <span>{{
                            enterprise.counts ? enterprise.counts : 0
                          }}</span
                          >家
                        </p>
                        <p>异常企业</p>
                      </li>
                      <li>
                        <p>
                          <span>{{ monitor.counts ? monitor.counts : 0 }}</span
                          >处
                        </p>
                        <p>异常监测点</p>
                      </li>
                    </ul>
                  </div>
                </li>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <li>
                  <p>设备报警</p>
                  <div class="police survey">
                    <ul>
                      <li>
                        <p>
                          <span>{{ equipment.count1 }}</span
                          >条
                        </p>
                        <p>报警数</p>
                      </li>
                      <li>
                        <p>
                          <span>{{ equipment.count2 }}</span
                          >条
                        </p>
                        <p>已处理报警数</p>
                      </li>
                    </ul>
                  </div>
                </li>
              </div>
            </el-col>
          </el-row>
        </ul>
      </el-card>
      <el-card>
        <el-row>
          <el-col class="colorSpan" :span="18">
            <!-- 引入百度地图 -->
            <div id="all-map" class="map">
              <baidu-map
                class="map"
                :center="map.center"
                :zoom="map.zoom"
                @ready="handler"
              >
                <bm-navigation anchor="BMAP_ANCHOR_TOP_LEFT"></bm-navigation>
                <!--点-->
                <div v-for="item in marker" :key="item.id">
                  <bm-marker
                    :dragging="map.dragging"
                    :position="{ lng: item.lng, lat: item.lat }"
                    animation="BMAP_ANIMATION_DROP"
                    @click="infomarkerFunc(item)"
                    class="icon"
                    :icon="{
                      url: 'http://api.map.baidu.com/lbsapi/creatmap/images/us_mk_icon.png',
                      size: { width: 22, height: 26 },
                      opts: {
                        imageOffset: { width: -23, height: -45 },
                      },
                    }"
                  >
                    <!-- :icon="{url:'http://api.map.baidu.com/img/markers.png',size:{width:20, height:22}}" -->
                    <!-- marker点底部矿名 -->
                    <bm-label
                      :content="item.posit"
                      :offset="{ width: -35, height: 30 }"
                      :labelStyle="{ color: '#000', border: '1px' }"
                    />
                    <!-- 信息窗 -->
                    <bm-info-window
                      :position="{ lng: item.lng, lat: item.lat }"
                      :show="item.show"
                    >
                      <!-- <el-card shadow="always"> -->
                      <div class="info-window">
                        <div class="entop">
                          <p class="qiye" v-if="blo">
                            {{ infomarker.posit }}
                          </p>
                          <p class="qiye" v-if="blo1">
                            {{ infomarker.name }}
                          </p>
                        </div>
                        <div class="lok">
                          <div class="inner">
                            <p>能耗设备数：{{ shebei.counts1 }}个</p>
                            <p>能耗监测点：{{ jiance.counts1 }}个</p>
                            <el-button
                              type="primary"
                              icon="el-icon-search"
                              class="btn"
                              @click="jumpele"
                              >查看能耗</el-button
                            >
                          </div>
                          <div class="inner">
                            <p>环境设备数：{{ shebei.counts2 }}个</p>
                            <p>环境监测点：{{ jiance.counts2 }}个</p>
                            <el-button
                              type="primary"
                              icon="el-icon-search"
                              class="btn huanjing"
                              @click="jumphuanjing"
                              >查看环境</el-button
                            >
                          </div>
                        </div>
                      </div>
                      <!-- </el-card> -->
                    </bm-info-window>
                  </bm-marker>
                </div>
              </baidu-map>
            </div>
          </el-col>
          <!-- 右侧导航菜单 -->
          <el-col :span="6">
            <el-tree
              :indent="10"
              :data="data"
              node-key="id"
              :props="defaultProps"
              default-expand-all
              @node-click="infomark"
              class="tree-line"
              :empty-text="empty"
            >
              <span slot-scope="{ data }">
                <span class="span">
                  <i
                    class="i2"
                    :class="{
                      'el-icon-office-building': data.level == 1 ? true : false,
                      'el-icon-school': data.level == 2 ? true : false,
                      'el-icon-truck': data.level == 3 ? true : false,
                      span2: data.level == 3 ? true : false,
                      i: data.level == 3 ? true : false,
                    }"
                  ></i>
                  {{ data.name }}
                </span>
              </span>
            </el-tree>
          </el-col>
        </el-row>
      </el-card>
    </el-row>
  </div>
</template>
<script>
import "@riophae/vue-treeselect/dist/vue-treeselect.css"
import unit from "../../../../src/utils/util"
import { mapGetters } from "vuex"
import json from "./style.js"

export default {
  name: "fence-manage",
  computed: {
    ...mapGetters(["permission", "user", "theme"]),
    empty () {
      if (this.data != []) {
        return "正在加载"
      } else {
        return "暂无数据"
      }
    }
  },
  data () {
    return {
      // 实例地图
      map: {
        center: { lng: 109.59996, lat: 35.307646 },
        zoom: 10,
        show: false,
        dragging: false
      },
      data: [],
      list: [].map(position => ({
        position
      })),
      marker: [],
      events: "",
      loaded: false,
      size: "400px",
      defaultProps: {
        children: "children",
        label: "name"
      },
      infomarker: false,
      blo: false,
      blo1: false,
      equipment: [],
      meidy: [],
      monitor: [],
      enterprise: [],
      qiye: [],
      jiance: [],
      shebei: [],
      qiye1: [],
      jiance1: [],
      shebei1: [],
      dept: "",
      dept1: "",
      level_id: "",
      array: [],
      posit: ""
    }
  },
  watch: {
    dept (e) {
      if (e) {
        if (console.capsule) {
          console.capsule("watch", "dept", "error")
        }
        this.equi()
        this.enter()
        this.monit()
        this.surveyenter()
        this.surveymonit()
        this.surveynum()
      }
    },
    //依赖dept_id为dept1时调用的接口
    "user.dept_id" (d) {
      console.log("dept_id")
      // 必须在 有部门id 的情况下请求
      if (d && this.user.token) {
        this.get_DeptList()

        this.getId()
        this.mei()
        this.surveyenter1()
        this.surveymonit1()
        this.surveynum1()
      }
    }
  },
  mounted () {
    // this.getId();
    if (this.user.user.dept_id) {
      this.get_DeptList()

      this.getId()
      this.mei()
      this.surveyenter1()
      this.surveymonit1()
      this.surveynum1()
    }
  },
  methods: {
    // 左侧树形单位名称
    async get_DeptList () {
      if (console.request) console.request("请求单位列表")
      const list_data = await this.$http
        .get("/dept/getUserDepList", {
          params: {
            dept_id: this.user.user.dept_id
          }
        })
        .catch(e => {
          this.$message.error(e.message)
        })
      //
      if (list_data) {
        this.list = list_data.data.data
        this.data = unit.toTreeData(
          list_data.data.data,
          "id",
          "pid",
          "children"
        )
        this.mapinit()
      }
    },
    /* eslint-disable*/
    handler ({ BMap, map }) {
      // 点击地图
      /* eslint-disable*/
      // 鼠标缩放
      map.enableScrollWheelZoom(true)
      // 点击事件获取经纬度
      map.addEventListener("click", function () { })
      // 地图主题
      if (this.theme.theme == 'dark' || this.theme.theme == 'blue-dark') {
        map.setMapStyleV2({
          // styleId: "9afd9f07f2656665118495feb91e8d38"
          styleJson: json
        })
      }
    },
    // 获取用户id
    getId () {
      this.dept1 = this.user.user.dept_id
      this.dept = this.dept1
      // 登录用户ID
      this.level_id = this.user.level_id
    },
    // 点击右侧导航菜单切换地图中心点并展示弹框
    infomark (e) {
      this.jiance = []
      this.shebei = []
      this.infomarker = e
      this.dept = e.id
      if (e.level == 3) {
        let lng = e.lnglat.split(",")[0]
        let lat = e.lnglat.split(",")[1]
        this.map.center = { lng: lng, lat: lat }
        this.infomarker.posit = e.name
        this.infomarker.lev = e.level
        this.markerFilter(e.id);
        // this.center = e.lnglat ? e.lnglat.split(",") : null;
        (this.blo = false), (this.blo1 = true)
      } else {
        this.markerFilter(e.id, false)
      }
    },
    // 点击地图marker点展示弹框
    infomarkerFunc (item) {
      this.jiance = []
      this.shebei = []
      this.infomarker = item
      this.dept = item.id
      if (item.lev == 3) {
        let lng = item.lng
        let lat = item.lat
        this.map.center = { lng: lng, lat: lat }
        this.markerFilter1(item.id);
        (this.blo = true), (this.blo1 = false)
      } else {
        this.infomarker = false
      }
    },
    // 点击右侧导航菜单地图弹框定位检索
    markerFilter (id, boolean = true) {
      let array = this.marker
      for (let i = 0; i < array.length; i++) {
        const element = array[i]
        if (id === element.id) {
          this.marker[i].show = boolean
          this.map.zoom = 12
        } else {
          this.marker[i].show = false
        }
      }
      return false
    },
    // 点击marker点地图弹框定位检索
    markerFilter1 (id) {
      let array = this.marker
      for (let i = 0; i < array.length; i++) {
        const element = array[i]
        if (id === element.id) {
          this.marker[i].show = true
        } else {
          this.marker[i].show = false
        }
      }
      return false
    },
    // 跳转能耗
    jumpele () {
      if (this.infomarker.lev == 3) {
        this.$router.push({
          path: "/system/monitor/electric",
          query: {
            id: this.infomarker.id,
            name: this.infomarker.posit
          }
        })
      }
    },
    // 跳转环境
    jumphuanjing () {
      if (this.infomarker.lev == 3) {
        this.$router.push({
          path: "/system/overview/use",//"/system/monitor/environmental",
          query: {
            id: this.infomarker.id,
            name: this.infomarker.posit
          }
        })
      }
    },

    //  百度地图marker点
    mapinit () {
      this.list.forEach(i => {
        if (i.level == 3) {
          this.marker.push({
            lng: i.lnglat.split(",")[0],
            lat: i.lnglat.split(",")[1],
            posit: i.name,
            creat: i.create_user_name,
            id: i.id,
            lev: i.level
          })
        }
      })
    },
    equi () {
      this.$http
        .get("/Tongji/getCoutsErrShebei", {
          params: {
            dept_id: this.dept
          }
        })
        .then(res => {
          this.equipment = res.data.data
        })
    },
    mei () {
      this.$http
        .get("/Tongji/getCoutsMei", {
          params: {
            dept_id: this.dept1
          }
        })
        .then(res => {
          this.meidy = res.data.data
        })
    },
    enter () {
      this.$http
        .get("/Tongji/getCoutsErrDept", {
          params: {
            dept_id: this.dept
          }
        })
        .then(res => {
          this.enterprise = res.data.data
        })
    },
    monit () {
      this.$http
        .get("/Tongji/getCoutsErrSpot", {
          params: {
            dept_id: this.dept
          }
        })
        .then(res => {
          this.monitor = res.data.data
        })
    },
    surveyenter () {
      this.$http
        .get("/Tongji/getCoutsDept", {
          params: {
            dept_id: this.dept
          }
        })
        .then(res => {
          this.qiye = res.data.data
        })
    },
    surveymonit () {
      this.$http
        .get("/Tongji/getCoutsSpot", {
          params: {
            dept_id: this.dept
          }
        })
        .then(res => {
          this.jiance = res.data.data
        })
    },

    surveynum () {
      this.$http
        .get("/Tongji/getCoutsShebi", {
          params: {
            dept_id: this.dept
          }
        })
        .then(res => {
          this.shebei = res.data.data
        })
        .catch(e => [console.log(e)])
    },
    surveyenter1 () {
      this.$http
        .get("/Tongji/getCoutsDept", {
          params: {
            dept_id: this.dept1
          }
        })
        .then(res => {
          this.qiye1 = res.data.data
        })
    },
    surveymonit1 () {
      this.$http
        .get("/Tongji/getCoutsSpot", {
          params: {
            dept_id: this.dept1
          }
        })
        .then(res => {
          this.jiance1 = res.data.data
        })
    },
    surveynum1 () {
      this.$http
        .get("/Tongji/getCoutsShebi", {
          params: {
            dept_id: this.dept1
          }
        })
        .then(res => {
          this.shebei1 = res.data.data
        })
    }
  }
};
</script>
<style lang="scss" scoped>
* {
  list-style: none;
}
.survey {
  width: 97%;
  background: linear-gradient(to bottom right, #1787f3, #4cbefa);
  height: 90px;
  padding-top: 40px;
  border-radius: 10px;
  margin-top: 10px;
  text-align: center;
}
.survey ul {
  display: flex;
  justify-content: space-around;
}
.survey span {
  font-size: 24px;
}
.energy {
  background: linear-gradient(to bottom right, #fe4870, #ff7ca1);
}
.contaminated {
  background: linear-gradient(to bottom right, #d19e29, #e4c559);
}
.contaminated .today {
  text-align: right;
  margin-right: 20px;
  position: relative;
  bottom: 20px;
}
.police {
  background: linear-gradient(to bottom right, #783dcb, #b284e6);
}
.qiye {
  width: 100%;
  height: 20px;
  line-height: 20px;
  margin-bottom: 20px;
}
.inner button {
  margin-left: 10px;
  margin-top: 20px;
}
.jiance {
  width: 100%;
  height: 40px;
  line-height: 40px;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  margin-bottom: 20px;
}
.info-window {
  width: 300px;
}
.entop {
  display: flex;
  justify-content: space-between;
}
.close {
  height: 20px;
  line-height: 20px;
  font-size: 30px;
  margin-right: 10px;
}
.amap-logo {
  display: none;
  opacity: 0 !important;
}
.amap-copyright {
  opacity: 0;
}
.colorSpan {
  color: #000;
}
.lok {
  display: flex;
  justify-content: space-around;
}
.huanjing {
  background-color: #2bccce;
  border: none;
}
$height: calc(100vh - 330px);
$indent: 14px;
$lineColor: #52627c;
.map {
  width: 100%;
  height: $height;
}
.tree-line {
  height: $height;
  overflow-y: scroll;
  /deep/.el-tree-node {
    position: relative;
    padding-left: $indent; // 缩进量
  }
  /deep/.el-tree-node__children {
    padding-left: $indent; // 缩进量
  }
  // 竖线
  /deep/.el-tree-node::before {
    content: "";
    height: 100%;
    width: 1px;
    position: absolute;
    left: -3px;
    top: -26px;
    border-width: 1px;
    border-left: 1px dashed $lineColor;
  }
  // 当前层最后一个节点的竖线高度固定
  /deep/.el-tree-node:last-child::before {
    height: 38px; // 可以自己调节到合适数值
  }

  // 横线
  /deep/.el-tree-node::after {
    content: "";
    width: 45px;
    height: 20px;
    position: absolute;
    left: -3px;
    top: 12px;
    border-top: 1px dashed $lineColor;
  }

  // 去掉最顶层的虚线，放最下面样式才不会被上面的覆盖了
  & > .el-tree-node::after {
    border-top: none;
  }
  & > .el-tree-node::before {
    border-left: none;
  }

  // 展开关闭的icon
  /deep/.el-tree-node__expand-icon {
    z-index: 99;
    font-size: 16px;
    // 叶子节点（无子节点）
    &.is-leaf {
      color: transparent;
    }
  }
}
.i {
  position: relative;
  right: 30px;
  z-index: 9;
}
.i2 {
  margin-right: 10px;
}
.span2 {
  margin-right: -20px;
}
</style>
