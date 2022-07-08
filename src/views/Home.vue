<template>
    <div style="padding: 10px">
      <!--功能区-->
      <div style="margin: 10px">
        <el-button type="primary"  @click="add">add</el-button>   <!--新增按钮事件-->
         <!--<el-button type="primary">导入</el-button>
         <el-button type="primary">导出</el-button>-->
      </div>
      <!--查询-->
      <div style="margin: 10px 0">
            <el-input v-model="search" placeholder="Please enter a keyword" style="width: 20%" clearable></el-input>
            <el-button type="primary" @click="searchData" style="margin-left: 5px">search</el-button>
      </div>
      <!--查询-->
      <el-table
          :data="tableData"
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


        <el-table-column fixed="right" label="Operations">
          <template #default="scope"> <!-- //指定模板==>scope-->
            <el-button  size="small" @click="handleClick(scope.row)">edit</el-button>
            <el-popconfirm title="are you sure?" @confirm="handleDatele(scope.row.id)">
              <template #reference>
                <el-button  size="small" style="background-color: brown; color: aliceblue">delete</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>

      </el-table>
      <!--分页-->
      <div  style="margin: 10px 0">
        <el-pagination
            :current-page="currentPage"
            :page-size="pageSize"
            :page-sizes="[5, 10, 20]"
            :small="small"
            :disabled="disabled"
            :background="background"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange">
        </el-pagination>

        <!--add弹窗-->
        <el-dialog v-model="dialogVisible" title="edit data" width="30%">
          <!--add弹窗的表单-->
          <el-form :model="form" label-width="120px">
            <el-form-item label="time">
              <el-input v-model="form.time" style="width: 80%" />
            </el-form-item>
            <el-form-item label="place">
              <el-input v-model="form.place" style="width: 80%" />
            </el-form-item>
            <el-form-item label="latitude">
              <el-input v-model="form.latitude" style="width: 80%" />
            </el-form-item>
            <el-form-item label="longitude">
              <el-input v-model="form.longitude" style="width: 80%" />
            </el-form-item>
            <el-form-item  label="type">
                <el-select v-model="form.type" placeholder="choose">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="depth">
              <el-input v-model="form.depth" style="width: 80%" />
            </el-form-item>
            <el-form-item label="mag">
              <el-input v-model="form.mag" style="width: 80%" />
            </el-form-item>
            <el-form-item label="magType">
              <el-input v-model="form.magtype" style="width: 80%" />
            </el-form-item>
             <el-form-item label="nst">
              <el-input v-model="form.nst" style="width: 80%" />
            </el-form-item>
             <el-form-item label="gap">
              <el-input v-model="form.gap" style="width: 80%" />
            </el-form-item>
            <el-form-item label="dmin">
              <el-input v-model="form.dmin" style="width: 80%" />
            </el-form-item>
            <el-form-item label="rms">
              <el-input v-model="form.rms" style="width: 80%" />
            </el-form-item>
            <el-form-item label="net">
              <el-input v-model="form.net" style="width: 80%" />
            </el-form-item>
            <el-form-item label="updated">
              <el-input v-model="form.updated" style="width: 80%" />
            </el-form-item>
            <el-form-item label="horizontalError">
              <el-input v-model="form.horizontalerror" style="width: 80%" />
            </el-form-item>
            <el-form-item label="depthError">
              <el-input v-model="form.deptherror" style="width: 80%" />
            </el-form-item>   
             <el-form-item label="magError">
              <el-input v-model="form.magerror" style="width: 80%" />
            </el-form-item>  
            <el-form-item label="magNst">
              <el-input v-model="form.magnst" style="width: 80%" />
            </el-form-item>
            <el-form-item label="status">
              <el-radio v-model="form.status" label="automatic">automatic</el-radio>
              <el-radio v-model="form.status" label="reviewed">reviewed</el-radio>
              <el-radio v-model="form.status" label="deleted">deleted</el-radio>
            </el-form-item>
            <el-form-item label="locationSource">
              <el-input v-model="form.locationsource" style="width: 80%" />
            </el-form-item>
            <el-form-item label="magSource">
              <el-input v-model="form.magsource" style="width: 80%" />
            </el-form-item>
          </el-form>
          <template #footer>
              <span class="dialog-footer">
                  <el-button @click="dialogVisible = false">cancel</el-button>
                 <el-button type="primary" @click="save">confirm</el-button>
              </span>
          </template>
        </el-dialog>
      </div>

  </div>
</template>

<script>

import request from "@/untils/request";

export default {
name: "Home",
  components: {
  },
  data(){
  return {
    //变量
    form: {},
    dialogVisible: false,
    currentPage: '',
    pageSize: '',
    search: '',
    total: 0,
    tableData: [],      //这里是表格数据
    options: [{
          value: 'earthquake',
          label: 'earthquake'
        }, {
          value: 'quarry',
          label: 'quarry'
        }],
    }
  },
  created() {
    this.searchData()//加载时调用，下面的方法
  },

  /**
   * 方法
   */
  methods: {
    add(){
      this.dialogVisible = true;
      this.form = {};   //清空表单
    },
    save(){
      /**
       * 增加个修改数据都是通过form表单提交,所以做判断
       */
      if(this.form.id){
        //修改
        request.put("/home/update",this.form).then(res=>{
          console.log(res);
          if(res.code == 200){            //// /* this.$message({message: '新增成功',type: 'success'});*/
            this.$message({
              message: '更新成功',
              type: 'success'
            });
          }
          else {
            this.$message({
              message: res.msg,
              type: 'error'
            });
          }
          this.searchData();   //更新数据，等于刷新
          this.dialogVisible = false;  //关闭弹窗
        })
      }else {
        //确定按钮--》增加数据
        request.post("/home/create",this.form).then(res=>{
          console.log(res);
          if(res.code == 0){            //// /* this.$message({message: '新增成功',type: 'success'});*/
            this.$message({
              message: '新增成功',
              type: 'success'
            });
          }
          else {
            this.$message({
              message: res.msg,
              type: 'error'
            });
          }
          this.searchData();   //更新数据，等于刷新
          this.dialogVisible = false;  //关闭弹窗
          })
      }
    },
    searchData(){
      //搜索按钮--》
      //get请求,要加params
      request.get("/home/search",{
        params:{
          pageNum: this.currentPage,
          pageSize: this.pageSize,
          search: this.search
        }
      }).then(res=>{
        console.log(res);
        this.tableData = res.data.records;     //res.data.records,,,records是查询出来的数据   -->s
        this.total = res.data.total;
      })
    },
    handleClick(row){
        //编辑
      this.form = JSON.parse(JSON.stringify(row))  //把row的值赋给form,且隔离与其他的form
      this.dialogVisible = true;
    },
    handleDatele(id){
      console.log(id)
      request.delete("/home/delete"+id).then(res=>{
        console.log(res);
        if(res.code == 0){            //// /* this.$message({message: '新增成功',type: 'success'});*/
          this.$message({
            message: '删除成功',
            type: 'success'
          });
        }
        else {
          this.$message({
            message: res.msg,
            type: 'error'
          });
        }
        this.searchData();   //更新数据，等于刷新
      })
    },
    handleSizeChange(pageSize){
      this.pageSize = pageSize
      this.searchData()
    },
    handleCurrentChange(pageNum){
      this.currentPage = pageNum
      this.searchData()
    },
  }
}
</script>
