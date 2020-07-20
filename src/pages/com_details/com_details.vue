<template>
	<view class="page">
		<!--详情头部-->
		<view class="details-header">
			
				<view class="header-iamge">
					<image :src="carcoonData.cover" ></image>
				</view>
				<view class="header-lable">
					<view class="lable-name">
						{{carcoonData.name}}
					</view>
					<!-- <view class="lable-pic">
						{{carcoonData.tag}}
					</view> -->
				</view>
			
			
			
			<view class="header-wrap">
				<block v-for="(item1,index1) in wrapData" :key="index1">
					<view class="wrap " :class="{wrap1:index1 === 1}">
						<view class="icon">
							<image :src="item1.img" mode=""></image>
						</view>
						<view class="name">
							{{item1.name}}
						</view>
					</view>
				</block>
				
				
				
				
			</view>
		</view>
		
		<!--详情内容区域-->
		<view class="details-section">
			<!--留言区域-->
			<view class="section-message" style="display: none;">
				
			</view>
			<!--详情区域-->
			<view class="details-wrap">
				<view class="wrap-introduce  " :class="{'wrap-introduceAuto':isAuto}">
					<view class="text">
						{{carcoonData.introduce}}
					</view>
					<view class="show" :class="{'hide':isAuto}" @click="onShows()">
						
					</view>
				</view>
				<view class="wrap-author">
					作者: {{carcoonData.author}}
				</view>
				<view class="wrap-status">
					更新至: {{carcoonData.time}}
				</view>
			</view>
			
			<!--目录区域-->
			
			<view class="section-catalog"  >
				<view class="catalog-header">
					<view class="header-title">
						完结
					</view>
					<view class="header-time">
						2020.11.29  
					</view>
					<view class="header-pic" @click="onIsHide()">
						选集
					</view>
				</view>
				
				<!--选集-->
				<view class="catalog-works" :class="{hide:isHide}">
					<block v-for="(item,index) in XjArrays" :key="index">
						<view class="works" @click="onWorks(item,index)">
							{{(XjArrays[index-1])?(XjArrays[index-1]):'0'}}-{{item}}
						</view>
					</block>
					
					
				</view>
				<!--目录-->
				<view class="catalog-content">
					<block v-for="(item2,index2) in carcoonListTian" :key="index2">
						<view class="content" @click="goRead(index2,item2.url,item2.num)">
							<view class="text">
								{{item2.num}}
							</view>
						</view>
					</block>
					
				</view>
			
				<view style="width: 100%;height: 130upx;">
					
				</view>
				
			</view>
			
			
			
		</view>
	
		
		<!--底部导航-->
		<view class="details-btom">
			<view class="btom">
				<view class="btom-icon">
					<image src="../../static/images/index/shouchang.png" mode=""></image>
				</view>
				<view class="btom-name">
					收藏
				</view>
			</view>
			
			
			
			<view class="btom">
				<view class="btom-icon">
					<image src="../../static/images/details/fenx.png"></image>
				</view>
				<view class="btom-name" @click="onShare()">
					分享
				</view>
			</view>
			
			<view class="btom">
				<view class="btom-icon">
					<image src="../../static/images/details/gengd.png" mode=""></image>
				</view>
				<view class="btom-name">
					更多
				</view>
			</view>
			
			<view class="btom btom1" @click="goReadALL()">
				
				<view class="btom-name btom-name1">
					{{nums}}
				</view>
				<view class="btom-name btom-name1" >
					开始阅读
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
				//导航数据
				wrapData:[
					{
						'name':'留言',
						'img':require('../../static/images/details/liuyan.png')
					},
					{
						'name':'详情',
						'img':require('../../static/images/details/xaingq.png')
					},
					{
						'name':'目录',
						'img':require('../../static/images/details/mul.png')
					}
				],
				//搜索结果列表内的urlurl
				url:"",
				//获取标题
				carcoonData:{},
				//漫画集数
				carcoonList:[],
				carcoonListTian:[],
				//隐藏显示文字
				isAuto:false,
				//开始阅读
				allData:[],
				//本地缓存数据
				storData:{},
				//当前辩题
				nums:"",
				//选集数组
				XjArray:[],
				XjArrays:[],
				
				//是否显示选集目录
				isHide:true
				
			}
		},
		onLoad(e) {
			//console.log(e)
			this.url = e.url;
			//获取漫画内容
			this.getcarcoonData();
			// 
			// this.getXjArray();
			
		},
		
	
		
		onShow() {
			//取去本地缓存数据
			this.getStorData();
			
		},
		methods: {
			
			//分享
			onShare(){
				uni.share({
				    provider: "weixin",
				    scene: "WXSenceTimeline",
				    type: 1,
				    summary: "我正在使用HBuilderX开发uni-app，赶紧跟我一起来体验！",
				    success: function (res) {
				        console.log("success:" + JSON.stringify(res));
				    },
				    fail: function (err) {
				        console.log("fail:" + JSON.stringify(err));
				    }
				});
			},
			
			//是否显示选集菜单
			onIsHide(){
				this.isHide = !this.isHide	
			},
			//选集
			onWorks(item,index){
				//console.log(item,index)
				let Xsindex = this.XjArrays[index-1] || 0
				//console.log(Xsindex,item)
				//console.log(this.carcoonList)
				this.carcoonListTian = this.carcoonList.slice(Xsindex,item);
			},
			
			//取出本地缓存数据
			getStorData(){
				let storData = uni.getStorageSync('storData');
				if(storData){
					this.nums = storData.nums
				}else {
					this.nums = "第一节"
				}
				
				
			},
			
			//开始阅读
			goReadALL(){
				//console.log(this.carcoonList)
				for(let i = 0;i<this.carcoonList.length;i++){
					//console.log(this.carcoonList[i].url)
					this.allData.push(this.carcoonList[i].url,this.carcoonList[i].num)
					
					
				}
				
				// console.log(this.allData)
				let datas = JSON.stringify(this.allData)
				
				uni.navigateTo({
					url:"../com_read/com_read?datas="+datas 
				})
				
				
			},
			
			//获取漫画内容
			getcarcoonData(){
				this.$geting(`${getCarcoonListUrl}?xsurl1=${this.url}`).then(res=>{
					
					this.nums = res.data.list[0].num
					this.carcoonData = res.data.data
					//console.log(res.data)
					
					this.carcoonList = res.data.list;
					let PintCar = parseInt(this.carcoonList.length/9)
					//console.log(parseInt(this.carcoonList.length))
					this.carcoonListTian = this.carcoonList.slice(0,PintCar);
					
					//选集数组
					this.getXjArray(this.carcoonList)
					
					
				})
			},
			//选集数组
			getXjArray(carcoonList){
				let PintCar = parseInt(carcoonList.length/9)
				//console.log(this.carcoonList)
				for(let i = 1;i<=9;i++){
					// console.log(i*PintCar)
					this.XjArray.push(i*PintCar)
						
				}
				
				//console.log(this.XjArray)
				this.XjArrays = this.XjArray
				
			},
			
			//显示演出文字
			onShows(){
				this.isAuto = !this.isAuto
			}
			,
			//阅读漫画
			goRead(index,url,num){
				for(let i = 0;i<this.carcoonList.length;i++){
					//console.log(this.carcoonList[i].url)
					this.allData.push(this.carcoonList[i].url,this.carcoonList[i].num)
					
					
				}
				let allData = this.allData
				let data = {
					url,
					num,
					index,
					allData
				}
			
				let datas = JSON.stringify(data)
				//console.log(data)
				uni.navigateTo({
					url:"../com_read/com_read?datas="+datas
				})
			}
		}
	}
</script>

<style scoped>
	.details-header {
		position: relative;
		z-index: 1;
		width: 100%;
		height: 600upx;
		overflow: hidden;
	}
	.details-header .header-iamge {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 344upx;
		z-index: 2;
		overflow: hidden;
		border-radius: 0 0 196% 196%/0 0 100% 100%;
		border-top: none;
		
	}
	.details-header .header-iamge image {
		display: block;
		width: 100%;
		height: 100%;
		
	}
	.details-header .header-lable {
		width: 100%;
		height: 100upx;
		position: absolute;
		top: 177upx;
		left: 0;
		z-index: 3;
		
	}
	.details-header .header-lable .lable-name {
		font-size: 32upx;
		margin-left: 32upx;
		color: #FFFFFF;
		font-weight: 800;
		
		
		height: auto;
		
	}
	.details-header .header-lable .lable-pic {
		margin-top: 12upx;
		font-size: 24upx;
		margin-left: 32upx;
		color: #FFFFFF;
		font-weight: 600;
	}
	.catalog-works {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
		width: 100%;
		background-color: #F5F5F5;
		overflow: hidden;
		padding: 15upx 15upx;
		box-sizing: border-box;
		transition: 2s display;
	}
	.catalog-works.hide {
		display: none;
	}
	.catalog-works .works {
		margin-top: 12upx;
		width:30%;
		height: auto;
		border: 1px solid #efefef;
		border-radius: 25upx;
		font-size: 28upx;
		padding: 25upx;
		text-align: center;
		line-height: 100%;
		box-sizing: border-box;
	}
	
	.details-header .header-wrap {
		display: flex;
		align-items: center;
		justify-content: space-around;
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		z-index: 5;
		height: 352upx;
		
		
	}
	.details-header .header-wrap .wrap {
		width: auto;
		height: auto;
		overflow: hidden;
	}
	.details-header .header-wrap .wrap.wrap1 {
		margin-top: 80upx;
	}
	.header-wrap .wrap .icon {
		width: 117upx;
		height: 117upx;
		overflow: hidden;
		
		
	}
	.header-wrap .wrap .icon  image {
		display: block;
		width: 100%;
		height: 100%;
		
	}
	.header-wrap .wrap .name {
		margin-top: 12upx;
		text-align: center;
		font-size: 32upx;
		color: #C0C0C0;
	}
	
	/*内容*/
	.details-section {
	
	}
	
	.section-catalog {
		width: 100%;
		height: auto;
		overflow: hidden;
		
	}
	.section-catalog  .catalog-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		height: 80upx;
		background-color: #f5f5f5;
		padding: 0 15upx;
		box-sizing: border-box;
	}
	.section-catalog  .catalog-header .header-title {
		font-size: 32upx;
		line-height: 65upx;
		font-weight: 600;
	}
	.section-catalog  .catalog-header .header-time {
		font-size: 28upx;
		color: #dcdcdc;
		line-height: 65upx;
	}
	.section-catalog  .catalog-header .header-pic {
		font-size: 28upx;
		color: #dcdcdc;
		border: 1px solid #dcdcdc;
		padding: 8upx;
	}
	
	.catalog-content {
		width: 100%;
		height: auto;
		overflow: hidden;
	}
	.catalog-content .content {
		width: 100%;
		height: 90upx;
		border-bottom: 1px solid #DCDCDC;
		overflow: hidden;
	}
	.catalog-content .content .text {
		line-height: 90upx;
		color: #6d6d6d;
		overflow: hidden;
	}
	
	
	/*详情区域
	*/
   .details-wrap {
	   width: 100%;
	   height: auto;
	   padding-left: 30upx;
	    padding-right: 30upx;
	   box-sizing: border-box;
   }
	 .details-wrap .wrap-introduce {
		 position: relative;
		 z-index: 1;
		 width: 100%;
		 height: 55upx;
		 line-height: 53upx;
		 color: #333;
		 overflow: hidden;
		 font-size: 32upx;
	 }
	 .details-wrap .wrap-introduce.wrap-introduceAuto {
		 height: auto !important; 
	 }
	 .details-wrap .wrap-introduce .text {
		 width: 92%;
	 }
	.details-wrap .wrap-introduce .show {
		position: absolute;
		bottom: 0upx;
		right: 0;
		z-index: 22;
		width: 55upx;
		height: 55upx;
		background: url('../../static/images/details/xia.png') no-repeat;
		background-size: 100% 100%;
		
	}
	.details-wrap .wrap-introduce .show.hide {
		background: url('../../static/images/details/shang.png') no-repeat;
		background-size: 100% 100%;
	}
	.details-wrap .wrap-author,.wrap-status {
		font-size: 32upx;
		color: #333;
		
		padding: 25upx 0;
	}
	
	
	
	/*底部导航区域*/
	.details-btom {
		display: flex;
		align-items: center;
		justify-content: space-between;
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 130upx;
		overflow: hidden;
		padding-left: 30upx;
		box-sizing: border-box;
		background-color: #FFFFFF;
		z-index: 99;
	}
	.details-btom .btom {
		width: auto;
		height: auto;
		
	}
	.details-btom .btom.btom1{
		width: 50%;
		height: 100%;
		background-color: #ff2e67;
	}
	.details-btom .btom .btom-icon {
		width: 64upx;
		height: 64upx;
	}
	.details-btom .btom .btom-name {
		color: #999;
		font-size: 32upx;
	}
	.details-btom .btom .btom-name.btom-name1 {
		width: 100%;
		height: 50upx;
		margin-top: 12upx;
		text-align: center;
		overflow: hidden;
		color: #FFFFFF;
		font-size: 37upx;
		overflow: hidden;
	}
	.details-btom .btom .btom-icon image {
		display: block;
		width: 100%;
		height: 100%;
	}
</style>
