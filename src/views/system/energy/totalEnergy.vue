<template>
  <div class="ele-body">
    <Btn
      ref="btn"
      v-model="index"
      :convert.sync="convert"
      :departmentId.sync="departmentId"
      :dates.sync="dates"
    />
    <Overview v-if="!index" :convert="convert" :departmentId="departmentId" />

    <TimeView
      v-else
      :index="index"
      :convert="convert"
      :departmentId="departmentId"
      :dates="dates"
    />
  </div>
</template>
<script>
import Btn from './totalenergy/btn.vue'
import Overview from './totalenergy/overview.vue'
import TimeView from './totalenergy/timeView.vue'
export default {
  components: { Btn, Overview, TimeView },
  data () {
    return {
      index: 0,
      convert: 0,
      departmentId: null,
      dates: this.$moment().format('yyyy-MM-DD'),
    }
  },

}
</script>