<template>
    <div id="withdraw" v-cloak>
		<div class="page-body">
			<div class="withdraw-form">
				<div class="row">
					<div class="col-sm-9 offset-sm-3 withdraw-form-item">
						<label>选择钱包</label> <span><select v-model="selectedVirtualWallet">
								<option value="">请选择</option>
								<option v-for="(virtualWallet, index) in virtualWallets" :key="index" :value="virtualWallet">{{virtualWallet.virtualWalletAddr}}</option>
						</select></span>
					</div>
				</div>
			</div>
			<div class="card bank-info" v-if="selectedVirtualWallet != null && selectedVirtualWallet != ''">
				<div class="card-header">{{selectedVirtualWallet.virtualWalletType}}</div>
				<div class="card-body">
					<div class="row">
						<div class="col-sm-9 offset-sm-3 bank-info-item">
							<label>钱包地址:</label> <span>{{selectedVirtualWallet.virtualWalletAddr}}</span>
						</div>
					</div>
				</div>
			</div>
			<div class="withdraw-form">
				<div class="row">
					<div class="col-sm-9 offset-sm-3 withdraw-form-item withdraw-form-highlight-item">
						<label>账户余额</label> <span>{{cashDeposit}}</span>{{global.systemSetting.currencyUnit}}
					</div>
				</div>
				<div class="row">
					<div class="col-sm-9 offset-sm-3 withdraw-form-item">
						<label>提现金额</label> <span><input type="number" class="withdraw-amount-input-item" v-model="withdrawAmount"></span>{{global.systemSetting.currencyUnit}}
					</div>
				</div>
				<div class="row">
					<div class="col-sm-9 offset-sm-3 withdraw-form-item">
						<label>资金密码</label> <span><input type="password" class="withdraw-amount-input-item" v-model="moneyPwd"></span>
					</div>
				</div>
				<div class="row">
					<div class="col-sm-9 offset-sm-3">
						<div class="alert alert-light" style="font-size: 14px; padding-top: 0px;">{{withdrawExplain}}</div>
					</div>
				</div>
				<div class="row">
					<div class="col-sm-12">
						<button type="button" class="btn btn-success btn-lg btn-block" v-on:click="confirmWithdraw">确认提现</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
    data() {
        return {
            global : GLOBAL,
            withdrawExplain : '',
            virtualWallets : [],
            selectedVirtualWallet : '',
            cashDeposit : '',
            withdrawAmount : '',
            moneyPwd : ''
        }
    },
    computed : {},
    created : function() {
    },
    mounted : function() {
        this.loadWithdrawSetting();
        this.loadVirtualWallet();
        this.getUserAccountInfo();
    },
    methods : {

        loadWithdrawSetting : function() {
            var that = this;
            that.$http.get('/masterControl/getWithdrawSetting').then(function(res) {
                that.withdrawExplain = res.data.withdrawExplain;
            });
        },

        loadVirtualWallet : function() {
            var that = this;
            that.$http.get('/virtualWallet/findMyVirtualWallet').then(function(res) {
                that.virtualWallets = res.data;
            });
        },

        /**
         * 获取用户账号信息
         */
        getUserAccountInfo : function() {
            var that = this;
            that.$http.get('/userAccount/getUserAccountInfo').then(function(res) {
                if (res.data != null) {
                    that.cashDeposit = res.data.cashDeposit;
                }
            });
        },

        confirmWithdraw : function() {
            var that = this;
            if (that.selectedVirtualWallet == null || that.selectedVirtualWallet == '') {
                layer.alert('请选择钱包');
                return;
            }
            if (that.withdrawAmount == null || that.withdrawAmount == '') {
                layer.alert('请输入提现金额');
                return;
            }
            if (that.withdrawAmount > that.cashDeposit) {
                layer.alert('提现金额不足');
                return;
            }
            if (that.moneyPwd == null || that.moneyPwd == '') {
                layer.alert('请输入资金密码');
                return;
            }
            that.$http.post('/withdraw/startWithdrawWithVirtualWallet', {
                virtualWalletId : that.selectedVirtualWallet.id,
                withdrawAmount : that.withdrawAmount,
                moneyPwd : that.moneyPwd
            }, {
                emulateJSON : true
            }).then(function(res) {
                layer.open({
                    title : '提示',
                    icon : '1',
                    closeBtn : 0,
                    btn : [],
                    content : '发起成功,系统审核通过后会马上为您出款!',
                    time : 2000,
                    end : function() {
                        window.location.href = '/my-home-page';
                    }
                });
            });
        }
    }
}
</script>
<style scoped>
.withdraw-form {
	padding-left: 1rem;
	padding-right: 1rem;
	padding-top: 3rem;
}

.withdraw-form .row {
	padding-bottom: 1rem;
}

.withdraw-form-item label {
	text-align: end;
	width: 5rem;
	margin-right: 1rem;
}

.withdraw-form-item input {
	border: 0;
	outline: none;
	border-bottom: 1px solid #35a79c;
}

.withdraw-form-item select {
	border: 0;
	outline: none;
	border-bottom: 1px solid #35a79c;
	min-width: 12rem;
}

.bank-info {
	margin: 1rem;
	border: 1px solid red;
}

.bank-info .card-header {
	padding: 0.3rem;
	background-color: unset;
}

.bank-info .card-body {
	padding: 0;
	padding-top: 0.25rem;
}

.bank-info .row {
	padding-bottom: 0.25rem;
	padding-right: 1rem;
}

.bank-info-item label {
	text-align: end;
	width: 5rem;
	margin-right: 1rem;
}
</style>