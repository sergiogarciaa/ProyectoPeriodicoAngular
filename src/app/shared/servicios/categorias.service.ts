import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Categoria } from '../interfaces/categoria';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  constructor(private fbs: Firestore) { }
  
   // Método para obtener todas las categorías
   obtenerTodasCategorias(): Observable<Categoria[]> {
    const collectionRef = collection(this.fbs, 'categorias'); // Reemplaza 'categorias' con el nombre de tu colección de categorías
    return collectionData(collectionRef, { idField: 'id' }) as Observable<Categoria[]>;
  }
}
