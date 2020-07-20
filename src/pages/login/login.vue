<template>
	<view class="page">
		<view class="login-header">
			<view class="header-iamge">
				<image src="../../static/images/login/logo.png" mode=""></image>
			</view>
		</view>
		
		<!--登录-->
		<view class="login-wrap">
			
			<view class="login-box">
				<view class="box-icon">
					<image src="../../static/images/login/yonghu.png" mode=""></image>
				</view>
				<view class="box-input">
					<input type="text" value=""  placeholder="请输入手机号码"/>
				</view>
			</view>
			
			<view class="login-box">
				<view class="box-icon">
					<image src="../../static/images/login/mima.png" mode=""></image>
				</view>
				<view class="box-input">
					<input type="password" value=""  placeholder="请输入密码" v-if="isPass"/>
					
					<input type="text" value=""  placeholder="请输入密码" v-if="!isPass"/>
				</view>
				
				<view class="box-showp " :class="{hidep:isPass}" @click="showPassword()">
					
				</view>
				
			</view>
			
			<view class="login-name" >
				登录
			</view>
			
			
			
		</view>
	
	
		<!--第三房登录-->
		<view class="login-thid">
			<view class="thid-name">
				使用第三方账号登录
			</view>
			<view class="thid-icon">
				<!--#ifndef MP-WEIXIN-->
				<view class="icon" @click="onLogin()">
					<image src="../../static/images/login/wxlogin.png" mode=""></image>
				</view>
				<!--#endif-->
				<!--#ifdef MP-WEIXIN-->
				<button plain="true"  class="icon" open-type="getUserInfo" @getuserinfo="getUserInfo">
					<image src="../../static/images/login/wxlogin.png" mode=""></image>
				</button>
				<!--#endif-->
				
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//是否显示密文
				isPass:false
			}
		},
		methods: {
			//是否显示密文密码
			showPassword(){
				this.isPass = !this.isPass
			},
			//用户登录
			onLogin(){
				uni.login({
				  provider: 'weixin',
				  success:  (loginRes)=> {
				   // console.log(loginRes);
				    //获取用户信息
				    uni.getUserInfo({
				      provider: 'weixin',
				      success:  (infoRes)=> {
				       // console.log(infoRes.userInfo);
						let data = infoRes.userInfo
						let nickName = data.nickName
						let avUrl =  data.avatarUrl
						
						//存本地缓存
						
						this.getStoray(nickName,avUrl)
						//console.log(userInfo)
						uni.switchTab({
							url:"../my/my"
						})
						
				      }
				    });
				  }
				});
			}
			,
			//微信端用户登录
			getUserInfo(e){
				//console.log(e)
				let data = e.detail || e.target
				let nickName = data.userInfo.nickName
				let avUrl =  data.userInfo.avatarUrl
				
				//存本地缓存
				
				this.getStoray(nickName,avUrl)
				
				//console.log(userInfo)
				uni.switchTab({
					url:"../my/my"
				})
				
			}
			,
			//存人本地缓存
			getStoray(nickName,avUrl){
				let  userInfo = {
					nickName
					,
					avUrl
				}
				uni.setStorageSync('userInfo', userInfo);
			}
		}
	}
</script>

<style scoped>
	.page {
		margin:  0 30upx;
	}
	button {
		border: none;
		background: none;
		width: 100%;
		height: 100%;
	}
	.login-header {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: auto;
		overflow: hidden;
		margin: 50upx 0;
	}
	.login-header .header-iamge {
		width: 200upx;
		height: 200upx;
	}
	.login-header .header-iamge image {
		display: block;
		width: 100%;
		height: 100%;
	}
	
	.login-wrap {
		margin: 0 33upx;
	}
	.login-wrap .login-name {
		width: 90%;
		height: 48upx;
		background-color: #fc6976;
		margin: 48upx auto;
		border-radius: 5upx;
		text-align: center;
		line-height: 48upx;
		color: #FFFFFF;
		font-size: 38upx;
		padding: 20upx;
		font-weight: 500;
	}
	.login-wrap .login-box {
		display: flex;
		align-items: center;
		width: 100%;
		height: 60upx;
		border-bottom: 1px solid #F5F5F5;
		padding-bottom:12upx ;
		padding-top: 12upx;
		
	}
	.login-wrap .login-box .box-showp {
		margin-top: 12upx;
		margin-left: 8upx;
		width: 50upx;
		height: 50upx;
		overflow: hidden;
		background: url('../../static/images/login/xianshimima.png') no-repeat;
		background-size: 100% 100%;
	}
	.login-wrap .login-box .box-showp.hidep {
		background: url('../../static/images/login/yincmima.png') no-repeat;
		background-size: 100% 100%;
	}
	.login-wrap .login-box .box-icon {
	
		
		
		width: 50upx;
		
		height:50upx;
		overflow: hidden;
		
	}
	
	
	.login-wrap .login-box .box-icon image {
		display: block;
		width: 100%;
		height: 100%;
	}
	.login-wrap .login-box .box-input {
		margin-left: 12upx;
		width: 100%;
		height: 100%;
	}
	.login-wrap .login-box .box-input input {
		width: 100%;
		height: 100%;
	}
	
	.login-thid {
		margin-top: 85upx;
		width: 100%;
		height: auto;
		overflow: hidden;
	}
	.login-thid  .thid-name {
		color: #DDDDDD;
		font-size: 24upx;
		text-align: center;
	}
	.login-thid  .thid-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: auto;
	}
	.login-thid  .thid-icon .icon {
		margin-top: 24upx;
		/*#ifdef MP-WEIXIN*/
		width: 155rpx;
		/*#endif*/
		/*#ifndef MP-WEIXIN*/
		width: 94upx;
		/*#endif*/
		height: 94upx;
	} 
	.login-thid  .thid-icon .icon image {
		display: block;
		width: 100%;
		height: 100%;
	}
</style>
