<template>
    <div id="virtualWalletInfo" v-cloak>
		<div class="page-body">
			<div class="personal-info-form" v-show="showVirtualWalletInfoFlag">
				<template v-if="virtualWalletInfo.virtualWalletLatelyModifyTime != null">
				<div class="row">
					<div class="col-sm-9 offset-sm-3 personal-info-form-item">
						<label>钱包地址</label> <span>{{virtualWalletInfo.virtualWalletAddr}}</span>
					</div>
				</div>
				<div class="row">
					<div class="col-sm-9 offset-sm-3 personal-info-form-item">
						<label></label> <span class="personal-info-form-item-action" v-on:click="showEditVirtualWalletInfoPage"><span>点击更换电子钱包</span><i aria-hidden="true" class="fa fa-angle-right"></i></span>
					</div>
				</div>
				</template>
				<template v-if="virtualWalletInfo.virtualWalletLatelyModifyTime == null">
				<div class="row">
					<div class="col-sm-9 offset-sm-3 personal-info-form-item">
						<label>未补充</label> <span class="personal-info-form-item-action" v-on:click="showEditVirtualWalletInfoPage"><span>点击补充电子钱包</span><i aria-hidden="true" class="fa fa-angle-right"></i></span>
					</div>
				</div>
				</template>
			</div>
			<form class="edit-bank-info-form" v-show="editVirtualWalletInfoFlag">
				<div class="form-group">
					<label>钱包地址</label> <input type="text" class="form-control" placeholder="请输入钱包地址" v-model="virtualWalletAddr">
				</div>
				<button type="button" class="btn btn-danger btn-lg btn-block" v-on:click="bindVirtualWallet">确认绑定</button>
				<button type="button" class="btn btn-light btn-lg btn-block" v-on:click="hideEditVirtualWalletPage">返回</button>
			</form>
		</div>
	</div>
</template>
<script>
import virtualWalletInfo from '@/components/common/js/virtual-wallet-info.js';
export default virtualWalletInfo;
</script>
<style scoped>
.personal-info-form {
	padding-left: 2rem;
	padding-top: 4rem;
}

.personal-info-form .row {
	padding-bottom: 1rem;
}

.personal-info-form-item {
	border-bottom: .01563rem solid #f2f2f2;
	height: 2.5rem;
}

.personal-info-form-item label {
	text-align: end;
	width: 6rem;
	margin-right: 1rem;
}

.personal-info-form-item span {
	color: #9e9e9e;
}

.personal-info-form-item-action {
	width: 12rem;
	display: inline-block;
}

.personal-info-form-item-action span {
	padding-right: 3rem;
	width: 11rem;
	display: inline-block;
}

.personal-info-form-item-action i {
	font-size: 1.6rem;
}

.edit-bank-info-form {
	padding-top: 3rem;
	padding-left: 2rem;
	padding-right: 2rem;
}
</style>