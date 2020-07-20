<template>
	<view class="page">
		<!--导航栏-->
		<view class="find-nav">
			<block v-for="(item,index) in findList" :key="index">
				<view class="nav">
					<block v-for="(item1,index1) in item" :key="index1">
						<view class="title" 
						:class="{'active': indexs1==index1  && indexs==index}" 
						@click="onFindNav(index,index1,item1.mhlb)">
							{{item1.title}}
						</view>
					</block>

				</view>
			</block>

		</view>

		<!--内容-->
		<view class="find-section">
			<view class="section-title">
				<view class="title  " :class="{active:isRecom}" @click="onRecom()" >
					推荐
				</view>
				<view class="line">
				</view>
				<view class="title " :class="{active:isHot}" @click="onHot()">
					最火热
				</view>
				<view class="line">
				</view>
				<view class="title " :class="{active:isNew}" @click="onNews()">
					新上架
				</view>
			</view>
			
			
			<view class="section-content">
				<block v-for="(item,index) in listContentTian" :key="index">
					<view class="content" @click="goDetails(item.url)">
						<view class="content-image">
							<image 
							:src="'https://images.weserv.nl/?url='+item.cover" 
							mode="widthFix"></image>
						</view>
						<view class="content-text">
							<view class="text-title">
								{{item.name}}
							</view>
							<view class="text-auth">
								更新至:{{item.latest}}
							</view>
							<view class="text-hot">
								<view class="hot">

								</view>
								<view class="text">
									{{item.time}}
								</view>
							</view>
						</view>
					</view>
				</block>

			</view>
		
		
		
		
		</view>

	</view>
</template>

<script>
	import {
		getCarcoonListUrl
	} from "../../api/index/index.js"
	import config from "../../static/js/conf/config.js"
	export default {
		data() {
			return {
				//导航
				findList: [
					[{
							"title": "热血",
							"mhlb": "shaonianrexue"
						},
						{
							"title": "格斗",
							"mhlb": "wuxiagedou"
						},
						{
							"title": "灵异",
							"mhlb": "danmeirensheng"
						},
						{
							"title": "少女",
							"mhlb": "shaonvaiqing"
						},
						{
							"title": "恋爱",
							"mhlb": " lianaishenghuo"
						},
						{
							"title": "生活",
							"mhlb": "shenghuomanhua"
						},
					],

					[{
							"title": "科幻",
							"mhlb": "kehuanmohuan"
						},
						{
							"title": "竞技",
							"mhlb": " jingjitiyu"
						},
						{
							"title": "喜剧",
							"mhlb": "baoxiaoxiju"
						},
						{
							"title": "推理",
							"mhlb": "zhentantuili"
						},
						{
							"title": "日本",
							"mhlb": " riben"
						},
						{
							"title": "连载中",
							"mhlb": "lianzai"
						},
						{
							"title": "已完结",
							"mhlb": " wanjie"
						}
						
					]

				],
				//导航下标
				indexs: 0,
				//导航title下标
				indexs1: 0,
				//漫画列表
				listContent: [],
				//12条漫画数据
				listContentTian: [],
				//是否显示图标
				listNo: false,
				mhlb: "shaonianrexue",
				page:1,
				//this.isRecom = false
				//this.isHot = false
				//this.isNew = true
				isRecom:true,
				isHot:false,
				isNew:false
			}
		},
		onLoad() {
			//获取漫画列表数据
			this.getCartoon();
		},
		methods: {
			
			//跳槽到详情页面
			goDetails(url){
				uni.navigateTo({
					url:"../details/details?url="+url
				})
			},
			
			//改变导航栏样式
			onFindNav(index, index1,mhlb) {
				
				this.indexs = index
				this.indexs1 = index1
				console.log(mhlb)
				this.mhlb = mhlb
				this.getCartoon();
			},
			//推荐
			onRecom(){
				this.mhlb = "dalu"
				this.isRecom = true
				this.isHot = false
				this.isNew = false
				this.getCartoon();
			},
			//热门
			onHot(){
				this.mhlb = "hot"
				this.isRecom = false
				this.isHot = true
				this.isNew = false
				this.getCartoon();
			},
			//最新
			onNews(){
				this.mhlb = "new"
				this.isRecom = false
				this.isHot = false
				this.isNew = true
				this.getCartoon();
			},
			//获取漫画列表数据
			async getCartoon() {
				let data = await this.$geting(`${getCarcoonListUrl}?mhlb= ${this.mhlb}`)
				.then(res => {
					//console.log(res)
					// this.listContent = res.data.list.slice(1,10)
					return res.data
				})
				//console.log(data)
				if (data.code === 0) {
					this.listContent = data.list
					this.listContentTian = this.listContent.slice(1, 11);
				}
			}
		},
		
		
		
		//页面滚动到底部的事件（不是scroll-view滚到底），
		//常用于上拉加载下一页数据。如使用scroll-view导致页面级没有滚动，则触底事件不会被触发
		onReachBottom() {
			 this.page = this.page +5
			 let pages = this.page + Number(10)
			
			 
			 this.listContentTian = this.listContent.slice(1,pages)
			 if(pages>=this.listContent.length){
				 pages = this.listContent.length
				 uni.showToast({
				 	title:"没有更多数据了",
					"icon":"none"
				 })
				 return
			 }
			 // console.log(pages)
			 // console.log(this.listContent.length)
			//console.log(this.page++,this.listContent.slice(1,9+this.page))
		}
	}
</script>

<style scoped>
	.page {
		margin: 0 20upx;
	}

	.find-nav {
		width: 100%;
		height: auto;
		overflow: hidden;
	}

	.find-nav .nav {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
		width: 100%;
		height: auto;
		padding: 18upx 3upx;
		box-sizing: border-box;
	}

	.find-nav .nav .title {
		font-size: 24upx;
		width: auto;
		height: 74upx;
		line-height: 74upx;
		/* color: #f487a7; */
		color: #c6c6c6;
	}

	.find-nav .nav .title.active {
		color: #f487a7;
		border-bottom: 1rpx solid #f487a7;
	}


	.find-section {
		width: 100%;
		height: auto;
		overflow: hidden;
	}

	.find-section .section-title {
		display: flex;
		align-items: center;
		width: 100%;
		height: 80upx;
		overflow: hidden;

	}

	.find-section .section-title .title {
		text-align: center;
		font-size: 24upx;
		padding-right: 32upx;
		box-sizing: border-box;
		color: #C6C6C6;
	}

	.find-section .section-title .title.active {
		color: #f487a7;
	}

	.line {
		width: 1px;
		height: 30upx;
		margin-right: 21upx;
		background-color: #C6C6C6;
	}

	.section-content {
		width: 100%;
		height: auto;
		overflow: hidden;

	}

	.section-content .content {
		margin-top: 33upx;
		display: flex;
		align-items: center;
		width: 100%;
		height: auto;
		overflow: hidden;
	}

	.section-content .content .content-image {
		width: 265upx;
		height: 151upx;
		margin-right: 30upx;
	}

	.section-content .content .content-image image {
		display: block;
		width: 100%;
		height: 100%;
	}

	.section-content .content .content-text {
		width: 400upx;
		height: 151upx;
	}

	.content .content-text .text-title {
		width: 400upx;
		height: 42upx;
		overflow: hidden;
		margin-top: 8upx;
		font-size: 32upx;
	}

	.content .content-text .text-auth {
		margin-top: 12upx;
		font-size: 24upx;
		color: #c6c6c6;
	}

	.content .content-text .text-hot {
		display: flex;
		align-items: center;

		margin-top: 16upx;
		font-size: 24upx;
		color: #c6c6c6;
	}

	.content .content-text .text-hot .hot {
		width: 27upx;
		height: 21upx;
		margin-right: 11upx;
		background-image: url("../../static/images/find/hot.png");
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}
</style>
