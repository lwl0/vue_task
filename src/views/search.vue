<template>
    <el-card class="box-card">
        <template #header>
    <div  class="clearfix" >
        <span>random query</span>
        <el-button style="float: right; padding: 3px 15px" type="text" @click="dialogVisible = true">Click on the query</el-button>
    </div>
    </template>
    <div class="text item">
        Randomly extract n data from the Mysql
    </div>
    </el-card>
    <el-card class="box-card">
        <template #header>
    <div  class="clearfix" >
        <span>condition query </span>
        <el-button style="float: right; padding: 3px 15px" type="text" @click="dialogVisible1 = true">Click on the query</el-button>
    </div>
    </template>
    <div>
      <el-dialog
        title="Please enter the number to be extracted"
        v-model="dialogVisible"
        width="30%">
        <el-input v-model="num" placeholder="Please enter integer"></el-input>
        <template #footer>     
          <span class="dialog-footer">
            <el-button @click="dialogVisible = false">cancel</el-button>
            <el-button type="primary" @click="randn">confirm</el-button>
          </span>
        </template>
  </el-dialog>
  </div>
    <div class="text item">
        Inquire about earthquakes in the location you want to know
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
      title="Please enter the location you want to query"
      v-model="dialogVisible1"
      width="30%">
      <el-input v-model="location" placeholder="location"></el-input>
      <template #footer>     
        <span class="dialog-footer">
          <el-button @click="dialogVisible1 = false">cancel</el-button>
          <el-button type="primary" @click="condition">confirm</el-button>
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

export default{
    name:'search',
    data(){
        return{
          dialogVisible:false,
          dialogVisible1:false,
          num:'',
          choose:'',
          location:''
        }
    },
    methods:{
      randn(){
        this.choose = 'rand';
        console.log('调用前的choose'+this.choose)
        this.$router.push({
          name:'table',
          params:{
            x: this.num,
            choose:this.choose
          },
        })
      },
      condition(){
        this.choose = 'condition';
        this.$router.push({
          name:'table',
          params:{
            x: this.location,
            choose:this.choose
          },
        })
      }
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
</style>