<template>
    <!-- <div id="login" v-cloak> -->
	    <!-- <div class="wrp-auto" >
			<div class="header-info">
				<a href="#" class="fl"></a>
				<a href="#" class="fr reg"  v-on:click="window.location.href = '/register'">注册</a>
				<div class="clearfix"></div>
			</div>
			<div class="login-box">
				<h3>登录</h3>
				<p>欢迎使用{{websiteTitle}}</p>
				<form>
					<div class="login-input">
						<input type="text"  placeholder="请输入账号" v-model="userName"/>
						<input type="password"  placeholder="请输入密码" v-model="password"/>
						<template v-if="mobileLoginGoogleAuth">
							<div class="form-group">
								<input type="text" placeholder="如未绑定谷歌安全密钥，此处留空" v-model="googleVerCode" >
							</div>
						</template>
					</div>
					<div class="wj-pwd">
						<input type="checkbox" v-model="rememberMe" /><span>记住密码</span>
					</div>
					<div class="login-btn" v-on:click="login">
						<a href="#">登录</a>
					</div>
				</form>
			</div>
		</div> -->
        <div class="login-wrap">
            <div class="ms-login">
                <div class="header-info">
                    <span>登录</span>
                    <a href="javascript:void(0)" class="fr reg"  v-on:click="$router.push('/register')">注册</a>
                    <div class="clearfix"></div>
                </div>
                <div class="ms-title">欢迎使用{{websiteTitle}}</div>
                <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
                    <el-form-item prop="userName">
                        <el-input v-model="param.userName" placeholder="请输入账号" >
                            <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input
                            type="password"
                            placeholder="请输入密码"
                            v-model="param.password"
                            @keyup.enter.native="submitForm()"
                        >
                            <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input v-model="googleVerCode" placeholder="如未绑定谷歌安全密钥，此处留空" >
                            <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                        </el-input>
                    </el-form-item>
                    <div class="wj-pwd">
                        <input type="checkbox" v-model="rememberMe" /><span>记住密码</span>
                    </div>
                    <div class="login-btn">
                        <el-button type="primary" @click="login">登录</el-button>
                    </div>
                </el-form>
            </div>
        </div>
    <!-- </div> -->
</template>

<script>
import { login } from '@/api';

export default{
    data() {
        return {
            websiteTitle : '',
            memberMeEnabled : false,
            registerEnabled : false,
            param: {
                userName : '',
                password : '',
            },
            googleVerCode : '',
            mobileLoginGoogleAuth : false,
            rememberMe : false,
            rules: {
                userName: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
            },
        }
    },
    computed : {},
    created : function() {
    },
    mounted : function() {
        // headerVM.title = '登录';
        // headerVM.showHeaderFlag = false;
        this.loadSystemSetting();
        this.loadRegisterSetting();
    },
    methods : {

        loadSystemSetting : function() {
            var that = this;
            that.$http.get('/masterControl/getSystemSetting').then(function(res) {
                that.websiteTitle = res.data.websiteTitle;
                that.memberMeEnabled = res.data.memberMeEnabled;
                that.mobileLoginGoogleAuth = res.data.mobileLoginGoogleAuth;
                localStorage.setItem('ms_website_title', that.websiteTitle);
            });
        },

        loadRegisterSetting : function() {
            var that = this;
            that.$http.get('/masterControl/getRegisterSetting').then(function(res) {
                that.registerEnabled = res.data.registerEnabled;
            });
        },

        login : function() {
            var that = this;
            if (that.param.userName == null || that.param.userName == '') {
                layer.alert('请输入用户名');
                return;
            }
            if (that.param.password == null || that.param.password == '') {
                layer.alert('请输入密码');
                return;
            }
            login({
                username : that.param.userName,
                password : that.param.password,
                googleVerCode : that.googleVerCode,
                rememberMe : !that.memberMeEnabled ? false : that.rememberMe
            }).then(() => {
                that.$message.success('登录成功');
                localStorage.setItem('ms_username', that.param.userName);
                that.$router.push('/');
                // that.$router.push('/my-home-page');
            })
        }
    }
};
</script>

<style scoped>
.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url(../../assets/img/login-bg.jpg);
    background-size: 100%;
}
.ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: #fff;
    border-bottom: 1px solid #ddd;
}
.ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 350px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.3);
    overflow: hidden;
}
.ms-content {
    padding: 30px 30px;
}
.login-btn {
    text-align: center;
}
.login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
}
.login-tips {
    font-size: 12px;
    line-height: 30px;
    color: #fff;
}
</style>