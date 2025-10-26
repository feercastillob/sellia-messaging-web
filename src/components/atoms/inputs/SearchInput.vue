<template>
  <div class="border-outline bg-surface border-b px-3 py-2">
    <div class="relative">
      <SearchIcon
        class="text-on-surface-variant absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2"
      />
      <input
        v-model="inputValue"
        type="text"
        :placeholder="placeholder"
        class="border-outline bg-surface-variant text-on-surface placeholder:text-on-surface-variant focus:ring-primary w-full rounded-lg border py-2 pr-3 pl-9 text-sm transition-colors duration-200 focus:border-transparent focus:ring-2"
        aria-label="Buscar cliente"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import SearchIcon from '@/components/atoms/icons/SearchIcon.vue';

  const props = defineProps<{
    modelValue: string;
    placeholder?: string;
  }>();

  const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void;
  }>();

  const inputValue = computed({
    get: () => props.modelValue,
    set: (val: string) => emit('update:modelValue', val),
  });
</script>
