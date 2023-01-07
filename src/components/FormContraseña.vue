<script>
import listaPalabras from '../assets/palabras.js'
export default {
  data () {
    return {
      rango: 24,
      contraseña: '',
      separadores: 1,
      mayusculas: 1,
      palabras: listaPalabras,
      listaContraseña: []

    }
  },
  watch: {
    mayusculas: function (val) {
      this.contraseña = this.aplicarSeparadores(this.listaContraseña)
    },
    separadores: function (val) {
      this.seleccionarPlabras()
    }
  },
  methods: {
    seleccionarPlabras () {
      this.contraseña = ' '
      const listaPalabras = this.palabras
      let index = 0
      let palabra = ''
      while (this.contraseña.length < this.rango) {
        index = (Math.random() * listaPalabras.length)
        palabra = listaPalabras[Math.floor(index)]
        if (this.listaContraseña.indexOf(palabra) != -1) {
          listaPalabras.pop()
        } else {
          this.listaContraseña.push(palabra)
        }

        if (this.aplicarSeparadores(this.listaContraseña).length > this.rango) {
          this.contraseña = ''
          this.listaContraseña = []
        } else {
          this.contraseña = this.aplicarSeparadores(this.listaContraseña)
        }
      }
    },
    aplicarMayusculas (lista) {
      const m = this.mayusculas
      if (m == 1) {
        return lista.map(obj => obj[0].toUpperCase() + obj.slice(1))
      } else if (m == 2) {
        return lista.map(obj => obj.toLowerCase())
      } else if (m == 3) {
        return lista.map(obj => obj.toUpperCase())
      }
    },
    aplicarSeparadores (lista) {
      lista = this.aplicarMayusculas(lista)
      let c
      if (this.separadores == 1) {
        c = lista.join('')
      } else if (this.separadores == 2) {
        c = lista.join('-')
      }

      return c
    },
    copiar () {
      const elemento = this.$refs.password
      elemento.select()
      elemento.setSelectionRange(0, 99999)
      document.execCommand('copy')
    }
  }
}
</script>

<template>
  <div class="container-sm">
    <form class="row align-items-center justify-content-center  g-3" action="">
      <div class="col-sm-12 text-center titulo">
        <h1 class="titulo fw-light pb-5">
          Generador de contraseñas
        </h1>
      </div>
      <div class="col-sm-12 input-group">
        <input id="inputContraseña" ref="password" v-model="contraseña" class="form-control py-2" placeholder="Dale clic &quot;Generar contraseña&quot;" readonly>
        <div class="input-group-text">
          <button class="btn copiar btn-success " @click.prevent="copiar() ">
            Copiar
          </button>
        </div>
      </div>
      <div class="col-sm-12">
        <label class="form-label">Largo de la contraseña:  {{ rango }}</label>
        <input v-model="rango" type="range" class="form-range" min="6" max="160" step="1">
      </div>
      <div class="col-sm-6">
        <label class="form-check-label">Mayusculas: </label>
        <div class="form-check ">
          <input id="radioMIniciales" v-model="mayusculas" value="1" class="form-check-input " type="radio" name="radioM">
          <label class="form-check-label" for="radioMIniciales">
            Iniciales
          </label>
        </div>
        <div class="form-check ">
          <input id="radioMMinusculas" v-model="mayusculas" value="2" class="form-check-input" type="radio" name="radioM">
          <label class="form-check-label" for="radioMMinusculas">
            Minusculas
          </label>
        </div>
        <div class="form-check ">
          <input id="radioMMayusculas" v-model="mayusculas" value="3" class="form-check-input " type="radio" name="radioM">
          <label class="form-check-label" for="radioMMayusculas">
            Mayusculas
          </label>
        </div>
      </div>
      <div class="col-sm-6">
        <label class="form-check-label">Separador:</label>
        <div class="form-check ">
          <input id="radioSeparadorNada" v-model="separadores" value="1" class="form-check-input" type="radio" name="radioSeparador">
          <label class="form-check-label" for="radioSeparadorNada">
            Nada
          </label>
        </div>
        <div class="form-check ">
          <input id="radioSeparadorGuion" v-model="separadores" value="2" class="form-check-input " type="radio" name="radioSeparador">
          <label class="form-check-label" for="radioSeparadorGuion">
            Guion -
          </label>
        </div>
      </div>
      <button class="btn generar btn-success py-3" @click.prevent="seleccionarPlabras()">
        Generar contraseña
      </button>
    </form>
  </div>
</template>
<style scoped>
.titulo{
font-size: max(4vw ,2rem);
}
.form-label{
  width: 250px;
}
.generar{
  width: 98%;
  font-size: max(16px, 1.01vw);
}
.input-group-text{
  padding: 0;
  background-color: #198754;
}
.form-control:focus{
    box-shadow: 1px 1px 3px #198754;
    border-color: #198754;

}
.form-check{
  margin-left: 6px;
}
.form-check-input:checked{
  background-color: #198754;
  border-color: #198754;
  box-shadow: 1px 1px 1px #198754;
}
.form-check-input:focus{
  box-shadow: 1px 1px 1px #198754;

}
input[type=range]::-webkit-slider-thumb {
  box-shadow: 1px 1px 1px #198754;
  border: 6px solid #198754;
  height: 20px;
  width: 20px;
  border-radius: 50px;
  background: #FFFFFF;
  cursor: pointer;
  -webkit-appearance: none;
  margin-top: -6px;
}
input[type=range]::-moz-range-thumb {
  box-shadow: 1px 1px 1px #198754;
  border: 5px solid #198754;
  height: 7px;
  width: 7px;
  border-radius: 50px;
  background: #FFFFFF;
  cursor: pointer;
}
input[type=range]::-ms-thumb {
  margin-top: 1px;
  box-shadow: 1px 1px 1px #198754;
  border: 4px solid #198754;
  height: 8px;
  width: 8px;
  border-radius: 50px;
  background: #FFFFFF;
  cursor: pointer;
}
</style>
