<template>
    <div id="realnameCertification" v-cloak>
		<div class="page-body" style="background: #f2f2f2;" >
			<div class="container" style="margin-top: 1.3rem;">
				<form>
					<div class="form-group">
						<label>手持身份证:</label> <input type="file" class="form-control realname-certification-withpic">
					</div>
					<div class="form-group">
						<label>身份证正面:</label> <input type="file" class="form-control realname-certification-zpic">
					</div>
					<div class="form-group">
						<label>身份证反面:</label> <input type="file" class="form-control realname-certification-fpic">
					</div>
					<button type="button" class="btn btn-danger btn-lg btn-block" v-on:click="addOrUpdateGatheringCode">先上传</button>
					<button type="button" class="btn btn-success btn-lg btn-block" v-on:click="addOrUpdateGatheringCodeInner">后保存</button>
				</form>
			</div>
		</div>
	</div>
</template>
<script>
import realnameCertification from '@/components/common/js/realname-certification.js';
export default realnameCertification;
</script>
<style scoped>
.add-gathering-code-action {
	position: fixed;
	background-color: #3abffc;
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

.audit-state {
	position: absolute;
	font-size: 13px;
	z-index: 5;
	right: 1rem;
	color: #007bff;
}

.audit-state label {
	writing-mode: vertical-rl;
}
</style>