<template>
	<view class="page" :style="{'background-color':bakcground}">
		<view class="read-hedaer">
			<view class="list" @click="lastNovel()">
				上一话
			</view>
			<view class="list" @click="oncatalog()">
				回目录
			</view>
			<view class="list" @click="nextNovel()">
				下一话
			</view>
		</view>
		
		<view class="read-title">
			<view class="title" :style="{'color':color}">
				{{num}}
				
			</view>
			<view class="btn">
				<view class="btn-lef">
					<block v-for="(item,index) in pro" :key="index">
						<view class="lef" @click="onPro(item.back,index,item.color)">
							{{item.name}}
						</view>
					</block>
					
					
				</view>
				<view class="btn-rig">
					<block v-for="(item1,index1) in fontData" :key="index1">
						<view class="rig" @click="onFont(item1.size)">
							{{item1.name}}
						</view>
					</block>
				
					
				</view>
			</view>
		</view>
	
		<!--内容区域-->
		<view class="read-section">
			<view class="section-content">
				
				<block v-for="(item,index) in NovelData" :key="index">
					<view class="content" :style="{'color':color,'font-size':sizes+'rpx'}">
						{{item}}
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
				//章节
				num:"",
				//链接
				url:"",
				//小说数据
				NovelData:[],
				NovelDataTime:[],
				//眼睛
				pro:[
					{
						'name':'白天',
						'back':'rgb(251, 246, 236)'
					},
					{
						'name':'护眼',
						'back':' rgb(220, 236, 210)'
					},
					{
						'name':'关灯',
						'back':'rgb(50, 55, 59)',
						'color':'rgb(153, 153, 153)'
					}
				],
				//背景颜色
				bakcground:'rgb(251, 246, 236)',
				color:'',
				//字体大小
				fontData:[
					{
						'name':'大',
						'size':'52'
					},
					{
						'name':'中',
						'size':'36'
					},
					{
						'name':'小',
						'size':'28'
					}
				],
				//字体
				sizes:"",
				//页数
				page:0,
				numPage:1,
				//总页数
				datas:[],
				//本地缓存shuj
				storData:{},
				storDataPage:0,
				//选集
				pages:0
				
			}
		},
		onLoad(e) {
			// console.log(e)
			let data = JSON.parse(e.datas)
				
			this.datas = data
			//console.log(this.datas.index)
		
			//取去本地缓存数据
			this.getStorData();
			
			//console.log(this.storDataPage)
			
			this.num = data.num || this.datas[this.storDataPage+1] 
			this.url = data.url || this.datas[this.storDataPage] 
			
			//小说内容区域
			this.getNovelData();
			//检测一个数组是否有重复的数据
			this.isRepeat();
		},
		
		onShow() {
			//取去本地缓存数据
			this.getStorData();
			//console.log(this.storDataPage)
			
		},
		
		
		methods: {
	 		//检查一个数组是否重复的数据
			isRepeat(){
				if(!this.datas.allData){
					let sindex =  this.datas.indexOf(this.storData.datasurl) || ""
					//console.log(this.storData)
					// console.log(sindex)
					this.getSindex(sindex)
				}else {
					let sindex =  this.datas.allData.indexOf(this.storData.datasurl) || ""
					//console.log(this.storData)
					// console.log(sindex)
					this.getSindex(sindex)
				}
				
			},
			//新数据清楚缓存
			getSindex(sindex){
				if(sindex<0){
					 uni.removeStorageSync('storData');
					 //取去本地缓存数据
					 this.getStorData();
					
				}
			},
			//回目录
			oncatalog(){
				uni.navigateBack({
					  delta: 1
				})
			},
			//上一话
			lastNovel(){
				console.log(this.storDataPage)
				if(!this.datas.index){
					if(this.storDataPage<=0){return;}
				}else{
					if(this.storDataPage<0){return;}
				}
				

				let Dindex = this.datas.index
				let isNant = isNaN(Number(Dindex))
				
				if(!this.storData  && isNant){
					
					this.page = this.page - 2
					this.numPage = this.numPage - 2
					
					this.getnextNovel(this.page,this.numPage);
					
				}else if(this.storData && isNant ){
					
					this.storDataPage = this.storDataPage -2
					console.log(this.storDataPage)
					let NOsindex = this.storDataPage
					 let NOsindexs = NOsindex +1
					
					 this.getnextNovel(NOsindex,NOsindexs);
				}
				
				
				//选集
				//选择过后的数据
				if(!isNant){
					
					// let pages = this.datas.index
					this.datas.index = this.datas.index -1
				
					let YIndex = this.datas.index+this.datas.index +1
					this.getSlect(YIndex);
					
					
						
				}
				
					//回到页面的顶部
					this.getScrollTop()
				
			},
			//下一话
			nextNovel(){
				let Dindex = this.datas.index
				let isNant = isNaN(Number(Dindex))
				//console.log(isNant)
				//没有缓存的数据
				if(!this.storData  && isNant){
					
					
					this.page = this.page + 2  
					this.numPage = this.numPage + 2
					this.getnextNovel(this.page,this.numPage);
					
				} else if(this.storData && isNant ){
					//缓存过后的数据
					//console.log(this.datas.index)
					this.storDataPage = this.storDataPage +2
					//console.log(this.storDataPage )
					let NOsindex = this.storDataPage
					 let NOsindexs = NOsindex +1
					// //console.log(NOsindex)
					// let datasurl = this.datas[NOsindex]
					// let nums = this.datas[NOsindexs]
					// //console.log(nums)
					// this.num = nums
					// this.getNovelData(datasurl)
					// //存储数据
					// console.log(nums)
					// this.getStorageData(NOsindex,nums,datasurl);
					this.getnextNovel(NOsindex,NOsindexs);
				
				}
				
				
				//选集
				//选择过后的数据
				if(!isNant){
					
					// let pages = this.datas.index
					this.datas.index = this.datas.index +1
				
					let YIndex = this.datas.index+this.datas.index+1
					this.getSlect(YIndex);
					
					
						
				}
				
				//回到页面的顶部
				this.getScrollTop()
				
			},
			//回到顶部
			getScrollTop(){
				
				uni.pageScrollTo({
				scrollTop: 0,
				duration: 300
				});
				
			},
			//选择过后的数据 选集
			getSlect(YIndex){
				let datasurl = this.datas.allData[YIndex -1]
				
				let nums = this.datas.allData[YIndex]
				this.num = nums
				this.getNovelData(datasurl)	
			},
			
			//下一话分类 //没有缓存的数据和缓存
			getnextNovel(page,numPage){
				let datasurl = this.datas[page]
				let nums = this.datas[numPage]
			//	console.log(datasurl)
				this.num = nums
				this.getNovelData(datasurl)
				//存储数据
				
				this.getStorageData(page,nums,datasurl);
			},
			//缓存过后的数据
			//储存数据
			getStorageData(page,nums,datasurl){
				
				let storData = {
					datasurl,
					page,
					nums
				}
				
				//console.log(storData)
				//本地缓存
				uni.setStorageSync('storData', storData);
				//取去本地缓存数据
				this.getStorData();
			},
			////取出本地缓存数据
			getStorData(){
				let storData = uni.getStorageSync('storData');
				
				this.storData = storData
				//console.log(this.storData)
				
				this.storDataPage = this.storData.page || 0
				// if(!storData){
				// 	this.storDataPage = 0
				// }
				
				
			},
			//切换颜色
			onPro(pro,index,color){
				
				this.bakcground = pro
				this.color = color
			},
			//切换字体
			onFont(size){
				this.sizes = size
				console.log(size)
			},
			//小说内容区域
			getNovelData(datasurl){
				let NovelUrl= datasurl || this.url 
				this.$geting(`${getCarcoonListUrl}?xsurl2=${NovelUrl}`).then(res=>{
					//console.log(res.data.content)
					this.NovelData = res.data.content
					
				})
			}
		}
	}
</script>

<style scoped>
	.page {
		width: 100%;
		height: 100%;
		background-color: rgb(251, 246, 236);
	}
	
	.read-hedaer {
		display: flex;
		align-items: center;
		justify-content: space-around;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 80upx;
		background-color: #168C84;
		z-index: 99;
	}
	.read-hedaer .list {
		font-size: 30upx;
		height: 100%;
		width: 33%;
		text-align: center;
		line-height: 80upx;
		color: #FFFFFF;
		overflow: hidden;
	}
	.read-title {
		margin-top: 80upx;
		position: relative;
		width: 100%;
		height: 160upx;
		overflow: hidden;
	}
	.read-title .title {
		width: 100%;
		height: 100upx;
		text-align: center;
		line-height:100upx;
		font-size: 32upx;
		font-weight: 800;
	}
	.btn {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		height: 60upx;
	}
	.btn .btn-lef {
		display: flex;
		align-items: center;
		margin-left: 60upx;
		width: 240upx;
		height: 50upx;
	}
	.btn .btn-lef .lef {
		width: 80upx;
		height: 48upx;
		background-color:  #168C84;
		border-radius: 25upx;
		font-size: 24upx;
		color: #FFFFFF;
		text-align: center;
		line-height: 48upx;
		margin-right: 12upx;
	}
	.btn .btn-rig {
		display: flex;
		align-items: center;
		margin-right: 60upx;
		width: 240upx;
		height: 50upx;
	}
	.btn .btn-rig .rig {
		width: 50upx;
		height: 50upx;
		background-color:  #168C84;
		border-radius: 50%;
		font-size: 24upx;
		color: #FFFFFF;
		text-align: center;
		line-height: 50upx;
		margin-right: 12upx;
	}
	
	
	.read-section {
		width: 100%;
		height: auto;
		overflow: hidden;
	}
	.read-section .section-content {
		padding: 20upx;
		box-sizing: border-box;
	}
	.read-section .section-content .content {
		line-height: 150%;
		font-size: 30upx;
		font-family: "microsoft yahei"
	}
</style>
