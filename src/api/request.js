// 封装请求：get post
// 面向对象es6 promise  等等。。。



// GET
let geting = function(urling,shopdata){
	uni.showLoading({
	    title: '加载中...'
		
	});
	return new Promise((resolve,reject)=>{
		uni.request({
			url:urling,
			method:'GET',
			data:shopdata
		})
		.then((res)=>{
			// console.log(res[1])
			resolve(res[1])
			 uni.hideLoading();
		})
		.catch((err)=>{
			
			reject(err)
		})
	})
}

// POST请求
let posting = function(urling,shopdata){
	uni.showLoading({
	    title: '加载中...'
		
	});
	return new Promise((resolve,reject)=>{
		uni.request({
			url:urling,
			method:'POST',
			data:shopdata
		})
		.then((res)=>{
			// console.log(res[1])
			resolve(res[1])
			 uni.hideLoading();
			
		})
		.catch((err)=>{
			let errs = '服务器错误 请稍后再试'
			errdata.errlist(errs)
			reject(err)
		})
	})
}

export{geting,posting}