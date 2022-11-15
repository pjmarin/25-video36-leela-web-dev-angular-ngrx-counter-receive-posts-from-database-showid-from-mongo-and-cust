En este video hemos hechoh la funcionalidad de obtener los posts de la base de datos
Hemos implementado la opcion de mostrar en el front, en la tabla, la id que nosotros le asignamos en el front
(autonumerica y ascendente), y hemos dejado comentado el codigo correspondiente para visualizar en la tabla
del front el id de mongo, en luar del id que nosotros le asignamos en el front.

Resumiendo, para ver la id de mongo:

En public/src/app/posts/posts-list/posts-list.component.html

<tbody>
      <tr *ngFor="let post of postsData">
          <td>{{ post.id }}</td>


En public/src/app/posts/state/posts.effects.ts

// Opcion 1 - ver addPost metodo en el service --> public/src/app/services/posts.service.ts 
  addPost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addPost),
      mergeMap((action) => {
        return this.postsService.addPost(action.post).pipe(
          map((post) => {
            return addPostSuccess({ post });
          })
        );
      })
    );
  });

En public/src/app/services/posts.service.ts 

// Opcion 1 - ver addPost$ effect en los post effects --> public/src/app/posts/state/posts.effects.ts
  addPost(post: Post): Observable<Post> {
      return this.http.post<Post>(
        "http://localhost:5000/posts/addPost",
        { title: post.title, description: post.description }
      );
  }


Para ver la id que nosotros asignamos en el front (autonumerica y ascendente)

En public/src/app/posts/posts-list/posts-list.component.html

<tbody>
      <tr *ngFor="let post of postsData">
          <td>{{ post._id }}</td>


En public/src/app/posts/state/posts.effects.ts

// Opcion 2 - ver addPost metodo en el service --> public/src/app/services/posts.service.ts
  addPost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addPost),
      mergeMap((action) => {
        return this.postsService.addPost(action.post).pipe(
          map((post) => {
            const customPost = { post: { ...action.post, id: post.name } };
            return addPostSuccess(customPost);
          })
        );
      })
    );
  });

En public/src/app/services/posts.service.ts

// Opcion 2 - ver addPost$ effect en los post effects --> public/src/app/posts/state/posts.effects.ts
  addPost(post: Post): Observable<{ name: string }> {
    return this.http.post<{ name: string }>(
      "http://localhost:5000/posts/addPost",
      { title: post.title, description: post.description }
    );
  }