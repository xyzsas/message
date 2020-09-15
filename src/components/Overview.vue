<template>
  <div class="overview">
    <h1 style="margin: 0 0 30px -10px;">{{ tip }}</h1>
    <p>管理员： {{ SS.name }}</p>
    <p>用户组权限： {{ SS.group }}</p>
    <p>功能简介：推送配置可以修改用户组的推送目标，推送可以向指定用户组推送消息(markdown格式)。</p>
  </div>
</template>

<script>
const SS = window.sessionStorage

export default {
  name: 'Overview',
  data: () => ({
    SS: SS
  }),
  computed: {
    tip () {
      if (SS.role === 'ADMIN') return '消息推送'
      else return '权限不足'
    }
  }
}
</script>

<style scoped>
  div.overview {
    padding: 30px 50px;
  }
</style>
