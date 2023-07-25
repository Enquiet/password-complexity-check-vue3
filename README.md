# Checking-for-password-complexity

Works only with vue version 3.

### Setup
```vue
<script setup>
  import VueCheckPassword from "vue-check-password";
  import "vue-check-password/dist/style.css";
</script>
```
[Demo here](https://codesandbox.io/p/sandbox/autumn-morning-sv563n?file=%2Fsrc%2FApp.vue%3A18%2C1)
### Props
#### modelValue
Type: `string`<br>
Required: `true`<br>

passing the password


#### only-error
Type: `boolean`<br>
Required: `false`<br>
Default: `true`

if the value is `true`, then only errors will be output
if the value is `false`, the entire list will be output


#### type
Type: `string`<br>
Required: `false`<br>
Default: `default`

allows you to display error text

#### customerError
Type: `object | null`<br>
Required: `false`<br>
Default: `null`

allows you to display the text of custom errors

|letters| upper case error         |
|---|--------------------------|
|number| digit not entered error  |
| signs  | missing characters error |
| quantity  |        minimum character error                  |
| accuracy  |          error in keryl|


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
