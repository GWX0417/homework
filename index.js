  //第一步：获取dom元素
  const mychartDom = document.getElementById('mychart')
  //   console.log(mychartDom);
  //第二步：将mychartDom初始化为一个Echart对象
  const myChart = echarts.init(mychartDom)
  const option = {
      title: {
          left: 'center'
      },
      tooltip: {
          trigger: 'item'
      },
      legend: {
          orient: 'vertical',
          left: 'left'
      },
      series: [{
          name: 'Access From',
          type: 'pie',
          radius: '50%',
          center: ["40%", "70%"],
          data: [{
                  value: 1048,
                  name: '拼多多'
              },
              {
                  value: 735,
                  name: '京东'
              },
              {
                  value: 580,
                  name: '淘宝'
              },
              {
                  value: 484,
                  name: ' 网易云'
              },
              {
                  value: 300,
                  name: '英雄联盟'
              }
          ],

      }]
  };

  myChart.setOption(option);
  //   
  // 
  // 
  //第一步：获取dom元素
  const mychartDom1 = document.querySelector('.mychart')
  //   console.log(mychartDom);
  //第二步：将mychartDom初始化为一个Echart对象
  const myChart1 = echarts.init(mychartDom1)
  const option1 = {
      tooltip: {
          trigger: 'item'
      },
      legend: {
          top: '5%',
          left: 'center'
      },
      series: [{
          name: 'Access From',
          type: 'pie',
          center: ['50%', '60%'],
          radius: ['25%', '50%'],
          //   avoidLabelOverlap: false,
          //   label: {
          //       show: false,
          //       position: 'center'
          //   },
          emphasis: {
              label: {
                  show: true,
                  fontSize: '40',
                  fontWeight: 'bold'
              }
          },
          //   labelLine: {
          //       show: false
          //   },
          data: [{
                  value: 1048,
                  name: '18+',
                  color: "#fff"
              },
              {
                  value: 735,
                  name: '30+'
              },
              {
                  value: 580,
                  name: '40+'
              },
              {
                  value: 484,
                  name: '50+'
              },
              {
                  value: 300,
                  name: '60+'
              }
          ]
      }]
  };

  myChart1.setOption(option1);

  const mychartDom2 = document.querySelector('.zzt')
  const myChart2 = echarts.init(mychartDom2);
  const option2 = {
      xAxis: {
          type: 'category',
          data: ['河南', '北京', '河北', '天津', '内蒙', '宁夏', '湖北']
      },
      yAxis: {
          type: 'value'
      },
      series: [{
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar'
      }]
  };
  myChart2.setOption(option2);


  //第一步：获取dom元素
  const mychartDom3 = document.querySelector('.zxt')
  //第二步：将mychartDom初始化为一个Echart对象
  const myChart3 = echarts.init(mychartDom3)

  //第三步：配置图表对象
  const option3 = {
      //标题组件
      title: {
          text: 'Echarts入门',
          subtext: '这叫副标题'
      },
      //提示组件
      tooltip: {},
      // 数据集
      //   dataset: {
      //       source: [
      //           ['金铲铲', 1000, 2000, 3000, 4000, 5000],
      //           ['英雄联盟', 2000, 4000, 5000, 8000, 9000],
      //           ['王者荣耀', 3000, 5000, 5000, 5000, 9000],
      //           ['和平精英', 4000, 8000, 5500, 8880, 2000],
      //           ['云顶之弈', 5000, 9000, 5000, 8000, 9000],

      //       ],
      //   },
      //X轴
      xAxis: {
          data: ['金铲铲', '英雄联盟', '王者荣耀', '和平精英', '云顶之弈', ],
      },
      //Y轴
      yAxis: {
          //最小刻度
          min: 0,
          //最大 刻度
          max: 200
      },
      //通过series生成数据对图的映射关系,重点
      series: [{
              type: 'line',
              data: [80, 40, 50, 100, 120],

          },

      ]

  }
  //第四步：渲染图表数据
  myChart3.setOption(option3)