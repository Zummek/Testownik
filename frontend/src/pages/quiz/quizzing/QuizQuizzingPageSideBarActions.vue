<template>
  <div class="actions-container">
    <div id="curved-corner-bottomleft" />
    <div id="curved-corner-topleft" />
    <q-btn
      class="mainBtn"
      :class="{ 'mainBtn--rotate': isRotating }"
      round
      :icon="mainBtnIcon"
      size="22px"
      transition="slide-right"
      color="secondary"
      :disabled="mainBtnDisabled"
      @click="onMainBtnClick"
    />
    <div class="h-line top" :class="{ 'h-line--disabled': mainBtnDisabled }" />
    <div class="h-line" :class="{ 'h-line--disabled': mainBtnDisabled }" />
  </div>
</template>

<script lang="ts">
import { throttle } from 'lodash';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'QuizQuizzingPageSideBarActions',
  props: {
    mainBtnIcon: String,
    mainBtnDisabled: Boolean,
    onMainBtnClick: {
      type: Function as PropType<() => void>,
      required: true,
    },
  },
  watch: {
    mainBtnIcon: {
      handler(newVal: string) {
        if (newVal === 'done') this.rotateMainBtn();
      },
    },
  },
  mounted() {
    window.addEventListener('keydown', (e) => this.onKeyDown(e));
  },
  beforeUnmount() {
    window.removeEventListener('keydown', (e) => this.onKeyDown(e));
  },
  data() {
    return {
      isRotating: false,
      onMainBtnClickDebounced: throttle(this.onMainBtnClick, 300, {
        trailing: false,
      }),
    };
  },
  methods: {
    onKeyDown(event: KeyboardEvent) {
      if (!this.mainBtnDisabled && event.key === 'Enter') {
        this.onMainBtnClickDebounced();
      }
    },
    rotateMainBtn() {
      this.isRotating = true;
      setTimeout(() => {
        this.isRotating = false;
      }, 500);
    },
  },
});
</script>

<style lang="scss" scoped>
.actions-container {
  position: absolute;
  top: 43%;
  left: -28px;
  background-color: white;
  border: 5px solid white;
  border-radius: 50%;
}
.h-line {
  position: absolute;
  height: 6px;
  left: 48%;
  width: 3px;
  background: linear-gradient(0deg, $backgroundVariant 40%, $secondary 100%);

  &.top {
    top: -6px;
    background: linear-gradient(0deg, $secondary 0%, $backgroundVariant 60%);
  }
}
.h-line--disabled {
  background: linear-gradient(
    0deg,
    $backgroundVariant 40%,
    rgba($secondary, 0.6) 100%
  );

  &.top {
    background: linear-gradient(
      0deg,
      rgba($secondary, 0.6) 0%,
      $backgroundVariant 60%
    );
  }
}
.mainBtn--rotate {
  -webkit-animation: rotateY 0.4s linear;
  animation: rotateY 0.4s linear;
}
@-webkit-keyframes rotateY {
  to {
    -webkit-transform: rotateY(180deg);
  }
}
@keyframes rotateY {
  to {
    transform: rotateY(180deg);
  }
}

#curved-corner-bottomleft,
#curved-corner-topleft {
  width: 9px;
  height: 18px;
  overflow: hidden;
  position: absolute;

  &::before {
    content: '';
    display: block;
    width: 200%;
    height: 150%;
    position: absolute;
    left: 0;
    border-radius: 50%;
  }
  &::after {
    content: '';
    display: block;
    overflow: visible;
    position: absolute;
    width: 100%;
    height: 30%;
    background: white;
  }
}
#curved-corner-bottomleft {
  bottom: 66px;
  left: 23px;

  &::before {
    bottom: 30%;
    box-shadow: -5px 5px 0 0 white;
  }
  &::after {
    bottom: 0px;
  }
}
#curved-corner-topleft {
  bottom: -18px;
  left: 23px;

  &::before {
    top: 30%;
    box-shadow: -5px -5px 0 0 white;
  }
  &::after {
    top: 0px;
  }
}
</style>
