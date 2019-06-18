import Vue from "vue";
import Vuex from "vuex";
import apis from "@/core/api/index";
import Store from "storejs";
Vue.use(Vuex)

//定义属性值 data
const state = {
    shopCart: { "N": 0, "list": [] },
    detailsShop:{},
    totals:0,
    isLogin:false,
    mine:{}
}

//定义同步方法
const mutations = {
    vueInit(state){
        state.shopCart=Store.get("shopCart") ||{ "N": 0, "list": [] };   
        var total=0;
        state.shopCart.list.forEach(ele => {
            total+=ele.price
        });   
        state.totals=total 
    },
    add(state, data) {
        if (state.shopCart.list.length > 0) {
            var con = true;
            state.shopCart.list.forEach(ele => {
                state.totals=total
                if (ele.id == data.id) {
                    ele.num++
                    con=false
                    ele.price=data.price*ele.num
                    return
                }
            });
            if (con) {
                state.shopCart.list.push(data)
            }
            state.shopCart.N++
        } else {
            state.shopCart.list.push(data)
            state.shopCart.N++
        }  
        var total=0;
        state.shopCart.list.forEach(ele => {
            total+=ele.price
        });   
        state.totals=total 
        Store.set("shopCart",state.shopCart)
    },
    push(state,data){
        state.shopCart.list.forEach(ele => {
            if(ele.id==data){
                ele.num--
                if (ele.num == 0) {
                   ele.num = 1;
                   return
                }
                state.shopCart.N--
                ele.price=ele.oldprice*ele.num
            }
        });
        Store.set("shopCart",state.shopCart)
    },
    sub(state,data){
        state.shopCart.list.forEach(ele => {
            if(ele.id==data){
                ele.num++  
                state.shopCart.N++
                ele.price=ele.oldprice*ele.num
            }
        });
        Store.set("shopCart",state.shopCart)
    },

}

//定义 computed(属性计算)
const getters = {

}
//定义异步方法,可以在这个里面做一些异步操作,比如调用通用数据接口
const actions = {

}

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})