<template>
    <div id="virtualWallet" v-cloak>
		<div class="page-body" style="background: #f2f2f2;" v-show="showVirtualWalletFlag">
			<div class="form-details" v-for="(virtualWallet, index) in virtualWallets" :key="index">
				<div class="form-details-body">
					<div class="form-details-item form-details-item-sm">
						<label>钱包类型:</label> <span>{{virtualWallet.virtualWalletType}}</span>
					</div>
					<div class="form-details-item form-details-item-sm">
						<label>钱包地址:</label> <span>{{virtualWallet.virtualWalletAddr}}</span>
					</div>
					<div class="form-details-item form-details-item-sm">
						<label>最近修改时间:</label> <span>{{virtualWallet.latelyModifyTime}}</span>
					</div>
					<div class="form-details-item">
						<button class="btn btn-outline-info" type="button" v-on:click="showEditVirtualWalletPage(virtualWallet.id)">编辑钱包</button>
						<button class="btn btn-outline-danger" type="button" v-on:click="delVirtualWallet(virtualWallet.id)">删除</button>
					</div>
				</div>
			</div>
			<div class="add-action" v-on:click="showEditVirtualWalletPage('')">
				<label>+</label>
			</div>
		</div>
		<div class="page-body" style="background: #f2f2f2;" v-show="showEditVirtualWalletFlag">
			<div class="container" style="margin-top: 1.3rem;">
				<form>
					<div class="form-group">
						<label>钱包类型:</label> <input type="text" class="form-control" v-model="editVirtualWallet.virtualWalletType">
					</div>
					<div class="form-group">
						<label>钱包地址:</label> <input type="text" class="form-control" v-model="editVirtualWallet.virtualWalletAddr">
					</div>
					<button type="button" class="btn btn-danger btn-lg btn-block" v-on:click="addOrUpdateVirtualWallet">保存</button>
					<button type="button" class="btn btn-light btn-lg btn-block" v-on:click="hideEditVirtualWalletPage">返回</button>
				</form>
			</div>
		</div>
	</div>
</template>
<script>
import virtualWallet from '@/components/common/js/virtual-wallet.js';
export default virtualWallet;
</script>
<style scoped>
.add-action {
	position: fixed;
	background-color: #dc3545;
	width: 3.5rem;
	height: 3.5rem;
	border-radius: 50%;
	color: #f8f9fa;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 50px;
	box-shadow: 0 0 6px rgba(0, 0, 0, .12);
	z-index: 5;
	right: 2rem;
	bottom: 8rem;
}
</style>


