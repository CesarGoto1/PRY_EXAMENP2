import { LitElement, html, css } from "lit";

export class ProductoCard extends LitElement{
    static properties = {
        nombre : {type: String},
        precio : {type: Number},
        cantidad : {type: Number},
        precioTotal: { type: Number }
    }

    constructor(){
        super()
        this.cantidad=1;
        this.precio=500;
        this.nombre="Nombre";
        this.precioTotal = this.precio * this.cantidad;
    }

    recalcularTotal() {
        this.precioTotal = this.precio * this.cantidad;
    }

    sumar(){
        this.cantidad += 1;
        this.recalcularTotal();
    }

    restar(){
        if(this.cantidad > 1){
            this.cantidad -= 1;
            this.recalcularTotal();
        }
    }

    cambioPrecio(e) {
        const nuevoPrecio = parseFloat(e.target.value);
        if (!isNaN(nuevoPrecio) && nuevoPrecio >= 500) {
            this.precio = nuevoPrecio;
            this.recalcularTotal();
        }
    }

    cambioNombre(e){
        this.nombre = e.target.value
    }

    render(){
        return html `
        <link rel="stylesheet" href="src/vendor/css/bootstrap.min.css">
        <div class="card col-sm-5 ">
            <h5 class="text-light text-center bg-dark card-header">${this.nombre}</h5>
            <div class="text-center">
                <img style="max-width: 500px; max-height: 400px;" src="src/assets/Laptop.png" alt="Laptop">
            </div>
            <p>Cantidad: ${this.cantidad}</p>
            <label for="precio">Precio Unitario:</label>
            <input type="number" .value=${this.precio} @input=${this.cambioPrecio} min="500">
            <p>Precio Total: $${this.precioTotal}</p>
            <button @click=${this.restar}>Disminuir ➖</button>
            <button @click=${this.sumar}>Añadir ➕</button>
        </div>
        <label for="nombreNuevo">Nombre del Producto:</label>
        <input .value=${this.nombre} type="text" @input=${this.cambioNombre}>
        `;
    }
}

customElements.define('producto-card', ProductoCard)
