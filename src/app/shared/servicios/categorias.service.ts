import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData, query, where } from '@angular/fire/firestore';
import { Categoria } from '../interfaces/categoria';
import { Observable } from 'rxjs';
import { Noticias } from '../interfaces/noticias';

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
  
  obtenerPorId(coleccion: string, id: string): Observable<Categoria | undefined> {
    const elementDocRef = doc(this.fbs, `${coleccion}/${id}`);
    return docData(elementDocRef, { idField: 'id' }) as Observable<Categoria | undefined>;
  }
  
  obtenerNoticiasPorCategoria(nombreCategoria: string): Observable<Noticias[]> {
    const collectionRef = collection(this.fbs, 'noticias');
    const queryRef = query(collectionRef, where('categoria', '==', nombreCategoria));
    return collectionData(queryRef, { idField: 'id' }) as Observable<Noticias[]>;
  }
}
