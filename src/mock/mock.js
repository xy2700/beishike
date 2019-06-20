import axios from 'axios'

import MockAdapter from 'axios-mock-adapter';
import {UserData} from './data/userInfo' 

let mock=new MockAdapter(axios)
 // mock success request  模拟成功请求
mock.onGet('/success').reply(200,{msg:'success'});

 // mock error request  模拟失败请求
mock.onGet('/error').reply(500,{msg:'failure'})

 // login 模拟登录接口
mock.onPost('/login').reply(config=>{
    let {username,password}=JSON.parse(config.data);
    //console.log(config)

    return new Promise((resolve,reject)=>{
        let user={};
        setTimeout(()=>{
             // 判断模拟的假数据中是否有和传过来的数据匹配的
            let hasUser=UserData.some(person=>{
                 // 如果存在这样的数据
                if(person.username===username && person.password==password){
                    user['id']=person.id;
                    user['username']=person.username
                    return true
                }else{
                     //  如果没有这个person
                    return false
                }
            });
             // 如果有那么一个人
            if(hasUser){
                resolve([200,{code:200,msg:'登录成功',data:user}])
            }else{// 如果没有这么一个人
                resolve([200,{code:500,msg:'Oops，查无此号，请重新输入:-)'}])
            }
        },500);
        
    })
    
//注册接口
   
    
})
mock.onPost('/regist').reply(config => {
    var reqdata=JSON.parse(config.data);
    UserData.push(reqdata);
   // Store.set("userList",userList);
    return [200,{ code: 1,msg:"注册成功"}];
    // 做一个数据效验
});
export default axios;