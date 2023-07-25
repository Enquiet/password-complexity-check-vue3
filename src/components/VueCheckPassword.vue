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
  onlyError: boolean
}
interface IErrorMassage {
  value: string
  error: boolean
}

const props = defineProps<IProps>()
const regex = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/

const passwordComplexityPercentage = computed(() => {
  let counter = 0
  if (props.modelValue.match(/[A-Z]/)) counter += 15
  if (props.modelValue.match(/[a-z]/)) counter += 10
  if (props.modelValue.match(/[0-9]/)) counter += 15
  if (regex.test(props.modelValue)) counter += 20
  if (props.modelValue.length >= 8) counter += 40
  return counter
})
const messages = computed((): IErrorMassage[] => {
  const list: IErrorMassage[] = [
    {
      value: 'Введите символы: A-Z',
      error: !!props.modelValue.match(/[A-Z]/)
    },
    {
      value: 'Введите символы: 0-9',
      error: !!props.modelValue.match(/[0-9]/)
    },
    {
      value: `Введите знаки пунктуации: !@#$%^&*()_+-=[]{};"|,.<>/?`,
      error: regex.test(props.modelValue)
    },
    {
      value: `Введите символы больше: 8`,
      error: props.modelValue.length >= 8
    },
    {
      value: `Вводить только латинские символы`,
      error: !props.modelValue.match(/[/[а-яА-ЯЁё-і]/g)
    }
  ]
  return props.onlyError ? list.filter((item) => !item.error) as IErrorMassage[] : list
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
