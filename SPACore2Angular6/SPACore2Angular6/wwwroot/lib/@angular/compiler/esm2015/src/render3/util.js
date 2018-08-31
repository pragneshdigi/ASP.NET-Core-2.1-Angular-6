/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { StaticSymbol } from '../aot/static_symbol';
import * as o from '../output/output_ast';
/**
 * Convert an object map with `Expression` values into a `LiteralMapExpr`.
 */
export function mapToMapExpression(map) {
    const result = Object.keys(map).map(key => ({ key, value: map[key], quoted: false }));
    return o.literalMap(result);
}
/**
 * Convert metadata into an `Expression` in the given `OutputContext`.
 *
 * This operation will handle arrays, references to symbols, or literal `null` or `undefined`.
 */
export function convertMetaToOutput(meta, ctx) {
    if (Array.isArray(meta)) {
        return o.literalArr(meta.map(entry => convertMetaToOutput(entry, ctx)));
    }
    if (meta instanceof StaticSymbol) {
        return ctx.importExpr(meta);
    }
    if (meta == null) {
        return o.literal(meta);
    }
    throw new Error(`Internal error: Unsupported or unknown metadata: ${meta}`);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvbXBpbGVyL3NyYy9yZW5kZXIzL3V0aWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQ2xELE9BQU8sS0FBSyxDQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFHMUM7O0dBRUc7QUFDSCxNQUFNLDZCQUE2QixHQUFrQztJQUNuRSxNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3BGLE9BQU8sQ0FBQyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUM5QixDQUFDO0FBRUQ7Ozs7R0FJRztBQUNILE1BQU0sOEJBQThCLElBQVMsRUFBRSxHQUFrQjtJQUMvRCxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFDdkIsT0FBTyxDQUFDLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ3pFO0lBQ0QsSUFBSSxJQUFJLFlBQVksWUFBWSxFQUFFO1FBQ2hDLE9BQU8sR0FBRyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUM3QjtJQUNELElBQUksSUFBSSxJQUFJLElBQUksRUFBRTtRQUNoQixPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDeEI7SUFFRCxNQUFNLElBQUksS0FBSyxDQUFDLG9EQUFvRCxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBQzlFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7U3RhdGljU3ltYm9sfSBmcm9tICcuLi9hb3Qvc3RhdGljX3N5bWJvbCc7XG5pbXBvcnQgKiBhcyBvIGZyb20gJy4uL291dHB1dC9vdXRwdXRfYXN0JztcbmltcG9ydCB7T3V0cHV0Q29udGV4dH0gZnJvbSAnLi4vdXRpbCc7XG5cbi8qKlxuICogQ29udmVydCBhbiBvYmplY3QgbWFwIHdpdGggYEV4cHJlc3Npb25gIHZhbHVlcyBpbnRvIGEgYExpdGVyYWxNYXBFeHByYC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1hcFRvTWFwRXhwcmVzc2lvbihtYXA6IHtba2V5OiBzdHJpbmddOiBvLkV4cHJlc3Npb259KTogby5MaXRlcmFsTWFwRXhwciB7XG4gIGNvbnN0IHJlc3VsdCA9IE9iamVjdC5rZXlzKG1hcCkubWFwKGtleSA9PiAoe2tleSwgdmFsdWU6IG1hcFtrZXldLCBxdW90ZWQ6IGZhbHNlfSkpO1xuICByZXR1cm4gby5saXRlcmFsTWFwKHJlc3VsdCk7XG59XG5cbi8qKlxuICogQ29udmVydCBtZXRhZGF0YSBpbnRvIGFuIGBFeHByZXNzaW9uYCBpbiB0aGUgZ2l2ZW4gYE91dHB1dENvbnRleHRgLlxuICpcbiAqIFRoaXMgb3BlcmF0aW9uIHdpbGwgaGFuZGxlIGFycmF5cywgcmVmZXJlbmNlcyB0byBzeW1ib2xzLCBvciBsaXRlcmFsIGBudWxsYCBvciBgdW5kZWZpbmVkYC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvbnZlcnRNZXRhVG9PdXRwdXQobWV0YTogYW55LCBjdHg6IE91dHB1dENvbnRleHQpOiBvLkV4cHJlc3Npb24ge1xuICBpZiAoQXJyYXkuaXNBcnJheShtZXRhKSkge1xuICAgIHJldHVybiBvLmxpdGVyYWxBcnIobWV0YS5tYXAoZW50cnkgPT4gY29udmVydE1ldGFUb091dHB1dChlbnRyeSwgY3R4KSkpO1xuICB9XG4gIGlmIChtZXRhIGluc3RhbmNlb2YgU3RhdGljU3ltYm9sKSB7XG4gICAgcmV0dXJuIGN0eC5pbXBvcnRFeHByKG1ldGEpO1xuICB9XG4gIGlmIChtZXRhID09IG51bGwpIHtcbiAgICByZXR1cm4gby5saXRlcmFsKG1ldGEpO1xuICB9XG5cbiAgdGhyb3cgbmV3IEVycm9yKGBJbnRlcm5hbCBlcnJvcjogVW5zdXBwb3J0ZWQgb3IgdW5rbm93biBtZXRhZGF0YTogJHttZXRhfWApO1xufVxuIl19