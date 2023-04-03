// pages/edit/edit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    editIndex:null, //编辑任务的序号 null 表示新建任务
    content:'', //任务内容
    done:false, //任务是否完成（仅编辑任务时有效）
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    //传入 editIndex 参数表示新建任务
    if(options.editIndex){
      //读取任务列表数据  
      const todoList = wx.getStorageSync('todoList')
      //  根据index 查找任务内容
      const todoItem =  todoList[options.editIndex]
      //记录到 data 中
      this.setData({
        editIndex:options.editIndex,
        content:todoItem.content,
        done:todoItem.done
      })
    }
  },
      //修改任务内容时的回调函数
      onInputContent(e){
        this.setData({
          content:e.detail.value
        })
      },
      //修改任务完成状态时的回调函数
      onChangeDone(e){
        this.setData({
          done:e.detail.value
        })
      },
      //提交表单保存本次编辑
      onSave(){
        //校验表单
        if(!this.data.content){
          wx.showToast({
            icon:'none',
            title:'内容不能为空'
          })
          return
        }
        //获取任务列表数据
        let todoList = wx.getStorageSync('todoList') || [];
        if(this.data.editIndex){
          //编辑任务时直接更新到原数据中
          todoList[this.data.editIndex].content = this.data.content
          todoList[this.data.editIndex].done = this.data.done
        }else{
          //新建任务时在任务列表中新增一项
          todoList.push({
            content:this.data.content,
            done:false //默认未完成任务
          })
        }
        //  保存
        this.saveTodoList(todoList)
      },
      //单击删除按钮的回调函数
      onClickDelete(){
        wx.showModal({
          title:'警告',
          content:'确认删除任务吗？（注意：本操作不可恢复）',
          success: res => {
            if (res.confirm){
            //获取数据任务列表
            let todoList = wx.getStorageSync('todoList') || [];
            //删除数据中从第 editIndex 开始数的 1 个元素
            todoList.splice(this.data.editIndex,1)
            this.saveTodoList(todoList)
          }else if(res.cancel){
            console.log('用户单击取消')
          }
        }
        })
      },
      saveTodoList(todoList){
        wx.setStorage({
          key:'todoList',
          data:todoList,
          success(){
            //保存成功后退回到上一页
            wx.navigateBack()
          },
          fail(err){
            //保存失败时提示用户
            console.error(err)
            wx.showToast({
              icon:'none',
              title:'保存失败'
            })
          }
        })
      },
      //
  

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})