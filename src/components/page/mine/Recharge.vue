<template>
  <div id="recharge" v-cloak>
		<div class="page-body">
			<ul class="nav nav-tabs nav-justified">
				<li class="nav-item common-nav-item" v-for="(payType, index) in payTypes" :key="index" v-bind:class="{'common-nav-item-active': selectedPayType.type == payType.type}" v-on:click="switchPayType(payType)"><a
					class="nav-link">{{payType.name}}</a></li>
			</ul>
			<div class="recharge-form" v-show="selectedPayType.payCategory == 'bankCard'">
				<div class="row">
					<div class="col-sm-9 offset-sm-3 recharge-form-item">
						<label>选择银行</label> <span><select v-model="selectedPayChannel">
								<option value="">请选择</option>
								<option v-for="(payChannel, index) in filterPayChannel()" :key="index" :value="payChannel">{{payChannel.bankName + '-' + payChannel.accountHolder}}</option>
						</select></span>
					</div>
				</div>
			</div>
			<div class="recharge-form" v-show="selectedPayType.payCategory == 'virtualWallet'">
				<div class="row">
					<div class="col-sm-9 offset-sm-3 recharge-form-item">
						<label>选择钱包</label> <span><select v-model="selectedPayChannel">
								<option value="">请选择</option>
								<option v-for="(payChannel, index) in filterPayChannel()" :key="index" :value="payChannel">{{payChannel.channelName}}</option>
						</select></span>
					</div>
				</div>
			</div>
			<div class="recharge-form" v-show="selectedPayType.payCategory == 'gatheringCode'">
				<div class="row">
					<div class="col-sm-9 offset-sm-3 recharge-form-item">
						<label>选择收款码</label> <span><select v-model="selectedPayChannel">
								<option value="">请选择</option>
								<option v-for="(payChannel, index) in filterPayChannel()" :key="index" :value="payChannel">{{payChannel.channelName}}</option>
						</select></span>
					</div>
				</div>
			</div>
			<div class="card bank-info" v-show="selectedPayType.payCategory == 'bankCard' && (selectedPayChannel != null && selectedPayChannel != '')">
				<div class="card-header">{{selectedPayChannel.bankName}}</div>
				<div class="card-body">
					<div class="row">
						<div class="col-sm-9 offset-sm-3 bank-info-item">
							<label>收款人:</label> <span>{{selectedPayChannel.accountHolder}}</span>
							<button type="button" class="btn btn-sm btn-danger copy-btn" :data-clipboard-text="selectedPayChannel.accountHolder">复制</button>
						</div>
					</div>
					<div class="row">
						<div class="col-sm-9 offset-sm-3 bank-info-item">
							<label>卡号:</label> <span>{{selectedPayChannel.bankCardAccount}}</span>
							<button type="button" class="btn btn-sm btn-danger copy-btn" :data-clipboard-text="selectedPayChannel.bankCardAccount">复制</button>
						</div>
					</div>
				</div>
			</div>
			<div class="card bank-info" v-show="selectedPayType.payCategory == 'virtualWallet' && (selectedPayChannel != null && selectedPayChannel != '')">
				<div class="card-header">{{selectedPayChannel.channelName}}</div>
				<div class="card-body">
					<div class="row">
						<div class="col-sm-9 offset-sm-3 bank-info-item">
							<label>钱包地址:</label> <span>{{selectedPayChannel.virtualWalletAddr}}</span>
							<button type="button" class="btn btn-sm btn-danger copy-btn" :data-clipboard-text="selectedPayChannel.virtualWalletAddr">复制</button>
						</div>
					</div>
				</div>
			</div>
			<div class="card bank-info" v-if="selectedPayType.payCategory == 'gatheringCode' && (selectedPayChannel != null && selectedPayChannel != '')">
				<div class="card-header">{{selectedPayChannel.payee}}</div>
				<div class="card-body">
					<div class="row">
						<div class="col-sm-9 offset-sm-3" style="text-align: center;">
							<img style="max-height: 24rem; max-width: 100%;" :src="'/storage/fetch/' + selectedPayChannel.gatheringCodeStorageId">
						</div>
					</div>
				</div>
			</div>
			<div v-show="selectedPayType.payCategory == 'thirdPartyPay'">
				<div class="please-selected-pay-channel">请选择充值通道</div>
				<ul class="list-group">
					<li class="list-group-item" v-for="(payChannel, index) in payChannels" :key="index" v-show="selectedPayType.id == payChannel.payTypeId" v-on:click="selectedPayChannel = payChannel">{{payChannel.channelName}}<span
						class="selected-pay-channel" v-show="selectedPayChannel == payChannel"><i class="fa fa-check-circle" aria-hidden="true"></i></span></li>
				</ul>
			</div>
			<div class="recharge-form">
				<div v-show="selectedPayType.payCategory == 'bankCard'">
					<div class="row" style="padding-left: 3rem; color: rgb(55, 170, 253); font-weight: bold;">
						<div class="col-sm-12">请依银行资料存款后再填写以下信息</div>
					</div>
					<div class="row">
						<div class="col-sm-9 offset-sm-3 recharge-form-item">
							<label>存款日期</label> <span><input type="date" v-model="depositDate"></span>
						</div>
					</div>
					<div class="row">
						<div class="col-sm-9 offset-sm-3 recharge-form-item">
							<label>存款时间</label> <span><input type="time" v-model="depositTime"></span>
						</div>
					</div>
					<div class="row">
						<div class="col-sm-9 offset-sm-3 recharge-form-item">
							<label>存款人</label> <span><input type="text" v-model="depositor"></span>
						</div>
					</div>
				</div>
				<div v-show="selectedPayType.payCategory == 'virtualWallet'">
					<div class="row" style="padding-left: 3rem; color: rgb(55, 170, 253); font-weight: bold;">
						<div class="col-sm-12">请依钱包地址存款后再填写以下信息</div>
					</div>
					<div class="row">
						<div class="col-sm-9 offset-sm-3 recharge-form-item">
							<label>存款日期</label> <span><input type="date" v-model="depositDate"></span>
						</div>
					</div>
					<div class="row">
						<div class="col-sm-9 offset-sm-3 recharge-form-item">
							<label>存款时间</label> <span><input type="time" v-model="depositTime"></span>
						</div>
					</div>
					<div class="row">
						<div class="col-sm-9 offset-sm-3 recharge-form-item">
							<label>存款人</label> <span><input type="text" v-model="depositor"></span>
						</div>
					</div>
				</div>
				<div v-show="selectedPayType.payCategory == 'gatheringCode'">
					<div class="row" style="padding-left: 3rem; color: rgb(55, 170, 253); font-weight: bold;">
						<div class="col-sm-12">请扫收款码支付后再填写以下信息</div>
					</div>
					<div class="row">
						<div class="col-sm-9 offset-sm-3 recharge-form-item">
							<label>支付日期</label> <span><input type="date" v-model="depositDate"></span>
						</div>
					</div>
					<div class="row">
						<div class="col-sm-9 offset-sm-3 recharge-form-item">
							<label>支付时间</label> <span><input type="time" v-model="depositTime"></span>
						</div>
					</div>
					<div class="row">
						<div class="col-sm-9 offset-sm-3 recharge-form-item">
							<label>支付账号</label> <span><input type="text" v-model="depositor" placeholder="您的微信/支付宝昵称"></span>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col-sm-9 offset-sm-3 recharge-form-item">
						<label>充值金额</label> <span><input type="number" v-model="rechargeAmount"></span>{{global.systemSetting.currencyUnit}}
					</div>
				</div>
				<div class="row">
					<div class="col-sm-9 offset-sm-3 recharge-form-item">
						<div class="quick-input-amount" v-for="(amount, index) in quickInputAmount.split(',')" :key="index" v-on:click="rechargeAmount = amount">{{amount}}</div>
					</div>
				</div>
				<div class="row">
					<div class="col-sm-9 offset-sm-3">
						<div class="alert alert-light" style="font-size: 14px; padding-top: 0; padding-bottom: 0;">{{rechargeExplain}}</div>
					</div>
				</div>
				<div class="row">
					<div class="col-sm-12">
						<button type="button" class="btn btn-success btn-lg btn-block" v-on:click="confirmSubmit">确认提交</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
console.log('GLOBAL', GLOBAL);
export default {
    data() {
        return {
            title: '充值',
            global : GLOBAL,
            quickInputAmount : '',
            rechargeExplain : '',
            payTypes : [],
            selectedPayType : {},
            payChannels : [],
            selectedPayChannel : '',
            depositDate : dayjs().format('YYYY-MM-DD'),
            depositTime : dayjs().format('HH:mm'),
            depositor : '',
            rechargeAmount : ''
        }
    },
	computed : {},
	created : function() {
	},
	mounted : function() {
		var clipboard = new ClipboardJS('.copy-btn');
		clipboard.on('success', function(e) {
			layer.alert('复制成功!', {
				icon : 1,
				time : 3000,
				shade : false
			});
		});
		this.loadRechargeSetting();
		this.loadPayType();
		this.loadPayChannel();

	},
	methods : {
        goBack(){
            this.$router.go(-1);
        },

		loadRechargeSetting : function() {
			var that = this;
			that.$http.get('/masterControl/getRechargeSetting').then(function(res) {
				that.quickInputAmount = res.data.quickInputAmount;
				that.rechargeExplain = res.data.rechargeExplain;
			});
		},

		loadPayType : function() {
			var that = this;
			that.$http.get('/recharge/findEnabledPayType').then(function(res) {
				that.payTypes = res.data;
				if (that.payTypes.length > 0) {
					that.selectedPayType = that.payTypes[0];
				} else {
					layer.alert('暂没有可用的充值通道', {
						title : '提示',
						icon : 7,
						time : 3000
					});
				}
			});
		},

		loadPayChannel : function() {
			var that = this;
			that.$http.get('/recharge/findEnabledPayChannel').then(function(res) {
				that.payChannels = res.data;
			});
		},

		switchPayType : function(payType) {
			this.selectedPayType = payType;
			this.selectedPayChannel = '';
		},

		filterPayChannel : function() {
			var payChannels = [];
			for (var i = 0; i < this.payChannels.length; i++) {
				if (this.selectedPayType.id == this.payChannels[i].payTypeId) {
					payChannels.push(this.payChannels[i]);
				}
			}
			return payChannels;
		},

		confirmSubmit : function() {
			var that = this;
			if (that.selectedPayChannel == null || that.selectedPayChannel == '') {
				layer.alert('请选择充值通道');
				return;
			}
			if (that.selectedPayType.payCategory == 'bankCard' || that.selectedPayType.payCategory == 'virtualWallet') {
				if (that.depositDate == null || that.depositDate == '') {
					layer.alert('请输入存款日期');
					return;
				}
				if (that.depositTime == null || that.depositTime == '') {
					layer.alert('请输入存款时间');
					return;
				}
				if (that.depositor == null || that.depositor == '') {
					layer.alert('请输入存款人');
					return;
				}
			}
			if (that.selectedPayType.payCategory == 'gatheringCode') {
				if (that.depositDate == null || that.depositDate == '') {
					layer.alert('请输入支付日期');
					return;
				}
				if (that.depositTime == null || that.depositTime == '') {
					layer.alert('请输入支付时间');
					return;
				}
				if (that.depositor == null || that.depositor == '') {
					layer.alert('请输入支付账号');
					return;
				}
			}
			if (that.rechargeAmount == null || that.rechargeAmount == '') {
				layer.alert('请输入充值金额');
				return;
			}
			layer.open({
				title : '提示',
				icon : 7,
				closeBtn : 0,
				btn : [],
				content : '正在创建充值订单...',
				time : 2000
			});
			that.$http.post('/recharge/generateRechargeOrder', {
				payChannelId : that.selectedPayChannel.id,
				depositTime : that.depositDate + ' ' + that.depositTime,
				depositor : that.depositor,
				rechargeAmount : that.rechargeAmount
			}, {
				emulateJSON : true
			}).then(function(res) {
				if (that.selectedPayType.payCategory == 'bankCard' || that.selectedPayType.payCategory == 'virtualWallet' || that.selectedPayType.payCategory == 'gatheringCode') {
					layer.open({
						title : '提示',
						icon : '1',
						closeBtn : 0,
						btn : [],
						content : '提交成功,预计30分钟到帐!',
						time : 1500,
						end : function() {
							window.location.href = '/my-home-page';
						}
					});
				} else {
					layer.open({
						title : '提示',
						icon : '1',
						closeBtn : 0,
						btn : [],
						content : '充值订单创建成功,正在跳转到支付页面!',
						time : 2000,
						end : function() {
							window.location.href = res.data.payUrl;
						}
					});
				}
			});
		}
	}
}
</script>


<style scoped>
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

.bank-info-item button {
	float: right;
}

.please-selected-pay-channel {
	padding-top: 0.5rem;
	padding-left: 3rem;
	padding-bottom: 0.5rem;
}

.selected-pay-channel {
	float: right;
}

.selected-pay-channel i {
	color: #dc3545;
	font-size: 1.4rem;
}

.recharge-form {
	padding-left: 1rem;
	padding-right: 1rem;
	padding-top: 1rem;
}

.recharge-form .row {
	padding-bottom: 0.5rem;
}

.recharge-form-item label {
	text-align: end;
	width: 5rem;
	margin-right: 1rem;
}

.recharge-form-item input {
	border: 0;
	outline: none;
	border-bottom: 1px solid #35a79c;
	min-width: 12rem;
}

.recharge-form-item select {
	border: 0;
	outline: none;
	border-bottom: 1px solid #35a79c;
	min-width: 12rem;
}

.quick-input-amount {
	display: inline-block;
	text-align: center;
	border-radius: 6px;
	background: #fffaf7;
	border: 2px solid #ffecdf;
	color: #e4393c;
	width: 4rem;
	height: 2rem;
	line-height: 2rem;
	margin-right: 0.7rem;
	border-radius: 0.6rem;
	margin-bottom: 0.4rem;
}
.quick-input-amount {
color: #fff;
    background: #79d6ff;
    border: 2px solid #79d6ff;
}
</style>
