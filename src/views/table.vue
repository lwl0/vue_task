<template>
<div>
      <el-table
          :data="tableData.slice((currentPage-1)*size,currentPage*size)"
          border
          stripe
          style="width: 100%">

        <el-table-column
            prop="id"
            label="ID"
            sortable>
        </el-table-column>
        <el-table-column
            prop="time"
            label="time">
        </el-table-column>
        <el-table-column
            prop="place"
            label="place">
        </el-table-column>        
        <el-table-column
            prop="latitude"
            label="latitude">
        </el-table-column>
        <el-table-column
            prop="longitude"
            label="longitude">
        </el-table-column>
        <el-table-column
            prop="type"
            label="type">
        </el-table-column>
        <el-table-column
            prop="depth"
            label="depth">
        </el-table-column>
        <el-table-column
            prop="mag"
            label="mag">
        </el-table-column>
        <el-table-column
            prop="magtype"
            label="magType">
        </el-table-column>
        <el-table-column
            prop="nst"
            label="nst">
        </el-table-column>
        <el-table-column
            prop="gap"
            label="gap">
        </el-table-column>
        <el-table-column
            prop="dmin"
            label="dmin">
        </el-table-column>
        <el-table-column
            prop="rms"
            label="rms">
        </el-table-column>
        <el-table-column
            prop="net"
            label="net">
        </el-table-column>
        <el-table-column
            prop="updated"
            label="updated">
        </el-table-column>       
        <el-table-column
            prop="horizontalerror"
            label="horizontalError">
        </el-table-column>
        <el-table-column
            prop="deptherror"
            label="depthError">
        </el-table-column>
        <el-table-column
            prop="magerror"
            label="magError">
        </el-table-column>
        <el-table-column
            prop="magnst"
            label="magNst">
        </el-table-column>
        <el-table-column
            prop="status"
            label="status">
        </el-table-column>
         <el-table-column
            prop="locationsource"
            label="locationSource">
        </el-table-column>       
        <el-table-column
            prop="magsource"
            label="magSource">
        </el-table-column>
        
    </el-table>
    <div  style="margin: 10px 0">
        <el-pagination
         @size-change="handleSizeChange" 
         @current-change="handleCurrentChange" 
        :current-page="currentPage"
        :page-size="size"
        :page-sizes="sizes"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.length">
    </el-pagination>
    </div>
    <div style="margin: 10px 0">   
        <span class="dialog-footer">
          <el-button @click="goback">back</el-button>
        </span>     
    </div>
    
</div>

    
</template>

<script>

import request from "@/untils/request";

export default {
    name:'table',
    data(){
        return{
            currentPage:1,
            size:5,
            sizes:[5,10,20],
            tableData:[],
        }
    },
    methods:{
        getData(choose,x){
            if(choose=='rand'){

                request.get("/special/rand",{
                    params:{
                    num: x
                } }).then(res=>{
                        console.log(res);
                        this.tableData = res.data.data;
                        let message = '';
                        if(res.data.cache){
                            message = '从redis缓存中查询成功' +'用时'+res.data.time+'ms';
                        }else{
                            message = '从mysql中查询成功' +'用时'+res.data.time+'ms';
                        }
                        this.$message({
                            message: message,
                             type: 'success'
                            });

            }).catch((err)=>{
        console.log("获取的后端数据出错2:", err);
        this.$message({
                  type:'error',
                  message:err.msg
                })
      })               
            }else if (choose=='condition'){
                request.get("/special/condition",{
                    params:{
                    location: x
                }
                }).then(res=>{
                        console.log(res);
                        this.tableData = res.data.data;
                        let message = '';
                        if(res.data.cache){
                             message = '从redis缓存中查询成功' +'用时'+res.data.time+'ms';
                        }else{
                             message = '从mysql中查询成功' +'用时'+res.data.time+'ms';
                        }
                        this.$message({
                            message: message,
                             type: 'success'
                            });

            }).catch((err)=>{
        console.log("获取的后端数据出错2:", err);
        this.$message({
                  type:'error',
                  message:err.msg
                })
      })  
            }
        },
    handleSizeChange(val) {
           // 改变每页显示的条数 
           this.size=val
           // 注意：在改变每页显示的条数时，要将页码显示到第一页
           this.currentPage=1
       },
         // 显示第几页
    handleCurrentChange(val) {
           // 改变默认的页数
           this.currentPage=val
       },
       goback(){
        this.$router.push({
          name:'search',
        })
       }
    },
    mounted() {
    let x = this.$route.params.x;
    let choose = this.$route.params.choose;
    console.log(x);
    console.log(choose);
    this.getData(choose,x);
  },
}
</script>