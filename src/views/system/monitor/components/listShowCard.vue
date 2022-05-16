<template>
  <el-row
    :gutter="5"
    justify="space-between"
    type="flex"
    element-loading-spinner="el-icon-loading"
    v-loading="load"
  >
    <el-col :span="5">
      <el-card
        :body-style="{
          background: 'linear-gradient(to bottom right, #4f91b5, #ece053)',
        }"
      >
        <div class="panel">
          <p class="">
            <span>{{ all.mei }}</span> <span>t</span>
          </p>
          <p>总能耗（煤）</p>
        </div>
      </el-card>
    </el-col>
    <el-col :span="5">
      <el-card
        :body-style="{
          background: 'linear-gradient(to bottom right, #e1a343, #3b5047)',
        }"
      >
        <div class="panel">
          <p>
            <span>{{ all.dian }}</span
            ><span>kWh</span>
          </p>
          <p>总用电量</p>
        </div>
      </el-card>
    </el-col>
    <el-col :span="5">
      <el-card
        :body-style="{
          background: 'linear-gradient(to bottom right, #d7c3a7, #231c21)',
        }"
      >
        <div class="panel">
          <p>
            <span>{{ all.shui }}</span
            ><span>t</span>
          </p>
          <p>总用水量</p>
        </div>
      </el-card>
    </el-col>
    <!--  -->
    <el-col :span="5">
      <el-card
        :body-style="{
          background:
            'linear-gradient(to bottom right, rgb(155 185 151), rgb(80 68 52))',
        }"
      >
        <div class="panel">
          <p>
            <span>{{ all.qi }}</span
            ><span>m³</span>
          </p>
          <p>总用气量</p>
        </div>
      </el-card>
    </el-col>
    <el-col :span="5">
      <el-card
        :body-style="{
          background: 'linear-gradient(to bottom right, #818889, #4ca433)',
        }"
      >
        <div class="panel">
          <p>
            <span>{{ all.you }}</span
            ><span>L</span>
          </p>
          <p>总用油量</p>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import { mapGetters } from "vuex"

import { getCouts } from '@/api/mainLay/energyzong'

export default {
  name: 'listShowCard',
  props: {
    routeDept: {
      type: Number
    },
    level: Number
  },
  data () {
    return {
      all: {
        dian: 0,
        mei: 0,
        qi: 0,
        shui: 0,
        you: 0
      },
      load: false
    }
  },
  watch: {
    routeDept (v) {
      if (this.level == 3) {
        this.allTotal(v)

      } else {
        this.alls(v)
      }
    }
  },
  computed: {
    ...mapGetters(["permission", "user"]),
  },
  methods: {
    // 总能耗
    async allTotal (dept_id) {
      this.load = true
      const res = await this.$http.get("/energy/getDeptCouts", {
        params: {
          dept_id: dept_id
        }
      }).catch(e => { this.$message.error(e.message) })
      this.load = false
      this.all = res.data.data
    },
    async alls (dept_id) {
      this.load = true
      const dian = getCouts({
        cate_id: 1,
        dept_id: dept_id
      })

      const shui = getCouts({
        cate_id: 2,
        dept_id: dept_id
      })
      const qi = getCouts({
        cate_id: 3,
        dept_id: dept_id
      })
      const mei = getCouts({
        cate_id: 4,
        dept_id: dept_id
      })
      const you = getCouts({
        cate_id: 5,
        dept_id: dept_id
      })
      const [elec, watter, air, coal, oil] = await this.$http.all([dian, shui, qi, mei, you])
      this.load = false
      this.all = {
        dian: elec.data.counts,
        mei: coal.data.counts,
        qi: air.data.counts,
        shui: watter.data.counts,
        you: oil.data.counts
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.panel {
  color: #fff;
  font-size: 18px;
  list-style: none;
  text-align: left;

  p:nth-child(1) {
    font-size: 0px;
    padding-bottom: 5px;
    span:nth-child(1) {
      font-size: 36px;
      margin-right: 10px;
    }
    span {
      font-size: 30px;
      text-align: center;
      margin: 0 auto;
    }
  }
  p {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
    margin: 0 auto;
  }
}
</style>