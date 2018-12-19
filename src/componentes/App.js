import React, { Component } from 'react';
import Header from './Header';
import Formulario from './Formulario';
import Resumen from './Resumen';
import Resultado from './Resultado';
import {obtenerDiferenciaAnio, calcularMarca, obtenerPlan} from '../helper';



class App extends Component {

  state = {
     resultado: '',
     datos: {}
  }
 
  cotizarSeguro = (datos) => {
    const {marca, plan, year} = datos;

    //agregar una base de 2000$
    let resultado = 2000;

    //obtener la diferencia de años
    const diferencia = obtenerDiferenciaAnio(year);

    //por cada año restar el 3% al valor del seguro
    resultado -= ((diferencia * 3) * resultado) / 100;
    
    //Americano 15% asiatico 5% y europeo 30% de incremento al valor actual
    resultado = calcularMarca(marca) * resultado;
    
    //el plan del auto. el básico incrementa el vqalor 20% y el covertura completa un 50%
    let incrementarPlan = obtenerPlan(plan);  

    //dependiaendo del plan incrementar guardar en resultado
    resultado = parseFloat (incrementarPlan * resultado).toFixed(2);

    //crar objeto para el reumen
    const datosAuto = {
      marca : marca,
      plan : plan,
      year : year
    }

    // ya tenemos el costo.
    this.setState({
      resultado : resultado,
      datos : datosAuto
    })

  }
  render() {
    return (
        <div className="contenedor">
            <Header
              titulo = 'Cotizador de Seguros de Autos'
            />

            <div className="contenedor-formulario">

             
              <Formulario
               cotizarSeguro={this.cotizarSeguro}
              />
              
              <Resumen
                datos={this.state.datos}

              />
              
              <Resultado
                resultado={this.state.resultado}
              />
            </div>
           

        </div>
    );
  }
}

export default App;
