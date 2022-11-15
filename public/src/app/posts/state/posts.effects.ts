
import { map, mergeMap } from 'rxjs/operators';
import { loadPosts, loadPostsSuccess, addPost, addPostSuccess } from './posts.actions';
import { PostsService } from './../../services/posts.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';

@Injectable()
export class PostsEffects {
  constructor(private actions$: Actions, private postsService: PostsService) {}

  loadPosts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadPosts),
      mergeMap((action) => {
        return this.postsService.getPosts().pipe(
          map((posts) => {
            return loadPostsSuccess({ posts });
          })
        );
      })
    );
  });

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

  // Opcion 2 - ver addPost metodo en el service --> public/src/app/services/posts.service.ts
  // addPost$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(addPost),
  //     mergeMap((action) => {
  //       return this.postsService.addPost(action.post).pipe(
  //         map((post) => {
  //           const customPost = { post: { ...action.post, id: post.name } };
  //           return addPostSuccess(customPost);
  //         })
  //       );
  //     })
  //   );
  // });
}