<template>
  <div class="container ele-body">
    <el-card class="envir">
      <ul>
        <li>当前在线企业：0</li>
        <li>当前失联企业：1</li>
        <li>当前在线设备：0</li>
        <li>当前失联设备：1</li>
        <li>当前停机设备：0</li>
      </ul>
    </el-card>
    <el-card class="map">
      <div :style="{ width: '500px', height: '770px' }">
        <amap
          id="amap"
          :events="events"
          :center="center"
          mapStyle="amap://styles/22abb2c0351bbba8b294f263b227c9ab"
        >
        </amap>
      </div>
    </el-card>
    <el-card class="enterprise">
      <div class="enter">
        <ul>
          <li>
            <el-dropdown>
              <el-button type="primary">
                名称<i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>南昌有色金属有限公司</el-dropdown-item>
                <el-dropdown-item>云诺荣智有限公司</el-dropdown-item>
                <el-dropdown-item>渭南市中心医院</el-dropdown-item>
                <el-dropdown-item>腾讯有限公司</el-dropdown-item>
                <el-dropdown-item>阿里巴巴有限公司</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </li>
          <li>
            <el-dropdown>
              <el-button type="primary">
                行政区域名称<i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>南昌市西湖区环保局</el-dropdown-item>
                <el-dropdown-item>西安市雁塔区环保局</el-dropdown-item>
                <el-dropdown-item>渭南市临渭区环保局</el-dropdown-item>
                <el-dropdown-item>广东省深圳市环保局</el-dropdown-item>
                <el-dropdown-item>浙江省杭州市环保局</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </li>
          <li>
            <el-dropdown split-button type="primary" @click="handleClick">
              所有行业
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>铸造</el-dropdown-item>
                <el-dropdown-item>矿</el-dropdown-item>
                <el-dropdown-item>医护</el-dropdown-item>
                <el-dropdown-item>游戏</el-dropdown-item>
                <el-dropdown-item>电商</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </li>
        </ul>
      </div>
      <div class="tab">
        <el-table :data="enter" height="480" border style="width: 100%">
          <el-table-column prop="index" label="" width="80" align="center">
          </el-table-column>
          <el-table-column
            prop="admin"
            label="行政区域"
            width="400"
            align="center"
          >
          </el-table-column>
          <el-table-column prop="name" label="企业" width="420" align="center">
          </el-table-column>
          <el-table-column
            prop="industry"
            label="行业"
            width="150"
            align="center"
          >
          </el-table-column>
        </el-table>
      </div>
      <div class="paging">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="10"
        >
        </el-pagination>
      </div>
    </el-card>
    <div class="bubble">
      <div class="frame">
        <el-card>
          <div class="tit">陕西云诺荣智科技有限公司</div>
          <div class="left">
            <ul>
              <li>行业：计算机软件</li>
              <li>状态：正常</li>
            </ul>
          </div>
          <div class="right">
            <ul>
              <li>生产：生产</li>
              <li>行政区域：西安市雁塔区环保局</li>
            </ul>
          </div>
          <p>地址：陕西省西安市雁塔区高新四路亮丽综合商务楼2号楼2904</p>
          <div class="bot">
            <ul>
              <li>
                <p>0个</p>
                <p>产污监测点</p>
              </li>
              <li>
                <p>1个</p>
                <p>治污监测点</p>
              </li>
              <li>
                <p>1个</p>
                <p>监测点</p>
              </li>
            </ul>
          </div>
        </el-card>
      </div>
      <div class="tip"></div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      center: [108.89996, 34.197646],
      loaded: false,
      // 经纬度变量
      lng: "",
      lat: "",
      // 详细地址变量
      address: "",
      currentPage: 1,
      plugin: [
        {
          enableHighAccuracy: true,
          timeout: 100,
          maximumAge: 0,
          convert: true,
          showButton: true,
          buttonPosition: "RB",
          showMarker: true,
          showCircle: true,
          panToLocation: true,
          zoomToAccuracy: true,
          extensions: "all",
          pName: "Geolocation",
          search: "",
          events: {
            init (o) {
              o.getCurrentPosition((status, result) => {
                if (result && result.position) {
                  self.lng = result.position.lng
                  self.lat = result.position.lat
                  self.center = [self.lng, self.lat]
                  self.loaded = true
                  self.$nextTick()
                }
              })
            },
            click (e) {
              let { lng, lat } = e.lnglat
              self.lng = lng
              self.lat = lat
              let geocoder = new AMap.Geocoder({
                radius: 1000,
                extensions: "all",
              })
              geocoder.getAddress([lng, lat], function (status, result) {
                if (status === "complete" && result.info === "OK") {
                  if (result && result.regeocode) {
                    self.address = result.regeocode.formattedAddress
                    self.$nextTick()
                  }
                }
              })
            },
          },
        },
      ],
      enter: [
        {
          index: 1,
          admin: "南昌市西湖区环保局",
          name: "南昌有色金属有限公司",
          industry: "铸造",
        },
        {
          index: 2,
          admin: "西安市雁塔区环保局",
          name: "云诺荣智有限公司",
          industry: "矿",
        },
        {
          index: 3,
          admin: "渭南市临渭区环保局",
          name: "渭南市中心医院",
          industry: "医护",
        },
        {
          index: 4,
          admin: "浙江省杭州市环保局",
          name: "阿里巴巴有限公司",
          industry: "电商",
        },
        {
          index: 5,
          admin: "广东省深圳市环保局",
          name: "腾讯有限公司",
          industry: "游戏",
        },
        {
          index: 6,
          admin: "南昌市西湖区环保局",
          name: "南昌有色金属有限公司",
          industry: "铸造",
        },
        {
          index: 7,
          admin: "西安市雁塔区环保局",
          name: "云诺荣智有限公司",
          industry: "矿",
        },
        {
          index: 8,
          admin: "渭南市临渭区环保局",
          name: "渭南市中心医院",
          industry: "医护",
        },
        {
          index: 9,
          admin: "浙江省杭州市环保局",
          name: "阿里巴巴有限公司",
          industry: "电商",
        },
        {
          index: 10,
          admin: "广东省深圳市环保局",
          name: "腾讯有限公司",
          industry: "游戏",
        },
      ],
    }
  },
  methods: {
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    },
  },
};
</script>
<style scoped>
* {
  list-style: none;
}
.envir {
  width: 100%;
}
.envir ul {
  width: 50%;
  display: flex;
  justify-content: space-between;
}
.map {
  width: 32%;
  float: left;
}
.enterprise {
  width: 67%;
  float: left;
  margin-left: 15px;
  height: 800px;
  margin-bottom: 20px;
}
.enter {
  width: 50%;
}
.enter ul {
  display: flex;
  justify-content: space-between;
}
.tab {
  margin-top: 10px;
  text-align: center;
}
.tab table {
  border-collapse: collapse;
  text-align: center;
  line-height: 40px;
}
.paging {
  margin-top: 20px;
}
.bubble {
  position: fixed;
  top: 260px;
  left: 400px;
}
.bubble .frame {
  width: 300px;
  height: 250px;
  border: 3px solid #ff0;
  border-radius: 10px;
}
.tip::before {
  content: "";
  width: 0;
  height: 0;
  border: 20px solid;
  position: absolute;
  bottom: -40px;
  left: 170px;
  border-color: #ff0 transparent transparent;
}
.tip::after {
  content: "";
  width: 0;
  height: 0;
  border: 20px solid;
  position: absolute;
  bottom: -36px;
  left: 170px;
  border-color: #fff transparent transparent;
}
.bot ul {
  width: 100%;
  display: flex;
  justify-content: space-between;
  /* margin-left: 10%; */
  margin-top: 10px;
}
.bot ul li {
  width: 28%;
  padding: 18.5px 0;
  text-align: center;
  border: 1px solid #eee;
}
</style>
