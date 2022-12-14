import { Post } from './../models/posts.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private http: HttpClient) {}

  getPosts(): Observable<Post[]> {
    return this.http
      // .get<Post[]>("https://vue-completecourse.firebaseio.com/posts.json")
      .get<Post[]>("http://localhost:5000/posts/getPosts")
      .pipe(
        map((data) => {
          const posts: Post[] = [];
          for (let key in data) {
            // posts.push({ ...data[key], id: (parseInt(key, 10) + 1).toString() });
            posts.push({ ...data[key], id: key });
          }
          return posts;
        })
      );
  }

  // Opcion 1 - ver addPost$ effect en los post effects --> public/src/app/posts/state/posts.effects.ts
  addPost(post: Post): Observable<Post> {
      return this.http.post<Post>(
        "http://localhost:5000/posts/addPost",
        { title: post.title, description: post.description }
      );
  }

  // Opcion 2 - ver addPost$ effect en los post effects --> public/src/app/posts/state/posts.effects.ts
  // addPost(post: Post): Observable<{ name: string }> {
  //   return this.http.post<{ name: string }>(
  //     "http://localhost:5000/posts/addPost",
  //     { title: post.title, description: post.description }
  //   );
  // }
}