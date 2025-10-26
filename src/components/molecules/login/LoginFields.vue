<script setup lang="ts">
  import { useI18n } from 'vue-i18n';

  const { t } = useI18n();

  const props = defineProps<{
    username: string;
    password: string;
    usernameState: 'error' | 'success' | null;
    passwordState: 'error' | 'success' | null;
    error: string | null;
    loading: boolean;
  }>();

  const emit = defineEmits<{
    (e: 'update:username', value: string): void;
    (e: 'update:password', value: string): void;
    (e: 'submit'): void;
  }>();
</script>

<template>
  <div class="space-y-4">
    <AppInput
      :model-value="props.username"
      :label="t('login.username')"
      type="email"
      :placeholder="t('login.placeholderUser')"
      :state="props.usernameState"
      :disabled="props.loading"
      @update:model-value="emit('update:username', $event)"
      @keyup.enter="emit('submit')"
    />
    <AppInput
      :model-value="props.password"
      :label="t('login.password')"
      type="password"
      :placeholder="t('login.placeholderPass')"
      :state="props.passwordState"
      :message="props.error && props.passwordState === 'error' ? props.error : ''"
      :disabled="props.loading"
      @update:model-value="emit('update:password', $event)"
      @keyup.enter="emit('submit')"
    />
  </div>
</template>
