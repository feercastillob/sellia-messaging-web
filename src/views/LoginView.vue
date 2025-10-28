<template>
  <AuthLayout>
    <LoginForm @login="onLoginSuccess" />
  </AuthLayout>
</template>

<script setup lang="ts">
  import { useRouter } from 'vue-router';
  import AuthLayout from '@/layouts/AuthLayout.vue';

  const router = useRouter();

  const onLoginSuccess = () => {
    router.push('/dashboard');
  };
</script>
