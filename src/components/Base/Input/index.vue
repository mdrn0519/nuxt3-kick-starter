<script setup lang="ts">
import type { Props, Emit } from './types';

const props = withDefaults(defineProps<Props>(), {
  autocomplete: undefined,
  name: undefined,
  placeholder: 'placeholder',
  minlength: undefined,
  maxlength: undefined,
  customValidation: undefined,
});

const { modelValue, customValidation, ...inputAttr } = props;

const emit = defineEmits<Emit>();

// input
const input = ref<HTMLInputElement | null>(null);

// エラーメッセージ
const errMessage = ref('');
const setErrMessage = (msg: string) => {
  errMessage.value = msg;
};

// customValidationが渡された際にValueをチェックする
const useCustomValidator = (validator: Props['customValidation']) => {
  const cleanMessage = () => {
    input.value?.setCustomValidity('');
  };

  if (Array.isArray(validator)) {
    for (let i = 0; i < validator.length; i++) {
      const message = validator[i](value?.value);
      if (message) {
        input.value?.setCustomValidity(message);
        return;
      }
    }
    cleanMessage();
  } else {
    const message = validator!(value.value);
    if (message) {
      input.value?.setCustomValidity(message);
      return;
    }
    cleanMessage();
  }
};

// inputに対して何かルールが設定されていれば値を確認する
const checkValue = () => {
  const validator = props.customValidation;
  if (validator) {
    useCustomValidator(validator);
  }
  const errMessage = input.value?.validationMessage || '';
  setErrMessage(errMessage);
};

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  },
});
</script>

<template>
  <label
    :class="['inline-flex', 'flex-col', !width && 'w-80']"
    :style="{ width: width && Number(width) ? width + 'px' : width }"
  >
    <input
      ref="input"
      v-model.lazy="value"
      type="text"
      class="rounded-md border border-neutral-300 bg-white px-3 py-2 text-base leading-4 invalid:bg-red-100 focus:outline-2 focus:outline-offset-0 focus:outline-dandelion-500 disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:text-neutral-400"
      v-bind="{ ...inputAttr }"
      @blur="checkValue"
    />
    <span
      v-if="!!errMessage"
      class="gap-1 pl-3 pt-1 text-xs leading-3 text-red-500"
    >
      {{ errMessage }}
    </span>
  </label>
</template>
