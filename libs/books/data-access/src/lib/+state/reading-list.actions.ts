import { createAction, props } from '@ngrx/store';
import { Book, ReadingListItem } from '@tmo/shared/models';

export const init = createAction('[Reading List] Initialize');

export const loadReadingListSucceeded = createAction(
  '[Reading List API] load reading list succeeded',
  props<{ list: ReadingListItem[] }>()
);
export const loadReadingListFailed = createAction(
  '[Reading List API] load reading list failed',
  props<{ error: string }>()
);

export const addToReadingList = createAction(
  '[Books Search Results] add to readingList',
  props<{ book: Book }>()
);

export const addToReadingListFailed = createAction(
  '[Reading List API] add to readingList failed',
  props<{ book: Book }>()
);

export const addToReadingListSucceeded = createAction(
  '[Reading List API] Confirmed add to list'
);

export const removeFromReadingList = createAction(
  '[Books Search Results] add to readingList succeeded',
  props<{ item: ReadingListItem }>()
);

export const removeFromReadingListFailed = createAction(
'[Reading List API] remove from readingList failed',
  props<{ item: ReadingListItem }>()
);

export const removeFromReadingListSucceeded = createAction(
  '[Reading List API] remove from readingList succeeded'
);
