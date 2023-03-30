import { HttpErrorResponse } from '@angular/common/http';
import { map, Observable, switchMap, tap } from 'rxjs';
import { throwError } from 'rxjs/internal/observable/throwError';
import { ResponseBase } from '../model/dto/response/response.base';

export class BaseService {
  handleHttpError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error(error.message));
  }

  handleRespError(resp: Observable<ResponseBase>): Observable<ResponseBase> {
    //switchMap导致调用2次接口
    return resp.pipe(
      tap((res) => {
        if (res.code != 200) {
          throw new Error(res.msg);
        }
        return res;
      }),
    );
  }
}
