<template>
  <div>
    <v-form style="margin: 30px auto; width: 90%;">
      <group v-model="group" style="margin: 20px 0;"></group>
      <v-text-field label="链接文字" outlined v-model="linkText"></v-text-field>
      <v-text-field label="链接" outlined v-model="link"></v-text-field>
      <v-textarea :error-message="error" label="正文(markdown语法)" v-model="text" outlined auto-grow></v-textarea>
      <p>{{ tip }}</p>
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
  watch: {
    text () { this.tip = this.error = '' },
    link () { this.tip = this.error = '' },
    group () { this.tip = this.error = '' },
    linkText () { this.tip = this.error = ''}
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
          this.tip = '推送已发布'
        })
        .catch(err => {
          this.error = err.response.data
        })
      this.loading = false
    }
  }
}
</script>