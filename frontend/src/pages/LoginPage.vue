<template>
  <q-page class="row items-center justify-evenly">
    <div class="text-center">
      <google-login-button />
    </div>
  </q-page>
</template>

<script lang="ts">
import GoogleLoginButton from 'src/components/googleLoginButton/GoogleLoginButton.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  components: { GoogleLoginButton },
  name: 'LoginPage',
});
</script>
