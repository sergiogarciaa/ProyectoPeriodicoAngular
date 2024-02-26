import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, query, where } from '@angular/fire/firestore';
import { Comentario } from '../interfaces/comentario';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComentariosService {

  constructor(private fbs: Firestore) {}

  obtenerComentariosPorNoticia(idNoticia: string): Observable<Comentario[]> {
    const collectionRef = collection(this.fbs, 'comentarios');
    const queryRef = query(collectionRef, where('idNoticia', '==', idNoticia));
    return collectionData(queryRef, { idField: 'id' }) as Observable<Comentario[]>;
  }
  
  agregarComentario(nuevoComentario: Comentario): Observable<void> {
    const collectionRef = collection(this.fbs, 'comentarios');
    return new Observable<void>(observer => {
      addDoc(collectionRef, nuevoComentario)
        .then(() => {
          observer.next();
          observer.complete();
        })
        .catch(error => {
          observer.error(error);
        });
    });
  }

}
