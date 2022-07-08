<template>
    <el-card class="box-card">
        <template #header>
    <div  class="clearfix" >
        <span>随机查询</span>
        <el-button style="float: right; padding: 3px 15px" type="text" @click="dialogVisible = true">点击查询</el-button>
    </div>
    </template>
    <div class="text item">
        随机从库中抽取n个数据
    </div>
    </el-card>
    <el-card class="box-card">
        <template #header>
    <div  class="clearfix" >
        <span>条件查询</span>
        <el-button style="float: right; padding: 3px 15px" type="text" @click="dialogVisible1 = true">点击查询</el-button>
    </div>
    </template>
    <div>
      <el-dialog
        title="请输入要抽取的数量"
        v-model="dialogVisible"
        width="30%">
        <el-input v-model="num" placeholder="请输入整数"></el-input>
        <template #footer>     
          <span class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="randn">确 定</el-button>
          </span>
        </template>
  </el-dialog>
  </div>
    <div class="text item">
        查询你想知道的地点的地震情况
    </div>
    </el-card>
    <el-card class="box-card">
        <template #header>
    <div  class="clearfix" >
        <span>其他</span>
        <el-button style="float: right; padding: 3px 15px" type="text">操作按钮</el-button>
    </div>
    </template>
    <div>
    <el-dialog
      title="请输入要查询的地点"
      v-model="dialogVisible1"
      width="30%">
      <el-input v-model="location" placeholder="location"></el-input>
      <template #footer>     
        <span class="dialog-footer">
          <el-button @click="dialogVisible1 = false">取 消</el-button>
          <el-button type="primary" @click="condition">确 定</el-button>
        </span>
      </template>
</el-dialog>
</div>
    <div class="text item">
        其他待添加的查询
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