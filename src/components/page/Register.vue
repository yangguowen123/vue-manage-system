<template>
    <div id="register" v-cloak>
		<div class="page-body">
			<div class="container register-container">
				<form>
					<div class="input-group input-group-lg mb-4">
						<div class="input-group-prepend">
							<span class="input-group-text"><i class="fa fa-user-circle-o" aria-hidden="true"></i></span>
						</div>
						<input type="text" class="form-control" placeholder="请输入用户名" v-model="userName">
					</div>

					<div class="input-group input-group-lg mb-4">
						<div class="input-group-prepend">
							<span class="input-group-text"><i class="fa fa-info" aria-hidden="true"></i></span>
						</div>
						<input type="text" class="form-control" placeholder="请输入真实姓名" v-model="realName">
					</div>

					<div class="input-group input-group-lg mb-4">
						<div class="input-group-prepend">
							<span class="input-group-text"><i class="fa fa-phone" aria-hidden="true"></i></span>
						</div>
						<input type="text" class="form-control" placeholder="请输入手机号" v-model="mobile">
					</div>

					<div class="input-group input-group-lg mb-4">
						<div class="input-group-prepend">
							<span class="input-group-text"><i class="fa fa-key" aria-hidden="true"></i></span>
						</div>
						<input type="password" class="form-control" placeholder="请输入登录密码" v-model="loginPwd">
					</div>

					<div class="input-group input-group-lg mb-4">
						<div class="input-group-prepend">
							<span class="input-group-text"><i class="fa fa-money" aria-hidden="true"></i></span>
						</div>
						<input type="password" class="form-control" placeholder="请输入资金密码" v-model="moneyPwd">
					</div>
					<div class="input-group input-group-lg mb-3" v-if="inviteRegisterFlag">
						<div class="input-group-prepend">
							<span class="input-group-text"><i class="fa fa-leaf" aria-hidden="true"></i></span>
						</div>
						<input type="text" class="form-control" placeholder="请输入邀请码" v-model="inviteCode" :disabled="inviteCodeReadonlyFlag">
					</div>
					<button type="button" class="btn btn-danger btn-lg btn-block" v-on:click="registerAndLogin">注册并登录</button>
				<a href="http://www.kxapp.com/app/download/95014">	<button type="button" class="btn btn-danger btn-lg btn-block" > 已有账号请下载APP</button></a>
				</form>
				<br/>
				<!--  <div><a href="http://110.42.9.84:8084/app/suishizhuan.apk">点击下载APP端</a></div> -->
			</div>
		</div>
	</div>
</template>
<script>
export default {
    data() {
        return  {
            inviteRegisterFlag : false,
            inviteCodeReadonlyFlag : false,
            userName : '',
            realName : '',
            mobile : '',
            loginPwd : '',
            moneyPwd : '',
            inviteCode : '',
        }
    },
    computed : {},
    created : function() {
    },
    mounted : function() {
        // headerVM.title = '注册';
        var inviteCode = window.getQueryString('inviteCode');
        if (inviteCode != null && inviteCode != '') {
            this.inviteCode = inviteCode;
            this.inviteCodeReadonlyFlag = true;
        }
        this.loadRegisterSetting();
    },
    methods : {
        loadRegisterSetting : function() {
            var that = this;
            that.$http.get('/masterControl/getRegisterSetting').then(function(res) {
                that.inviteRegisterFlag = res.data.inviteRegisterEnabled;
            });
        },

        /**
         * 注册并登录
         */
        registerAndLogin : function() {
            var that = this;
            if (that.userName == null || that.userName == '') {
                layer.alert('请输入用户名');
                return;
            }
            var userNamePatt = /^[A-Za-z][A-Za-z0-9]{5,11}$/;
            if (!userNamePatt.test(that.userName)) {
                layer.alert('用户名不合法!请输入以字母开头,长度为6-12个字母和数字的用户名');
                return;
            }
            if (that.realName == null || that.realName == '') {
                layer.alert('请输入真实姓名');
                return;
            }
            if (that.mobile == null || that.mobile == '') {
                layer.alert('请输入手机号');
                return;
            }
            if (that.mobile.length != 11) {
                layer.alert('手机号不合法,请重新输入');
                return;
            }
            if (that.loginPwd == null || that.loginPwd == '') {
                layer.alert('请输入登录密码');
                return;
            }
            var passwordPatt = /^[A-Za-z][A-Za-z0-9]{5,14}$/;
            if (!passwordPatt.test(that.loginPwd)) {
                layer.alert('登录密码不合法!请输入以字母开头,长度为6-15个字母和数字的密码');
                return;
            }
            if (that.moneyPwd == null || that.moneyPwd == '') {
                layer.alert('请输入资金密码');
                return;
            }
            if (!passwordPatt.test(that.moneyPwd)) {
                layer.alert('资金密码不合法!请输入以字母开头,长度为6-15个字母和数字的密码');
                return;
            }
            if (that.inviteRegisterFlag && (that.inviteCode == null || that.inviteCode == '')) {
                layer.alert('请输入邀请码');
                return;
            }
            that.$http.post('/userAccount/register', {
                userName : that.userName,
                realName : that.realName,
                mobile : that.mobile,
                loginPwd : that.loginPwd,
                moneyPwd : that.moneyPwd,
                inviteCode : that.inviteCode
            }, {
                emulateJSON : true
            }).then(function(res) {
                that.$http.post('/login', {
                    username : that.userName,
                    password : that.loginPwd
                }, {
                    emulateJSON : true
                }).then(function(res) {
                    window.location.href = '/';
                });
            });
        }
    }
};
</script>
<style scoped>
#register {
    width: 100%;
    height: 100%;
    background-image: url(../../assets/img/login-bg.jpg);
    background-size: 100%;
}

.register-container {
	padding-top: 2rem;
    padding-bottom: 1rem;
    width: 500px;
}

.register-container .fa {
	height: 20px;
	width: 20px;
}

.register-container button {
	background-color: #37a5fd;
    border-color: #37a5fd;
    border-radius: 1.49rem;
    margin-bottom: 20px;
}
</style>


