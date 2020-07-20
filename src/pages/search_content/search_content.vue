<template>
	<view class="page">
		<view class="section-content">
			<block v-for="(item,index) in listContentTian" :key="index">
				<view class="content"  @click="goDetails(item.url)">
					<view class="content-image">
						<image :src="'https://images.weserv.nl/?url='+item.cover" mode="widthFix"></image>
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
</template>

<script>
	import {
		getCarcoonListUrl
	} from "../../api/index/index.js"
	export default {
		data() {
			return {
				//搜索关键词
				mhname:"",
				//搜索结果数据
				listContentTian:[]
			}
		},
		onLoad(e) {
			console.log(e.mhname)
			this.mhname = e.mhname
				//获取搜索的结果
			this.getSarchData();
		},
		methods: {
			
			//跳槽到详情页面
			goDetails(url){
				uni.navigateTo({
					url:"../details/details?url="+url
				})
			},
			
			//获取搜索的结果
			getSarchData(){
				this.$geting(`${getCarcoonListUrl}?mhname=${this.mhname}`).then(res=>{
					console.log(res.data)
					this.listContentTian = res.data.list
				})
			}
		}
	}
</script>

<style scoped>
	.page {
		margin: 0 20upx;
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
