<template>
  <AuthLayout>
    <LoginForm @login="onLoginSuccess" />
  </AuthLayout>
</template>

<script setup lang="ts">
  import { useRouter } from 'vue-router';
  import AuthLayout from '@/layouts/AuthLayout.vue';
  import LoginForm from '@/components/organisms/LoginForm.vue';

  const router = useRouter();

  const onLoginSuccess = () => {
    console.log('✅ Usuario autenticado correctamente');
    router.push('/dashboard');
  };
</script>
