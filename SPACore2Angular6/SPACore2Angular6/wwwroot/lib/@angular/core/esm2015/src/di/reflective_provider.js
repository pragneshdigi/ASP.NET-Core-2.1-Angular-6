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
import { reflector } from '../reflection/reflection';
import { Type } from '../type';
import { resolveForwardRef } from './forward_ref';
import { InjectionToken } from './injection_token';
import { Inject, Optional, Self, SkipSelf } from './metadata';
import { invalidProviderError, mixingMultiProvidersWithRegularProvidersError, noAnnotationError } from './reflective_errors';
import { ReflectiveKey } from './reflective_key';
/**
 * @record
 */
function NormalizedProvider() { }
function NormalizedProvider_tsickle_Closure_declarations() {
}
/**
 * `Dependency` is used by the framework to extend DI.
 * This is internal to Angular and should not be used directly.
 */
export class ReflectiveDependency {
    /**
     * @param {?} key
     * @param {?} optional
     * @param {?} visibility
     */
    constructor(key, optional, visibility) {
        this.key = key;
        this.optional = optional;
        this.visibility = visibility;
    }
    /**
     * @param {?} key
     * @return {?}
     */
    static fromKey(key) {
        return new ReflectiveDependency(key, false, null);
    }
}
function ReflectiveDependency_tsickle_Closure_declarations() {
    /** @type {?} */
    ReflectiveDependency.prototype.key;
    /** @type {?} */
    ReflectiveDependency.prototype.optional;
    /** @type {?} */
    ReflectiveDependency.prototype.visibility;
}
const /** @type {?} */ _EMPTY_LIST = [];
/**
 * An internal resolved representation of a {\@link Provider} used by the {\@link Injector}.
 *
 * It is usually created automatically by `Injector.resolveAndCreate`.
 *
 * It can be created manually, as follows:
 *
 * ### Example
 *
 * ```typescript
 * var resolvedProviders = Injector.resolve([{ provide: 'message', useValue: 'Hello' }]);
 * var injector = Injector.fromResolvedProviders(resolvedProviders);
 *
 * expect(injector.get('message')).toEqual('Hello');
 * ```
 *
 * \@experimental
 * @record
 */
export function ResolvedReflectiveProvider() { }
function ResolvedReflectiveProvider_tsickle_Closure_declarations() {
    /**
     * A key, usually a `Type<any>`.
     * @type {?}
     */
    ResolvedReflectiveProvider.prototype.key;
    /**
     * Factory function which can return an instance of an object represented by a key.
     * @type {?}
     */
    ResolvedReflectiveProvider.prototype.resolvedFactories;
    /**
     * Indicates if the provider is a multi-provider or a regular provider.
     * @type {?}
     */
    ResolvedReflectiveProvider.prototype.multiProvider;
}
export class ResolvedReflectiveProvider_ {
    /**
     * @param {?} key
     * @param {?} resolvedFactories
     * @param {?} multiProvider
     */
    constructor(key, resolvedFactories, multiProvider) {
        this.key = key;
        this.resolvedFactories = resolvedFactories;
        this.multiProvider = multiProvider;
        this.resolvedFactory = this.resolvedFactories[0];
    }
}
function ResolvedReflectiveProvider__tsickle_Closure_declarations() {
    /** @type {?} */
    ResolvedReflectiveProvider_.prototype.resolvedFactory;
    /** @type {?} */
    ResolvedReflectiveProvider_.prototype.key;
    /** @type {?} */
    ResolvedReflectiveProvider_.prototype.resolvedFactories;
    /** @type {?} */
    ResolvedReflectiveProvider_.prototype.multiProvider;
}
/**
 * An internal resolved representation of a factory function created by resolving {\@link
 * Provider}.
 * \@experimental
 */
export class ResolvedReflectiveFactory {
    /**
     * @param {?} factory
     * @param {?} dependencies
     */
    constructor(factory, dependencies) {
        this.factory = factory;
        this.dependencies = dependencies;
    }
}
function ResolvedReflectiveFactory_tsickle_Closure_declarations() {
    /**
     * Factory function which can return an instance of an object represented by a key.
     * @type {?}
     */
    ResolvedReflectiveFactory.prototype.factory;
    /**
     * Arguments (dependencies) to the `factory` function.
     * @type {?}
     */
    ResolvedReflectiveFactory.prototype.dependencies;
}
/**
 * Resolve a single provider.
 * @param {?} provider
 * @return {?}
 */
function resolveReflectiveFactory(provider) {
    let /** @type {?} */ factoryFn;
    let /** @type {?} */ resolvedDeps;
    if (provider.useClass) {
        const /** @type {?} */ useClass = resolveForwardRef(provider.useClass);
        factoryFn = reflector.factory(useClass);
        resolvedDeps = _dependenciesFor(useClass);
    }
    else if (provider.useExisting) {
        factoryFn = (aliasInstance) => aliasInstance;
        resolvedDeps = [ReflectiveDependency.fromKey(ReflectiveKey.get(provider.useExisting))];
    }
    else if (provider.useFactory) {
        factoryFn = provider.useFactory;
        resolvedDeps = constructDependencies(provider.useFactory, provider.deps);
    }
    else {
        factoryFn = () => provider.useValue;
        resolvedDeps = _EMPTY_LIST;
    }
    return new ResolvedReflectiveFactory(factoryFn, resolvedDeps);
}
/**
 * Converts the {\@link Provider} into {\@link ResolvedProvider}.
 *
 * {\@link Injector} internally only uses {\@link ResolvedProvider}, {\@link Provider} contains
 * convenience provider syntax.
 * @param {?} provider
 * @return {?}
 */
function resolveReflectiveProvider(provider) {
    return new ResolvedReflectiveProvider_(ReflectiveKey.get(provider.provide), [resolveReflectiveFactory(provider)], provider.multi || false);
}
/**
 * Resolve a list of Providers.
 * @param {?} providers
 * @return {?}
 */
export function resolveReflectiveProviders(providers) {
    const /** @type {?} */ normalized = _normalizeProviders(providers, []);
    const /** @type {?} */ resolved = normalized.map(resolveReflectiveProvider);
    const /** @type {?} */ resolvedProviderMap = mergeResolvedReflectiveProviders(resolved, new Map());
    return Array.from(resolvedProviderMap.values());
}
/**
 * Merges a list of ResolvedProviders into a list where
 * each key is contained exactly once and multi providers
 * have been merged.
 * @param {?} providers
 * @param {?} normalizedProvidersMap
 * @return {?}
 */
export function mergeResolvedReflectiveProviders(providers, normalizedProvidersMap) {
    for (let /** @type {?} */ i = 0; i < providers.length; i++) {
        const /** @type {?} */ provider = providers[i];
        const /** @type {?} */ existing = normalizedProvidersMap.get(provider.key.id);
        if (existing) {
            if (provider.multiProvider !== existing.multiProvider) {
                throw mixingMultiProvidersWithRegularProvidersError(existing, provider);
            }
            if (provider.multiProvider) {
                for (let /** @type {?} */ j = 0; j < provider.resolvedFactories.length; j++) {
                    existing.resolvedFactories.push(provider.resolvedFactories[j]);
                }
            }
            else {
                normalizedProvidersMap.set(provider.key.id, provider);
            }
        }
        else {
            let /** @type {?} */ resolvedProvider;
            if (provider.multiProvider) {
                resolvedProvider = new ResolvedReflectiveProvider_(provider.key, provider.resolvedFactories.slice(), provider.multiProvider);
            }
            else {
                resolvedProvider = provider;
            }
            normalizedProvidersMap.set(provider.key.id, resolvedProvider);
        }
    }
    return normalizedProvidersMap;
}
/**
 * @param {?} providers
 * @param {?} res
 * @return {?}
 */
function _normalizeProviders(providers, res) {
    providers.forEach(b => {
        if (b instanceof Type) {
            res.push({ provide: b, useClass: b });
        }
        else if (b && typeof b == 'object' && (/** @type {?} */ (b)).provide !== undefined) {
            res.push(/** @type {?} */ (b));
        }
        else if (b instanceof Array) {
            _normalizeProviders(b, res);
        }
        else {
            throw invalidProviderError(b);
        }
    });
    return res;
}
/**
 * @param {?} typeOrFunc
 * @param {?=} dependencies
 * @return {?}
 */
export function constructDependencies(typeOrFunc, dependencies) {
    if (!dependencies) {
        return _dependenciesFor(typeOrFunc);
    }
    else {
        const /** @type {?} */ params = dependencies.map(t => [t]);
        return dependencies.map(t => _extractToken(typeOrFunc, t, params));
    }
}
/**
 * @param {?} typeOrFunc
 * @return {?}
 */
function _dependenciesFor(typeOrFunc) {
    const /** @type {?} */ params = reflector.parameters(typeOrFunc);
    if (!params)
        return [];
    if (params.some(p => p == null)) {
        throw noAnnotationError(typeOrFunc, params);
    }
    return params.map(p => _extractToken(typeOrFunc, p, params));
}
/**
 * @param {?} typeOrFunc
 * @param {?} metadata
 * @param {?} params
 * @return {?}
 */
function _extractToken(typeOrFunc, metadata, params) {
    let /** @type {?} */ token = null;
    let /** @type {?} */ optional = false;
    if (!Array.isArray(metadata)) {
        if (metadata instanceof Inject) {
            return _createDependency(metadata.token, optional, null);
        }
        else {
            return _createDependency(metadata, optional, null);
        }
    }
    let /** @type {?} */ visibility = null;
    for (let /** @type {?} */ i = 0; i < metadata.length; ++i) {
        const /** @type {?} */ paramMetadata = metadata[i];
        if (paramMetadata instanceof Type) {
            token = paramMetadata;
        }
        else if (paramMetadata instanceof Inject) {
            token = paramMetadata.token;
        }
        else if (paramMetadata instanceof Optional) {
            optional = true;
        }
        else if (paramMetadata instanceof Self || paramMetadata instanceof SkipSelf) {
            visibility = paramMetadata;
        }
        else if (paramMetadata instanceof InjectionToken) {
            token = paramMetadata;
        }
    }
    token = resolveForwardRef(token);
    if (token != null) {
        return _createDependency(token, optional, visibility);
    }
    else {
        throw noAnnotationError(typeOrFunc, params);
    }
}
/**
 * @param {?} token
 * @param {?} optional
 * @param {?} visibility
 * @return {?}
 */
function _createDependency(token, optional, visibility) {
    return new ReflectiveDependency(ReflectiveKey.get(token), optional, visibility);
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVmbGVjdGl2ZV9wcm92aWRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvc3JjL2RpL3JlZmxlY3RpdmVfcHJvdmlkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFRQSxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFDbkQsT0FBTyxFQUFDLElBQUksRUFBQyxNQUFNLFNBQVMsQ0FBQztBQUU3QixPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDaEQsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBQ2pELE9BQU8sRUFBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUMsTUFBTSxZQUFZLENBQUM7QUFFNUQsT0FBTyxFQUFDLG9CQUFvQixFQUFFLDZDQUE2QyxFQUFFLGlCQUFpQixFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFDM0gsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLGtCQUFrQixDQUFDOzs7Ozs7Ozs7OztBQVUvQyxNQUFNOzs7Ozs7SUFDSixZQUNXLEtBQTJCLFFBQWlCLEVBQVMsVUFBOEI7UUFBbkYsUUFBRyxHQUFILEdBQUc7UUFBd0IsYUFBUSxHQUFSLFFBQVEsQ0FBUztRQUFTLGVBQVUsR0FBVixVQUFVLENBQW9CO0tBQUk7Ozs7O0lBRWxHLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBa0I7UUFDL0IsT0FBTyxJQUFJLG9CQUFvQixDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7S0FDbkQ7Q0FDRjs7Ozs7Ozs7O0FBRUQsdUJBQU0sV0FBVyxHQUFVLEVBQUUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFxQzlCLE1BQU07Ozs7OztJQUdKLFlBQ1csS0FBMkIsaUJBQThDLEVBQ3pFO1FBREEs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QUMsS0FBSyxDQUFDLENBQUM7SUFFakMsSUFBSSxLQUFLLElBQUksSUFBSSxFQUFFO1FBQ2pCLE9BQU8saUJBQWlCLENBQUMsS0FBSyxFQUFFLFFBQVEsRUFBRSxVQUFVLENBQUMsQ0FBQztLQUN2RDtTQUFNO1FBQ0wsTUFBTSxpQkFBaUIsQ0FBQyxVQUFVLEVBQUUsTUFBTSxDQUFDLENBQUM7S0FDN0M7Q0FDRjs7Ozs7OztBQUVELDJCQUNJLEtBQVUsRUFBRSxRQUFpQixFQUFFLFVBQWtDO0lBQ25FLE9BQU8sSUFBSSxvQkFBb0IsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLFFBQVEsRUFBRSxVQUFVLENBQUMsQ0FBQztDQUNqRiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtyZWZsZWN0b3J9IGZyb20gJy4uL3JlZmxlY3Rpb24vcmVmbGVjdGlvbic7XG5pbXBvcnQge1R5cGV9IGZyb20gJy4uL3R5cGUnO1xuXG5pbXBvcnQge3Jlc29sdmVGb3J3YXJkUmVmfSBmcm9tICcuL2ZvcndhcmRfcmVmJztcbmltcG9ydCB7SW5qZWN0aW9uVG9rZW59IGZyb20gJy4vaW5qZWN0aW9uX3Rva2VuJztcbmltcG9ydCB7SW5qZWN0LCBPcHRpb25hbCwgU2VsZiwgU2tpcFNlbGZ9IGZyb20gJy4vbWV0YWRhdGEnO1xuaW1wb3J0IHtDbGFzc1Byb3ZpZGVyLCBFeGlzdGluZ1Byb3ZpZGVyLCBGYWN0b3J5UHJvdmlkZXIsIFByb3ZpZGVyLCBUeXBlUHJvdmlkZXIsIFZhbHVlUHJvdmlkZXJ9IGZyb20gJy4vcHJvdmlkZXInO1xuaW1wb3J0IHtpbnZhbGlkUHJvdmlkZXJFcnJvciwgbWl4aW5nTXVsdGlQcm92aWRlcnNXaXRoUmVndWxhclByb3ZpZGVyc0Vycm9yLCBub0Fubm90YXRpb25FcnJvcn0gZnJvbSAnLi9yZWZsZWN0aXZlX2Vycm9ycyc7XG5pbXBvcnQge1JlZmxlY3RpdmVLZXl9IGZyb20gJy4vcmVmbGVjdGl2ZV9rZXknO1xuXG5cbmludGVyZmFjZSBOb3JtYWxpemVkUHJvdmlkZXIgZXh0ZW5kcyBUeXBlUHJvdmlkZXIsIFZhbHVlUHJvdmlkZXIsIENsYXNzUHJvdmlkZXIsIEV4aXN0aW5nUHJvdmlkZXIsXG4gICAgRmFjdG9yeVByb3ZpZGVyIHt9XG5cbi8qKlxuICogYERlcGVuZGVuY3lgIGlzIHVzZWQgYnkgdGhlIGZyYW1ld29yayB0byBleHRlbmQgREkuXG4gKiBUaGlzIGlzIGludGVybmFsIHRvIEFuZ3VsYXIgYW5kIHNob3VsZCBub3QgYmUgdXNlZCBkaXJlY3RseS5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlZmxlY3RpdmVEZXBlbmRlbmN5IHtcbiAgY29uc3RydWN0b3IoXG4gICAgICBwdWJsaWMga2V5OiBSZWZsZWN0aXZlS2V5LCBwdWJsaWMgb3B0aW9uYWw6IGJvb2xlYW4sIHB1YmxpYyB2aXNpYmlsaXR5OiBTZWxmfFNraXBTZWxmfG51bGwpIHt9XG5cbiAgc3RhdGljIGZyb21LZXkoa2V5OiBSZWZsZWN0aXZlS2V5KTogUmVmbGVjdGl2ZURlcGVuZGVuY3kge1xuICAgIHJldHVybiBuZXcgUmVmbGVjdGl2ZURlcGVuZGVuY3koa2V5LCBmYWxzZSwgbnVsbCk7XG4gIH1cbn1cblxuY29uc3QgX0VNUFRZX0xJU1Q6IGFueVtdID0gW107XG5cbi8qKlxuICogQW4gaW50ZXJuYWwgcmVzb2x2ZWQgcmVwcmVzZW50YXRpb24gb2YgYSB7QGxpbmsgUHJvdmlkZXJ9IHVzZWQgYnkgdGhlIHtAbGluayBJbmplY3Rvcn0uXG4gKlxuICogSXQgaXMgdXN1YWxseSBjcmVhdGVkIGF1dG9tYXRpY2FsbHkgYnkgYEluamVjdG9yLnJlc29sdmVBbmRDcmVhdGVgLlxuICpcbiAqIEl0IGNhbiBiZSBjcmVhdGVkIG1hbnVhbGx5LCBhcyBmb2xsb3dzOlxuICpcbiAqICMjIyBFeGFtcGxlXG4gKlxuICogYGBgdHlwZXNjcmlwdFxuICogdmFyIHJlc29sdmVkUHJvdmlkZXJzID0gSW5qZWN0b3IucmVzb2x2ZShbeyBwcm92aWRlOiAnbWVzc2FnZScsIHVzZVZhbHVlOiAnSGVsbG8nIH1dKTtcbiAqIHZhciBpbmplY3RvciA9IEluamVjdG9yLmZyb21SZXNvbHZlZFByb3ZpZGVycyhyZXNvbHZlZFByb3ZpZGVycyk7XG4gKlxuICogZXhwZWN0KGluamVjdG9yLmdldCgnbWVzc2FnZScpKS50b0VxdWFsKCdIZWxsbycpO1xuICogYGBgXG4gKlxuICogQGV4cGVyaW1lbnRhbFxuICovXG5leHBvcnQgaW50ZXJmYWNlIFJlc29sdmVkUmVmbGVjdGl2ZVByb3ZpZGVyIHtcbiAgLyoqXG4gICAqIEEga2V5LCB1c3VhbGx5IGEgYFR5cGU8YW55PmAuXG4gICAqL1xuICBrZXk6IFJlZmxlY3RpdmVLZXk7XG5cbiAgLyoqXG4gICAqIEZhY3RvcnkgZnVuY3Rpb24gd2hpY2ggY2FuIHJldHVybiBhbiBpbnN0YW5jZSBvZiBhbiBvYmplY3QgcmVwcmVzZW50ZWQgYnkgYSBrZXkuXG4gICAqL1xuICByZXNvbHZlZEZhY3RvcmllczogUmVzb2x2ZWRSZWZsZWN0aXZlRmFjdG9yeVtdO1xuXG4gIC8qKlxuICAgKiBJbmRpY2F0ZXMgaWYgdGhlIHByb3ZpZGVyIGlzIGEgbXVsdGktcHJvdmlkZXIgb3IgYSByZWd1bGFyIHByb3ZpZGVyLlxuICAgKi9cbiAgbXVsdGlQcm92aWRlcjogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGNsYXNzIFJlc29sdmVkUmVmbGVjdGl2ZVByb3ZpZGVyXyBpbXBsZW1lbnRzIFJlc29sdmVkUmVmbGVjdGl2ZVByb3ZpZGVyIHtcbiAgcmVhZG9ubHkgcmVzb2x2ZWRGYWN0b3J5OiBSZXNvbHZlZFJlZmxlY3RpdmVGYWN0b3J5O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHVibGljIGtleTogUmVmbGVjdGl2ZUtleSwgcHVibGljIHJlc29sdmVkRmFjdG9yaWVzOiBSZXNvbHZlZFJlZmxlY3RpdmVGYWN0b3J5W10sXG4gICAgICBwdWJsaWMgbXVsdGlQcm92aWRlcjogYm9vbGVhbikge1xuICAgIHRoaXMucmVzb2x2ZWRGYWN0b3J5ID0gdGhpcy5yZXNvbHZlZEZhY3Rvcmllc1swXTtcbiAgfVxufVxuXG4vKipcbiAqIEFuIGludGVybmFsIHJlc29sdmVkIHJlcHJlc2VudGF0aW9uIG9mIGEgZmFjdG9yeSBmdW5jdGlvbiBjcmVhdGVkIGJ5IHJlc29sdmluZyB7QGxpbmtcbiAqIFByb3ZpZGVyfS5cbiAqIEBleHBlcmltZW50YWxcbiAqL1xuZXhwb3J0IGNsYXNzIFJlc29sdmVkUmVmbGVjdGl2ZUZhY3Rvcnkge1xuICBjb25zdHJ1Y3RvcihcbiAgICAgIC8qKlxuICAgICAgICogRmFjdG9yeSBmdW5jdGlvbiB3aGljaCBjYW4gcmV0dXJuIGFuIGluc3RhbmNlIG9mIGFuIG9iamVjdCByZXByZXNlbnRlZCBieSBhIGtleS5cbiAgICAgICAqL1xuICAgICAgcHVibGljIGZhY3Rvcnk6IEZ1bmN0aW9uLFxuXG4gICAgICAvKipcbiAgICAgICAqIEFyZ3VtZW50cyAoZGVwZW5kZW5jaWVzKSB0byB0aGUgYGZhY3RvcnlgIGZ1bmN0aW9uLlxuICAgICAgICovXG4gICAgICBwdWJsaWMgZGVwZW5kZW5jaWVzOiBSZWZsZWN0aXZlRGVwZW5kZW5jeVtdKSB7fVxufVxuXG5cbi8qKlxuICogUmVzb2x2ZSBhIHNpbmdsZSBwcm92aWRlci5cbiAqL1xuZnVuY3Rpb24gcmVzb2x2ZVJlZmxlY3RpdmVGYWN0b3J5KHByb3ZpZGVyOiBOb3JtYWxpemVkUHJvdmlkZXIpOiBSZXNvbHZlZFJlZmxlY3RpdmVGYWN0b3J5IHtcbiAgbGV0IGZhY3RvcnlGbjogRnVuY3Rpb247XG4gIGxldCByZXNvbHZlZERlcHM6IFJlZmxlY3RpdmVEZXBlbmRlbmN5W107XG4gIGlmIChwcm92aWRlci51c2VDbGFzcykge1xuICAgIGNvbnN0IHVzZUNsYXNzID0gcmVzb2x2ZUZvcndhcmRSZWYocHJvdmlkZXIudXNlQ2xhc3MpO1xuICAgIGZhY3RvcnlGbiA9IHJlZmxlY3Rvci5mYWN0b3J5KHVzZUNsYXNzKTtcbiAgICByZXNvbHZlZERlcHMgPSBfZGVwZW5kZW5jaWVzRm9yKHVzZUNsYXNzKTtcbiAgfSBlbHNlIGlmIChwcm92aWRlci51c2VFeGlzdGluZykge1xuICAgIGZhY3RvcnlGbiA9IChhbGlhc0luc3RhbmNlOiBhbnkpID0+IGFsaWFzSW5zdGFuY2U7XG4gICAgcmVzb2x2ZWREZXBzID0gW1JlZmxlY3RpdmVEZXBlbmRlbmN5LmZyb21LZXkoUmVmbGVjdGl2ZUtleS5nZXQocHJvdmlkZXIudXNlRXhpc3RpbmcpKV07XG4gIH0gZWxzZSBpZiAocHJvdmlkZXIudXNlRmFjdG9yeSkge1xuICAgIGZhY3RvcnlGbiA9IHByb3ZpZGVyLnVzZUZhY3Rvcnk7XG4gICAgcmVzb2x2ZWREZXBzID0gY29uc3RydWN0RGVwZW5kZW5jaWVzKHByb3ZpZGVyLnVzZUZhY3RvcnksIHByb3ZpZGVyLmRlcHMpO1xuICB9IGVsc2Uge1xuICAgIGZhY3RvcnlGbiA9ICgpID0+IHByb3ZpZGVyLnVzZVZhbHVlO1xuICAgIHJlc29sdmVkRGVwcyA9IF9FTVBUWV9MSVNUO1xuICB9XG4gIHJldHVybiBuZXcgUmVzb2x2ZWRSZWZsZWN0aXZlRmFjdG9yeShmYWN0b3J5Rm4sIHJlc29sdmVkRGVwcyk7XG59XG5cbi8qKlxuICogQ29udmVydHMgdGhlIHtAbGluayBQcm92aWRlcn0gaW50byB7QGxpbmsgUmVzb2x2ZWRQcm92aWRlcn0uXG4gKlxuICoge0BsaW5rIEluamVjdG9yfSBpbnRlcm5hbGx5IG9ubHkgdXNlcyB7QGxpbmsgUmVzb2x2ZWRQcm92aWRlcn0sIHtAbGluayBQcm92aWRlcn0gY29udGFpbnNcbiAqIGNvbnZlbmllbmNlIHByb3ZpZGVyIHN5bnRheC5cbiAqL1xuZnVuY3Rpb24gcmVzb2x2ZVJlZmxlY3RpdmVQcm92aWRlcihwcm92aWRlcjogTm9ybWFsaXplZFByb3ZpZGVyKTogUmVzb2x2ZWRSZWZsZWN0aXZlUHJvdmlkZXIge1xuICByZXR1cm4gbmV3IFJlc29sdmVkUmVmbGVjdGl2ZVByb3ZpZGVyXyhcbiAgICAgIFJlZmxlY3RpdmVLZXkuZ2V0KHByb3ZpZGVyLnByb3ZpZGUpLCBbcmVzb2x2ZVJlZmxlY3RpdmVGYWN0b3J5KHByb3ZpZGVyKV0sXG4gICAgICBwcm92aWRlci5tdWx0aSB8fCBmYWxzZSk7XG59XG5cbi8qKlxuICogUmVzb2x2ZSBhIGxpc3Qgb2YgUHJvdmlkZXJzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVzb2x2ZVJlZmxlY3RpdmVQcm92aWRlcnMocHJvdmlkZXJzOiBQcm92aWRlcltdKTogUmVzb2x2ZWRSZWZsZWN0aXZlUHJvdmlkZXJbXSB7XG4gIGNvbnN0IG5vcm1hbGl6ZWQgPSBfbm9ybWFsaXplUHJvdmlkZXJzKHByb3ZpZGVycywgW10pO1xuICBjb25zdCByZXNvbHZlZCA9IG5vcm1hbGl6ZWQubWFwKHJlc29sdmVSZWZsZWN0aXZlUHJvdmlkZXIpO1xuICBjb25zdCByZXNvbHZlZFByb3ZpZGVyTWFwID0gbWVyZ2VSZXNvbHZlZFJlZmxlY3RpdmVQcm92aWRlcnMocmVzb2x2ZWQsIG5ldyBNYXAoKSk7XG4gIHJldHVybiBBcnJheS5mcm9tKHJlc29sdmVkUHJvdmlkZXJNYXAudmFsdWVzKCkpO1xufVxuXG4vKipcbiAqIE1lcmdlcyBhIGxpc3Qgb2YgUmVzb2x2ZWRQcm92aWRlcnMgaW50byBhIGxpc3Qgd2hlcmVcbiAqIGVhY2gga2V5IGlzIGNvbnRhaW5lZCBleGFjdGx5IG9uY2UgYW5kIG11bHRpIHByb3ZpZGVyc1xuICogaGF2ZSBiZWVuIG1lcmdlZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1lcmdlUmVzb2x2ZWRSZWZsZWN0aXZlUHJvdmlkZXJzKFxuICAgIHByb3ZpZGVyczogUmVzb2x2ZWRSZWZsZWN0aXZlUHJvdmlkZXJbXSxcbiAgICBub3JtYWxpemVkUHJvdmlkZXJzTWFwOiBNYXA8bnVtYmVyLCBSZXNvbHZlZFJlZmxlY3RpdmVQcm92aWRlcj4pOlxuICAgIE1hcDxudW1iZXIsIFJlc29sdmVkUmVmbGVjdGl2ZVByb3ZpZGVyPiB7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvdmlkZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgcHJvdmlkZXIgPSBwcm92aWRlcnNbaV07XG4gICAgY29uc3QgZXhpc3RpbmcgPSBub3JtYWxpemVkUHJvdmlkZXJzTWFwLmdldChwcm92aWRlci5rZXkuaWQpO1xuICAgIGlmIChleGlzdGluZykge1xuICAgICAgaWYgKHByb3ZpZGVyLm11bHRpUHJvdmlkZXIgIT09IGV4aXN0aW5nLm11bHRpUHJvdmlkZXIpIHtcbiAgICAgICAgdGhyb3cgbWl4aW5nTXVsdGlQcm92aWRlcnNXaXRoUmVndWxhclByb3ZpZGVyc0Vycm9yKGV4aXN0aW5nLCBwcm92aWRlcik7XG4gICAgICB9XG4gICAgICBpZiAocHJvdmlkZXIubXVsdGlQcm92aWRlcikge1xuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHByb3ZpZGVyLnJlc29sdmVkRmFjdG9yaWVzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgZXhpc3RpbmcucmVzb2x2ZWRGYWN0b3JpZXMucHVzaChwcm92aWRlci5yZXNvbHZlZEZhY3Rvcmllc1tqXSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG5vcm1hbGl6ZWRQcm92aWRlcnNNYXAuc2V0KHByb3ZpZGVyLmtleS5pZCwgcHJvdmlkZXIpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgcmVzb2x2ZWRQcm92aWRlcjogUmVzb2x2ZWRSZWZsZWN0aXZlUHJvdmlkZXI7XG4gICAgICBpZiAocHJvdmlkZXIubXVsdGlQcm92aWRlcikge1xuICAgICAgICByZXNvbHZlZFByb3ZpZGVyID0gbmV3IFJlc29sdmVkUmVmbGVjdGl2ZVByb3ZpZGVyXyhcbiAgICAgICAgICAgIHByb3ZpZGVyLmtleSwgcHJvdmlkZXIucmVzb2x2ZWRGYWN0b3JpZXMuc2xpY2UoKSwgcHJvdmlkZXIubXVsdGlQcm92aWRlcik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXNvbHZlZFByb3ZpZGVyID0gcHJvdmlkZXI7XG4gICAgICB9XG4gICAgICBub3JtYWxpemVkUHJvdmlkZXJzTWFwLnNldChwcm92aWRlci5rZXkuaWQsIHJlc29sdmVkUHJvdmlkZXIpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbm9ybWFsaXplZFByb3ZpZGVyc01hcDtcbn1cblxuZnVuY3Rpb24gX25vcm1hbGl6ZVByb3ZpZGVycyhwcm92aWRlcnM6IFByb3ZpZGVyW10sIHJlczogUHJvdmlkZXJbXSk6IFByb3ZpZGVyW10ge1xuICBwcm92aWRlcnMuZm9yRWFjaChiID0+IHtcbiAgICBpZiAoYiBpbnN0YW5jZW9mIFR5cGUpIHtcbiAgICAgIHJlcy5wdXNoKHtwcm92aWRlOiBiLCB1c2VDbGFzczogYn0pO1xuXG4gICAgfSBlbHNlIGlmIChiICYmIHR5cGVvZiBiID09ICdvYmplY3QnICYmIChiIGFzIGFueSkucHJvdmlkZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXMucHVzaChiIGFzIE5vcm1hbGl6ZWRQcm92aWRlcik7XG5cbiAgICB9IGVsc2UgaWYgKGIgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgX25vcm1hbGl6ZVByb3ZpZGVycyhiLCByZXMpO1xuXG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IGludmFsaWRQcm92aWRlckVycm9yKGIpO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIHJlcztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvbnN0cnVjdERlcGVuZGVuY2llcyhcbiAgICB0eXBlT3JGdW5jOiBhbnksIGRlcGVuZGVuY2llcz86IGFueVtdKTogUmVmbGVjdGl2ZURlcGVuZGVuY3lbXSB7XG4gIGlmICghZGVwZW5kZW5jaWVzKSB7XG4gICAgcmV0dXJuIF9kZXBlbmRlbmNpZXNGb3IodHlwZU9yRnVuYyk7XG4gIH0gZWxzZSB7XG4gICAgY29uc3QgcGFyYW1zOiBhbnlbXVtdID0gZGVwZW5kZW5jaWVzLm1hcCh0ID0+IFt0XSk7XG4gICAgcmV0dXJuIGRlcGVuZGVuY2llcy5tYXAodCA9PiBfZXh0cmFjdFRva2VuKHR5cGVPckZ1bmMsIHQsIHBhcmFtcykpO1xuICB9XG59XG5cbmZ1bmN0aW9uIF9kZXBlbmRlbmNpZXNGb3IodHlwZU9yRnVuYzogYW55KTogUmVmbGVjdGl2ZURlcGVuZGVuY3lbXSB7XG4gIGNvbnN0IHBhcmFtcyA9IHJlZmxlY3Rvci5wYXJhbWV0ZXJzKHR5cGVPckZ1bmMpO1xuXG4gIGlmICghcGFyYW1zKSByZXR1cm4gW107XG4gIGlmIChwYXJhbXMuc29tZShwID0+IHAgPT0gbnVsbCkpIHtcbiAgICB0aHJvdyBub0Fubm90YXRpb25FcnJvcih0eXBlT3JGdW5jLCBwYXJhbXMpO1xuICB9XG4gIHJldHVybiBwYXJhbXMubWFwKHAgPT4gX2V4dHJhY3RUb2tlbih0eXBlT3JGdW5jLCBwLCBwYXJhbXMpKTtcbn1cblxuZnVuY3Rpb24gX2V4dHJhY3RUb2tlbihcbiAgICB0eXBlT3JGdW5jOiBhbnksIG1ldGFkYXRhOiBhbnlbXSB8IGFueSwgcGFyYW1zOiBhbnlbXVtdKTogUmVmbGVjdGl2ZURlcGVuZGVuY3kge1xuICBsZXQgdG9rZW46IGFueSA9IG51bGw7XG4gIGxldCBvcHRpb25hbCA9IGZhbHNlO1xuXG4gIGlmICghQXJyYXkuaXNBcnJheShtZXRhZGF0YSkpIHtcbiAgICBpZiAobWV0YWRhdGEgaW5zdGFuY2VvZiBJbmplY3QpIHtcbiAgICAgIHJldHVybiBfY3JlYXRlRGVwZW5kZW5jeShtZXRhZGF0YS50b2tlbiwgb3B0aW9uYWwsIG51bGwpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gX2NyZWF0ZURlcGVuZGVuY3kobWV0YWRhdGEsIG9wdGlvbmFsLCBudWxsKTtcbiAgICB9XG4gIH1cblxuICBsZXQgdmlzaWJpbGl0eTogU2VsZnxTa2lwU2VsZnxudWxsID0gbnVsbDtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IG1ldGFkYXRhLmxlbmd0aDsgKytpKSB7XG4gICAgY29uc3QgcGFyYW1NZXRhZGF0YSA9IG1ldGFkYXRhW2ldO1xuXG4gICAgaWYgKHBhcmFtTWV0YWRhdGEgaW5zdGFuY2VvZiBUeXBlKSB7XG4gICAgICB0b2tlbiA9IHBhcmFtTWV0YWRhdGE7XG5cbiAgICB9IGVsc2UgaWYgKHBhcmFtTWV0YWRhdGEgaW5zdGFuY2VvZiBJbmplY3QpIHtcbiAgICAgIHRva2VuID0gcGFyYW1NZXRhZGF0YS50b2tlbjtcblxuICAgIH0gZWxzZSBpZiAocGFyYW1NZXRhZGF0YSBpbnN0YW5jZW9mIE9wdGlvbmFsKSB7XG4gICAgICBvcHRpb25hbCA9IHRydWU7XG5cbiAgICB9IGVsc2UgaWYgKHBhcmFtTWV0YWRhdGEgaW5zdGFuY2VvZiBTZWxmIHx8IHBhcmFtTWV0YWRhdGEgaW5zdGFuY2VvZiBTa2lwU2VsZikge1xuICAgICAgdmlzaWJpbGl0eSA9IHBhcmFtTWV0YWRhdGE7XG4gICAgfSBlbHNlIGlmIChwYXJhbU1ldGFkYXRhIGluc3RhbmNlb2YgSW5qZWN0aW9uVG9rZW4pIHtcbiAgICAgIHRva2VuID0gcGFyYW1NZXRhZGF0YTtcbiAgICB9XG4gIH1cblxuICB0b2tlbiA9IHJlc29sdmVGb3J3YXJkUmVmKHRva2VuKTtcblxuICBpZiAodG9rZW4gIT0gbnVsbCkge1xuICAgIHJldHVybiBfY3JlYXRlRGVwZW5kZW5jeSh0b2tlbiwgb3B0aW9uYWwsIHZpc2liaWxpdHkpO1xuICB9IGVsc2Uge1xuICAgIHRocm93IG5vQW5ub3RhdGlvbkVycm9yKHR5cGVPckZ1bmMsIHBhcmFtcyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gX2NyZWF0ZURlcGVuZGVuY3koXG4gICAgdG9rZW46IGFueSwgb3B0aW9uYWw6IGJvb2xlYW4sIHZpc2liaWxpdHk6IFNlbGYgfCBTa2lwU2VsZiB8IG51bGwpOiBSZWZsZWN0aXZlRGVwZW5kZW5jeSB7XG4gIHJldHVybiBuZXcgUmVmbGVjdGl2ZURlcGVuZGVuY3koUmVmbGVjdGl2ZUtleS5nZXQodG9rZW4pLCBvcHRpb25hbCwgdmlzaWJpbGl0eSk7XG59XG4iXX0=