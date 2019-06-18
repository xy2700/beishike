export default (Vue)=>{
    // 全局指令配置
    Vue.directive("getThis",(el)=>{
        el.onclick=function(){
            alert("Ok")
        }
    })
}