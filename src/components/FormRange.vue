<script>
export default {
  data() {
    return {
      rango: 24,
    };
  },
  watch: {
    rango(newValue) {
      this.$emit('form-range', newValue)
    },
  },
}
</script>
<template>
  <div>
    <input v-model="rango" type="range" class="istyle" min="6" max="160" step="1">
    <label class="form-label cRange">Caracteres: {{ rango }}</label>
  </div>
</template>

<style scoped>
.cRange{
    font-size:  max(24px, 1.2vw);
}
input[type=range] {
  -webkit-appearance: none;
  margin: 10px 0;
  width: 100%;
  background: transparent;
}
input[type=range]:focus {
  outline: none;
}
input[type=range]::-webkit-slider-runnable-track {
  width: 100%;
  height: 12px;
  cursor: pointer;
  animate: 0.2s;
  box-shadow: 0px 0px 0px #198754;
  background: transparent;
  border-radius: 50px;
  border: 2px solid #198754;
}
input[type=range]::-webkit-slider-thumb {
  box-shadow: 0px 0px 1px #198754;
  border: 2px solid #ffffff;
  height: 24px;
  width: 24px;
  border-radius: 24px;
  background: #198754;
  cursor: pointer;
  -webkit-appearance: none;
  margin-top: -8px;
}
input[type=range]:focus::-webkit-slider-runnable-track {
  background: transparent;
}
input[type=range]::-moz-range-track {
  width: 100%;
  height: 12px;
  cursor: pointer;
  animate: 0.2s;
  box-shadow: 0px 0px 0px #198754;
  background: transparent;
  border-radius: 50px;
  border: 2px solid #198754;
}
input[type=range]::-moz-range-thumb {
  box-shadow: 0px 0px 1px #198754;
  border: 2px solid #ffffff;
  height: 24px;
  width: 24px;
  border-radius: 24px;
  background: #198754;
  cursor: pointer;
}
input[type=range]::-ms-track {
  width: 100%;
  height: 12px;
  cursor: pointer;
  animate: 0.2s;
  background: transparent;
  border-color: transparent;
  color: transparent;
}
input[type=range]::-ms-fill-lower {
  background: transparent;
  border: 2px solid #198754;
  border-radius: 100px;
  box-shadow: 0px 0px 0px #198754;
}
input[type=range]::-ms-fill-upper {
  background:transparent;
  border: 2px solid #198754;
  border-radius: 100px;
  box-shadow: 0px 0px 0px #198754;
}
input[type=range]::-ms-thumb {
  box-shadow: 0px 0px 1px #198754;
  border: 2px solid #ffffff;
  height: 24px;
  width: 24px;
  border-radius: 24px;
  background: #198754;
  cursor: pointer;
}
input[type=range]:focus::-ms-fill-lower {
  background: transparent;
}
input[type=range]:focus::-ms-fill-upper {
  background: transparent;
}
</style>