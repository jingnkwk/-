<template>
	<view class="page">
			<view class="read-hedaer" :class="{'read-hedaers':isHead}">
				<view class="item" @click="onLastWord">
					上一话
				</view>
				<view class="item" @click="goMuli">
					回目录
				</view>
				<view class="item" @click="onNextWord">
					下一话
				</view>
			</view>
		<!-- <scroll-view class="scroll" scroll-with-animation="true" show-scrollbar="false" scroll-y @scrolltolower="onScrollTop"> -->
			<block v-for="(item,index) in ReadList" :key="index" >
				<view class="read-images" id="read-images" v-if="ReadList.length>0"  @click="onshowhide">
					<image :src="'https://images.weserv.nl/?url='+item.img" mode="widthFix"></image>
				</view>	
			</block>
			<view class="no-data" :class="{'show-data':isShow}" v-if="ReadList.length<=0">
				没有更多数据
			</view>
		<!-- </scroll-view> -->
		
		<!--系统信息-->
		<view class="read-system">
			<view class="y">
				
			</view>
			<view class="x">
				<view class="system">
					{{num}}
				</view>
				<!-- <view class="system">
					{{cindex}}/{{numLeng}}
				</view> -->
				<view class="system">
					{{time}}:{{branch}}
				</view>
				<view class="system">
					{{networkType}}
				</view>
				
				<view class="system">
					电量 {{electric}}%
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getCarcoonListUrl
	} from "../../api/index/index.js"
	export default {
		data() {
			return {
				//是否有数据
				isShow:true,
				//获取url
				urls:"",
				//漫画
				ReadList:[],
				//状态码
				networkType:"4G",
				//电量
				electric:"",
				//时
				time:0,
				//分
				branch:0,
				//显示一个漫画
				ReadListOne:[],
				
				num:1,
				// page:1
				dataIndex:[],
				//页码漫画
				page:0,
				//标题漫画
				nums:1,
				//标签名字
				numName:"",
				//延迟加载
				setTime:null,
				//漫画加载页数
				pages:1,
				//漫画加载权益控制
				isLoading:true,
				//控制加载速度
				pageSpeed:1,
				//显示隐藏
				isHead:false
				
			}
		},
		
		onLoad(e) {
			
			//console.log(e)
			//获取上一个页面传来的数据
			let data = JSON.parse(e.datas)
			//console.log(data[0])
			this.dataIndex = data
			//console.log(this.dataIndex.index)
			this.urls = data.url || this.dataIndex[0] ;
			
			this.num =  data.num || this.dataIndex[1] ;
			
			//获取manhunt
			this.getReadCarcoon();
			//获取网站状态码
			this.getNetworkTypes();
			
			//获取系统信息安卓电量
			//#ifdef APP-PLUS
			this.getSystemInfos();
			//#endif
			//微信小程序电量
			//#ifdef MP-WEIXIN
			this.getBattery()
			//#endif
			
			this.isScroll= true;
			
		},
		
		
	
		
		methods: {
			//回目录
			goMuli(){
				uni.navigateBack({
					  delta: 1
				})
			},
			
			//显示隐藏
			onshowhide(){
				this.isHead = !this.isHead
			},
			//加载一上话
			onLastWord(){
				
				let Dindex = this.dataIndex.index
				let isNant = isNaN(Number(Dindex))
				
				if(isNant){
					if(this.page<=0){
						return;
					}
					this.page = this.page - 2
					this.nums = this.nums-2
					this.getActions(this.page,this.nums);
				}else{
						//选集的数据
						if(this.dataIndex.index<=0){
							return;
						}
						// let pages = this.datas.index
						this.dataIndex.index = this.dataIndex.index -1			
						let YIndex = this.dataIndex.index+this.dataIndex.index+1
						this.getSlect(YIndex);
						this.getScrollTop();
				}
				
			},
			//加载一下话
			onNextWord(){
				let Dindex = this.dataIndex.index
				let isNant = isNaN(Number(Dindex))
				if(isNant){
					this.page = this.page + 2
					this.nums = this.nums+2
					this.getActions(this.page,this.nums);
				}else{
					//选集的数据
					// let pages = this.datas.index
					this.dataIndex.index = this.dataIndex.index +1
									
					let YIndex = this.dataIndex.index+this.dataIndex.index+1
					this.getSlect(YIndex);
				}
				
			},
			//选择过后的数据 选集
			getSlect(YIndex){
				let datasurl = this.dataIndex.allData[YIndex -1]
				let nums = this.dataIndex.allData[YIndex]
				this.num = nums
				this.getReadCarcoon(datasurl)
					this.getScrollTop();
			},
			
			//分类话
			getActions(page,num){
				//this.dataIndex[this.page]
				//获取当前标题
				this.numName = this.dataIndex[num]
				//获取当前url
				let pageIndex = this.dataIndex[page]
				let numNames = this.numName
				this.num = numNames
				this.getReadCarcoon(pageIndex)
				this.getScrollTop();
				this.isLoading = true
			},
			
			//回到顶部
			getScrollTop(){
				
				uni.pageScrollTo({
				scrollTop: 0,
				duration: 300
				});
				
			},
			//获取漫画
			getReadCarcoon(url){
				let urlIndex = url || this.urls
				//this.num = numNames;
				//console.log(urlIndex)
				this.$geting(`${getCarcoonListUrl}?mhurl2=${urlIndex}`).then(res=>{
					console.log(res.data.list)
					//this.numLeng = res.data.list.length
					this.ReadList = res.data.list
					
					
					if(res.data.code === 1){
						this.ReadList = []
						this.isShow = false;
					}
					
					
				})
			},
			//获取网络状态玛
			getNetworkTypes(){
				uni.getNetworkType({
					success: (res) => {
						//console.log(res)
						this.networkType = res.networkType;
					}
				})
				//获取时间
				var myDate = new Date();
				//console.log(myDate.getHours()+myDate.getMinutes())
				this.time = myDate.getHours();
				this.branch = myDate.getMinutes();
			},
			//h获取系统信息安卓手机下的
			//#ifdef APP-PLUS
			getSystemInfos(){
				//注意，安卓需要配置下manifest.json文件，打开后，进入模块权限配置，在右侧的Android权限设置里勾选上android.permission.BATTERY_STATS  
				let main = plus.android.runtimeMainActivity();  
				let Intent = plus.android.importClass('android.content.Intent');  
				let recevier = plus.android.implements('io.dcloud.feature.internal.reflect.BroadcastReceiver', {  
				          onReceive: (context, intent)=> {  
				        let action = intent.getAction();  
				        if (action == Intent.ACTION_BATTERY_CHANGED) {  
				            let level   = intent.getIntExtra("level", 0); //电量  
				            let voltage = intent.getIntExtra("voltage", 0); //电池电压  
				            let temperature = intent.getIntExtra("temperature", 0); //电池温度  
				                        //如需获取别的，在这里继续写，此代码只提供获取电量  
				           // console.log('1' +level)
							  this.electric = level
				        }  
				     }  
				 });  
				let IntentFilter = plus.android.importClass('android.content.IntentFilter');  
				let filter = new IntentFilter(Intent.ACTION_BATTERY_CHANGED);  
				main.registerReceiver(recevier, filter);
				
			},
			//#endif
		
		
			
			//微信小程序电量
			//#ifdef MP-WEIXIN
			getBattery(){
				wx.getBatteryInfo({
					success:(res)=>{
						//console.log(res)
						 this.electric = res.level
					}
				})
			}
			//#endif
		},
		
	}
</script>

<style>
	.page {
		width: auto;
		height: auto;
		overflow: auto;
		
	}
	.read-hedaer {
		display: flex;
		align-items: center;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 65upx;
		background-color: #000000;
		opacity: .8;
		z-index: 999;
		
		
	}
	.read-hedaer.read-hedaers{
		display: none;
	}
	.read-hedaer .item {
		flex: 1;
		line-height: 65upx;
		font-size: 32upx;
		color: #FFFFFF;
		text-align: center;
	}
	.scroll {
		width: 100%;
		height: 100%;
		white-space: nowrap;
		overflow: hidden;
	}
	.no-data {
		text-align: center;
		font-size: 45upx;
	}
	.no-data.show-data {
		display: none;
	}
	.read-images {
		 
			width: auto;
			height:auto;
	}
	.read-images image {
		display: block;
		width: 100%;
		height: 100%;
	}
	
	/*系统信息*/
	.read-system {
		
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 50upx;
	
		border-top-right-radius: 20upx;
		border-bottom-right-radius: 20upx;
		padding:  0 25upx;
		box-sizing: border-box;
	}
	.read-system .y {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background-color: #000000;
		opacity: .5;
		z-index: 1;
		overflow: hidden;
	}
	.read-system .x{
		position: absolute;
		align-items: center;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		z-index: 2;
		overflow: hidden;
	}
	.read-system .system {
		width: auto;
		height: auto;
		margin-left: 24upx;
		font-size: 28upx;
		color: #FFFFFF;
		font-weight: bold;
		line-height: 50upx;
		overflow: hidden;
	}
</style>
