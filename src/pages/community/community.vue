<template>
	<view class="page">
		<view class="com-header">
			<view class="he-icon" @click="goComSearch">
				
			</view>
		</view>
		<!--占位-->
		<view class="com-zhanwei">
		</view>
		<!--轮播图-->
		<view class="com-swiper">
			<swiper :indicator-dots="true" class="swipers" 
			:autoplay="true" :interval="3000"
			 :duration="1000" indicator-active-color="red">
				<block v-for="(item,index) in swiperData" :key="index">
					<swiper-item>
						<view class="swiper-item">
							<view class="item-image">
								<image :src="item.img" mode=""></image>
							</view>
							<view class="item-title">
								<view class="title">
									<view class="text">
										{{item.name}}
									</view>
									<view class="icon">
										<image src="../../static/images/find/hot.png" mode=""></image>
									</view>
								</view>
								<view class="pic">
									{{item.icu}}
								</view>
							</view>
						</view>
					</swiper-item>
				</block>
				<!-- <swiper-item>
					<view class="swiper-item">2</view>
				</swiper-item> -->
			</swiper>
		</view>
	
		<!--内容区域-->
		<view class="com-section">
			<view class="section-content">
				<block v-for="(item,index) in novelDatas" :key="index">
					<view class="content" @click="goDetails(item.url)">
						<view class="content-image">
							<image :src="item.cover" mode=""></image>
						</view>
						<view class="content-name">
							{{item.name}}
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
	export default {
		data() {
			return {
					//轮播数据
					
				swiperData:[
					{
						name:"全职王夫",
						img:require('../../static/images/com/5473s.jpg'),
						icu:'唐谙生前是个武官，穿越时阴差阳错和一个女人有了肌肤之亲，好嘛，他连女王陛下都睡了还要咋地？既然开启了不要脸的模式，那就妖孽到底……而这一世，死生契阔，与子成说，他是认真的。'
					},
					{
						name:"女帝修行在都市",
						img:require('../../static/images/com/5508s.jpg'),
						icu:` （女强文，无敌文，争霸流，帝皇流，都市+玄幻模式，背景格局：未来二十万年。）
								当武曌醒来，竟然发现她成了武家的弃女，武院中的废材，大唐已经灭亡了二十万年，她呵呵的笑了，王朝没有了，没有关系，再活一世，可以再建。
								女帝重生，再争天下！
								！`
					},
					{
						name:"我可以提升万物",
						img:require('../../static/images/com/5566s.jpg'),
						icu:` （    苏秀来到了一个陌生的世界，却突然发现自己可以赐福于万物，于是，世界跟随苏秀而起舞。`
					},
					{
						name:"快穿之炮灰女配有剧毒",
						img:require('../../static/images/com/5568s.jpg'),
						icu:` 统：大佬，我们的宗旨是实现无辜惨死炮灰女配的遗愿啊！阮唐：我知道系统：可您走的是遇神杀神遇魔杀魔的无敌boss路线啊！！！阮唐：女配没翻身上位？炮灰没逆命成神？`
					}
				]
			
				,
				//获取总数据
				novelData:[],
				novelDatas:[]
			};
		},
		onLoad() {
			//获取去小说搜索结果
			this.getNovel()
		},
		methods:{
			//获取去小说搜索结果
			getNovel(){
				let xsname = "极品"
				this.$geting(`${getCarcoonListUrl}?xsname=${xsname}`).then(res=>{
					console.log(res)
					this.novelData = res.data.list
					this.novelDatas = this.novelData.slice(6,36);
				})
			},
			//跳转到搜索页面
			goComSearch(){
				uni.navigateTo({
					url:"../com_search/com_search"
				})
			}
			,
			//跳转到详情页面
			goDetails(url){
				uni.navigateTo({
					url:"../com_details/com_details?url="+url
				})
			}
		}
	}
</script>

<style scoped>
	.page {
		width: 100%;
		height: auto;
		position: relative;
		z-index: 1;
	}

	.com-header {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 113upx;
		z-index: 99;
	}
	.com-header .he-icon {
		position: absolute;
		right: 25upx;
		width: 60upx;
		height: 60upx;
		top: 50%;
		transform: translateY(-50%);
		background: url('../../static/images/search/cat.png') no-repeat;
		background-size: 100% 100%;
		
	}
	/*box-shadow: 0 0 10px #efefef;*/
	.com-zhanwei {
		width: 100%;
		height: 300upx;
		background-color: #dedede;
	}

	/*轮播图*/
	.com-swiper {
		position: absolute;
		top: 12upx;
		left: 50%;
		transform: translateX(-50%);
		width: 90%;
		height: 420upx;
		background-color: #FFFFFF;
		box-shadow: 0 0 12rpx #808080;
		border-radius: 20upx;
		
	}
	.com-swiper .swipers {
		width: 100%;
		height: 100%;
		overflow: hidden;
		
	}
	.com-swiper .swipers .swiper-item {
		display: flex;
		align-items: center;
		width: 100%;
		height: 100%;
	}
	 .swipers .swiper-item .item-image {
		 margin-top: 65upx;
		 margin-left: 42upx;
		 width: 230upx;
		 height: 300upx;
		 box-shadow: 0 0 12rpx #808080;
		 border-radius: 20upx;
		 overflow: hidden;
	 }
	 .swipers .swiper-item .item-image image {
		 display: block;
		 width: 100%;
		 height: 100%;
	 }
	 .swiper-item  .item-title {
		  margin-top: 65upx;
		 margin-left: 75upx;
		 width: 300upx;
		 height: 300upx;
	 }
	   .swiper-item  .item-title .title {
		   display: flex;
		   align-items: center;
		 width: auto;
		 height: 65upx;
		 font-size: 37upx;
		 color: #000000;
		 font-weight: 700;
		 overflow: hidden;
		 margin-bottom: 12upx;
		 
	 }
	 .swiper-item  .item-title .title .text　{
		 width: 50%;
		 height: 100%;
		 text-align: center;
		 line-height: 65upx;
		 overflow: hidden;
	 }
	 .swiper-item  .item-title .title .icon {
		 width: 56upx;
		 height: 50upx;
		 overflow: hidden;
	 }
	  .swiper-item  .item-title .title .icon image {
		  display: block;
		  width: 100%;
		  height: 100%;
	  }
	  .swiper-item   .item-title .pic {
		 width: auto;
		 height: 114upx;
		 font-size: 28upx;
		 color: #999999;
		 overflow: hidden;
	 }
	 
	 /*内容区*/
	 .com-section {
		 margin:  0 43upx;
		 margin-top: 200upx;
	 }
	 .com-section .section-content {
		 display: flex;
		 align-items: center;
		 justify-content: space-between;
		 flex-wrap: wrap;
		 width: 100%;
		 height: auto;
		 overflow: hidden;
	 }
	 .com-section .section-content .content {
		 margin-top: 25upx;
		 width: 30%;
		 height: auto;
		 overflow: hidden;
	 }
	 .section-content .content .content-image {
		 width: 100%;
		height: 274upx; 
		 box-shadow: 0upx 7upx 12upx #808080;

		 border-radius: 20upx;
		 overflow: hidden;
	 }
	 .section-content .content .content-image image {
		 
		 display: block;
		 width: 100%;
		 height: 100%;
		 overflow: hidden;
	 }
	  .section-content .content .content-name {
		  margin-top: 15upx;
		  width: 100%;
		  height: 48upx;
		  font-size: 32upx;
		  color: #222222;
		  font-weight: 500;
		  overflow: hidden;
	  }
</style>
