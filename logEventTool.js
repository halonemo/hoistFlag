/**
 * 埋点上报函数
 */
import $axios from "../axios/v1.0.0/index.js"
import tool from "./tools"
function getPassThrough(name) {
  let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i")
    let target = tool.getAttr.getPassThrough()
    var r = target && target.match(reg)
    if (r != null) return unescape(r[2])
    return null
  
}
export default {
  logEvent(event, data) {
    switch (event) {
      /**
       * 页面加载完上报
       */
      case "pageview":
        $axios
          .post("https://event.dc.oppomobile.com/stat/dcs", {
            // head: {
            //     model: "R7Plusm",
            //     imei: "000000846807170",
            //     osVersion: "V3.0.0_160308_Alpha",
            //     androidVersion: "5.1.1",
            //     carrier: 99,
            //     romVersion: "R7PlusmROM_11_160308_Alpha",
            //     access: "WIFI",
            //     channel: "ColorOS",
            //     sdkVersion: "5.0.9alpha",
            //     region: "china"
            // },
            body: [
              {
                logTag: "2018403", //业务id
                eventID: "10000", //事件id
                // networkID: '4g',  //联网方式
                // eventTime: '2017-02-06 17:53:07',
                appId: 20184, //产品ID
                // appVersion: '1.0', //app版本名
                // appName: '123',
                // appPackage: '', //app包名
                ssoid: "",
                logMap: JSON.stringify({
                  cookieId: tool.getAttr.getCookieId(),
                  fromSource: getPassThrough('fromSource'),
                  viewEnv: tool.getAttr.getViewEnv(),
                  refer: document.referrer, //上一级url
                  url: window.location.href, //当前url
                  pageId: window.ACTIVITY_PAGEID,
                  position: "", //（空）页面位置
                  moduleId: "", //（空）组件英文名
                  moduleType: "", //组件中文名（开发者的命名）
                  moduleTitle: "", //(空)（活动创建者的命名）
                  moduleInPosition: "", //(空)
                  activityId: window.ACTIVITY_DATA.activityId || "",
                  materialId: window.MATERIAL_ID || "",
                  userGroupId: window.ACTIVITY_DATA.user_group_id || "",
                  ua: navigator.userAgent
                })
              }
            ]
          })
          .then(function(response) {
            console.log(`pageview report ${response.msg}`)
          })
          .catch(function(error) {
            console.log(error)
            // alert('error:' + error)
          })
        break

      /**
       * 组件曝光上报
       */
      case "expose":
        $axios
          .post("https://event.dc.oppomobile.com/stat/dcs", {
            body: [
              {
                logTag: "2018403",
                eventID: "20000",
                appId: 20184,
                ssoid: "",
                logMap: JSON.stringify({
                  cookieId: tool.getAttr.getCookieId(),
                  fromSource: getPassThrough('fromSource'),
                  viewEnv: tool.getAttr.getViewEnv(),
                  refer: document.referrer,
                  url: window.location.href,
                  pageId: window.ACTIVITY_PAGEID,
                  position: data.pos,
                  moduleId: data.moduleInfo.name,
                  moduleType: data.moduleInfo.label,
                  moduleTitle: data.moduleInfo.type, //(可为空)
                  moduleInPosition: "",
                  activityId: window.ACTIVITY_DATA.activityId || "",
                  materialId: window.MATERIAL_ID,
                  userGroupId: window.ACTIVITY_DATA.user_group_id || "",
                  ua: navigator.userAgent
                })
              }
            ]
          })
          .then(function(response) {
            console.log(`expose report ${response.msg}`)
          })
          .catch(function(error) {
            console.log(error)
          })
        break

      /**
       * 用户交互上报
       */
      case "interact":
        $axios
          .post("https://event.dc.oppomobile.com/stat/dcs", {
            body: [
              {
                logTag: "2018403",
                eventID: "30000",
                appId: 20184,
                logMap: JSON.stringify({
                  cookieId: tool.getAttr.getCookieId(),
                  fromSource: getPassThrough('fromSource'),
                  viewEnv: tool.getAttr.getViewEnv(),
                  refer: document.referrer,
                  url: window.location.href,
                  pageId: window.ACTIVITY_PAGEID,
                  position: data.pos,
                  moduleId: data.moduleInfo.name, //组件英文名
                  moduleType: data.moduleInfo.label, //组件中文名
                  moduleTitle: data.moduleInfo.type, //(可为空)
                  moduleInPosition: data.positionInModule,
                  activityId: window.ACTIVITY_DATA.activityId || "",
                  materialId: window.MATERIAL_ID,
                  userGroupId: window.ACTIVITY_DATA.user_group_id || "",
                  ua: navigator.userAgent
                })
              }
            ]
          })
          .then(function(response) {
            console.log(`interactEvent report ${response.msg}`)
          })
          .catch(function(error) {
            console.log(error)
          })
        break
    }
  }
}
