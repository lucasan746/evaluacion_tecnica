import React, {Component} from "react";
import clienteAxios from "../config/axios";

const params = {
  access_key: '02c81ab852f6f633953f846990a5a5b8',
  query: 'Pilar,Buenos Aires'
  }

class Weatherstack extends Component  {

    state = {
      ciudad: "",
      temp: "",
      img: "",
      loading: true
    }

  async componentDidMount() {
    const res = await clienteAxios.get('',{params})
    this.setState({
          ciudad: res.data.location.name,
          temp: res.data.current.temperature,
          img: res.data.current.weather_icons,
          loading: false
        })
  }

render() {

  if (this.state.loading) {
    return (
    <div>
    <footer className="page-footer font-small blue">
    <div className="footer-copyright text-center py-3"> 
    <a href="https://mdbootstrap.com/">Cargando...</a>
     </div>
    </footer>
    </div>) 
  }

  return (
   
<footer class="page-footer font-small unique-color-dark pt-4">

 
  <div class="container">

   
    <ul class="list-unstyled list-inline text-center py-2">
      <li class="list-inline-item">
        <h5 class="mb-1">{this.state.ciudad}</h5>
      </li>
      <li class="list-inline-item">
        <h5  class="mb-1">{this.state.temp}°C</h5>
      </li>
    </ul>
  </div>
  <div class="footer-copyright text-center py-3">
    <img src={this.state.img} />
  </div>
</footer>
  )


}


}

export default Weatherstack;