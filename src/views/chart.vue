<template>
    <el-card class="box-card">
        <template #header>
    <div  class="clearfix" >
        <span>Map of earthquake grade distribution</span>
        <el-button style="float: right; padding: 3px 15px" type="text" @click="mag">Click on the query</el-button>
    </div>
    </template>
    <div class="text item">
        A histogram of the magnitude of earthquakes in the last month
    </div>
    </el-card>
    <el-card class="box-card">
        <template #header>
    <div  class="clearfix" >
        <span>scatter diagram</span>
        <el-button style="float: right; padding: 3px 15px" type="text" @click="dialogVisible1 = true">Click on the query</el-button>
    </div>
    </template>
    <div>
      <el-dialog
        title="Distribution histogram"
        v-model="dialogVisible"
        width="80%"
        @open="openFun()">
    <div id ="one" ref="echarts" class="chartContain" style="width: 600px;height:400px;">
    </div>
        <template #footer>     
          <span class="dialog-footer">
            <el-button @click="dialogVisible = false">cancel</el-button>
            <el-button type="primary" @click="dialogVisible = false">confirm</el-button>
          </span>
        </template>
  </el-dialog>
  </div>
    <div class="text item">
        Scatter plot of magnitude to depth
    </div>
    </el-card>
    <el-card class="box-card">
        <template #header>
    <div  class="clearfix" >
        <span>others</span>
        <el-button style="float: right; padding: 3px 15px" type="text">button</el-button>
    </div>
    </template>
    <div>
    <el-dialog
      title="scatter diagram"
      v-model="dialogVisible1"
      @open="openTwo()"
      width="80%">
        <div id ="two" ref="echarts" class="chartContain" style="width: 600px;height:400px;"></div>
      <template #footer>     
        <span class="dialog-footer">
          <el-button @click="dialogVisible1 = false">cancel</el-button>
          <el-button type="primary" @click="dialogVisible1 = false">confirm</el-button>
        </span>
      </template>
</el-dialog>
</div>
    <div class="text item">
        undetermined
    </div>
    </el-card>
</template>

<script>
import request from "@/untils/request";
import * as echarts from 'echarts';

export default{
    name:'chart',
    data(){
        return{
          dialogVisible:false,
          dialogVisible1:false,
          choose:'',
          data:[],
          chart: null,
        }
    },
    
    methods:{
        mag(){

            this.dialogVisible = true;            
        },
  openFun() {
    //打开加载图表
    // console.log("初始化图表前的data")
    // console.log(data)
    request.get("/chart/mag").then(res=>{
            this.data = res.data;
            // console.log("获取的后端数据1:", res);
            var option = {
            title: {
                    text: 'number of earthquake'
            },
            tooltip: {},
            legend: {
                data:['number']
                },
            xAxis: {
                    data: ["0~1","1~2","2~3","3~4","4~5"]
                },
            yAxis: {},
            series: {
                name: 'number',
                type: 'bar',
                data: [5, 20, 36, 10, 10],
                color: ['#66FF99'],
            }
            }; 
            option.series.data = res.data;
            this.$nextTick(() => {
            this.initChart(option,"one");
        });                               
        }).catch((err)=>{
    console.log("获取的后端数据出错2:", err);
            this.$message({
                type:'error',
                message:err.msg
                })
    });

  },
    openTwo() {
    //打开加载图表
    // console.log("初始化图表前的data")
    // console.log(data)
    request.get("/chart/point").then(res=>{
            this.data = res.data;
            console.log("获取的后端数据1:", res);
            var point=[];
            for(let i=0;i<res.data.length;i++){
                point.push([res.data[i].mag,res.data[i].depth])
            }
            var option={
                title: {
                text: '散点图'
                },
                tooltip: {
                trigger: 'axis',
                showDelay: 0,
                axisPointer: {
                    show: true,
                    type: 'cross',
                    lineStyle: {
                    type: 'dashed',
                    width: 1
                    }
                },
                zlevel: 1
                },
                toolbox: {
                show: true,
                feature: {
                    mark: {show: true},
                    dataZoom: {show: true},
                    dataView: {show: true, readOnly: false},
                    restore: {show: true},
                    saveAsImage: {show: true}
                }
                },
                xAxis: [
                {
                    type: 'value',
                    scale: true,
                    name:'mag'
                }
                ],
                yAxis: [
                {
                    type: 'value',
                    scale: true,
                    name:'depth'
                }
                ],
                series: [
                {
                    name: 'sin',
                    type: 'scatter',
                    large: true,
                    symbolSize: 3,
                    data: point
                }
                ]
            };
            option.series.data = res.data;
            this.$nextTick(() => {
            this.initChart(option,"two");
        });                               
        }).catch((err)=>{
    console.log("获取的后端数据出错2:", err);
            this.$message({
                type:'error',
                message:err.msg
                })
    });

  },
    initChart(data,id){
            
            var chartDom = document.getElementById(id);
            this.chart = echarts.init(chartDom);
            console.log("画图的时候的数据");
            console.log(data) 
            this.chart.setOption(data); 
        },
    },
    mounted(){
        
    }
}
</script>

<style>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 480px;
    height: 500px;
  }

  .chartContain {
  width: 100%;
  height: 100%;
}
</style>