/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseOptions } from '../base_response_options';
import { ReadyState, RequestMethod, ResponseType } from '../enums';
import { ConnectionBackend } from '../interfaces';
import { Response } from '../static_response';
import { BrowserJsonp } from './browser_jsonp';
const /** @type {?} */ JSONP_ERR_NO_CALLBACK = 'JSONP injected script did not invoke callback.';
const /** @type {?} */ JSONP_ERR_WRONG_METHOD = 'JSONP requests must use GET request method.';
/**
 * Base class for an in-flight JSONP request.
 *
 * @deprecated see https://angular.io/guide/http
 */
export class JSONPConnection {
    /**
     * \@internal
     * @param {?} req
     * @param {?} _dom
     * @param {?=} baseResponseOptions
     */
    constructor(req, _dom, baseResponseOptions) {
        this._dom = _dom;
        this.baseResponseOptions = baseResponseOptions;
        this._finished = false;
        if (req.method !== RequestMethod.Get) {
            throw new TypeError(JSONP_ERR_WRONG_METHOD);
        }
        this.request = req;
        this.response = new Observable((responseObserver) => {
            this.readyState = ReadyState.Loading;
            const /** @type {?} */ id = this._id = _dom.nextRequestID();
            _dom.exposeConnection(id, this);
            // Workaround Dart
            // url = url.replace(/=JSONP_CALLBACK(&|$)/, `generated method`);
            const /** @type {?} */ callback = _dom.requestCallback(this._id);
            let /** @type {?} */ url = req.url;
            if (url.indexOf('=JSONP_CALLBACK&') > -1) {
                url = url.replace('=JSONP_CALLBACK&', `=${callback}&`);
            }
            else if (url.lastIndexOf('=JSONP_CALLBACK') === url.length - '=JSONP_CALLBACK'.length) {
                url = url.substring(0, url.length - '=JSONP_CALLBACK'.length) + `=${callback}`;
            }
            const /** @type {?} */ script = this._script = _dom.build(url);
            const /** @type {?} */ onLoad = (event) => {
                if (this.readyState === ReadyState.Cancelled)
                    return;
                this.readyState = ReadyState.Done;
                _dom.cleanup(script);
                if (!this._finished) {
                    let /** @type {?} */ responseOptions = new ResponseOptions({ body: JSONP_ERR_NO_CALLBACK, type: ResponseType.Error, url });
                    if (baseResponseOptions) {
                        responseOptions = baseResponseOptions.merge(responseOptions);
                    }
                    responseObserver.error(new Response(responseOptions));
                    return;
                }
                let /** @type {?} */ responseOptions = new ResponseOptions({ body: this._responseData, url });
                if (this.baseResponseOptions) {
                    responseOptions = this.baseResponseOptions.merge(responseOptions);
                }
                responseObserver.next(new Response(responseOptions));
                responseObserver.complete();
            };
            const /** @type {?} */ onError = (error) => {
                if (this.readyState === ReadyState.Cancelled)
                    return;
                this.readyState = ReadyState.Done;
                _dom.cleanup(script);
                let /** @type {?} */ responseOptions = new ResponseOptions({ body: error.message, type: ResponseType.Error });
                if (baseResponseOptions) {
                    responseOptions = baseResponseOptions.merge(responseOptions);
                }
                responseObserver.error(new Response(responseOptions));
            };
            script.addEventListener('load', onLoad);
            script.addEventListener('error', onError);
            _dom.send(script);
            return () => {
                this.readyState = ReadyState.Cancelled;
                script.removeEventListener('load', onLoad);
                script.removeEventListener('error', onError);
                this._dom.cleanup(script);
            };
        });
    }
    /**
     * Callback called when the JSONP request completes, to notify the application
     * of the new data.
     * @param {?=} data
     * @return {?}
     */
    finished(data) {
        // Don't leak connections
        this._finished = true;
        this._dom.removeConnection(this._id);
        if (this.readyState === ReadyState.Cancelled)
            return;
        this._responseData = data;
    }
}
function JSONPConnection_tsickle_Closure_declarations() {
    /** @type {?} */
    JSONPConnection.prototype._id;
    /** @type {?} */
    JSONPConnection.prototype._script;
    /** @type {?} */
    JSONPConnection.prototype._responseData;
    /** @type {?} */
    JSONPConnection.prototype._finished;
    /**
     * The {\@link ReadyState} of this request.
     * @type {?}
     */
    JSONPConnection.prototype.readyState;
    /**
     * The outgoing HTTP request.
     * @type {?}
     */
    JSONPConnection.prototype.request;
    /**
     * An observable that completes with the response, when the request is finished.
     * @type {?}
     */
    JSONPConnection.prototype.response;
    /** @type {?} */
    JSONPConnection.prototype._dom;
    /** @type {?} */
    JSONPConnection.prototype.baseResponseOptions;
}
/**
 * A {\@link ConnectionBackend} that uses the JSONP strategy of making requests.
 *
 * @deprecated see https://angular.io/guide/http
 */
export class JSONPBackend extends ConnectionBackend {
    /**
     * \@internal
     * @param {?} _browserJSONP
     * @param {?} _baseResponseOptions
     */
    constructor(_browserJSONP, _baseResponseOptions) {
        super();
        this._browserJSONP = _browserJSONP;
        this._baseResponseOptions = _baseResponseOptions;
    }
    /**
     * @param {?} request
     * @return {?}
     */
    createConnection(request) {
        return new JSONPConnection(request, this._browserJSONP, this._baseResponseOptions);
    }
}
JSONPBackend.decorators = [
    { type: Injectable }
];
/** @nocollapse */
JSONPBackend.ctorParameters = () => [
    { type: BrowserJsonp },
    { type: ResponseOptions }
];
function JSONPBackend_tsickle_Closure_declarations() {
    /** @type {?} */
    JSONPBackend.prototype._browserJSONP;
    /** @type {?} */
    JSONPBackend.prototype._baseResponseOptions;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNvbnBfYmFja2VuZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2h0dHAvc3JjL2JhY2tlbmRzL2pzb25wX2JhY2tlbmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFRQSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBQyxVQUFVLEVBQVcsTUFBTSxNQUFNLENBQUM7QUFFMUMsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBQ3pELE9BQU8sRUFBQyxVQUFVLEVBQUUsYUFBYSxFQUFFLFlBQVksRUFBQyxNQUFNLFVBQVUsQ0FBQztBQUNqRSxPQUFPLEVBQWEsaUJBQWlCLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFFNUQsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBRTVDLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUU3Qyx1QkFBTSxxQkFBcUIsR0FBRyxnREFBZ0QsQ0FBQztBQUMvRSx1QkFBTSxzQkFBc0IsR0FBRyw2Q0FBNkMsQ0FBQzs7Ozs7O0FBTzdFLE1BQU07Ozs7Ozs7SUFzQkosWUFDSSxHQUFZLEVBQVUsSUFBa0IsRUFBVSxtQkFBcUM7UUFBakUsU0FBSSxHQUFKLElBQUksQ0FBYztRQUFVLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBa0I7eUJBbkI5RCxLQUFLO1FBb0JoQyxJQUFJLEdBQUcsQ0FBQyxNQUFNLEtBQUssYUFBYSxDQUFDLEdBQUcsRUFBRTtZQUNwQyxNQUFNLElBQUksU0FBUyxDQUFDLHNCQUFzQixDQUFDLENBQUM7U0FDN0M7UUFDRCxJQUFJLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQztRQUNuQixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksVUFBVSxDQUFXLENBQUMsZ0JBQW9DLEVBQUUsRUFBRTtZQUVoRixJQUFJLENBQUMs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QUFLLEVBQUUsQ0FBQztRQURVLGtCQUFhLEdBQWIsYUFBYSxDQUFjO1FBQVUseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFpQjtLQUU3Rjs7Ozs7SUFFRCxnQkFBZ0IsQ0FBQyxPQUFnQjtRQUMvQixPQUFPLElBQUksZUFBZSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0tBQ3BGOzs7WUFURixVQUFVOzs7O1lBM0hILFlBQVk7WUFOWixlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtPYnNlcnZhYmxlLCBPYnNlcnZlcn0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7UmVzcG9uc2VPcHRpb25zfSBmcm9tICcuLi9iYXNlX3Jlc3BvbnNlX29wdGlvbnMnO1xuaW1wb3J0IHtSZWFkeVN0YXRlLCBSZXF1ZXN0TWV0aG9kLCBSZXNwb25zZVR5cGV9IGZyb20gJy4uL2VudW1zJztcbmltcG9ydCB7Q29ubmVjdGlvbiwgQ29ubmVjdGlvbkJhY2tlbmR9IGZyb20gJy4uL2ludGVyZmFjZXMnO1xuaW1wb3J0IHtSZXF1ZXN0fSBmcm9tICcuLi9zdGF0aWNfcmVxdWVzdCc7XG5pbXBvcnQge1Jlc3BvbnNlfSBmcm9tICcuLi9zdGF0aWNfcmVzcG9uc2UnO1xuXG5pbXBvcnQge0Jyb3dzZXJKc29ucH0gZnJvbSAnLi9icm93c2VyX2pzb25wJztcblxuY29uc3QgSlNPTlBfRVJSX05PX0NBTExCQUNLID0gJ0pTT05QIGluamVjdGVkIHNjcmlwdCBkaWQgbm90IGludm9rZSBjYWxsYmFjay4nO1xuY29uc3QgSlNPTlBfRVJSX1dST05HX01FVEhPRCA9ICdKU09OUCByZXF1ZXN0cyBtdXN0IHVzZSBHRVQgcmVxdWVzdCBtZXRob2QuJztcblxuLyoqXG4gKiBCYXNlIGNsYXNzIGZvciBhbiBpbi1mbGlnaHQgSlNPTlAgcmVxdWVzdC5cbiAqXG4gKiBAZGVwcmVjYXRlZCBzZWUgaHR0cHM6Ly9hbmd1bGFyLmlvL2d1aWRlL2h0dHBcbiAqL1xuZXhwb3J0IGNsYXNzIEpTT05QQ29ubmVjdGlvbiBpbXBsZW1lbnRzIENvbm5lY3Rpb24ge1xuICBwcml2YXRlIF9pZDogc3RyaW5nO1xuICBwcml2YXRlIF9zY3JpcHQ6IEVsZW1lbnQ7XG4gIHByaXZhdGUgX3Jlc3BvbnNlRGF0YTogYW55O1xuICBwcml2YXRlIF9maW5pc2hlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBUaGUge0BsaW5rIFJlYWR5U3RhdGV9IG9mIHRoaXMgcmVxdWVzdC5cbiAgICovXG4gIHJlYWR5U3RhdGU6IFJlYWR5U3RhdGU7XG5cbiAgLyoqXG4gICAqIFRoZSBvdXRnb2luZyBIVFRQIHJlcXVlc3QuXG4gICAqL1xuICByZXF1ZXN0OiBSZXF1ZXN0O1xuXG4gIC8qKlxuICAgKiBBbiBvYnNlcnZhYmxlIHRoYXQgY29tcGxldGVzIHdpdGggdGhlIHJlc3BvbnNlLCB3aGVuIHRoZSByZXF1ZXN0IGlzIGZpbmlzaGVkLlxuICAgKi9cbiAgcmVzcG9uc2U6IE9ic2VydmFibGU8UmVzcG9uc2U+O1xuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgY29uc3RydWN0b3IoXG4gICAgICByZXE6IFJlcXVlc3QsIHByaXZhdGUgX2RvbTogQnJvd3Nlckpzb25wLCBwcml2YXRlIGJhc2VSZXNwb25zZU9wdGlvbnM/OiBSZXNwb25zZU9wdGlvbnMpIHtcbiAgICBpZiAocmVxLm1ldGhvZCAhPT0gUmVxdWVzdE1ldGhvZC5HZXQpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoSlNPTlBfRVJSX1dST05HX01FVEhPRCk7XG4gICAgfVxuICAgIHRoaXMucmVxdWVzdCA9IHJlcTtcbiAgICB0aGlzLnJlc3BvbnNlID0gbmV3IE9ic2VydmFibGU8UmVzcG9uc2U+KChyZXNwb25zZU9ic2VydmVyOiBPYnNlcnZlcjxSZXNwb25zZT4pID0+IHtcblxuICAgICAgdGhpcy5yZWFkeVN0YXRlID0gUmVhZHlTdGF0ZS5Mb2FkaW5nO1xuICAgICAgY29uc3QgaWQgPSB0aGlzLl9pZCA9IF9kb20ubmV4dFJlcXVlc3RJRCgpO1xuXG4gICAgICBfZG9tLmV4cG9zZUNvbm5lY3Rpb24oaWQsIHRoaXMpO1xuXG4gICAgICAvLyBXb3JrYXJvdW5kIERhcnRcbiAgICAgIC8vIHVybCA9IHVybC5yZXBsYWNlKC89SlNPTlBfQ0FMTEJBQ0soJnwkKS8sIGBnZW5lcmF0ZWQgbWV0aG9kYCk7XG4gICAgICBjb25zdCBjYWxsYmFjayA9IF9kb20ucmVxdWVzdENhbGxiYWNrKHRoaXMuX2lkKTtcbiAgICAgIGxldCB1cmw6IHN0cmluZyA9IHJlcS51cmw7XG4gICAgICBpZiAodXJsLmluZGV4T2YoJz1KU09OUF9DQUxMQkFDSyYnKSA+IC0xKSB7XG4gICAgICAgIHVybCA9IHVybC5yZXBsYWNlKCc9SlNPTlBfQ0FMTEJBQ0smJywgYD0ke2NhbGxiYWNrfSZgKTtcbiAgICAgIH0gZWxzZSBpZiAodXJsLmxhc3RJbmRleE9mKCc9SlNPTlBfQ0FMTEJBQ0snKSA9PT0gdXJsLmxlbmd0aCAtICc9SlNPTlBfQ0FMTEJBQ0snLmxlbmd0aCkge1xuICAgICAgICB1cmwgPSB1cmwuc3Vic3RyaW5nKDAsIHVybC5sZW5ndGggLSAnPUpTT05QX0NBTExCQUNLJy5sZW5ndGgpICsgYD0ke2NhbGxiYWNrfWA7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHNjcmlwdCA9IHRoaXMuX3NjcmlwdCA9IF9kb20uYnVpbGQodXJsKTtcblxuICAgICAgY29uc3Qgb25Mb2FkID0gKGV2ZW50OiBFdmVudCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5yZWFkeVN0YXRlID09PSBSZWFkeVN0YXRlLkNhbmNlbGxlZCkgcmV0dXJuO1xuICAgICAgICB0aGlzLnJlYWR5U3RhdGUgPSBSZWFkeVN0YXRlLkRvbmU7XG4gICAgICAgIF9kb20uY2xlYW51cChzY3JpcHQpO1xuICAgICAgICBpZiAoIXRoaXMuX2ZpbmlzaGVkKSB7XG4gICAgICAgICAgbGV0IHJlc3BvbnNlT3B0aW9ucyA9XG4gICAgICAgICAgICAgIG5ldyBSZXNwb25zZU9wdGlvbnMoe2JvZHk6IEpTT05QX0VSUl9OT19DQUxMQkFDSywgdHlwZTogUmVzcG9uc2VUeXBlLkVycm9yLCB1cmx9KTtcbiAgICAgICAgICBpZiAoYmFzZVJlc3BvbnNlT3B0aW9ucykge1xuICAgICAgICAgICAgcmVzcG9uc2VPcHRpb25zID0gYmFzZVJlc3BvbnNlT3B0aW9ucy5tZXJnZShyZXNwb25zZU9wdGlvbnMpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXNwb25zZU9ic2VydmVyLmVycm9yKG5ldyBSZXNwb25zZShyZXNwb25zZU9wdGlvbnMpKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgcmVzcG9uc2VPcHRpb25zID0gbmV3IFJlc3BvbnNlT3B0aW9ucyh7Ym9keTogdGhpcy5fcmVzcG9uc2VEYXRhLCB1cmx9KTtcbiAgICAgICAgaWYgKHRoaXMuYmFzZVJlc3BvbnNlT3B0aW9ucykge1xuICAgICAgICAgIHJlc3BvbnNlT3B0aW9ucyA9IHRoaXMuYmFzZVJlc3BvbnNlT3B0aW9ucy5tZXJnZShyZXNwb25zZU9wdGlvbnMpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVzcG9uc2VPYnNlcnZlci5uZXh0KG5ldyBSZXNwb25zZShyZXNwb25zZU9wdGlvbnMpKTtcbiAgICAgICAgcmVzcG9uc2VPYnNlcnZlci5jb21wbGV0ZSgpO1xuICAgICAgfTtcblxuICAgICAgY29uc3Qgb25FcnJvciA9IChlcnJvcjogRXJyb3IpID0+IHtcbiAgICAgICAgaWYgKHRoaXMucmVhZHlTdGF0ZSA9PT0gUmVhZHlTdGF0ZS5DYW5jZWxsZWQpIHJldHVybjtcbiAgICAgICAgdGhpcy5yZWFkeVN0YXRlID0gUmVhZHlTdGF0ZS5Eb25lO1xuICAgICAgICBfZG9tLmNsZWFudXAoc2NyaXB0KTtcbiAgICAgICAgbGV0IHJlc3BvbnNlT3B0aW9ucyA9IG5ldyBSZXNwb25zZU9wdGlvbnMoe2JvZHk6IGVycm9yLm1lc3NhZ2UsIHR5cGU6IFJlc3BvbnNlVHlwZS5FcnJvcn0pO1xuICAgICAgICBpZiAoYmFzZVJlc3BvbnNlT3B0aW9ucykge1xuICAgICAgICAgIHJlc3BvbnNlT3B0aW9ucyA9IGJhc2VSZXNwb25zZU9wdGlvbnMubWVyZ2UocmVzcG9uc2VPcHRpb25zKTtcbiAgICAgICAgfVxuICAgICAgICByZXNwb25zZU9ic2VydmVyLmVycm9yKG5ldyBSZXNwb25zZShyZXNwb25zZU9wdGlvbnMpKTtcbiAgICAgIH07XG5cbiAgICAgIHNjcmlwdC5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgb25Mb2FkKTtcbiAgICAgIHNjcmlwdC5hZGRFdmVudExpc3RlbmVyKCdlcnJvcicsIG9uRXJyb3IpO1xuXG4gICAgICBfZG9tLnNlbmQoc2NyaXB0KTtcblxuICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgdGhpcy5yZWFkeVN0YXRlID0gUmVhZHlTdGF0ZS5DYW5jZWxsZWQ7XG4gICAgICAgIHNjcmlwdC5yZW1vdmVFdmVudExpc3RlbmVyKCdsb2FkJywgb25Mb2FkKTtcbiAgICAgICAgc2NyaXB0LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgb25FcnJvcik7XG4gICAgICAgIHRoaXMuX2RvbS5jbGVhbnVwKHNjcmlwdCk7XG4gICAgICB9O1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIENhbGxiYWNrIGNhbGxlZCB3aGVuIHRoZSBKU09OUCByZXF1ZXN0IGNvbXBsZXRlcywgdG8gbm90aWZ5IHRoZSBhcHBsaWNhdGlvblxuICAgKiBvZiB0aGUgbmV3IGRhdGEuXG4gICAqL1xuICBmaW5pc2hlZChkYXRhPzogYW55KSB7XG4gICAgLy8gRG9uJ3QgbGVhayBjb25uZWN0aW9uc1xuICAgIHRoaXMuX2ZpbmlzaGVkID0gdHJ1ZTtcbiAgICB0aGlzLl9kb20ucmVtb3ZlQ29ubmVjdGlvbih0aGlzLl9pZCk7XG4gICAgaWYgKHRoaXMucmVhZHlTdGF0ZSA9PT0gUmVhZHlTdGF0ZS5DYW5jZWxsZWQpIHJldHVybjtcbiAgICB0aGlzLl9yZXNwb25zZURhdGEgPSBkYXRhO1xuICB9XG59XG5cbi8qKlxuICogQSB7QGxpbmsgQ29ubmVjdGlvbkJhY2tlbmR9IHRoYXQgdXNlcyB0aGUgSlNPTlAgc3RyYXRlZ3kgb2YgbWFraW5nIHJlcXVlc3RzLlxuICpcbiAqIEBkZXByZWNhdGVkIHNlZSBodHRwczovL2FuZ3VsYXIuaW8vZ3VpZGUvaHR0cFxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgSlNPTlBCYWNrZW5kIGV4dGVuZHMgQ29ubmVjdGlvbkJhY2tlbmQge1xuICAvKiogQGludGVybmFsICovXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2Jyb3dzZXJKU09OUDogQnJvd3Nlckpzb25wLCBwcml2YXRlIF9iYXNlUmVzcG9uc2VPcHRpb25zOiBSZXNwb25zZU9wdGlvbnMpIHtcbiAgICBzdXBlcigpO1xuICB9XG5cbiAgY3JlYXRlQ29ubmVjdGlvbihyZXF1ZXN0OiBSZXF1ZXN0KTogSlNPTlBDb25uZWN0aW9uIHtcbiAgICByZXR1cm4gbmV3IEpTT05QQ29ubmVjdGlvbihyZXF1ZXN0LCB0aGlzLl9icm93c2VySlNPTlAsIHRoaXMuX2Jhc2VSZXNwb25zZU9wdGlvbnMpO1xuICB9XG59XG4iXX0=