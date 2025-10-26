<script setup lang="ts">
  import { reactive, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { useI18n } from 'vue-i18n';

  import LoginHeader from '@/components/atoms/auth/LoginHeader.vue';
  import LoginFields from '@/components/molecules/login/LoginFields.vue';
  import LoginFooter from '@/components/atoms/auth/LoginFooter.vue';
  import AppButton from '@/components/atoms/buttons/AppButton.vue';
  import AppDialog from '@/components/atoms/dialogs/AppDialog.vue';

  const emit = defineEmits<{ (e: 'login', status: boolean): void }>();
  const { t } = useI18n();
  const router = useRouter();

  const form = reactive({
    email: '',
    password: '',
    loading: false,
    error: '',
    emailState: null as 'error' | 'success' | null,
    passwordState: null as 'error' | 'success' | null,
  });

  const showDialog = ref(false);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function validateFields(): boolean {
    form.error = '';
    form.emailState = form.passwordState = null;

    if (!form.email || !form.password) {
      form.error = t('login.required') || 'Todos los campos son obligatorios.';
      form.emailState = form.email ? null : 'error';
      form.passwordState = form.password ? null : 'error';
      showDialog.value = true;
      return false;
    }

    if (!emailRegex.test(form.email)) {
      form.error = t('login.invalidEmail') || 'Por favor ingresa un correo válido.';
      form.emailState = 'error';
      showDialog.value = true;
      return false;
    }

    if (
      form.email !== 'admin@admin.com' ||
      (form.password !== 'admin123' && form.password !== 'admin')
    ) {
      form.error = t('login.invalidCredentials') || 'Credenciales incorrectas.';
      form.emailState = form.passwordState = 'error';
      showDialog.value = true;
      return false;
    }

    return true;
  }

  async function handleLogin() {
    if (!validateFields()) return;
    form.loading = true;

    await new Promise((r) => setTimeout(r, 600));

    form.emailState = form.passwordState = 'success';
    localStorage.setItem('auth', 'true');
    emit('login', true);
    router.push('/dashboard');

    form.loading = false;
  }
</script>

<template>
  <div
    class="bg-background text-on-surface flex min-h-screen items-center justify-center transition-colors duration-300"
  >
    <form
      class="bg-background border-on-surface animate-fade-in w-full max-w-sm space-y-8 rounded-2xl border p-10 text-center shadow-xl transition-all duration-300"
      @submit.prevent="handleLogin"
    >
      <LoginHeader />
      <LoginFields
        v-model:username="form.email"
        v-model:password="form.password"
        :username-state="form.emailState"
        :password-state="form.passwordState"
        :error="form.error"
        :loading="form.loading"
        @submit="handleLogin"
      />
      <AppButton
        type="submit"
        :loading="form.loading"
        :disabled="form.loading"
        size="lg"
        variant="primary"
        class="mt-8 w-full"
      >
        {{ t('login.button') || 'Iniciar sesión' }}
      </AppButton>
      <LoginFooter />
    </form>
    <AppDialog
      v-if="showDialog"
      title="Error de validación"
      :message="form.error"
      @close="showDialog = false"
    />
  </div>
</template>

<style scoped>
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(16px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  .animate-fade-in {
    animation: fadeIn 0.5s ease-out;
  }
</style>
