<script>
import listaPalabras from '../assets/palabras.js'
import listaSimbolos from '../assets/simbolos.js'
import RecomendacionesContraseña from './RecomendacionesContraseña.vue'
import FormRange from './FormRange.vue'

export default {
    components: { RecomendacionesContraseña, FormRange },
    data() {
      return {
        copiado: "hidden",
        rango: 24,
        contraseña: "",
        separadores: 1,
        mayusculas: 1,
        palabras: listaPalabras,
        simbolos: listaSimbolos,
        listaContraseña: []
      };
    },
    watch: {
      mayusculas: function (val) {
        this.contraseña = this.aplicarSeparadores(this.listaContraseña);
      },
      separadores: function (newv, oldv) {
        if (oldv == 1 || newv == 1) {
          this.seleccionarPlabras();
        }
        else {
          this.contraseña = this.aplicarSeparadores(this.listaContraseña);
        }
      }
    },
  methods: {
    formRange(rango) {
        this.rango = rango
      },
    seleccionarPlabras() {
        this.copiado = "hidden";
        this.contraseña = " ";
        const listaPalabras = this.palabras;
        let index = 0;
        let palabra = "";
        while (this.contraseña.length < this.rango) {
            index = (Math.random() * listaPalabras.length);
            palabra = listaPalabras[Math.floor(index)];
            if (this.listaContraseña.indexOf(palabra) != -1) {
                listaPalabras.pop();
            }
            else {
                this.listaContraseña.push(palabra);
            }
            if (this.aplicarSeparadores(this.listaContraseña).length > this.rango) {
                this.contraseña = "";
                this.listaContraseña = [];
            }
            else {
                this.contraseña = this.aplicarSeparadores(this.listaContraseña);
            }
        }
    },
    aplicarMayusculas(lista) {
        this.copiado = "hidden";
        const m = this.mayusculas;
        if (m == 1) {
            return lista.map(obj => obj[0].toUpperCase() + obj.slice(1));
        }
        else if (m == 2) {
            return lista.map(obj => obj.toLowerCase());
        }
        else if (m == 3) {
            return lista.map(obj => obj.toUpperCase());
        }
    },
    aplicarSeparadores(lista) {
        lista = this.aplicarMayusculas(lista);
        let c = "";
        if (this.separadores == 1) {
            c = lista.join("");
        }
        else if (this.separadores == 2) {
            c = lista.join("-");
        }else if (this.separadores == 3) {
          c = lista.map(obj => obj = obj + (this.simbolos[Math.floor(Math.random() * this.simbolos.length)])).join("").slice(0, -1)
        }
        return c;
    },
    copiar() {
        const elemento = this.$refs.password;
        elemento.select();
        elemento.setSelectionRange(0, 99999);
        document.execCommand("copy");
        this.copiado = "visible";
    }
    }
}
</script>

<template>
  <div class="container-sm mt-5 text-center">
    <form class="row align-items-center justify-content-center g-3 mt-5" action="">
      <div class="col-sm-12 text-center">
        <h1 class="titulo pb-2">
          Generador:
        </h1>
      </div>   
      <div class="col-sm-12 input-group">
        <input id="inputContraseña" ref="password" v-model="contraseña" class="form-control py-2 cInput" 
               placeholder="Dale clic a &quot;Generar contraseña&quot;" readonly>
        <div class="input-group-text">
          <div class="copiado">
            <button class="btn btn-copiar btn-success fs-5" @click.prevent="copiar() ">
              Copiar
            </button>
            <span :style="{ visibility: copiado }" class="copiadotext">¡Contraseña copiada!</span>
          </div>
        </div>
      </div>
      <div class="col-sm-12">
        <div class="form-check form-check-inline">
          <input id="radioMIniciales" v-model="mayusculas" value="1" class="btn-check" type="radio" name="radioM">
          <label class="btn btn-outline-success btn-radio" for="radioMIniciales">
            Iniciales en mayuscula
          </label>
        </div>
        <div class="form-check form-check-inline">
          <input id="radioMMinusculas" v-model="mayusculas" value="2" class="btn-check" type="radio" name="radioM">
          <label class="btn btn-outline-success btn-radio" for="radioMMinusculas">
            Todo minusculas
          </label>
        </div>
        <div class="form-check form-check-inline">
          <input id="radioMMayusculas" v-model="mayusculas" type="radio" value="3" class="btn-check " name="radioM">
          <label class="btn btn-outline-success btn-radio" for="radioMMayusculas">
            Todo mayusculas
          </label>
        </div>
      </div>
      <div class="col-sm-12">
        <div class="form-check form-check-inline">
          <input id="radioSeparadorNada" v-model="separadores" type="radio" class="btn-check" name="radioSeparador" value="1">
          <label class="btn btn-outline-success btn-radio" for="radioSeparadorNada">No separar</label>
        </div>
        <div class="form-check form-check-inline">
          <input id="radioSeparadorGuion" v-model="separadores" type="radio" class="btn-check" name="radioSeparador" value="2">
          <label class="btn btn-outline-success btn-radio" for="radioSeparadorGuion">Separar con guion -</label>
        </div>
        <div class="form-check form-check-inline">
          <input id="radioSeparadorCaracter" v-model="separadores" type="radio" class="btn-check" name="radioSeparador" value="3">
          <label class="btn btn-outline-success btn-radio" for="radioSeparadorCaracter">Separar con caracteres $%4&9*#5!</label>
        </div>
      </div>
      <div class="col-sm-12">
        <FormRange @form-range="formRange" />
      </div>
      <button class="btn btn-success btn-generar mt-4" @click.prevent="seleccionarPlabras()">
        Generar contraseña
      </button>
    </form>
    <h1 class="titulo text-center mt-5 pb-2">
      Consejos:
    </h1>
    <RecomendacionesContraseña /> 
    <footer class="footer  d-flex align-items-center justify-content-center">
      <p class="text-center">
        Hecho por Gino Bartolucci <a target="_blank" href="https://github.com/GinoBartolucci/generador-contrasenas">
          <img class="github" alt="git hub" src="/github.png">
        </a>
      </p>
    </footer>
  </div>
</template>
<style scoped>
a, a:hover{
  text-decoration: none;
}
.github{
  margin-left: 10px;
  width: 35px;
  height: 35px;
}
.footer{
  margin-top: 100px;
  width: 100%;
  text-align: center;
  height: 60px;
}
.titulo{
  font-size: max(3vw ,3rem);
}
.input-group-text{
  padding: 0;
  background-color: #198754;
}
.form-control{
  font-size: max(16px, 1.0vw);
}
.form-control:focus{
  box-shadow: 1px 1px 3px #198754;
  border-color: #198754;
}
.btn-radio{
  padding: 12px;
  margin: 8px;
  font-size:  max(20px, 1.0vw);
}
.btn-generar{
  width: 99%;
  padding: 12px;
  margin: 8px;
  font-size: max(24px, 1.2vw);
}
.cInput{
  font-size: max(20px, 1.0vw);
}
.form-check{
  margin-left: 4px;
}
.form-check-label{
  font-size:  max(16px, 1.0vw);;
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
  border: 6px solid #198754;
  height: 8px;
  width: 8px;
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
.btn-copiar{
  height: 100%;
}
.copiado {
  position: relative;
  display: inline-block;
  height: 100%;
}
.copiado .copiadotext {
  visibility: hidden;
  width: 165px;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  position: absolute;
  z-index: 1;
  top: 120%;
  left: 50%;
  margin-left: -80px;
}

.copiado .copiadotext::after {
  content: "";
  position: absolute;
  bottom: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: transparent transparent black transparent;
  }
</style>