import Api from '@/services/Api'

export default {
  index (bookmark) {
    return Api().get('bookmarks', {
      params: bookmark
    })
  },
  indexAll (bookmark) {
    console.log('hii')
    return Api().get('bookmarks/all', {
      params: bookmark
    })
  },
  post (bookmark) {
    return Api().post('bookmarks', {
      params: bookmark
    })
  },
  delete (bookmarkId) {
    return Api().delete(`bookmarks/${bookmarkId}`)
  }
}
