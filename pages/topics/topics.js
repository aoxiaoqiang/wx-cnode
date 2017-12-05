Page({
  data: {
    groupTabs: [{
      tab: 'all',
      text: '全部'
    }, {
      tab: 'share',
      text: '分享'
    }, {
      tab: 'ask',
      text: '问答'
    }, {
      tab: 'job',
      text: '招聘'
    }],
    tabSelectedIndex: 0,
    scrollHeight: '100%',
    topicsData: []
  },
  onLoad(options) {
    this.setData({
      scrollHeight: wx.getSystemInfoSync().windowHeight - wx.util.rpx2px(100)
    })

    this.page = 1;
    this.limit = 10;
    this.isEnd = false;
    this.loadTopics()
  },
  switchTab(e) { // 切换帖子分类
    this.setData({
      tabSelectedIndex: e.target.dataset.index
    })
    this.page = 1;
    this.isEnd = false;
    this.loadTopics()
  },
  loadMore() { // 加载更多
    this.page++;
    this.loadTopics();
  },
  loadTopics() { // 加载帖子列表
    if (this.page === 1) {
      this.setData({
        topicsData: []
      })
    }
    if (this.isEnd) return;
    wx.fetch({
      url: wx.apis.topics,
      data: {
        page: this.page,
        limit: this.limit,
        tab: this.data.groupTabs[this.data.tabSelectedIndex].tab,
        mdrender: false
      },
      noStatus: true
    }).then((res) => {
      if (res.data.data.length < this.limit) {
        this.isEnd = true
        return
      }
      let dataList = this.data.topicsData
      res.data.data.forEach((item, index, arr) => {
        dataList.push(item)
      })

      this.setData({
        topicsData: dataList
      })
    })
  },
  toDetail(e) { // 帖子详情
    console.log(e)
    const topicId = e.currentTarget.dataset.topicid;
    wx.safeNavigateTo({
      url: `/pages/topicDetail/topicDetail?id=${topicId}`
    })
  }
})