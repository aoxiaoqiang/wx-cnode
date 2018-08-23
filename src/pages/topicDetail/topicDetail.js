// import MarkdownIt from '../../modules/markdown-it.js'

Page({
  data: {
    detail: null, // 帖子详情
  },
  onLoad(opts) {
    wx.fetch({
      url: `${wx.apis.topicDetail}/${opts.id}`,
      data: {
        mdrender: true
      }
    }).then((res) => {
      // 日期
      res.data.data.create_at = wx.util.dateFomate(new Date(res.data.data.create_at), 'yyyy-MM-dd hh:mm:ss')
      res.data.data.last_reply_at = wx.util.dateFomate(new Date(res.data.data.last_reply_at), 'yyyy-MM-dd hh:mm:ss')

      // const md = new MarkdownIt()
      // let result = md.parse(res.data.data.content + '');

      // 帖子详情, 内容处理
      res.data.data.content = res.data.data.content.replace(/<img/g, '<img style="width:100%;" ')
      res.data.data.content = res.data.data.content.replace(/<table/g, '<table style="width:100%;" ')

      res.data.data.replies.map((reply) => {
        reply.content = reply.content.replace(/<img/g, '<img style="width:100%;" ')
        reply.content = reply.content.replace(/<table/g, '<table style="width:100%;" ')
        return reply;
      })

      this.setData({
        detail: res.data.data
      })
    })
  }
})