/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { identifierName } from '../compile_metadata';
import * as o from '../output/output_ast';
import { error } from '../util';
import { compileFactoryFunction, dependenciesFromGlobalMetadata } from './r3_factory';
import { Identifiers as R3 } from './r3_identifiers';
/**
 * Write a pipe definition to the output context.
 */
export function compilePipe(outputCtx, pipe, reflector) {
    const definitionMapValues = [];
    // e.g. `name: 'myPipe'`
    definitionMapValues.push({ key: 'name', value: o.literal(pipe.name), quoted: false });
    // e.g. `type: MyPipe`
    definitionMapValues.push({ key: 'type', value: outputCtx.importExpr(pipe.type.reference), quoted: false });
    // e.g. `factory: function MyPipe_Factory() { return new MyPipe(); }`
    const deps = dependenciesFromGlobalMetadata(pipe.type, outputCtx, reflector);
    const templateFactory = compileFactoryFunction({
        name: identifierName(pipe.type),
        fnOrClass: outputCtx.importExpr(pipe.type.reference), deps,
        useNew: true,
        injectFn: R3.directiveInject,
        useOptionalParam: false,
    });
    definitionMapValues.push({ key: 'factory', value: templateFactory, quoted: false });
    // e.g. `pure: true`
    if (pipe.pure) {
        definitionMapValues.push({ key: 'pure', value: o.literal(true), quoted: false });
    }
    const className = identifierName(pipe.type);
    className || error(`Cannot resolve the name of ${pipe.type}`);
    const definitionField = outputCtx.constantPool.propertyNameOf(3 /* Pipe */);
    const definitionFunction = o.importExpr(R3.definePipe).callFn([o.literalMap(definitionMapValues)]);
    outputCtx.statements.push(new o.ClassStmt(
    /* name */ className, 
    /* parent */ null, 
    /* fields */ [new o.ClassField(
        /* name */ definitionField, 
        /* type */ o.INFERRED_TYPE, 
        /* modifiers */ [o.StmtModifier.Static], 
        /* initializer */ definitionFunction)], 
    /* getters */ [], 
    /* constructorMethod */ new o.ClassMethod(null, [], []), 
    /* methods */ []));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicjNfcGlwZV9jb21waWxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvbXBpbGVyL3NyYy9yZW5kZXIzL3IzX3BpcGVfY29tcGlsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFzQixjQUFjLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUd4RSxPQUFPLEtBQUssQ0FBQyxNQUFNLHNCQUFzQixDQUFDO0FBQzFDLE9BQU8sRUFBZ0IsS0FBSyxFQUFDLE1BQU0sU0FBUyxDQUFDO0FBRTdDLE9BQU8sRUFBQyxzQkFBc0IsRUFBRSw4QkFBOEIsRUFBQyxNQUFNLGNBQWMsQ0FBQztBQUNwRixPQUFPLEVBQUMsV0FBVyxJQUFJLEVBQUUsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBR25EOztHQUVHO0FBQ0gsTUFBTSxzQkFDRixTQUF3QixFQUFFLElBQXlCLEVBQUUsU0FBMkI7SUFDbEYsTUFBTSxtQkFBbUIsR0FBMEQsRUFBRSxDQUFDO0lBRXRGLHdCQUF3QjtJQUN4QixtQkFBbUIsQ0FBQyxJQUFJLENBQUMsRUFBQyxHQUFHLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFDLENBQUMsQ0FBQztJQUVwRixzQkFBc0I7SUFDdEIsbUJBQW1CLENBQUMsSUFBSSxDQUNwQixFQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLFNBQVMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFDLENBQUMsQ0FBQztJQUVwRixxRUFBcUU7SUFDckUsTUFBTSxJQUFJLEdBQUcsOEJBQThCLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDN0UsTUFBTSxlQUFlLEdBQUcsc0JBQXNCLENBQUM7UUFDN0MsSUFBSSxFQUFFLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFHO1FBQ2pDLFNBQVMsRUFBRSxTQUFTLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsSUFBSTtRQUMxRCxNQUFNLEVBQUUsSUFBSTtRQUNaLFFBQVEsRUFBRSxFQUFFLENBQUMsZUFBZTtRQUM1QixnQkFBZ0IsRUFBRSxLQUFLO0tBQ3hCLENBQUMsQ0FBQztJQUNILG1CQUFtQixDQUFDLElBQUksQ0FBQyxFQUFDLEdBQUcsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLGVBQWUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFDLENBQUMsQ0FBQztJQUVsRixvQkFBb0I7SUFDcEIsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFO1FBQ2IsbUJBQW1CLENBQUMsSUFBSSxDQUFDLEVBQUMsR0FBRyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFDLENBQUMsQ0FBQztLQUNoRjtJQUVELE1BQU0sU0FBUyxHQUFHLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFHLENBQUM7SUFDOUMsU0FBUyxJQUFJLEtBQUssQ0FBQyw4QkFBOEIsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7SUFFOUQsTUFBTSxlQUFlLEdBQUcsU0FBUyxDQUFDLFlBQVksQ0FBQyxjQUFjLGNBQXFCLENBQUM7SUFDbkYsTUFBTSxrQkFBa0IsR0FDcEIsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUU1RSxTQUFTLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTO0lBQ3JDLFVBQVUsQ0FBQyxTQUFTO0lBQ3BCLFlBQVksQ0FBQyxJQUFJO0lBQ2pCLFlBQVksQ0FBQSxDQUFDLElBQUksQ0FBQyxDQUFDLFVBQVU7UUFDekIsVUFBVSxDQUFDLGVBQWU7UUFDMUIsVUFBVSxDQUFDLENBQUMsQ0FBQyxhQUFhO1FBQzFCLGVBQWUsQ0FBQSxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDO1FBQ3RDLGlCQUFpQixDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFDMUMsYUFBYSxDQUFBLEVBQUU7SUFDZix1QkFBdUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDdkQsYUFBYSxDQUFBLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDeEIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtDb21waWxlUGlwZU1ldGFkYXRhLCBpZGVudGlmaWVyTmFtZX0gZnJvbSAnLi4vY29tcGlsZV9tZXRhZGF0YSc7XG5pbXBvcnQge0NvbXBpbGVSZWZsZWN0b3J9IGZyb20gJy4uL2NvbXBpbGVfcmVmbGVjdG9yJztcbmltcG9ydCB7RGVmaW5pdGlvbktpbmR9IGZyb20gJy4uL2NvbnN0YW50X3Bvb2wnO1xuaW1wb3J0ICogYXMgbyBmcm9tICcuLi9vdXRwdXQvb3V0cHV0X2FzdCc7XG5pbXBvcnQge091dHB1dENvbnRleHQsIGVycm9yfSBmcm9tICcuLi91dGlsJztcblxuaW1wb3J0IHtjb21waWxlRmFjdG9yeUZ1bmN0aW9uLCBkZXBlbmRlbmNpZXNGcm9tR2xvYmFsTWV0YWRhdGF9IGZyb20gJy4vcjNfZmFjdG9yeSc7XG5pbXBvcnQge0lkZW50aWZpZXJzIGFzIFIzfSBmcm9tICcuL3IzX2lkZW50aWZpZXJzJztcblxuXG4vKipcbiAqIFdyaXRlIGEgcGlwZSBkZWZpbml0aW9uIHRvIHRoZSBvdXRwdXQgY29udGV4dC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvbXBpbGVQaXBlKFxuICAgIG91dHB1dEN0eDogT3V0cHV0Q29udGV4dCwgcGlwZTogQ29tcGlsZVBpcGVNZXRhZGF0YSwgcmVmbGVjdG9yOiBDb21waWxlUmVmbGVjdG9yKSB7XG4gIGNvbnN0IGRlZmluaXRpb25NYXBWYWx1ZXM6IHtrZXk6IHN0cmluZywgcXVvdGVkOiBib29sZWFuLCB2YWx1ZTogby5FeHByZXNzaW9ufVtdID0gW107XG5cbiAgLy8gZS5nLiBgbmFtZTogJ215UGlwZSdgXG4gIGRlZmluaXRpb25NYXBWYWx1ZXMucHVzaCh7a2V5OiAnbmFtZScsIHZhbHVlOiBvLmxpdGVyYWwocGlwZS5uYW1lKSwgcXVvdGVkOiBmYWxzZX0pO1xuXG4gIC8vIGUuZy4gYHR5cGU6IE15UGlwZWBcbiAgZGVmaW5pdGlvbk1hcFZhbHVlcy5wdXNoKFxuICAgICAge2tleTogJ3R5cGUnLCB2YWx1ZTogb3V0cHV0Q3R4LmltcG9ydEV4cHIocGlwZS50eXBlLnJlZmVyZW5jZSksIHF1b3RlZDogZmFsc2V9KTtcblxuICAvLyBlLmcuIGBmYWN0b3J5OiBmdW5jdGlvbiBNeVBpcGVfRmFjdG9yeSgpIHsgcmV0dXJuIG5ldyBNeVBpcGUoKTsgfWBcbiAgY29uc3QgZGVwcyA9IGRlcGVuZGVuY2llc0Zyb21HbG9iYWxNZXRhZGF0YShwaXBlLnR5cGUsIG91dHB1dEN0eCwgcmVmbGVjdG9yKTtcbiAgY29uc3QgdGVtcGxhdGVGYWN0b3J5ID0gY29tcGlsZUZhY3RvcnlGdW5jdGlvbih7XG4gICAgbmFtZTogaWRlbnRpZmllck5hbWUocGlwZS50eXBlKSAhLFxuICAgIGZuT3JDbGFzczogb3V0cHV0Q3R4LmltcG9ydEV4cHIocGlwZS50eXBlLnJlZmVyZW5jZSksIGRlcHMsXG4gICAgdXNlTmV3OiB0cnVlLFxuICAgIGluamVjdEZuOiBSMy5kaXJlY3RpdmVJbmplY3QsXG4gICAgdXNlT3B0aW9uYWxQYXJhbTogZmFsc2UsXG4gIH0pO1xuICBkZWZpbml0aW9uTWFwVmFsdWVzLnB1c2goe2tleTogJ2ZhY3RvcnknLCB2YWx1ZTogdGVtcGxhdGVGYWN0b3J5LCBxdW90ZWQ6IGZhbHNlfSk7XG5cbiAgLy8gZS5nLiBgcHVyZTogdHJ1ZWBcbiAgaWYgKHBpcGUucHVyZSkge1xuICAgIGRlZmluaXRpb25NYXBWYWx1ZXMucHVzaCh7a2V5OiAncHVyZScsIHZhbHVlOiBvLmxpdGVyYWwodHJ1ZSksIHF1b3RlZDogZmFsc2V9KTtcbiAgfVxuXG4gIGNvbnN0IGNsYXNzTmFtZSA9IGlkZW50aWZpZXJOYW1lKHBpcGUudHlwZSkgITtcbiAgY2xhc3NOYW1lIHx8IGVycm9yKGBDYW5ub3QgcmVzb2x2ZSB0aGUgbmFtZSBvZiAke3BpcGUudHlwZX1gKTtcblxuICBjb25zdCBkZWZpbml0aW9uRmllbGQgPSBvdXRwdXRDdHguY29uc3RhbnRQb29sLnByb3BlcnR5TmFtZU9mKERlZmluaXRpb25LaW5kLlBpcGUpO1xuICBjb25zdCBkZWZpbml0aW9uRnVuY3Rpb24gPVxuICAgICAgby5pbXBvcnRFeHByKFIzLmRlZmluZVBpcGUpLmNhbGxGbihbby5saXRlcmFsTWFwKGRlZmluaXRpb25NYXBWYWx1ZXMpXSk7XG5cbiAgb3V0cHV0Q3R4LnN0YXRlbWVudHMucHVzaChuZXcgby5DbGFzc1N0bXQoXG4gICAgICAvKiBuYW1lICovIGNsYXNzTmFtZSxcbiAgICAgIC8qIHBhcmVudCAqLyBudWxsLFxuICAgICAgLyogZmllbGRzICovW25ldyBvLkNsYXNzRmllbGQoXG4gICAgICAgICAgLyogbmFtZSAqLyBkZWZpbml0aW9uRmllbGQsXG4gICAgICAgICAgLyogdHlwZSAqLyBvLklORkVSUkVEX1RZUEUsXG4gICAgICAgICAgLyogbW9kaWZpZXJzICovW28uU3RtdE1vZGlmaWVyLlN0YXRpY10sXG4gICAgICAgICAgLyogaW5pdGlhbGl6ZXIgKi8gZGVmaW5pdGlvbkZ1bmN0aW9uKV0sXG4gICAgICAvKiBnZXR0ZXJzICovW10sXG4gICAgICAvKiBjb25zdHJ1Y3Rvck1ldGhvZCAqLyBuZXcgby5DbGFzc01ldGhvZChudWxsLCBbXSwgW10pLFxuICAgICAgLyogbWV0aG9kcyAqL1tdKSk7XG59Il19