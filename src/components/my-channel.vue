<template>
   <el-select clearable :value="value" @change="fn" placeholder="请选择">
          <el-option
            v-for="item in channelOptions"
            :key="item.id"
            :label="item.name"
            :value="item.id"
            >
          </el-option>
        </el-select>
</template>
<script>
// watch: {
//     'reqParams.channel_id': function (newVal, oldVal) {
//       if (newVal === '') {
//         this.reqParams.channel_id = null
//       }
//     }
//   },
export default {
  name: 'my-channel',
  props: ['value'],
  data () {
    return {
      myValue: null,
      channelOptions: []
    }
  },
  created () {
    // 获取频道下拉选项数据
    this.getchannelOptions()
  },
  methods: {
    async getchannelOptions () {
      const { data: { data } } = await this.$http.get('channels')
      this.channelOptions = data.channels
    },
    fn (val) {
      if (val === '')val = null
      this.$emit('input', val)
    }
  }

}
</script>
<style scoped lang="less">

</style>
