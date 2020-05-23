<template>
    <div id="bankCard" v-cloak>
		<div class="page-body" style="background: #f2f2f2;" v-show="showBankCardFlag">
			<div class="form-details" v-for="(bankCard, index) in bankCards" :key="index">
				<div class="form-details-body">
					<div class="form-details-item form-details-item-sm">
						<label>开户人:</label> <span>{{bankCard.accountHolder}}</span><label>开户银行:</label> <span>{{bankCard.openAccountBank}}</span>
					</div>
					<div class="form-details-item form-details-item-sm">
						<label>卡号:</label> <span>{{bankCard.bankCardAccount}}</span>
					</div>
					<div class="form-details-item form-details-item-sm">
						<label>最近修改时间:</label> <span>{{bankCard.latelyModifyTime}}</span>
					</div>
					<div class="form-details-item">
						<button class="btn btn-outline-info" type="button" v-on:click="showEditBankCardPage(bankCard.id)">编辑银行卡</button>
						<button class="btn btn-outline-danger" type="button" v-on:click="delBankCard(bankCard.id)">删除</button>
					</div>
				</div>
			</div>
			<div class="add-action" v-on:click="showEditBankCardPage('')">
				<label>+</label>
			</div>
		</div>
		<div class="page-body" style="background: #f2f2f2;" v-show="showEditBankCardFlag">
			<div class="container" style="margin-top: 1.3rem;">
				<form>
					<div class="form-group">
						<label>开户人:</label> <input type="text" class="form-control" v-model="editBankCard.accountHolder">
					</div>
					<div class="form-group">
						<label>开户银行:</label> <input type="text" class="form-control" v-model="editBankCard.openAccountBank">
					</div>
					<div class="form-group">
						<label>银行卡号:</label> <input type="text" class="form-control" v-model="editBankCard.bankCardAccount">
					</div>
					<button type="button" class="btn btn-danger btn-lg btn-block" v-on:click="addOrUpdateBankCard">保存</button>
					<button type="button" class="btn btn-light btn-lg btn-block" v-on:click="hideEditBankCardPage">返回</button>
				</form>
			</div>
		</div>
	</div>
</template>
<script>
import bankCard from '@/components/common/js/bank-card.js';
export default bankCard;
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


