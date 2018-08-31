/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { InjectionToken } from './injection_token';
/**
 * An internal token whose presence in an injector indicates that the injector should treat itself
 * as a root scoped injector when processing requests for unknown tokens which may indicate
 * they are provided in the root scope.
 */
export var APP_ROOT = new InjectionToken('The presence of this token marks an injector as being the root injector.');

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NvcGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3NyYy9kaS9zY29wZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFHSCxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFHakQ7Ozs7R0FJRztBQUNILE1BQU0sQ0FBQyxJQUFNLFFBQVEsR0FBRyxJQUFJLGNBQWMsQ0FDdEMsMEVBQTBFLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtUeXBlfSBmcm9tICcuLi90eXBlJztcbmltcG9ydCB7SW5qZWN0aW9uVG9rZW59IGZyb20gJy4vaW5qZWN0aW9uX3Rva2VuJztcblxuXG4vKipcbiAqIEFuIGludGVybmFsIHRva2VuIHdob3NlIHByZXNlbmNlIGluIGFuIGluamVjdG9yIGluZGljYXRlcyB0aGF0IHRoZSBpbmplY3RvciBzaG91bGQgdHJlYXQgaXRzZWxmXG4gKiBhcyBhIHJvb3Qgc2NvcGVkIGluamVjdG9yIHdoZW4gcHJvY2Vzc2luZyByZXF1ZXN0cyBmb3IgdW5rbm93biB0b2tlbnMgd2hpY2ggbWF5IGluZGljYXRlXG4gKiB0aGV5IGFyZSBwcm92aWRlZCBpbiB0aGUgcm9vdCBzY29wZS5cbiAqL1xuZXhwb3J0IGNvbnN0IEFQUF9ST09UID0gbmV3IEluamVjdGlvblRva2VuPGJvb2xlYW4+KFxuICAgICdUaGUgcHJlc2VuY2Ugb2YgdGhpcyB0b2tlbiBtYXJrcyBhbiBpbmplY3RvciBhcyBiZWluZyB0aGUgcm9vdCBpbmplY3Rvci4nKTtcbiJdfQ==