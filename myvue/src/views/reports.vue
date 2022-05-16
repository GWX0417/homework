<template>
  <div id="echarts">
    <div>
      <div>
        <div
          ref="myChart"
          :style="{ width: '700px', height: '400px', 'text-align': 'center' }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import _ from "lodash";
import { getarrival } from "@/http/api";
export default {
  data() {
    return {
      options: {
        title: {
          text: "用户来源",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#E9EEF3",
            },
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            boundaryGap: false,
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
      },
    };
  },
  mounted() {
    this.aaa();
  },
  methods: {
    async aaa() {
      let res = await getarrival();
      let myChart = echarts.init(this.$refs.myChart);
      myChart.setOption(_.merge(res, this.options));
    },
  },
  components: {},
};
</script>

<style lang="scss">
#echarts{
    width: 800px;
    height: 800px;
    text-align: center;
    margin: 100px auto;
}
</style>
