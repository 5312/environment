<template>
  <!-- 小地图选择经纬度弹窗 -->
  <div class="bullet">
    <el-card>
      <div class="bulltop">
        <p class="p1">选择位置</p>
        <p class="p2" @click="close">×</p>
      </div>
    </el-card>
    <div class="bullmap">
      <!-- <el-card class="search">
        <el-input placeholder="请输入地址" v-model="mapName" class="mapSearch"></el-input>
        <el-button icon="el-icon-search" @click="search"></el-button>
      </el-card> -->
      <el-row>
        <el-col :span="15">
          <el-card>
            <!-- <div class="map1"> -->
            <baidu-map
              class="map"
              :center="map.center"
              :zoom="map.zoom"
              @ready="handler"
            >
            </baidu-map>
            <!-- <amap
                ref="amap"
                :zoom="8"
                id="amap"
                @click="events"
                :center="center"
              >
              </amap> -->
            <!-- </div> -->
          </el-card>
        </el-col>
        <el-col :span="9">
          <el-card class="posit">
            <div>
              <p>
                经纬度：<span>{{ lat }}，{{ lng }}</span>
              </p>
              <p>详细地址：{{ address }}</p>
              <p class="nice" @click="great">确认</p>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
// import AMap from 'AMap'
export default {
  name: "fence-manage",
  data() {
    // const self = this;
    return {
      map: {
        center: { lng: 107.861286, lat: 35.295183 },
        zoom: 9,
        // show: true,
        dragging: false
      },
      mapbullet: false,
      // mapName:"",
      // center: [109.02643, 34.276265],
      loaded: false,
      // 经纬度变量
      lng: "",
      lat: "",
      // 详细地址变量
      address: "",
      searchOption: {
        city: "",
        citylimit: false
      }
    };
  },
  methods: {
    handler({ BMap, map }) {
      let me = this;
      // console.log(BMap, map)
      // 鼠标缩放
      map.enableScrollWheelZoom(true);
      // 点击事件获取经纬度
      map.addEventListener("click", function(e) {
        me.lng = e.point.lng;
        me.lat = e.point.lat;
        var point = new BMap.Point(e.point.lng, e.point.lat);
        var gc = new BMap.Geocoder();
        gc.getLocation(point, res => {
          // var addComp = res.addressComponents
          // console.log(addComp)
          me.address = res.address;
          // console.log(res.address)
        });
      });
    },
    close() {
      this.$emit("trans", this.mapbullet);
    },
    great() {
      this.$emit("trans", this.mapbullet, this.lng, this.lat, this.address);
    }
    // search(){},
    // addMarker(lnglats) {
    //   if (this.marker) {
    //     this.$amap.remove(this.marker);
    //   }
    //   this.marker = new AMap.Marker({
    //     position: lnglats,
    //     map: this.$amap,
    //   });
    // },
    // events(e) {
    //   let self = this;
    //   if (e.lnglat) {
    //     self.lng = e.lnglat.lng;
    //     self.lat = e.lnglat.lat;
    //     var lng = this.lng;
    //     var lat = this.lat;
    //     let geocoder = new AMap.Geocoder({
    //       radius: 1000,
    //       extensions: "all",
    //     });
    //     geocoder.getAddress([lng, lat], function (status, result) {
    //       if (status === "complete" && result.info === "OK") {
    //         if (result && result.regeocode) {
    //           self.address = result.regeocode.formattedAddress;
    //           self.$nextTick();
    //         }
    //       }
    //     });
    //   } else {
    //     this.position = null;
    //   }
    // },
  },
  beforeDestroy() {
    if (this.$refs.amap) {
      this.$refs.amap.$map.destroy();
    }
  }
};
</script>
<style scoped>
.bullet {
  width: 800px;
  height: 600px;
  background-color: #fff;
  position: fixed;
  top: 25%;
  left: 35%;
}
.bulltop {
  height: 40px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
  line-height: 40px;
}
.p1 {
  margin-left: 10px;
  font-size: 18px;
}
.p2 {
  margin-right: 10px;
  font-size: 26px;
}
.posit {
  height: 530px;
}
.posit p {
  font-size: 16px;
}
.posit span {
  font-weight: bold;
  color: #f00;
}
.nice {
  width: 200px;
  height: 50px;
  border-radius: 10px;
  border: 1px solid #ddd;
  margin-left: 20px;
  margin-top: 200px;
  text-align: center;
  line-height: 50px;
}
.map {
  width: 530px;
  height: 500px;
  /* margin-top: 20px; */
}
.Search {
  display: flex;
  justify-content: space-between;
}
.mapSearch {
  width: 85%;
  margin-left: 2%;
}
</style>
