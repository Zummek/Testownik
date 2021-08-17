<template>
  <q-page class="row items-center justify-evenly">
    <div class="col-9 text-center">
      <q-btn color="primary" label="Login" to="/login" />
    </div>
    <last-used-bases />
  </q-page>
</template>

<script lang="ts">
import LastUsedBases from 'src/components/homePage/lastUsedBases/LastUsedBases.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  components: { LastUsedBases },
  name: 'HomePage',
});
</script>
