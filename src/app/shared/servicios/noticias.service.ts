import { Injectable } from '@angular/core';
import { BaseDatosService } from './base-datos.service';
import { Noticias } from '../interfaces/noticias';
import { Observable } from 'rxjs';
import { Firestore, collection, collectionData, query, where } from '@angular/fire/firestore';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {
  private noticiasCollection: AngularFirestoreCollection<Noticias>;
  constructor(private baseDatosServicio: BaseDatosService, private fbs: Firestore, private firestore: AngularFirestore) { 
    this.noticiasCollection = this.firestore.collection<Noticias>('noticias');
  }

  crearNoticia(nuevaNoticia: Noticias) {
    return this.baseDatosServicio.insertar('noticias', nuevaNoticia);
  }
    /**
   * Obtiene noticias filtradas por categoría
   * @param categoria Categoría por la que filtrar las noticias
   * @returns Un observable con las noticias filtradas por categoría
   */
    obtenerNoticiasPorCategoria(categoria: string): Observable<Noticias[]> {
      // Filtra las noticias por la categoría proporcionada
      const collectionRef = collection(this.fbs, 'noticias');
      const queryRef = query(collectionRef, where('categoria', '==', categoria));
      return collectionData(queryRef, { idField: 'id' }) as Observable<Noticias[]>;
    }

    obtenerNoticias(): Observable<Noticias[]> {
      return this.noticiasCollection.valueChanges({ idField: 'id' });
    }
}
