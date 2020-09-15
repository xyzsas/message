<template>
  <div class="admin">
    <v-tabs v-model="tab">
      <v-tab key="overview">概览</v-tab>
      <v-tab key="config">推送配置</v-tab>
      <v-tab key="push">推送</v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item key="overview">
        <overview></overview>
      </v-tab-item>
      <v-tab-item key="config">
        <config></config>
      </v-tab-item>
      <v-tab-item key="push">
        <push></push>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import Overview from '@/components/Overview.vue'
import Config from '@/components/Config.vue'
import Push from '@/components/Push.vue'

export default {
  name: 'Admin',
  data: () => ({
    tab: 0
  }),
  components: {
    Overview, Config, Push
  },
  mounted () {
    if (window.sessionStorage.role !== 'ADMIN') window.location.href = '/index.html'
  }
}
</script>

<style scoped>
  div.admin {
    color: #333;
    width: 100%;
    height: 100vh;
  }

  h3 {
    position: relative;
    width: 100%;
    color: #555;
    margin: 10px 0 20px;
  }

  .form {
    height: 310px;
    padding: 30px 100px;
    margin-bottom: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: all 0.5s ease;
  }

  @media (max-width: 500px) {
    .form {
      width: 100%;
      padding: 30px 10px;
    }
  }
</style>
