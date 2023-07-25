<template>
  <div class="check-password">
    <div class="check-password__status-bar" />
    <ul class="check-password__list">
      <li v-for="(message, index) in messages" :key="index" class="check-password__message">
        <slot v-bind="message" />
      </li>
    </ul>
  </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue'
interface IProps {
  modelValue: string
  onlyError?: boolean
  type: string
  customerError?: ILanguage | null
}
interface IErrorMassage {
  value: string
  error: boolean
}

interface IErrorMessage {
  letters?: string
  number?: string
  signs?: string
  quantity?: string
  accuracy?: string
}
interface ILanguage {
  [key: string]: IErrorMessage
}

const props = withDefaults(defineProps<IProps>(), {
  onlyError: true,
  type: 'default',
  customerError: null
})
const regex = /[ !@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/

const passwordComplexityPercentage = computed(() => {
  let counter = 0
  if (props.modelValue.match(/[A-Z]/)) counter += 15
  if (props.modelValue.match(/[a-z]/)) counter += 10
  if (props.modelValue.match(/[0-9]/)) counter += 15
  if (regex.test(props.modelValue)) counter += 20
  if (props.modelValue.length >= 8) counter += 40
  return counter
})

const languageObj: ILanguage = {
  default: {
    letters: 'Enter characters: A-Z',
    number: 'Enter characters: 0-9',
    signs: 'Enter punctuation marks: !@#$%^&*()_+-=[]{};"|,.<>/?',
    quantity: 'Enter more characters: 8',
    accuracy: 'Enter only latin characters'
  },
  customer: {
    ...props.customerError
  }
}

const messages = computed((): IErrorMassage[] => {
  const list = [
    {
      value: languageObj[props.type]?.letters,
      error: !!props.modelValue.match(/[A-Z]/)
    },
    {
      value: languageObj[props.type]?.number,
      error: !!props.modelValue.match(/[0-9]/)
    },
    {
      value: languageObj[props.type]?.signs,
      error: regex.test(props.modelValue)
    },
    {
      value: languageObj[props.type]?.quantity,
      error: props.modelValue.length >= 8
    },
    {
      value: languageObj[props.type]?.accuracy,
      error: !props.modelValue.match(/[/[а-яА-ЯЁё-і]/g)
    }
  ].filter((item) => item.value) as IErrorMassage[]
  return props.onlyError ? (list.filter((item) => !item.error) as IErrorMassage[]) : list
})
const statusColor = computed(() => {
  return passwordComplexityPercentage.value > 80 ? '#2ecc71' : '#E66767'
})
</script>
<style scoped>
.check-password {
  font-family: Inter, sans-serif;
}
.check-password__status-bar {
  position: relative;
  width: 400px;
  height: 8px;
  background: #eeeeee;
  transition: 0.25s;
  border-radius: 2px;
  margin-bottom: 10px;
}
.check-password__status-bar::before {
  position: absolute;
  display: block;
  content: '';
  height: 100%;
  border-radius: 2px;
  width: v-bind(passwordComplexityPercentage + '%');
  background: v-bind(statusColor);
  transition: 0.25s;
}
</style>
