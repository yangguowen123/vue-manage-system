<template>
    <div id="withdraw" v-cloak>
		<div class="page-body">
			<div class="container withdraw-container">
				<form>
					<button type="button" class="btn btn-lg btn-block" v-on:click="$router.push('/withdraw-bank-card')">提现到银行卡</button>
					<button type="button" class="btn btn-lg btn-block" v-on:click="$router.push('/withdraw-virtual-wallet')">提现到电子钱包</button>
				</form>
			</div>
		</div>
	</div>
</template>
<script>
export default {
    data() {
        return {}
    },
    computed : {},
    created : function() {
    },
    mounted : function() {
    },
    methods : {}
}
</script>
<style scoped>
.header-navbar {
	color: white;
	display: block;
	text-align: center;
	height: 2.5rem;
	line-height: 1rem;
	background-color: #dc3545;
}
.withdraw-container {
	padding-top: 7rem;
}

.withdraw-container button {
	margin-bottom: 1.5rem;
	background-color: #37a5fd;
	color: #fff;
}
</style>


