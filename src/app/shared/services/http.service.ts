import { environment } from './../../../environments/environment';
import { Injectable, SecurityContext } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse, } from '@angular/common/http';
import { Observable, of, timer } from 'rxjs';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { retry, map } from 'rxjs/operators';
import { selfUnsubscribe } from '@core/pipes/selfUnsubscribe';

interface OptionsHttp {
  headers?:
  | HttpHeaders
  | {
    [header: string]: string | string[];
  };
  params?: HttpParams | {
    [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
  };
  cache?: boolean | number;
}

@Injectable({
  providedIn: 'root',
})
export class Http {

  private cacheEntityGet: {
    [url: string]: unknown;
  } = {};

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) { }

  /**
   * Função de requisição HTTP Get
   *
   * @param {string} url URL ser acessada
   * @param {T} TypeGet Tipo do objeto a ser retornado Ex.: Usuário
   *
   *
   */

  public get = <T>(
    url: string,
    options?: OptionsHttp
  ): Observable<T> => {
    if (options?.cache && this.cacheEntityGet[url])
      return of(this.cacheEntityGet[url] as T)

    return this.http
      .get<T>(
        this.sanitizer.sanitize(
          SecurityContext.URL,
          this.sanitizer.bypassSecurityTrustResourceUrl(environment.api + url)
        )!,
        {
          ...options,
          observe: 'response',
          responseType: 'json',
        }
      )
      .pipe(
        map((res: HttpResponse<T>) => this.mapResponse(res, url, options)),
        selfUnsubscribe(),
        retry({
          count: 3,
          delay: (error: HttpErrorResponse) =>
            error.status >= 500 ? timer(1000) : of(),
        })
      );
  };

  private map = <T>(res: HttpResponse<T>) => {
    const _res: T & { length?: number } = res.body!;
    _res.length = Number(res.headers.get('x-total-quantidade'));
    return _res;
  }

  getBlob = (url: string, options?: OptionsHttp): Observable<any> => {
    return this.http.get(environment.api + url,
      {
        observe: 'response',
        responseType: 'blob',
      })
  };

  public getExternal<T>(
    url: string,
    options?: {
      headers?:
      | HttpHeaders
      | {
        [header: string]: string | string[];
      };
      params?: {
        [param: string]: string | number | boolean;
      };
    }
  ): Observable<T> {
    return this.http
      .get<T>(
        this.sanitizer.sanitize(
          SecurityContext.URL,
          this.sanitizer.bypassSecurityTrustResourceUrl(url)
        )!,
        {
          ...options,
        }
      )
      .pipe(
        retry({
          count: 3,
          delay: (error: HttpErrorResponse) =>
            error.status >= 500 ? timer(1000) : of(),
        }),
        selfUnsubscribe()
      );
  }

  /**
   * Função de requisição HTTP post
   *
   * @param {string} url URL ser acessada
   * @param {{}} data Objeto a ser enviado
   * @param {{}} SendType Tipo do objeto a ser enviado Ex.: AuthLogin
   * @param {{}} ReturnType Tipo do objeto a ser retornado Ex.: AuthReturn
   *
   */
  public post<SendType, ReturnType = SendType>(
    url: string,
    data: SendType,
    options?: OptionsHttp
  ): Observable<ReturnType> {

    queueMicrotask(() => {
      Object.keys(this.cacheEntityGet).filter((key) => key.includes(url)).forEach(key => {
        delete this.cacheEntityGet[key];
      })
    });

    const _safeResourceUrl: SafeUrl = this.sanitizer.bypassSecurityTrustUrl(
      environment.api + url
    );
    const _safeUrl: string = this.sanitizer.sanitize(
      SecurityContext.URL,
      _safeResourceUrl
    ) as string;

    return this.http.post<ReturnType>(_safeUrl, data, {
      ...options,
      observe: 'response',
      responseType: 'json',
    }).pipe(
      map((res: HttpResponse<ReturnType>) => this.mapResponse(res, url, options)),
      selfUnsubscribe());
  }

  private mapResponse<ReturnType>(
    res: HttpResponse<ReturnType>,
    url: string,
    options?: OptionsHttp
  ): ReturnType {
    const response = res.headers.has('x-total-quantidade')
      ? this.map(res)
      : (res.body as ReturnType);

    queueMicrotask(() => {
      if (options?.cache) {
        this.cacheEntityGet[url] = response;
        let cacheTimeout = 60;
        if (typeof options.cache === 'number')
          cacheTimeout = options.cache;

        setTimeout(() => {
          delete this.cacheEntityGet[url];
        }, cacheTimeout * 1000);
      }
    });

    return response;
  }

  /**
   * Função de requisição HTTP patch
   *
   * @param {{}} url URL ser acessada
   * @param {{}} data Objeto a ser enviado
   * @param {{}} SendType Tipo do objeto a ser enviado Ex.: AuthLogin
   * @param {{}} ReturnType Tipo do objeto a ser retornado Ex.: AuthReturn
   *
   */
  public patch<SendType, ReturnType = SendType>(
    url: string,
    data: SendType,
    returnText?: boolean
  ): Observable<ReturnType> {
    let _responseType = returnText ? ('text' as 'json') : 'json';

    const _safeResourceUrl: SafeUrl = this.sanitizer.bypassSecurityTrustUrl(
      environment.api + url
    );
    const _safeUrl: string = this.sanitizer.sanitize(
      4,
      _safeResourceUrl
    ) as string;
    return this.http
      .patch<ReturnType>(_safeUrl, data, {
        responseType: _responseType,
      })
      .pipe(selfUnsubscribe());
  }
  /**
   * Função de requisição HTTP Put
   *
   * @param {{}} url URL ser acessada
   * @param {{}} SendType Tipo do objeto a ser enviado Ex.: Usuário
   *
   */
  public put<SendType, ReturnType = SendType>(
    url: string,
    data: SendType,
    options?: {
      headers?:
      | HttpHeaders
      | {
        [header: string]: string | string[];
      };
      params?: {
        [param: string]: string | number | boolean;
      };
    }
  ): Observable<ReturnType> {
    queueMicrotask(() => {
      Object.keys(this.cacheEntityGet).filter((key) => key.includes(url)).forEach(key => {
        delete this.cacheEntityGet[key];
      })
    });
    const _safeResourceUrl: SafeUrl = this.sanitizer.bypassSecurityTrustUrl(
      environment.api + url
    );
    const _safeUrl: string = this.sanitizer.sanitize(
      4,
      _safeResourceUrl
    ) as string;
    return this.http
      .put<ReturnType>(_safeUrl, data, {
        ...options,
        observe: 'body',
        responseType: 'json',
      })
      .pipe(selfUnsubscribe()) as Observable<ReturnType>;
  }
  /**
   * Função de requisição HTTP Delete
   *
   * @param {{}} url URL ser acessada
   *
   */
  public delete(url: string): Observable<boolean> {
    const _safeResourceUrl: SafeUrl = this.sanitizer.bypassSecurityTrustUrl(
      environment.api + url
    );
    const _safeUrl: string = this.sanitizer.sanitize(
      4,
      _safeResourceUrl
    ) as string;
    return this.http.delete<boolean>(_safeUrl).pipe(selfUnsubscribe());
  }
}
