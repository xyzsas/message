<template>
  <div style="padding: 30px;">
    <p>{{ tip }}</p>
    <v-list-item v-for="(v, k) in list" :key="k" @click="open(k)">
      <v-list-item-content>
        <v-list-item-title>{{ k }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-btn style="position: fixed; bottom: 10%; right: 10%;" color="primary" @click="add" fab large><v-icon>mdi-plus</v-icon></v-btn>
    <v-dialog v-model="dialog" max-width="400px" justify="center">
      <v-card style="padding: 0 30px;">
        <v-card-title>推送配置</v-card-title>
        <v-text-field outlined dense type="text" v-model="group" label="用户组" :error-message="error" :disabled="fixGroup || submitLoading"></v-text-field>
        <v-text-field outlined dense type="text" v-model="url" :disabled="submitLoading" label="推送目标URL"></v-text-field>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="dialog = false">关闭</v-btn>
          <v-btn v-if="fixGroup" :loading="submitLoading" color="error" text @click="remove">删除</v-btn>
          <v-btn :loading="submitLoading" color="primary" text @click="submit" :disabled="!group || !url">确认</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
const SS = window.sessionStorage

export default {
  name: 'Config',
  data: () => ({
    tip: '正在加载...',
    dialog: false,
    submitLoading: false,
    fixGroup: false,
    group: '',
    url: '',
    error: '',
    list: []
  }),
  mounted () {
    this.getList()
  },
  watch: {
    url () { this.error = '' },
    group () { this.error  = '' }
  },
  methods: {
    getList () {
      this.tip = '正在载入...'
      this.$ajax
        .get('/admin/message', { headers: { token: SS.token } })
        .then(resp => {
          this.tip = '点击列表可以修改，点击添加按钮可以新增。'
          this.list = resp.data
        })
        .catch(err => {
          this.tip = err.response.data
        })
    },
    open (group) {
      this.group = group
      this.fixGroup = true
      this.url = this.list[group]
      this.dialog = true
    },
    add () {
      this.fixGroup = false
      this.group = ''
      this.url = ''
      this.dialog = true
    },
    submit () {
      this.submitLoading = true
      this.$ajax
        .put('/admin/message', {
          group: this.group,
          url: this.url
        }, { headers: { token: SS.token } })
        .then(() => {
          this.dialog = false
          this.submitLoading = false
          this.getList()
        })
        .catch((err) => {
          this.error = err.response.data
          this.submitLoading = false
        })
    },
    remove () {
      this.submitLoading = true
      this.$ajax
        .delete('/admin/message?group=' + this.group, { headers: { token: SS.token } })
        .then(() => {
          this.dialog = false
          this.submitLoading = false
          this.getList()
        })
        .catch((err) => {
          this.error = err.response.data
          this.submitLoading = false
        })
    }
  }
}
</script>