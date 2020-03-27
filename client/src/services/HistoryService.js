import Api from '@/services/Api'

export default {
  async get (userId) {
    return Api().get('history', {
      params: userId
    })
  },
  async post (historyData) {
    return Api().post('history', {
      params: historyData
    })
  }
}
