<template>
	<view class="page">
		<view class="search-title">
			<view class="search-input">
				<input type="text" value="" placeholder="输入书名或作者,少写,也不要错别字哦!" v-model="mhname" />
				<view class="icon">
					<image src="../../static/images/search/cat.png" ></image>
				</view>
			</view>
			<view class="search-name" @click="onSearch()">
				搜索
			</view>
		</view>
	
		<!--热门搜索-->
		<view class="search-hot">
			<view class="hot-title">
				热门搜索
			</view>
			<view class="hot-list">
				
				<block v-for="(item,index) in hotSearchData " :key="index">
					<view class="list" 
					 @click="goSearch(item.title)"
					 :style="{'color':item.color,'background':item.background}">
						{{item.title}}
					</view>
				</block>
				
				
				
			</view>
		</view>
	
		<!--历史搜索-->
		<view class="search-history" v-if="mhnames.length>0">
			<view class="history-title">
				<view class="title-lef">
					搜索历史
				</view>
				<view class="title-rig" @click="clearStor()">
					清空
				</view>
			</view>
			
			<view class="history-section" @click="godetails()">
				<view class="section-lef">
					{{mhnames}}
				</view>
				<view class="section-rig">
					X
				</view>
				
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//热门搜索
				hotSearchData:[
					{
						'title':'伏天圣主',
						'color':'#3bafff',
						'background':'#ebf7ff'
					},
					{
						'title':'绝顶弃少',
						'color':'#ff84fc',
						'background':'#ffefff'
					},
					{
						'title':'凤逆天下',
						'color':'#7ed321',
						'background':'#effae4'
					},
					
					
					{
						'title':'王的第一宠后',
						'color':'#25d7e4',
						'background':'#eafcfd'
					},
					{
						'title':'三眼哮天录',
						'color':'#3bafff',
						'background':'#ebf7ff	'
					},
					{
						'title':'逆转仙途',
						'color':'#ff84fc',
						'background':'#ffefff	'
					},
					{
						'title':'血宿契约',
						'color':'#ff84fc',
						'background':'#ffefff	'
					},
					{
						'title':'剑舞',
						'color':'#7ed321',
						'background':'#effae4	'
					},
					{
						'title':'斗破苍穹之大主宰',
						'color':'#ffc323',
						'background':'#fffae6	'
					},
					{
						'title':'地表最强黄金肾',
						'color':'#ffc323',
						'background':'#fffae6	'
					},
					{
						'title':'叛逆少女的恋爱补习',
						'color':'#ff84fc',
						'background':'#ffefff'
					},
					{
						'title':'末世女友：我家后院通末世',
						'color':'#25d7e4',
						'background':'#eafcfd'
					}
				]
				,
				//搜索关键词
				mhname:"",
				mhnames:""
			}
		},
		onShow() {
			//取出本地缓存数据
			this.getStor();
		},
		methods:{
			//搜索内容
			onSearch(){
				if(this.mhname.match(/^\s*$/)){
					uni.showToast({
						title:"请输入关键词",
						"icon":"none"
						// image:"../../static/images/search/mascot-dance.gif",
						
					})
					return;
				}
				
				//存入本地
				 uni.setStorageSync('com_mhnameData', this.mhname);
				 //取出本地缓存数据
				 this.getStor();
				 
				 uni.navigateTo({
				 	url:"../com_search_content/com_search_content?mhname="+this.mhname
				 })
				 
			},
			//热门搜索
			goSearch(title){
				console.log(title)
				uni.navigateTo({
					url:"../com_search_content/com_search_content?mhname="+title
				})
			},
			//历史搜索
			godetails(){
				uni.navigateTo({
					url:"../com_search_content/com_search_content?mhname="+this.mhnames
				})
			},
			//取出本地缓存数据
			
			getStor(){
				 let mhnames = uni.getStorageSync('com_mhnameData');
				 this.mhnames = mhnames;
				 //console.log(mhnames.length)
			},
			//清空本地缓存数据
			clearStor(){
				uni.showModal({
				    title: '',
				    content: '确定要清空吗?',
				    success:  (res)=> {
				        if (res.confirm) {
				             uni.removeStorageSync('com_mhnameData');
							 //取出本地缓存数据
							 this.getStor();
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
			}
			
		}
	}
</script>

<style scoped>
	.page {
		margin:  0 30upx;
	}
	.search-title {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		height: 117upx;
		overflow: hidden;
	}
	.search-title  .search-name {
		color: #fc6976;
		margin-right: 34upx;
		font-size: 37upx;
	}
	.search-title .search-input {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 80%;
		height: 75upx;
		border: 1px solid #fc6976;
		border-radius: 40upx;
	}
	.search-title .search-input input {
		font-size: 32upx;
		margin-left: 25upx;
		width: 80%;
		height: 80%;
	}
	.search-title .search-input .icon {
		
		margin-right: 19upx;
		width: 55upx;
		height: 55upx;
		
	}
	.search-title .search-input .icon  image {
		display: block;
		width: 100%;
		height:  100%;
	}
	
	/*热门搜*/
	.search-hot {
		width: 100%;
		height:  auto;
		overflow: hidden;
	}
	.search-hot .hot-title {
		padding: 40upx 0;
		font-size: 37upx;
		color: #fc6976;
	}
	.search-hot .hot-list {
		display: flex;
		align-items: center;
		
		flex-wrap: wrap;
		width: 100%;
		height: auto;
		overflow: hidden;
	}
	.search-hot .hot-list .list {
		margin-right: 15upx;
		margin-top: 8upx;
		width: auto;
		height: auto;
		padding: 0 26upx;
		margin:  0 26 26 0;
		font-size: 32upx;
		border-radius: 40upx;
		line-height: 70upx;
		box-sizing: border-box;
		/* background: #ebf7ff;
		color: #3bafff; */
	}
	
	/*历史搜索
	*/
   
   .search-history {
	   width: 100%;
	   height: auto;
	   overflow: hidden;
   }
   .search-history .history-title {
	   display: flex;
	   align-items: center;
	   justify-content: space-between;
	   font-size: 37upx;
	   padding: 40upx  13upx 40upx 0;
	   color: #fc6976;
   }
   .history-section {
	   display: flex;
	   align-items: center;
	   justify-content: space-between;
	   width: 100%;
	   height: 97upx;
	   font-size: 32upx;
	   color: #717171;
	   border-bottom: 1px solid #e8e8e8;
	   
   }
</style>
