import fs from 'fs'

class ListaDeCosas {
  name: string;
  cosas: any[] = [];
  constructor(name: string) {
    // nombre de esta lista
    this.name = name;
  }
  add(nuevaCosa) {
    this.cosas.push(nuevaCosa);
  }
  getCosas() {
    return this.cosas;
  }
}

class Product {
  name: string;
  price: number;
  id: number;
  constructor(name: string, price: number, id: number) {
    this.name = name;
    this.price = price;
    this.id = id;
  }
}

class ListaDeProductos extends ListaDeCosas {
constructor(name:string){
super(name)

// IMPORTANTE
const contenidoDelArchivo = fs.readFileSync(__dirname + "/products.json").toString()
const productosDelArchivo = JSON.parse(contenidoDelArchivo);
productosDelArchivo.forEach(prod => {
  this.addProduct(prod)
})
}
////
addProduct(product: Product):void{

const existe = this.cosas.some(prod => prod.id === product.id)
//usasmos .some() para ver si existe el producto por que nos devuelve True o false 
//BUscamos si no existe el producto.
if(existe){
  console.log(`El producto con el id ${product.id} ya existe`);
  return;
}
//Si no existe el producto con el "id" agregamos el prodcuto
  this.cosas.push(product); 
  return;
}

getProduct(id: number): Product{
//buscamios el producto
const productEncontrado = this.cosas.find(prod => prod.id === id);

return productEncontrado;
}

removeProduct(id: number): void{
//Buscamos su exist el producto con el id
const existe = this.cosas.some( prod => prod.id === id)

//Si no existe el producto con el id no mandamos un msj 
if(!existe){
  console.log(`El producto con id ${id} no existe`);
  return;
}
//sino lo eliminamos 
this.cosas = this.cosas.filter(prod => prod.id !== id);
}

getSortedByPrice(order: string): Product[]{
//Clonamos el array para no modificar el original
const sortedCosas = [...this.cosas];

//ordenamos el array segun su valor
sortedCosas.sort((a,b) =>{
  if(order == "asc"){
    return a.price - b.price //Orden ascendente
  }else if( order == "desc"){
    return b.price -a.price;
  }
  return 0; // si no es "asc" ni "desc", no se ordena 
})
return sortedCosas;
}

}

export { ListaDeProductos, Product };
