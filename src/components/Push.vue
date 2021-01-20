<template>
  <div>
    <v-form style="margin: 30px auto; width: 90%;">
      <group v-model="group" style="margin: 20px 0;"></group>
      <v-text-field label="链接文字" outlined v-model="linkText"></v-text-field>
      <v-text-field label="链接" outlined v-model="link"></v-text-field>
      <v-textarea :error-message="error" label="正文(markdown语法)" v-model="text" outlined auto-grow></v-textarea>
      <v-btn color="primary" large :disabled="!link || !linkText || !text" :loading="loading" @click="submit">推送</v-btn>
    </v-form>
  </div>
</template>

<script>
import Group from '@/components/Group.vue'
const SS = window.sessionStorage

export default {
  name: 'Push',
  data: () => ({
    group: '',
    tip: '',
    text: '',
    link: '',
    linkText: '',
    error: '',
    loading: false
  }),
  components: {
    Group
  },
  methods: {
    async submit () {
      this.loading = true
      await this.$ajax.post('/admin/message', {
          group: this.group,
          push: {
            link: this.link,
            text: this.text,
            linkText: this.linkText
          }
        }, { headers: { token: SS.token } })
        .then(() => {
          this.$swal.fire('推送已发布', '', 'success')
        })
        .catch(err => {
          this.$swal.fire(({
            icon: 'error',
            title: '错误',
            html: `<code>${err.response.data}<code>`
          }))
        })
      this.loading = false
    }
  }
}
</script>