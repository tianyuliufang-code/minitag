App({
  globalData:{},//用来保存全局变量
  onLaunch:function(){
    //获取一些系统信息并保存为全局变量
    wx.getSystemInfo({
      success:res=>{
        this.globalData.StatusBar = res.statusBatHeight
        const custom = wx.getMenuButtonBoundingClientRect()
        this.globalData.Custom = custom
        this.globalData.CustomBar = custom.bottom + custom.top-res.statusBarHeight
      }
    })
  }
})