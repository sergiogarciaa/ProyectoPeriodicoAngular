import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, docData, query, setDoc, updateDoc, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseDatosService {

  constructor(private fbs: Firestore) {}

  /**
   * Obtiene todos los documentos de una colección determinada
   * @param coleccion de la base de datos que se va a obtener
   * @returns un observable con todos los documentos de la colección
   */
  obtenerTodos(coleccion: string) {
    const elementRef = collection(this.fbs, coleccion);
    return collectionData(elementRef, { idField: 'id' }) as Observable<any[]>;
  }

   /**
   * Obtiene un documento de una colección
   * @param coleccion dela base de datos que en la que se va a buscar
   * @param id del documento que se va a obtener
   * @returns un observable con el doc
   */
  obtenerPorId(coleccion: string,id: string) {
    const elementDocRef = doc(this.fbs, `${coleccion}/${id}`);
    return docData(elementDocRef, { idField: 'id' }) as Observable<any>;
  }

  /**
   * Obtiene un documento de una colección que cumpla con un filtro
   * @param coleccion de la base de datos que se va a buscar
   * @param campo de la colección que se va a filtrar
   * @param valor que se va a filtrar
   * @returns
   */
  obtenerPorFiltro(coleccion: string, campo: string, valor: any) {
    const collectionRef = collection(this.fbs, coleccion);
    const queryRef = query(collectionRef, where(campo, '==', valor));
    return collectionData(queryRef, { idField: 'id' }) as Observable<any[]>;
  }

  /**
   * Elimina un documento de una colección determinada
   * @param coleccion de la base de datos que se va a eliminar
   * @param id id del documento que se va eliminar
   * @returns una promesa
   */
  eliminar(coleccion: string, id: string) {
    const elementDocRef = doc(this.fbs, `${coleccion}/${id}`);
    return deleteDoc(elementDocRef);
  }

  /**
   * Modifica un documento de una colección determinada
   * @param coleccion de la base de datos que se va a modificar
   * @param documento modificado para ser actualizado
   * @returns una promesa
   */
  actualizar(coleccion: string, documento: any) {
    const elementDocRef = doc(this.fbs, `${coleccion}/${documento.id}`);
    return updateDoc(elementDocRef, documento);
  }

}
