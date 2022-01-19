import { isNull, isUndefined } from 'lodash';
import { map, Observable } from 'rxjs';
import { ajax } from 'rxjs/ajax';

export interface RecordsQueryRequest {
  url: string;
  params: Record<string, string | number | boolean | undefined | null>;
}

export function rxGet<T>({ url, params }: RecordsQueryRequest): Observable<T | null> {
  const queryStr = Object.entries(params || {})
    .filter(([_, value]) => !isNull(value) && !isUndefined(value))
    .reduce((acc, cur) => {
      const pair = `${cur[0]}=${cur[1]}`;

      return acc !== '' ? `${acc}&${pair}` : pair;
    }, '');

  return ajax({
    url: url + (queryStr ? `?${queryStr}` : ''),
    method: 'GET',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }).pipe(map((res) => (res.response as any).data || null));
}

export function rxPost<T>({ url, params }: RecordsQueryRequest): Observable<T> {
  return ajax({
    url,
    method: 'POST',
    body: params,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }).pipe(map((res) => (res.response as any).data as T));
}
