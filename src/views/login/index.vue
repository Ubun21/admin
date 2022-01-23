<template>
  <div class="login-wrapper">
    <el-form class="login-content">
      <h1 class="login-title">用户登录</h1>
      <el-form-item>
        <el-input class="login-username"
          placeholder="请输入你的用户名"
          v-model="userName"
          clearable
        >
          <template #prefix>
            <el-icon class="el-input__icon">
              <avatar />
            </el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-input class="login-password"
          v-model="passWord"
          placeholder="请输入你的密码"
          show-password
          >
          <template #prefix>
            <el-icon class="el-input__icon">
              <lock />
            </el-icon>
          </template>
          <template ></template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          class="login-button"
          type="primary"
          :disabled="false"
          @click="handleSubmint"
          >登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Avatar, Lock } from '@element-plus/icons'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
const userName = ref('')
const passWord = ref('')
const store = useStore()
const router = useRouter()
const handleSubmint = () => {
  store.dispatch('login', {
    userName: userName.value,
    passWord: passWord.value
  }).then((data) => {
    router.push('/profile')
  }).catch(e => {
    ElMessage.error(e)
  })
}
</script>

<style lang="scss">
$bg: #2d3a4b;
.login-wrapper {
  height: 100vh;
  background-color: $bg;
  overflow: hidden;
  .login-content {
    width: 520px;
    padding: 160px 35px 0px;
    margin: 0 auto;
    .login-title {
      font-size: 26px;
      margin: 0px auto 40px 0px;
      text-align: center;
    }
    .login-button {
      width: 100%;
    }
  }
}
</style>
