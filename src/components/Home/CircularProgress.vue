<template>
  <div class="radial-bar">
    <div class="radial-bar__circle">
      <div 
        :style="{ 
          opacity: 1,
          transform: `rotate(${1.8 * percentage}deg)` 
        }" 
        class="radial-bar__mask js-radial-mask"
      >
        <div 
          :style="{ 
            transform: `rotate(${1.8 * percentage}deg)`,
            backgroundColor: color ? color : 'var(--ion-color-primary)'
          }" 
          class="radial-bar__fill js-radial-fill"
        ></div>
      </div>
      <div class="radial-bar__mask">
        <div 
          :style="{ 
            backgroundColor: color ? color : 'var(--ion-color-primary)' 
          }" 
          class="radial-bar__fill js-radial-fill"
        ></div>
        <div 
          :style="{ 
            transform: `rotate(${1.8 * percentage}deg)`, 
            backgroundColor: color ? color : 'var(--ion-color-primary)' 
          }" 
          class="radial-bar__fill js-radial-fix"
        ></div>
      </div>
    </div>
    <div 
      v-if="!full"
      class="radial-bar__inset"
    ></div>
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
    color: {
      type: String,
      required: false,
    },
    full: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  computed: {
    percentage() {
      return this.percent > 100 ? 100 : this.percent;
    },
  }
};
</script>

<style scoped>
.radial-bar { 
  transform: scale(3.5);
  margin: 50px;
  width: 80px;
  height: 80px;
  background-color: #0d1624;
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
  background-color: #162336;
  border-radius: 50%;
  display: table-cell;
}
</style>