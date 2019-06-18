import { Swipe, SwipeItem } from 'mint-ui';
import { Popup } from 'mint-ui';
import price_description from "./price-description";

export default (Vue) => {
	// console.log(Vue);
	// 定义全局组件
	Vue.component("price-description", price_description);
	Vue.component(Swipe.name, Swipe);
	Vue.component(SwipeItem.name, SwipeItem);
	Vue.component(Popup.name, Popup);


}