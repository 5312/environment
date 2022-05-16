<template>
  <el-row class="wrap" :gutter="20">
    <el-col :span="6">
      <el-card :header="typeText + '总能耗'">
        <div class="flex flex_h_between" v-loading="right">
          <div class="text_center">
            <div class="ele-text-center num_box text_overflow">
              <span> {{ dall.counts | numberLength }} </span>
              <span class="unit">{{ unit }}</span>
            </div>
            <p class="ele-text-center">{{ typeText }}</p>
          </div>
          <div class="text_center">
            <div class="ele-text-center num_box text_overflow">
              <span> {{ dall.mei | numberLength }} </span>
              <span class="unit">t</span>
            </div>
            <p class="ele-text-center">折标煤</p>
          </div>
        </div>
      </el-card>
    </el-col>
    <el-col :span="18">
      <el-card>
        <div class="left_list">
          <div class="left ele-clear ele-clear-after">
            <div class="list_black">
              <div class="square">
                <p
                  class="icon"
                  :class="{
                    'el-icon-_flash': types == 1,
                    'el-icon-heavy-rain': types == 2,
                    'el-icon-sunset': types == 3,
                    'el-icon-bangzhu': types == 4,
                    'el-icon-coin': types == 5,
                  }"
                ></p>
                <p class="p">{{ typeText }}</p>
              </div>
            </div>
          </div>
          <div class="right ele-clear ele-clear-after" v-loading="right">
            <div class="list_black">
              <div class="rectangle flex flex_s_between">
                <div class="ele-text-left text_overflow">
                  当日：{{ dian.day | numberLength }}
                  <span class="text-left">{{ unit }}</span>
                </div>
                <div class="ele-text-left text_overflow">
                  昨日：{{ dian.yday | numberLength }}
                  <span class="text-left">{{ unit }}</span>
                </div>
                <div class="ele-text-left text_overflow">
                  <span class="sp1">同比：</span
                  ><span
                    :style="{
                      color: dian.dbili > 0 ? 'red' : '#09f309',
                    }"
                    >{{ (dian.dbili * 100) | numberLength }}%
                    <i
                      :class="{
                        'el-icon-caret-top': dian.dbili > 0 ? true : false,
                        'el-icon-caret-bottom': dian.dbili < 0 ? true : false,
                      }"
                    ></i
                  ></span>
                </div>
              </div>
            </div>
            <div class="list_black">
              <div class="rectangle flex flex_s_between">
                <div class="ele-text-left text_overflow">
                  当月：{{ dian.month | numberLength }}
                  <span class="text-left"> {{ unit }}</span>
                </div>
                <div class="ele-text-left text_overflow">
                  上月：{{ dian.ymoth ? dian.ymoth : 0 | numberLength }}
                  <span class="text-left">{{ unit }}</span>
                </div>
                <div class="ele-text-left text_overflow">
                  <span class="sp1">同比：</span
                  ><span
                    :style="{
                      color: dian.mbili > 0 ? 'red' : '#09f309',
                    }"
                    >{{ (dian.mbili * 100) | numberLength }}%
                    <i
                      :class="{
                        'el-icon-caret-top': dian.mbili > 0 ? true : false,
                        'el-icon-caret-bottom': dian.mbili < 0 ? true : false,
                      }"
                    ></i
                  ></span>
                </div>
              </div>
            </div>
            <div class="list_black">
              <div class="rectangle flex flex_s_between">
                <div class="ele-text-left text_overflow">
                  今年：{{ dian.year | numberLength }}
                  <span class="text-left">{{ unit }}</span>
                </div>
                <div class="ele-text-left text_overflow">
                  去年：{{ dian.yyear | numberLength
                  }}<span class="text-left">{{ unit }}</span>
                </div>
                <div class="ele-text-left text_overflow">
                  <span class="sp1">同比：</span
                  ><span
                    :style="{
                      color: dian.ybili > 0 ? 'red' : '#09f309',
                    }"
                    >{{ (dian.ybili * 100) | numberLength }}%
                    <i
                      :class="{
                        'el-icon-caret-top': dian.ybili > 0 ? true : false,
                        'el-icon-caret-bottom': dian.ybili < 0 ? true : false,
                      }"
                    ></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>
<script>
// 请求 
import { getCoutsClass, getCouts } from '@/api/mainLay/energyzong'
export default {
  name: 'Group_list',
  props: {
    types: Number,
    dept: Number
  },
  data () {
    return {
      dall: {
        counts: 0,
        mei: 0
      },
      dian: {
        day: 0,
        yday: 0,
        dbili: 0,


        month: 0,
        ymoth: 0,
        ymonth: 0,
        mbili: 0,

        year: 0,
        yyear: 0,
        ybili: 0,

      },
      right: false
    }
  },
  computed: {
    typeText () {
      const obj = ['电', '水', '气', '煤', '油']
      return obj[this.types - 1]
    },
    unit () {
      const obj = ['KW·h', 't', 'm³', 't', 'L']
      return obj[this.types - 1]
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    async getData () {
      this.right = true
      /* left 总能耗 */
      const left = getCouts({
        cate_id: this.types,
        dept_id: this.dept
      })
      /* right  分类能耗*/
      const right = getCoutsClass({
        cate_id: this.types,
        dept_id: this.dept
      })

      const [leftdata, rightdata] = await this.$http.all([left, right])
      this.dall = leftdata.data
      this.dian = rightdata.data
      this.right = false
    },
  }
}
</script>
<style lang="scss" scoped>
.text-left {
  margin-left: 10px;
  font-size: 16px;
}
.wrap {
  margin-bottom: 15px;
  .flex {
    .text_center {
      width: 50%;
      .num_box {
        width: 100%;
        font-size: 20px;
        white-space: nowrap;
      }
    }
  }
  .left_list {
    font-size: 0;
    .left {
      width: 20%;
      font-size: 14px;
      display: inline-block;
      .list_black {
        width: calc(100% - 20px);
        @extend .list_black;
      }
    }
    .right {
      margin-left: 20px;
      width: calc(80% - 20px);
      display: inline-block;
      .list_black {
        width: calc(30% - 20px);
        font-size: 14px;
        @extend .list_black;
      }
    }
  }
}

.list_black {
  float: left;
  height: 74px;
  border: 1px solid #ebebeb;
  transition: 0.2s;
  border-radius: 3px;
  text-align: center;
  padding: 10px;
  box-shadow: 0 0 3px 1px #ebebed99;
  &:nth-child(n + 2) {
    margin-left: 20px;
  }
  .square {
    width: 100%;
    font-size: 30px;
  }
  .rectangle {
    height: 100%;
    div {
      padding: 0 10px;
      width: calc(100% - 20px);
    }
  }
}
</style>