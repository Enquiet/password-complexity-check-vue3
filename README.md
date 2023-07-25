# Checking-for-password-complexity

Works only with vue version 3.

### Props
#### modelValue
Type: `string`<br>
Required: `true`<br>

passing the password


### Props
#### only-error
Type: `boolean`<br>
Required: `false`<br>
Default: `false`

if the value is `true`, then only errors will be output
if the value is `false`, the entire list will be output

### Slots
#### message
Type: `default`<br>
Required: `false`<br>
value: `{ value: string, error: boolean }`
```vue
<template>
   <input v-model="password" type="password">
   <check-password v-model="password" only-error>
      <template v-slot="message">
         {{ message }}
      </template>
   </check-password>
</template>
```
