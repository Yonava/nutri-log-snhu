<template>
  <div class="radial-bar">
    <div class="radial-bar__circle">
      <div :style="{ transform: `rotate(${1.8 * percent}deg)` }" class="radial-bar__mask js-radial-mask">
        <div :style="{ transform: `rotate(${1.8 * percent}deg)` }" class="radial-bar__fill js-radial-fill"></div>
      </div>
      <div class="radial-bar__mask">
        <div class="radial-bar__fill js-radial-fill"></div>
        <div :style="{ transform: `rotate(${1.8 * percent}deg)` }" class="radial-bar__fill js-radial-fix"></div>
      </div>
    </div>
    <div class="radial-bar__inset">
      <div class="radial-bar__percent">
        {{ percent }}%
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CircularProgress',
  props: {
    percent: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style scoped>
.radial-bar { 
  transform: scale(3.5);
  width: 80px;
  height: 80px;
  background-color: var(--ion-color-step-100);
  border-radius: 50%;
}

.radial-bar__mask {
  clip: rect(0px, 80px, 80px, 40px);
  -webkit-backface-visibility: hidden;
  transition: -webkit-transform 1s;
  transition: -ms-transform 1s;
  transition: transform 1s;
  width: 80px;
  height: 80px;
  position: absolute;
  border-radius: 50%;
}

.radial-bar__fill {
  -webkit-backface-visibility: hidden;
  transition: -webkit-transform 1s;
  transition: -ms-transform 1s;
  transition: transform 1s;
  border-radius: 50%;
  clip: rect(0px, 40px, 80px, 0px);
  background-color: var(--ion-color-primary);
  width: 80px;
  height: 80px;
  position: absolute;
}

.radial-bar__inset {
  width: 70px;
  height: 70px;
  position: absolute;
  margin-left: 5px;
  margin-top: 5px;
  background-color: var(--ion-color-step-50);
  border-radius: 50%;
  display: table-cell;
}

.radial-bar__percent {
  text-align: center;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  color: var(--ion-color-step-900);
  font-size: 1.2rem;
  font-weight: 700;
}
</style>