import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, exhaustMap, map } from 'rxjs/operators';
import { ReadingListItem } from '@tmo/shared/models';
import * as ReadingListActions from './reading-list.actions';

@Injectable()
export class ReadingListEffects implements OnInitEffects {
  loadReadingList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingListActions.init),
      exhaustMap(() =>
        this.http.get<ReadingListItem[]>('/api/reading-list').pipe(
          map((data) =>
            ReadingListActions.loadReadingListSucceeded({ list: data })
          ),
          catchError((error) =>
            of(ReadingListActions.loadReadingListFailed({ error }))
          )
        )
      )
    )
  );

  addBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingListActions.addToReadingList),
      concatMap(({ book }) =>
        this.http.post('/api/reading-list', book).pipe(
          map(() => ReadingListActions.addToReadingListSucceeded()
          ),
          catchError(() =>
            of(ReadingListActions.addToReadingListFailed({ book }))
          )
        )
      )
    )
  );

  removeBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingListActions.removeFromReadingList),
      concatMap(({ item }) =>
        this.http.delete(`/api/reading-list/${item.bookId}`).pipe(
          map(() =>
            ReadingListActions.removeFromReadingListSucceeded()
          ),
          catchError(() =>
            of(ReadingListActions.removeFromReadingListFailed({ item }))
          )
        )
      )
    )
  );
  
  markBookAsFinished$ = createEffect(() =>
  this.actions$.pipe(
    ofType(ReadingListActions.markBookAsFinished),
    concatMap(({ bookId, finishedDate }) => {
      return this.http
        .put(`/api/reading-list/${bookId}/finished`, { finishedDate })
        .pipe(
          map(() => ReadingListActions.markBookAsFinishedSucceeded()),
          catchError(() =>
            of(
              ReadingListActions.markBookAsFinishedFailed({
                bookId
              })
            )
          )
        );
    })
  )
);

  ngrxOnInitEffects() {
    return ReadingListActions.init();
  }

  constructor(private actions$: Actions, private http: HttpClient) {}
}
