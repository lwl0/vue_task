<template>
  <div>
    <el-menu style="width: 200px; min-height: calc(100vh - 50px)"
        :default-active="$route.path"
        class="el-menu-vertical-demo" router  @open="handleOpen" @close="handleClose" :collapse="isCollapse">
    <el-menu-item  v-for="item in menu" :index="item.path" :key="item.path" @click="clickMenu(item)">
    <template #title>
    <i :class="item.icon"></i>
    <!-- <i class="el-icon-location"></i> -->
    <span>{{item.label}}</span>
    </template>
    </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "Aside",
  data() {
    return {
        isCollapse: false,
        menu:[
          {
            path:'/',
            name:'Home',
            label:'系统首页',
            icon:'el-icon-s-home',
          },
          {
            path:'/search',
            name:'search',
            label:'任务3',
            icon:'el-icon-s-home',
          },
          {
            path:'/chart',
            name:'chart',
            label:'任务4',
            icon:'el-icon-s-home',
          },           
        ]
    }
  },
  methods: {
    handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
    handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
    clickMenu(item){
      this.$router.push(//页面跳转
        {
          name:item.name
        }
      ) 

      console.log('执行跳转')  
    },
}
}
</script>

<style scoped>

</style>