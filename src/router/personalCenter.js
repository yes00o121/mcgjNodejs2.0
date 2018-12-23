//个人中心路由
import center from '../views/conversation/personalCenter'//个人中心组建
import setting from '../views/conversation/personalCenter/setting'//个人中心个人设置
import settingPhoto from '../views/conversation/personalCenter/setting/detail/photo'//用户头像设置
var personalCenter = {
  path : '/personalCenter',
  mode: 'history',
  name : 'personalCenter',
  component : center
}
var settingView = {
  path : '/personalCenter/setting',
  name : 'setting',
  component : setting,
  children : [{
    //用户设置头像
    path : '/personalCenter/setting/photo',
    name : 'settingPhoto',
    component : settingPhoto
  }]
}
/*
var personalCenter ={
  path : '/personalCenter/setting',
  name : 'setting',
  component : setting
}*/
export {personalCenter,settingView}
