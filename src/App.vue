<template>
  <router-view></router-view>
</template>

<script>
import request from '@/utils/request'
export default {
  name: 'App',
  setup () {
    const getTestRes = async () => {
      const res = await request({
        url: '/getTest'
      })
      console.info(res)
    }
    getTestRes()
  }
}
</script>

<style>
</style>
