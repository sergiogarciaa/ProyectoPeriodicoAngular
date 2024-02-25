import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from 'src/app/shared/interfaces/categoria';
import { Noticias } from 'src/app/shared/interfaces/noticias';
import { Usuario } from 'src/app/shared/interfaces/usuario';
import { AuthService } from 'src/app/shared/servicios/auth.service';
import { BaseDatosService } from 'src/app/shared/servicios/base-datos.service';
import { CategoriasService } from 'src/app/shared/servicios/categorias.service';
import { NoticiasService } from 'src/app/shared/servicios/noticias.service';
import Swal from 'sweetalert2';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-crear-noticia',
  templateUrl: './crear-noticia.component.html',
  styleUrls: ['./crear-noticia.component.css']
})
export class CrearNoticiaComponent {
  formularioNoticia: FormGroup;
  usuario: Usuario | undefined;
  idUsuario: string | undefined;
  categorias: Categoria[] = []; // Array para almacenar las categorías

  constructor(private noticiasService: NoticiasService, 
    private router: Router, 
    private route: ActivatedRoute, 
    private baseDatos: BaseDatosService,
    private auth: AuthService,
    private categoriasServicio: CategoriasService
    ){
    this.formularioNoticia = new FormGroup({
      titulo: new FormControl('', Validators.required),
      cuerpo: new FormControl('', Validators.required),
      autor: new FormControl('', Validators.required),
      categoria: new FormControl('', Validators.required), 
    });
  }

  ngOnInit(): void {
    this.obtenerCategorias();
    console.log(this.categorias)
    this.route.params.subscribe(params => {
      this.idUsuario = params['id'];
      if (this.idUsuario) {
        this.baseDatos.obtenerPorId('usuarios', this.idUsuario).subscribe((data: Usuario) => {
          if (data) {
            this.formularioNoticia.controls['autor'].setValue(data.nombre);
          }
        });
      }
    });
  }

  obtenerCategorias() {
    this.categoriasServicio.obtenerTodasCategorias().subscribe(
      (categorias: Categoria[]) => {
        this.categorias = categorias;
      },
      (error) => {
        console.error('Error al obtener las categorías:', error);
        // Maneja el error de acuerdo a tus necesidades
      }
    );
  }

  crearNoticia() {
    if (this.formularioNoticia.valid) {
      // Asignar id Aleatorio
      const idNoticia = uuidv4();
      const idusu = this.idUsuario;
      const nuevaNoticia: Noticias = {
        id: idNoticia,
        titulo: this.formularioNoticia.value.titulo,
        cuerpo: this.formularioNoticia.value.cuerpo,
        autor: this.formularioNoticia.value.autor,
        idAutor: idusu,
        categoria: this.formularioNoticia.value.categoria,
    };

    this.noticiasService.crearNoticia(nuevaNoticia)
      .then(() => {
        this.router.navigate(['/principal/dashboard']);
        Swal.fire('Noticia creada', '', 'success');
      })
      .catch((error: any) => {
        console.error("Error al crear la noticia:", error);
        Swal.fire('Error', 'Ocurrió un error al crear la noticia', 'error');
      });
  }
  else {
    Swal.fire('Error', 'Por favor completa todos los campos', 'error');
  }
}

  logOut(){
    this.auth.logout();
  }
}
