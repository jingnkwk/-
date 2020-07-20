<template>
	<view class="page">
		<!--头部样式-->
		<view class="carcoon-header " :class="{active:isScroll}">
			<view class="header-sex">
				<view class="sex-icon">
					<image src="../../static/images/index/xingb.png" mode="widthFix"></image>
				</view>
				<view class="sex-name">
					女生
				</view>
			</view>

			<view class="header-search" @click="goSearch()">
				<view class="search-name">
					三眼小太年轻
				</view>
				<view class="search-icon">
					<image src="../../static/images/index/sous.png" mode="widthFix"></image>
				</view>
			</view>
			<view class="header-icon">
				<image src="../../static/images/index/lip.png" mode="widthFix"></image>
			</view>

			<view class="header-icon">
				<image src="../../static/images/index/xuanzhi.png" mode="widthFix"></image>
			</view>
		</view>

		<!--轮播图-->
		<view class="carcoon-swiper">
			<swiper class="carcoon-swiper" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000"
			 indicator-active-color="red">
				<block v-for="(item,index) in swiperData" :key="index">
					<swiper-item>
						<view class="swiper-item carcoon-swiper">
							<image :src="item.image" mode="widthFix"></image>
						</view>
					</swiper-item>
				</block>


			</swiper>

			<!--小猫咪-->
			<view class="carcoon-cat">
				<image src="../../static/images/index/icon_cat_ear.png" mode="widthFix"></image>
			</view>

		</view>

		<!--导航-->
		<view class="carcoon-nav">
			<block v-for="(item,index) in navData" :key="index">
				<view class="nav">
					<view class="nav-image">
						<image :src="item.image" mode="widthFix"></image>
					</view>
					<view class="nav-name">
						{{item.title}}
					</view>
				</view>
			</block>


		</view>

		<!--漫画核心区域-->
		<view class="carcoon-section">
			
			<view class="section-content">
				<view class="content-title">
					这波啊~这波是爱的推荐
				</view>

				<view class="content-list">

					<block v-for="(item1,index1) in oneNavDatas" :key="index1" >
						<view class="list" @click="goDetails(item1.url)">
							<view class="list-image">
								<image :src="item1.cover" ></image>
								<!-- <view class="image-abs">
									<view class="abs">
										热血
									</view>
									
									<view class="abs">
										热血
									</view>
								</view> -->
							</view>
							<view class="list-name">
								{{item1.name}}
							</view>
							<view class="list-pic">
								{{item1.tag}}
							</view>
						</view>
						
					</block>
					
					
					
					
					
				</view>
			</view>
		
		
			<!--第二个-->
			
			<view class="section-content">
				<view class="content-title">
					叩叩叩~漫画上新了请签收
				</view>
			
				<view class="content-list">
			
					<block v-for="(item2,index2) in twoNavDatas" :key="index2">
						<view class="list"@click="goDetailsOne(item2.url)">
							<view class="list-image list-image2">
								<image :src="item2.cover" ></image>
								
							</view>
							<view class="list-name">
								{{item2.name}}
							</view>
							<view class="list-pic">
								{{item2.tag}}
							</view>
						</view>
					</block>
					
					
					
					
					
					
				</view>
			</view>
					
			
			
			<!--第三个-->
			<view class="section-content">
				<view class="content-title">
					这波啊~人气爆款看过瘾
				</view>
			
				<view class="content-list">
			
					<block v-for="(item3,index3) in threeNavDatas" :key="index3">
						<view class="list list1" @click="goDetailsTwo(item3.url)">
							<view class="list-image">
								<image :src="item3.cover" ></image>
								
							</view>
							<view class="list-name">
								{{item3.name}}
							</view>
							<view class="list-pic">
								{{item3.tag}}
							</view>
						</view>
						
					</block>
					
					
					
					
					
				</view>
			</view>
			
			
			<!--第四个-->
			<view class="section-content">
				<view class="content-title">
					重生复仇，要你好看
				</view>
			
				<view class="content-list">
			
					<block v-for="(item4,index4) in fourNavDatas" :key="index4">
						<view class="list list2" @click="goDetailsThree(item4.url)" :class="[index4===0 || index4 ===3?'list2':'list3']">
							<view class="list-image " >
								<image :src="item4.cover" ></image>
								
							</view>
							<view class="list-name">
								{{item4.name}}
							</view>
							
						</view>
					</block>
					
					
					
					
					
					
				</view>
			</view>
			
			
			
			
			
			<!--完结-->
			<view class="nomre">
				主人没有更多了呢
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
				title: 'Hello',
				//轮播数据
				swiperData: [{
						'image': require('../../static/images/index/item.png')
					},
					{
						'image': require('../../static/images/index/item2.png')
					},
					{
						'image': require('../../static/images/index/item3.png')
					},
					{
						'image': require('../../static/images/index/item4.png')
					},
					{
						'image': require('../../static/images/index/item5.png')
					}

				],
				//导航栏数据
				navData: [{
						"image": require("../../static/images/index/nav1.jpg"),
						"title": "分类"
					},
					{
						"image": require("../../static/images/index/nav2.jpg"),
						"title": "排行"
					},
					{
						"image": require("../../static/images/index/nav3.jpg"),
						"title": "新作"
					},
					{
						"image": require("../../static/images/index/nav4.jpg"),
						"title": "下载APP"
					},
					{
						"image": require("../../static/images/index/nav5.jpg"),
						"title": "日更"
					}
				]
				,
				//第一个分类数据 校园修真狂少
				oneNavData:[],
				//显示4条数据
				oneNavDatas:[],
				//第二个 分类数据
				twoNavData:[],
				twoNavDatas:[],
				//第三个分类
				threeNavData:[],
				threeNavDatas:[],
				//第四个分类
				fourNavData:[],
				fourNavDatas:[],
				//头部样式
				isScroll:false
			}
		},
		//监听页面滚动，参数为Object
		onPageScroll(e) {
			//监听头部样式
		
			let scrollTop = e.scrollTop;
		
			if (scrollTop >= 150) {
				if (this.Scroll) {
					this.Scroll = false;
					this.isScroll = true;
				}
		
			} else {
				if (!this.Scroll) {
					this.Scroll = true;
					this.isScroll = false;
				}
		
			}
		},
		onLoad() {
			//第一个分类数据 校园修真狂少
			this.getOneNav();
			//第二个 分类数据
			this.getTwoNav();
			//第三
			this.getThreeNav();
			//第四
			this.getFourNav();
			
			//优化监听事件
			this.Scroll = true;
		},
		methods: {
			//第一个分类数据 校园修真狂少
			async getOneNav(){
				let mhname = "都市"
				// let data = await this.$geting(`${getCarcoonListUrl}?mhname=${mhname}`).then(res=>{
				// 	return res.data
				// })
				// //console.log(data)
				let data = await this.getALLData(mhname);
				if(data.code === 0){
					this.oneNavData = data.list
					
					this.oneNavDatas = this.oneNavData.slice(0,4);
				}
			},
			//第二个 分类数据
			async getTwoNav(){
				let mhname = "养兽为妃"
				let data = await this.getALLData(mhname)
				if(data.code === 0){
					this.twoNavData = data.list
					this.twoNavDatas = this.twoNavData.slice(2,6);
				}
				
			},
			//第三个分类 
			async getThreeNav(){
				let mhname = "修真"
				let data = await this.getALLData(mhname)
				if(data.code === 0){
					this.threeNavData = data.list
					this.threeNavDatas = this.threeNavData.slice(0,6);
				}
				
			},
			async getFourNav(){
				let mhname = "神武"
				let data = await this.getALLData(mhname)
				if(data.code === 0){
					this.fourNavData = data.list
					this.fourNavDatas = this.fourNavData.slice(3,7);
				}
				//console.log(data)
			},
			//总数据
			async getALLData(mhname){
				//let mhname = "都市"
				let data = await this.$geting(`${getCarcoonListUrl}?mhname=${mhname}`).then(res=>{
					return res.data
				})
				return data
			},
			//跳转到详情页面
			goDetails(url){
				console.log(url)
				uni.navigateTo({
					url:"../details/details?url="+url
				})
			},
			//跳转到详情页面
			goDetailsOne(url){
				console.log(url)
				uni.navigateTo({
					url:"../details/details?url="+url
				})
			},
			//跳转到详情页面
			goDetailsTwo(url){
				console.log(url)
				uni.navigateTo({
					url:"../details/details?url="+url
				})
			},
			//跳转到详情页面
			goDetailsThree(url){
				console.log(url)
				uni.navigateTo({
					url:"../details/details?url="+url
				})
			},
			//跳转到搜索页面
			goSearch(){
				uni.navigateTo({
					url:"../search/search"
				})
			}
		}
	}
</script>

<style scoped>
	

	.carcoon-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		position: fixed;
		top: 0;
		left: 0;
		padding: 0 30upx;
		box-sizing: border-box;
		width: 100%;
		height: 113upx;
		overflow: hidden;
		z-index: 55;
		
		

		
		background: linear-gradient(rgba(1,1,1,.2),hsla(0,0%,100%,0));
	}
	.carcoon-header.active {
		background: linear-gradient(#fc6976,hsla(0,0%,100%,0));
	}
	.carcoon-header .header-sex {
		display: flex;
		align-items: center;
		width: 150upx;
		height: 60upx;
		
		border-radius: 25upx;
	}
	.nomre {
		width: 100%;
		height: 106upx;
		color: #ddd;
		line-height: 106upx;
		text-align: center;
	}
	.carcoon-header .header-sex .sex-icon {
		width: 40upx;
		height: 40upx;
		margin-left: 18upx;
		margin-right: 15upx;
	}

	.carcoon-header .header-sex .sex-name {

		font-size: 32upx;
		color: #FFFFFF;

	}

	.carcoon-header .header-sex .sex-icon image {
		display: block;
		width: 100%;
		height: 100%;
	}

	.header-search {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 311upx;
		height: 60upx;
		
		border-radius: 25upx;
	}

	.header-search .search-name {
		margin-left: 12upx;
		font-size: 32upx;
		color: #FFFFFF;
	}

	.header-search .search-icon {
		margin-right: 14upx;
		width: 40upx;
		height: 40upx;
	}

	.header-search .search-icon image {
		display: block;
		width: 100%;
		height: 100%;
	}

	.carcoon-header .header-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 60upx;
		height: 60upx;
		
		border-radius: 50%;

	}

	.carcoon-header .header-icon image {
		display: block;
		width: 80%;
		height: 80%;
	}

	/*轮播图样式*/
	.carcoon-swiper {
		position: relative;
		width: 100%;
		height: 500upx;


	}

	.carcoon-swiper .swiper-item image {
		display: block;
		width: 100%;
		height: 100%;
	}


	.carcoon-swiper .carcoon-cat {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 55upx;

	}

	.carcoon-swiper .carcoon-cat image {
		display: block;
		height: 100%;
		width: 100%;
	}


	/*分类导航*/
	.carcoon-nav {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		height: auto;
		padding: 0 40upx;
		box-sizing: border-box;
		margin-top: 43upx;
	}

	.carcoon-nav .nav {


		width: 109upx;
		height: 100%;
	}

	.carcoon-nav .nav .nav-image {

		box-sizing: border-box;
		width: 100%;
		height: 123upx;
	}

	.carcoon-nav .nav .nav-name {
		font-size: 32upx;
		color: #666;
		width: 100%;
		height: 40upx;
		font-weight: 400;
		line-height: 40upx;
		text-align: center;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}

	.carcoon-nav .nav .nav-image image {
		display: block;
		width: 95%;
		height: 100%;
		margin: 0 auto;
	}

	/*漫画核心区域*/
	.carcoon-section {

		padding: 0 27upx;
		box-sizing: border-box;
		overflow: hidden;
	}

	.carcoon-section .section-content {
		width: 100%;
		height: auto;
		overflow: hidden;
	}

	.carcoon-section .section-content .content-title {
		width: 100%;
		height: 96upx;
		text-align: center;
		font-size: 40upx;
		line-height: 96upx;
		font-weight: 700;
	}

	.content-list {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
		width: 100%;
		height: auto;
		overflow: hidden;
	}

	.content-list .list {
		position: relative;
		width: 46%;
		height: auto;
		padding: 0 26upx 48upx 0;

	}
	.content-list .list.list1 {
		position: relative;
		width: 31%;
		height: auto;
		padding: 0 0 0 0 ;
	}
	.content-list .list.list2 {
		width: 65%;
		height: auto;
	}
	.content-list .list.list3 {
		width: 27%;
		height: auto;
	}
	.content-list .list.list2 .list-image {
		
	}
	.content-list .list .list-image {
		position: relative;
		width: 100%;
		height: 353upx;
	}
	.content-list .list .list-image.list-image2 {
		position: relative;
		width: 100%;
		height: 178upx;
	}
	.content-list .list .list-image image {
		position: absolute;
		left: 0;
		top: 0;
		display: block;
		width: 100%;
		height: 100%;
	}
	.content-list .list .list-image .image-abs {
		display: flex;
		align-items: center;
		width: 100%;
		height: 30upx;
		position: absolute;
		background-color: rgba(245,243,243,.8);
		left: 0;
		bottom: 0;
	}
	
	.content-list .list .list-image .image-abs .abs {
		width: 43upx;
		height: 22upx;
		font-size: 16upx;
		color: #555;
		border: 2upx solid #ddd;
		text-align: center;
		line-height: 22upx;
		margin-left: 8upx;
	}
	.content-list .list .list-name {

		font-size: 32upx;
		line-height: 50upx;
		color: #333;
		font-weight: 400;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;

	}

	.content-list .list .list-pic {
		width: 100%;
		height: 53upx;
		color: #999;
		font-size: 28upx;
		line-height: 53upx;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>
