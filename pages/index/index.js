Page({
  data:{
    tab:0,
    todoList : [],
    tab0Empty:true,
    tab1Empty:true,
  },
  onShow(){
    //进入或者回退本页面都活刷新任务列表
    this.getTodoList()
  },
  getTodoList(){
    //  读取任务列表数据，初始默认为空数组
    const todoList = wx.getStorageSync('todoList') || [];
    //判断未完成和已完成的任务列表是否为空
    const tab0Empty = todoList.filter(item => !item.done).length === 0;
    const tab1Empty = todoList.filter(item => item.done).length === 0;
    //更新数据
    this.setData({
      todoList,
      tab0Empty,
      tab1Empty,
    })
  },
  // 切换tab时的回调函数
  onSelectTab(e){
    const newTab = e.currentTarget.dataset.tab
    if(this.data.tab !== newTab){
      this.setData({
        tab:newTab,
      })
    }
  }
})