// import MarkdownIt from '../../modules/markdown-it.js'

Page({
  data: {
    detail: null
  },
  onLoad(opts) {
    wx.fetch({
      url: `${wx.apis.topicDetail}/${opts.id}`,
      data: {
        mdrender: true
      }
    }).then((res) => {
    	console.log(res)
    	
      res.data.data.create_at = wx.util.dateFomate(new Date(res.data.data.create_at), 'yyyy-MM-dd hh:mm:ss')
      res.data.data.last_reply_at = wx.util.dateFomate(new Date(res.data.data.last_reply_at), 'yyyy-MM-dd hh:mm:ss')

      // const md = new MarkdownIt()
      // let result = md.parse(res.data.data.content + '');

      // console.log(result)

      res.data.data.content = res.data.data.content.replace(/<img/g, '<img style="width:100%;" ')
      res.data.data.content = res.data.data.content.replace(/<table/g, '<table style="width:100%;" ')

      this.setData({
        detail: res.data.data
      })
    })
  }
})