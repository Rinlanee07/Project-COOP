
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model RepairRequest
 * 
 */
export type RepairRequest = $Result.DefaultSelection<Prisma.$RepairRequestPayload>
/**
 * Model RepairImage
 * 
 */
export type RepairImage = $Result.DefaultSelection<Prisma.$RepairImagePayload>
/**
 * Model RepairDetail
 * 
 */
export type RepairDetail = $Result.DefaultSelection<Prisma.$RepairDetailPayload>
/**
 * Model RepairPart
 * 
 */
export type RepairPart = $Result.DefaultSelection<Prisma.$RepairPartPayload>
/**
 * Model Shipping
 * 
 */
export type Shipping = $Result.DefaultSelection<Prisma.$ShippingPayload>
/**
 * Model CloseRepair
 * 
 */
export type CloseRepair = $Result.DefaultSelection<Prisma.$CloseRepairPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Role: {
  MEMBER: 'MEMBER',
  SHOP: 'SHOP',
  TECHNICIAN: 'TECHNICIAN',
  ADMIN: 'ADMIN'
};

export type Role = (typeof Role)[keyof typeof Role]


export const RepairStatus: {
  PENDING: 'PENDING',
  IN_PROGRESS: 'IN_PROGRESS',
  WAITING_PARTS: 'WAITING_PARTS',
  WAITING_CONFIRM: 'WAITING_CONFIRM',
  COMPLETED: 'COMPLETED',
  SHIPPED: 'SHIPPED',
  CLOSED: 'CLOSED'
};

export type RepairStatus = (typeof RepairStatus)[keyof typeof RepairStatus]

}

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

export type RepairStatus = $Enums.RepairStatus

export const RepairStatus: typeof $Enums.RepairStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.repairRequest`: Exposes CRUD operations for the **RepairRequest** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RepairRequests
    * const repairRequests = await prisma.repairRequest.findMany()
    * ```
    */
  get repairRequest(): Prisma.RepairRequestDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.repairImage`: Exposes CRUD operations for the **RepairImage** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RepairImages
    * const repairImages = await prisma.repairImage.findMany()
    * ```
    */
  get repairImage(): Prisma.RepairImageDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.repairDetail`: Exposes CRUD operations for the **RepairDetail** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RepairDetails
    * const repairDetails = await prisma.repairDetail.findMany()
    * ```
    */
  get repairDetail(): Prisma.RepairDetailDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.repairPart`: Exposes CRUD operations for the **RepairPart** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RepairParts
    * const repairParts = await prisma.repairPart.findMany()
    * ```
    */
  get repairPart(): Prisma.RepairPartDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.shipping`: Exposes CRUD operations for the **Shipping** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Shippings
    * const shippings = await prisma.shipping.findMany()
    * ```
    */
  get shipping(): Prisma.ShippingDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.closeRepair`: Exposes CRUD operations for the **CloseRepair** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CloseRepairs
    * const closeRepairs = await prisma.closeRepair.findMany()
    * ```
    */
  get closeRepair(): Prisma.CloseRepairDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.18.0
   * Query Engine version: 34b5a692b7bd79939a9a2c3ef97d816e749cda2f
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    RepairRequest: 'RepairRequest',
    RepairImage: 'RepairImage',
    RepairDetail: 'RepairDetail',
    RepairPart: 'RepairPart',
    Shipping: 'Shipping',
    CloseRepair: 'CloseRepair'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "repairRequest" | "repairImage" | "repairDetail" | "repairPart" | "shipping" | "closeRepair"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      RepairRequest: {
        payload: Prisma.$RepairRequestPayload<ExtArgs>
        fields: Prisma.RepairRequestFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RepairRequestFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RepairRequestPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RepairRequestFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RepairRequestPayload>
          }
          findFirst: {
            args: Prisma.RepairRequestFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RepairRequestPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RepairRequestFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RepairRequestPayload>
          }
          findMany: {
            args: Prisma.RepairRequestFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RepairRequestPayload>[]
          }
          create: {
            args: Prisma.RepairRequestCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RepairRequestPayload>
          }
          createMany: {
            args: Prisma.RepairRequestCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RepairRequestCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RepairRequestPayload>[]
          }
          delete: {
            args: Prisma.RepairRequestDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RepairRequestPayload>
          }
          update: {
            args: Prisma.RepairRequestUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RepairRequestPayload>
          }
          deleteMany: {
            args: Prisma.RepairRequestDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RepairRequestUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RepairRequestUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RepairRequestPayload>[]
          }
          upsert: {
            args: Prisma.RepairRequestUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RepairRequestPayload>
          }
          aggregate: {
            args: Prisma.RepairRequestAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRepairRequest>
          }
          groupBy: {
            args: Prisma.RepairRequestGroupByArgs<ExtArgs>
            result: $Utils.Optional<RepairRequestGroupByOutputType>[]
          }
          count: {
            args: Prisma.RepairRequestCountArgs<ExtArgs>
            result: $Utils.Optional<RepairRequestCountAggregateOutputType> | number
          }
        }
      }
      RepairImage: {
        payload: Prisma.$RepairImagePayload<ExtArgs>
        fields: Prisma.RepairImageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RepairImageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RepairImagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RepairImageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RepairImagePayload>
          }
          findFirst: {
            args: Prisma.RepairImageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RepairImagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RepairImageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RepairImagePayload>
          }
          findMany: {
            args: Prisma.RepairImageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RepairImagePayload>[]
          }
          create: {
            args: Prisma.RepairImageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RepairImagePayload>
          }
          createMany: {
            args: Prisma.RepairImageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RepairImageCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RepairImagePayload>[]
          }
          delete: {
            args: Prisma.RepairImageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RepairImagePayload>
          }
          update: {
            args: Prisma.RepairImageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RepairImagePayload>
          }
          deleteMany: {
            args: Prisma.RepairImageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RepairImageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RepairImageUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RepairImagePayload>[]
          }
          upsert: {
            args: Prisma.RepairImageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RepairImagePayload>
          }
          aggregate: {
            args: Prisma.RepairImageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRepairImage>
          }
          groupBy: {
            args: Prisma.RepairImageGroupByArgs<ExtArgs>
            result: $Utils.Optional<RepairImageGroupByOutputType>[]
          }
          count: {
            args: Prisma.RepairImageCountArgs<ExtArgs>
            result: $Utils.Optional<RepairImageCountAggregateOutputType> | number
          }
        }
      }
      RepairDetail: {
        payload: Prisma.$RepairDetailPayload<ExtArgs>
        fields: Prisma.RepairDetailFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RepairDetailFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RepairDetailPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RepairDetailFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RepairDetailPayload>
          }
          findFirst: {
            args: Prisma.RepairDetailFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RepairDetailPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RepairDetailFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RepairDetailPayload>
          }
          findMany: {
            args: Prisma.RepairDetailFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RepairDetailPayload>[]
          }
          create: {
            args: Prisma.RepairDetailCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RepairDetailPayload>
          }
          createMany: {
            args: Prisma.RepairDetailCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RepairDetailCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RepairDetailPayload>[]
          }
          delete: {
            args: Prisma.RepairDetailDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RepairDetailPayload>
          }
          update: {
            args: Prisma.RepairDetailUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RepairDetailPayload>
          }
          deleteMany: {
            args: Prisma.RepairDetailDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RepairDetailUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RepairDetailUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RepairDetailPayload>[]
          }
          upsert: {
            args: Prisma.RepairDetailUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RepairDetailPayload>
          }
          aggregate: {
            args: Prisma.RepairDetailAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRepairDetail>
          }
          groupBy: {
            args: Prisma.RepairDetailGroupByArgs<ExtArgs>
            result: $Utils.Optional<RepairDetailGroupByOutputType>[]
          }
          count: {
            args: Prisma.RepairDetailCountArgs<ExtArgs>
            result: $Utils.Optional<RepairDetailCountAggregateOutputType> | number
          }
        }
      }
      RepairPart: {
        payload: Prisma.$RepairPartPayload<ExtArgs>
        fields: Prisma.RepairPartFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RepairPartFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RepairPartPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RepairPartFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RepairPartPayload>
          }
          findFirst: {
            args: Prisma.RepairPartFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RepairPartPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RepairPartFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RepairPartPayload>
          }
          findMany: {
            args: Prisma.RepairPartFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RepairPartPayload>[]
          }
          create: {
            args: Prisma.RepairPartCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RepairPartPayload>
          }
          createMany: {
            args: Prisma.RepairPartCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RepairPartCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RepairPartPayload>[]
          }
          delete: {
            args: Prisma.RepairPartDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RepairPartPayload>
          }
          update: {
            args: Prisma.RepairPartUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RepairPartPayload>
          }
          deleteMany: {
            args: Prisma.RepairPartDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RepairPartUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RepairPartUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RepairPartPayload>[]
          }
          upsert: {
            args: Prisma.RepairPartUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RepairPartPayload>
          }
          aggregate: {
            args: Prisma.RepairPartAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRepairPart>
          }
          groupBy: {
            args: Prisma.RepairPartGroupByArgs<ExtArgs>
            result: $Utils.Optional<RepairPartGroupByOutputType>[]
          }
          count: {
            args: Prisma.RepairPartCountArgs<ExtArgs>
            result: $Utils.Optional<RepairPartCountAggregateOutputType> | number
          }
        }
      }
      Shipping: {
        payload: Prisma.$ShippingPayload<ExtArgs>
        fields: Prisma.ShippingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ShippingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShippingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ShippingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShippingPayload>
          }
          findFirst: {
            args: Prisma.ShippingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShippingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ShippingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShippingPayload>
          }
          findMany: {
            args: Prisma.ShippingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShippingPayload>[]
          }
          create: {
            args: Prisma.ShippingCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShippingPayload>
          }
          createMany: {
            args: Prisma.ShippingCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ShippingCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShippingPayload>[]
          }
          delete: {
            args: Prisma.ShippingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShippingPayload>
          }
          update: {
            args: Prisma.ShippingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShippingPayload>
          }
          deleteMany: {
            args: Prisma.ShippingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ShippingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ShippingUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShippingPayload>[]
          }
          upsert: {
            args: Prisma.ShippingUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShippingPayload>
          }
          aggregate: {
            args: Prisma.ShippingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateShipping>
          }
          groupBy: {
            args: Prisma.ShippingGroupByArgs<ExtArgs>
            result: $Utils.Optional<ShippingGroupByOutputType>[]
          }
          count: {
            args: Prisma.ShippingCountArgs<ExtArgs>
            result: $Utils.Optional<ShippingCountAggregateOutputType> | number
          }
        }
      }
      CloseRepair: {
        payload: Prisma.$CloseRepairPayload<ExtArgs>
        fields: Prisma.CloseRepairFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CloseRepairFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CloseRepairPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CloseRepairFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CloseRepairPayload>
          }
          findFirst: {
            args: Prisma.CloseRepairFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CloseRepairPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CloseRepairFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CloseRepairPayload>
          }
          findMany: {
            args: Prisma.CloseRepairFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CloseRepairPayload>[]
          }
          create: {
            args: Prisma.CloseRepairCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CloseRepairPayload>
          }
          createMany: {
            args: Prisma.CloseRepairCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CloseRepairCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CloseRepairPayload>[]
          }
          delete: {
            args: Prisma.CloseRepairDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CloseRepairPayload>
          }
          update: {
            args: Prisma.CloseRepairUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CloseRepairPayload>
          }
          deleteMany: {
            args: Prisma.CloseRepairDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CloseRepairUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CloseRepairUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CloseRepairPayload>[]
          }
          upsert: {
            args: Prisma.CloseRepairUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CloseRepairPayload>
          }
          aggregate: {
            args: Prisma.CloseRepairAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCloseRepair>
          }
          groupBy: {
            args: Prisma.CloseRepairGroupByArgs<ExtArgs>
            result: $Utils.Optional<CloseRepairGroupByOutputType>[]
          }
          count: {
            args: Prisma.CloseRepairCountArgs<ExtArgs>
            result: $Utils.Optional<CloseRepairCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    repairRequest?: RepairRequestOmit
    repairImage?: RepairImageOmit
    repairDetail?: RepairDetailOmit
    repairPart?: RepairPartOmit
    shipping?: ShippingOmit
    closeRepair?: CloseRepairOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    repairRequests: number
    assignedRepairs: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    repairRequests?: boolean | UserCountOutputTypeCountRepairRequestsArgs
    assignedRepairs?: boolean | UserCountOutputTypeCountAssignedRepairsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountRepairRequestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RepairRequestWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAssignedRepairsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RepairDetailWhereInput
  }


  /**
   * Count Type RepairRequestCountOutputType
   */

  export type RepairRequestCountOutputType = {
    images: number
  }

  export type RepairRequestCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    images?: boolean | RepairRequestCountOutputTypeCountImagesArgs
  }

  // Custom InputTypes
  /**
   * RepairRequestCountOutputType without action
   */
  export type RepairRequestCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RepairRequestCountOutputType
     */
    select?: RepairRequestCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * RepairRequestCountOutputType without action
   */
  export type RepairRequestCountOutputTypeCountImagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RepairImageWhereInput
  }


  /**
   * Count Type RepairDetailCountOutputType
   */

  export type RepairDetailCountOutputType = {
    parts: number
  }

  export type RepairDetailCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    parts?: boolean | RepairDetailCountOutputTypeCountPartsArgs
  }

  // Custom InputTypes
  /**
   * RepairDetailCountOutputType without action
   */
  export type RepairDetailCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RepairDetailCountOutputType
     */
    select?: RepairDetailCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * RepairDetailCountOutputType without action
   */
  export type RepairDetailCountOutputTypeCountPartsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RepairPartWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    name: string | null
    email: string | null
    password: string | null
    phone: string | null
    role: $Enums.Role | null
    image: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    name: string | null
    email: string | null
    password: string | null
    phone: string | null
    role: $Enums.Role | null
    image: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    name: number
    email: number
    password: number
    phone: number
    role: number
    image: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    phone?: true
    role?: true
    image?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    phone?: true
    role?: true
    image?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    phone?: true
    role?: true
    image?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: number
    name: string | null
    email: string
    password: string
    phone: string | null
    role: $Enums.Role
    image: string | null
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    phone?: boolean
    role?: boolean
    image?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    repairRequests?: boolean | User$repairRequestsArgs<ExtArgs>
    assignedRepairs?: boolean | User$assignedRepairsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    phone?: boolean
    role?: boolean
    image?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    phone?: boolean
    role?: boolean
    image?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    phone?: boolean
    role?: boolean
    image?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "password" | "phone" | "role" | "image" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    repairRequests?: boolean | User$repairRequestsArgs<ExtArgs>
    assignedRepairs?: boolean | User$assignedRepairsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      repairRequests: Prisma.$RepairRequestPayload<ExtArgs>[]
      assignedRepairs: Prisma.$RepairDetailPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string | null
      email: string
      password: string
      phone: string | null
      role: $Enums.Role
      image: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    repairRequests<T extends User$repairRequestsArgs<ExtArgs> = {}>(args?: Subset<T, User$repairRequestsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RepairRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    assignedRepairs<T extends User$assignedRepairsArgs<ExtArgs> = {}>(args?: Subset<T, User$assignedRepairsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RepairDetailPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'Int'>
    readonly name: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly phone: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'Role'>
    readonly image: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.repairRequests
   */
  export type User$repairRequestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RepairRequest
     */
    select?: RepairRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RepairRequest
     */
    omit?: RepairRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepairRequestInclude<ExtArgs> | null
    where?: RepairRequestWhereInput
    orderBy?: RepairRequestOrderByWithRelationInput | RepairRequestOrderByWithRelationInput[]
    cursor?: RepairRequestWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RepairRequestScalarFieldEnum | RepairRequestScalarFieldEnum[]
  }

  /**
   * User.assignedRepairs
   */
  export type User$assignedRepairsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RepairDetail
     */
    select?: RepairDetailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RepairDetail
     */
    omit?: RepairDetailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepairDetailInclude<ExtArgs> | null
    where?: RepairDetailWhereInput
    orderBy?: RepairDetailOrderByWithRelationInput | RepairDetailOrderByWithRelationInput[]
    cursor?: RepairDetailWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RepairDetailScalarFieldEnum | RepairDetailScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model RepairRequest
   */

  export type AggregateRepairRequest = {
    _count: RepairRequestCountAggregateOutputType | null
    _avg: RepairRequestAvgAggregateOutputType | null
    _sum: RepairRequestSumAggregateOutputType | null
    _min: RepairRequestMinAggregateOutputType | null
    _max: RepairRequestMaxAggregateOutputType | null
  }

  export type RepairRequestAvgAggregateOutputType = {
    id: number | null
    customerId: number | null
  }

  export type RepairRequestSumAggregateOutputType = {
    id: number | null
    customerId: number | null
  }

  export type RepairRequestMinAggregateOutputType = {
    id: number | null
    printerModel: string | null
    serialNumber: string | null
    customerId: number | null
    address: string | null
    issueDesc: string | null
    accessories: string | null
    requestDate: Date | null
    contactInfo: string | null
    status: $Enums.RepairStatus | null
  }

  export type RepairRequestMaxAggregateOutputType = {
    id: number | null
    printerModel: string | null
    serialNumber: string | null
    customerId: number | null
    address: string | null
    issueDesc: string | null
    accessories: string | null
    requestDate: Date | null
    contactInfo: string | null
    status: $Enums.RepairStatus | null
  }

  export type RepairRequestCountAggregateOutputType = {
    id: number
    printerModel: number
    serialNumber: number
    customerId: number
    address: number
    issueDesc: number
    accessories: number
    requestDate: number
    contactInfo: number
    status: number
    _all: number
  }


  export type RepairRequestAvgAggregateInputType = {
    id?: true
    customerId?: true
  }

  export type RepairRequestSumAggregateInputType = {
    id?: true
    customerId?: true
  }

  export type RepairRequestMinAggregateInputType = {
    id?: true
    printerModel?: true
    serialNumber?: true
    customerId?: true
    address?: true
    issueDesc?: true
    accessories?: true
    requestDate?: true
    contactInfo?: true
    status?: true
  }

  export type RepairRequestMaxAggregateInputType = {
    id?: true
    printerModel?: true
    serialNumber?: true
    customerId?: true
    address?: true
    issueDesc?: true
    accessories?: true
    requestDate?: true
    contactInfo?: true
    status?: true
  }

  export type RepairRequestCountAggregateInputType = {
    id?: true
    printerModel?: true
    serialNumber?: true
    customerId?: true
    address?: true
    issueDesc?: true
    accessories?: true
    requestDate?: true
    contactInfo?: true
    status?: true
    _all?: true
  }

  export type RepairRequestAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RepairRequest to aggregate.
     */
    where?: RepairRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RepairRequests to fetch.
     */
    orderBy?: RepairRequestOrderByWithRelationInput | RepairRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RepairRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RepairRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RepairRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RepairRequests
    **/
    _count?: true | RepairRequestCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RepairRequestAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RepairRequestSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RepairRequestMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RepairRequestMaxAggregateInputType
  }

  export type GetRepairRequestAggregateType<T extends RepairRequestAggregateArgs> = {
        [P in keyof T & keyof AggregateRepairRequest]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRepairRequest[P]>
      : GetScalarType<T[P], AggregateRepairRequest[P]>
  }




  export type RepairRequestGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RepairRequestWhereInput
    orderBy?: RepairRequestOrderByWithAggregationInput | RepairRequestOrderByWithAggregationInput[]
    by: RepairRequestScalarFieldEnum[] | RepairRequestScalarFieldEnum
    having?: RepairRequestScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RepairRequestCountAggregateInputType | true
    _avg?: RepairRequestAvgAggregateInputType
    _sum?: RepairRequestSumAggregateInputType
    _min?: RepairRequestMinAggregateInputType
    _max?: RepairRequestMaxAggregateInputType
  }

  export type RepairRequestGroupByOutputType = {
    id: number
    printerModel: string
    serialNumber: string
    customerId: number
    address: string | null
    issueDesc: string
    accessories: string | null
    requestDate: Date
    contactInfo: string | null
    status: $Enums.RepairStatus
    _count: RepairRequestCountAggregateOutputType | null
    _avg: RepairRequestAvgAggregateOutputType | null
    _sum: RepairRequestSumAggregateOutputType | null
    _min: RepairRequestMinAggregateOutputType | null
    _max: RepairRequestMaxAggregateOutputType | null
  }

  type GetRepairRequestGroupByPayload<T extends RepairRequestGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RepairRequestGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RepairRequestGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RepairRequestGroupByOutputType[P]>
            : GetScalarType<T[P], RepairRequestGroupByOutputType[P]>
        }
      >
    >


  export type RepairRequestSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    printerModel?: boolean
    serialNumber?: boolean
    customerId?: boolean
    address?: boolean
    issueDesc?: boolean
    accessories?: boolean
    requestDate?: boolean
    contactInfo?: boolean
    status?: boolean
    customer?: boolean | UserDefaultArgs<ExtArgs>
    images?: boolean | RepairRequest$imagesArgs<ExtArgs>
    details?: boolean | RepairRequest$detailsArgs<ExtArgs>
    shipping?: boolean | RepairRequest$shippingArgs<ExtArgs>
    closedJob?: boolean | RepairRequest$closedJobArgs<ExtArgs>
    _count?: boolean | RepairRequestCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["repairRequest"]>

  export type RepairRequestSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    printerModel?: boolean
    serialNumber?: boolean
    customerId?: boolean
    address?: boolean
    issueDesc?: boolean
    accessories?: boolean
    requestDate?: boolean
    contactInfo?: boolean
    status?: boolean
    customer?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["repairRequest"]>

  export type RepairRequestSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    printerModel?: boolean
    serialNumber?: boolean
    customerId?: boolean
    address?: boolean
    issueDesc?: boolean
    accessories?: boolean
    requestDate?: boolean
    contactInfo?: boolean
    status?: boolean
    customer?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["repairRequest"]>

  export type RepairRequestSelectScalar = {
    id?: boolean
    printerModel?: boolean
    serialNumber?: boolean
    customerId?: boolean
    address?: boolean
    issueDesc?: boolean
    accessories?: boolean
    requestDate?: boolean
    contactInfo?: boolean
    status?: boolean
  }

  export type RepairRequestOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "printerModel" | "serialNumber" | "customerId" | "address" | "issueDesc" | "accessories" | "requestDate" | "contactInfo" | "status", ExtArgs["result"]["repairRequest"]>
  export type RepairRequestInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customer?: boolean | UserDefaultArgs<ExtArgs>
    images?: boolean | RepairRequest$imagesArgs<ExtArgs>
    details?: boolean | RepairRequest$detailsArgs<ExtArgs>
    shipping?: boolean | RepairRequest$shippingArgs<ExtArgs>
    closedJob?: boolean | RepairRequest$closedJobArgs<ExtArgs>
    _count?: boolean | RepairRequestCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type RepairRequestIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customer?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type RepairRequestIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customer?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $RepairRequestPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RepairRequest"
    objects: {
      customer: Prisma.$UserPayload<ExtArgs>
      images: Prisma.$RepairImagePayload<ExtArgs>[]
      details: Prisma.$RepairDetailPayload<ExtArgs> | null
      shipping: Prisma.$ShippingPayload<ExtArgs> | null
      closedJob: Prisma.$CloseRepairPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      printerModel: string
      serialNumber: string
      customerId: number
      address: string | null
      issueDesc: string
      accessories: string | null
      requestDate: Date
      contactInfo: string | null
      status: $Enums.RepairStatus
    }, ExtArgs["result"]["repairRequest"]>
    composites: {}
  }

  type RepairRequestGetPayload<S extends boolean | null | undefined | RepairRequestDefaultArgs> = $Result.GetResult<Prisma.$RepairRequestPayload, S>

  type RepairRequestCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RepairRequestFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RepairRequestCountAggregateInputType | true
    }

  export interface RepairRequestDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RepairRequest'], meta: { name: 'RepairRequest' } }
    /**
     * Find zero or one RepairRequest that matches the filter.
     * @param {RepairRequestFindUniqueArgs} args - Arguments to find a RepairRequest
     * @example
     * // Get one RepairRequest
     * const repairRequest = await prisma.repairRequest.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RepairRequestFindUniqueArgs>(args: SelectSubset<T, RepairRequestFindUniqueArgs<ExtArgs>>): Prisma__RepairRequestClient<$Result.GetResult<Prisma.$RepairRequestPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RepairRequest that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RepairRequestFindUniqueOrThrowArgs} args - Arguments to find a RepairRequest
     * @example
     * // Get one RepairRequest
     * const repairRequest = await prisma.repairRequest.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RepairRequestFindUniqueOrThrowArgs>(args: SelectSubset<T, RepairRequestFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RepairRequestClient<$Result.GetResult<Prisma.$RepairRequestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RepairRequest that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RepairRequestFindFirstArgs} args - Arguments to find a RepairRequest
     * @example
     * // Get one RepairRequest
     * const repairRequest = await prisma.repairRequest.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RepairRequestFindFirstArgs>(args?: SelectSubset<T, RepairRequestFindFirstArgs<ExtArgs>>): Prisma__RepairRequestClient<$Result.GetResult<Prisma.$RepairRequestPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RepairRequest that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RepairRequestFindFirstOrThrowArgs} args - Arguments to find a RepairRequest
     * @example
     * // Get one RepairRequest
     * const repairRequest = await prisma.repairRequest.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RepairRequestFindFirstOrThrowArgs>(args?: SelectSubset<T, RepairRequestFindFirstOrThrowArgs<ExtArgs>>): Prisma__RepairRequestClient<$Result.GetResult<Prisma.$RepairRequestPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RepairRequests that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RepairRequestFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RepairRequests
     * const repairRequests = await prisma.repairRequest.findMany()
     * 
     * // Get first 10 RepairRequests
     * const repairRequests = await prisma.repairRequest.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const repairRequestWithIdOnly = await prisma.repairRequest.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RepairRequestFindManyArgs>(args?: SelectSubset<T, RepairRequestFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RepairRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RepairRequest.
     * @param {RepairRequestCreateArgs} args - Arguments to create a RepairRequest.
     * @example
     * // Create one RepairRequest
     * const RepairRequest = await prisma.repairRequest.create({
     *   data: {
     *     // ... data to create a RepairRequest
     *   }
     * })
     * 
     */
    create<T extends RepairRequestCreateArgs>(args: SelectSubset<T, RepairRequestCreateArgs<ExtArgs>>): Prisma__RepairRequestClient<$Result.GetResult<Prisma.$RepairRequestPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RepairRequests.
     * @param {RepairRequestCreateManyArgs} args - Arguments to create many RepairRequests.
     * @example
     * // Create many RepairRequests
     * const repairRequest = await prisma.repairRequest.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RepairRequestCreateManyArgs>(args?: SelectSubset<T, RepairRequestCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RepairRequests and returns the data saved in the database.
     * @param {RepairRequestCreateManyAndReturnArgs} args - Arguments to create many RepairRequests.
     * @example
     * // Create many RepairRequests
     * const repairRequest = await prisma.repairRequest.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RepairRequests and only return the `id`
     * const repairRequestWithIdOnly = await prisma.repairRequest.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RepairRequestCreateManyAndReturnArgs>(args?: SelectSubset<T, RepairRequestCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RepairRequestPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a RepairRequest.
     * @param {RepairRequestDeleteArgs} args - Arguments to delete one RepairRequest.
     * @example
     * // Delete one RepairRequest
     * const RepairRequest = await prisma.repairRequest.delete({
     *   where: {
     *     // ... filter to delete one RepairRequest
     *   }
     * })
     * 
     */
    delete<T extends RepairRequestDeleteArgs>(args: SelectSubset<T, RepairRequestDeleteArgs<ExtArgs>>): Prisma__RepairRequestClient<$Result.GetResult<Prisma.$RepairRequestPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RepairRequest.
     * @param {RepairRequestUpdateArgs} args - Arguments to update one RepairRequest.
     * @example
     * // Update one RepairRequest
     * const repairRequest = await prisma.repairRequest.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RepairRequestUpdateArgs>(args: SelectSubset<T, RepairRequestUpdateArgs<ExtArgs>>): Prisma__RepairRequestClient<$Result.GetResult<Prisma.$RepairRequestPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RepairRequests.
     * @param {RepairRequestDeleteManyArgs} args - Arguments to filter RepairRequests to delete.
     * @example
     * // Delete a few RepairRequests
     * const { count } = await prisma.repairRequest.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RepairRequestDeleteManyArgs>(args?: SelectSubset<T, RepairRequestDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RepairRequests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RepairRequestUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RepairRequests
     * const repairRequest = await prisma.repairRequest.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RepairRequestUpdateManyArgs>(args: SelectSubset<T, RepairRequestUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RepairRequests and returns the data updated in the database.
     * @param {RepairRequestUpdateManyAndReturnArgs} args - Arguments to update many RepairRequests.
     * @example
     * // Update many RepairRequests
     * const repairRequest = await prisma.repairRequest.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more RepairRequests and only return the `id`
     * const repairRequestWithIdOnly = await prisma.repairRequest.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RepairRequestUpdateManyAndReturnArgs>(args: SelectSubset<T, RepairRequestUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RepairRequestPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one RepairRequest.
     * @param {RepairRequestUpsertArgs} args - Arguments to update or create a RepairRequest.
     * @example
     * // Update or create a RepairRequest
     * const repairRequest = await prisma.repairRequest.upsert({
     *   create: {
     *     // ... data to create a RepairRequest
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RepairRequest we want to update
     *   }
     * })
     */
    upsert<T extends RepairRequestUpsertArgs>(args: SelectSubset<T, RepairRequestUpsertArgs<ExtArgs>>): Prisma__RepairRequestClient<$Result.GetResult<Prisma.$RepairRequestPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RepairRequests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RepairRequestCountArgs} args - Arguments to filter RepairRequests to count.
     * @example
     * // Count the number of RepairRequests
     * const count = await prisma.repairRequest.count({
     *   where: {
     *     // ... the filter for the RepairRequests we want to count
     *   }
     * })
    **/
    count<T extends RepairRequestCountArgs>(
      args?: Subset<T, RepairRequestCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RepairRequestCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RepairRequest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RepairRequestAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RepairRequestAggregateArgs>(args: Subset<T, RepairRequestAggregateArgs>): Prisma.PrismaPromise<GetRepairRequestAggregateType<T>>

    /**
     * Group by RepairRequest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RepairRequestGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RepairRequestGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RepairRequestGroupByArgs['orderBy'] }
        : { orderBy?: RepairRequestGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RepairRequestGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRepairRequestGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RepairRequest model
   */
  readonly fields: RepairRequestFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RepairRequest.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RepairRequestClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    customer<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    images<T extends RepairRequest$imagesArgs<ExtArgs> = {}>(args?: Subset<T, RepairRequest$imagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RepairImagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    details<T extends RepairRequest$detailsArgs<ExtArgs> = {}>(args?: Subset<T, RepairRequest$detailsArgs<ExtArgs>>): Prisma__RepairDetailClient<$Result.GetResult<Prisma.$RepairDetailPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    shipping<T extends RepairRequest$shippingArgs<ExtArgs> = {}>(args?: Subset<T, RepairRequest$shippingArgs<ExtArgs>>): Prisma__ShippingClient<$Result.GetResult<Prisma.$ShippingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    closedJob<T extends RepairRequest$closedJobArgs<ExtArgs> = {}>(args?: Subset<T, RepairRequest$closedJobArgs<ExtArgs>>): Prisma__CloseRepairClient<$Result.GetResult<Prisma.$CloseRepairPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the RepairRequest model
   */
  interface RepairRequestFieldRefs {
    readonly id: FieldRef<"RepairRequest", 'Int'>
    readonly printerModel: FieldRef<"RepairRequest", 'String'>
    readonly serialNumber: FieldRef<"RepairRequest", 'String'>
    readonly customerId: FieldRef<"RepairRequest", 'Int'>
    readonly address: FieldRef<"RepairRequest", 'String'>
    readonly issueDesc: FieldRef<"RepairRequest", 'String'>
    readonly accessories: FieldRef<"RepairRequest", 'String'>
    readonly requestDate: FieldRef<"RepairRequest", 'DateTime'>
    readonly contactInfo: FieldRef<"RepairRequest", 'String'>
    readonly status: FieldRef<"RepairRequest", 'RepairStatus'>
  }
    

  // Custom InputTypes
  /**
   * RepairRequest findUnique
   */
  export type RepairRequestFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RepairRequest
     */
    select?: RepairRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RepairRequest
     */
    omit?: RepairRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepairRequestInclude<ExtArgs> | null
    /**
     * Filter, which RepairRequest to fetch.
     */
    where: RepairRequestWhereUniqueInput
  }

  /**
   * RepairRequest findUniqueOrThrow
   */
  export type RepairRequestFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RepairRequest
     */
    select?: RepairRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RepairRequest
     */
    omit?: RepairRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepairRequestInclude<ExtArgs> | null
    /**
     * Filter, which RepairRequest to fetch.
     */
    where: RepairRequestWhereUniqueInput
  }

  /**
   * RepairRequest findFirst
   */
  export type RepairRequestFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RepairRequest
     */
    select?: RepairRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RepairRequest
     */
    omit?: RepairRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepairRequestInclude<ExtArgs> | null
    /**
     * Filter, which RepairRequest to fetch.
     */
    where?: RepairRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RepairRequests to fetch.
     */
    orderBy?: RepairRequestOrderByWithRelationInput | RepairRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RepairRequests.
     */
    cursor?: RepairRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RepairRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RepairRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RepairRequests.
     */
    distinct?: RepairRequestScalarFieldEnum | RepairRequestScalarFieldEnum[]
  }

  /**
   * RepairRequest findFirstOrThrow
   */
  export type RepairRequestFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RepairRequest
     */
    select?: RepairRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RepairRequest
     */
    omit?: RepairRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepairRequestInclude<ExtArgs> | null
    /**
     * Filter, which RepairRequest to fetch.
     */
    where?: RepairRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RepairRequests to fetch.
     */
    orderBy?: RepairRequestOrderByWithRelationInput | RepairRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RepairRequests.
     */
    cursor?: RepairRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RepairRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RepairRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RepairRequests.
     */
    distinct?: RepairRequestScalarFieldEnum | RepairRequestScalarFieldEnum[]
  }

  /**
   * RepairRequest findMany
   */
  export type RepairRequestFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RepairRequest
     */
    select?: RepairRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RepairRequest
     */
    omit?: RepairRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepairRequestInclude<ExtArgs> | null
    /**
     * Filter, which RepairRequests to fetch.
     */
    where?: RepairRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RepairRequests to fetch.
     */
    orderBy?: RepairRequestOrderByWithRelationInput | RepairRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RepairRequests.
     */
    cursor?: RepairRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RepairRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RepairRequests.
     */
    skip?: number
    distinct?: RepairRequestScalarFieldEnum | RepairRequestScalarFieldEnum[]
  }

  /**
   * RepairRequest create
   */
  export type RepairRequestCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RepairRequest
     */
    select?: RepairRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RepairRequest
     */
    omit?: RepairRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepairRequestInclude<ExtArgs> | null
    /**
     * The data needed to create a RepairRequest.
     */
    data: XOR<RepairRequestCreateInput, RepairRequestUncheckedCreateInput>
  }

  /**
   * RepairRequest createMany
   */
  export type RepairRequestCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RepairRequests.
     */
    data: RepairRequestCreateManyInput | RepairRequestCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RepairRequest createManyAndReturn
   */
  export type RepairRequestCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RepairRequest
     */
    select?: RepairRequestSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RepairRequest
     */
    omit?: RepairRequestOmit<ExtArgs> | null
    /**
     * The data used to create many RepairRequests.
     */
    data: RepairRequestCreateManyInput | RepairRequestCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepairRequestIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * RepairRequest update
   */
  export type RepairRequestUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RepairRequest
     */
    select?: RepairRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RepairRequest
     */
    omit?: RepairRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepairRequestInclude<ExtArgs> | null
    /**
     * The data needed to update a RepairRequest.
     */
    data: XOR<RepairRequestUpdateInput, RepairRequestUncheckedUpdateInput>
    /**
     * Choose, which RepairRequest to update.
     */
    where: RepairRequestWhereUniqueInput
  }

  /**
   * RepairRequest updateMany
   */
  export type RepairRequestUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RepairRequests.
     */
    data: XOR<RepairRequestUpdateManyMutationInput, RepairRequestUncheckedUpdateManyInput>
    /**
     * Filter which RepairRequests to update
     */
    where?: RepairRequestWhereInput
    /**
     * Limit how many RepairRequests to update.
     */
    limit?: number
  }

  /**
   * RepairRequest updateManyAndReturn
   */
  export type RepairRequestUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RepairRequest
     */
    select?: RepairRequestSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RepairRequest
     */
    omit?: RepairRequestOmit<ExtArgs> | null
    /**
     * The data used to update RepairRequests.
     */
    data: XOR<RepairRequestUpdateManyMutationInput, RepairRequestUncheckedUpdateManyInput>
    /**
     * Filter which RepairRequests to update
     */
    where?: RepairRequestWhereInput
    /**
     * Limit how many RepairRequests to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepairRequestIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * RepairRequest upsert
   */
  export type RepairRequestUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RepairRequest
     */
    select?: RepairRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RepairRequest
     */
    omit?: RepairRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepairRequestInclude<ExtArgs> | null
    /**
     * The filter to search for the RepairRequest to update in case it exists.
     */
    where: RepairRequestWhereUniqueInput
    /**
     * In case the RepairRequest found by the `where` argument doesn't exist, create a new RepairRequest with this data.
     */
    create: XOR<RepairRequestCreateInput, RepairRequestUncheckedCreateInput>
    /**
     * In case the RepairRequest was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RepairRequestUpdateInput, RepairRequestUncheckedUpdateInput>
  }

  /**
   * RepairRequest delete
   */
  export type RepairRequestDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RepairRequest
     */
    select?: RepairRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RepairRequest
     */
    omit?: RepairRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepairRequestInclude<ExtArgs> | null
    /**
     * Filter which RepairRequest to delete.
     */
    where: RepairRequestWhereUniqueInput
  }

  /**
   * RepairRequest deleteMany
   */
  export type RepairRequestDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RepairRequests to delete
     */
    where?: RepairRequestWhereInput
    /**
     * Limit how many RepairRequests to delete.
     */
    limit?: number
  }

  /**
   * RepairRequest.images
   */
  export type RepairRequest$imagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RepairImage
     */
    select?: RepairImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RepairImage
     */
    omit?: RepairImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepairImageInclude<ExtArgs> | null
    where?: RepairImageWhereInput
    orderBy?: RepairImageOrderByWithRelationInput | RepairImageOrderByWithRelationInput[]
    cursor?: RepairImageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RepairImageScalarFieldEnum | RepairImageScalarFieldEnum[]
  }

  /**
   * RepairRequest.details
   */
  export type RepairRequest$detailsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RepairDetail
     */
    select?: RepairDetailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RepairDetail
     */
    omit?: RepairDetailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepairDetailInclude<ExtArgs> | null
    where?: RepairDetailWhereInput
  }

  /**
   * RepairRequest.shipping
   */
  export type RepairRequest$shippingArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shipping
     */
    select?: ShippingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Shipping
     */
    omit?: ShippingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShippingInclude<ExtArgs> | null
    where?: ShippingWhereInput
  }

  /**
   * RepairRequest.closedJob
   */
  export type RepairRequest$closedJobArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CloseRepair
     */
    select?: CloseRepairSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CloseRepair
     */
    omit?: CloseRepairOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CloseRepairInclude<ExtArgs> | null
    where?: CloseRepairWhereInput
  }

  /**
   * RepairRequest without action
   */
  export type RepairRequestDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RepairRequest
     */
    select?: RepairRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RepairRequest
     */
    omit?: RepairRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepairRequestInclude<ExtArgs> | null
  }


  /**
   * Model RepairImage
   */

  export type AggregateRepairImage = {
    _count: RepairImageCountAggregateOutputType | null
    _avg: RepairImageAvgAggregateOutputType | null
    _sum: RepairImageSumAggregateOutputType | null
    _min: RepairImageMinAggregateOutputType | null
    _max: RepairImageMaxAggregateOutputType | null
  }

  export type RepairImageAvgAggregateOutputType = {
    id: number | null
    repairRequestId: number | null
  }

  export type RepairImageSumAggregateOutputType = {
    id: number | null
    repairRequestId: number | null
  }

  export type RepairImageMinAggregateOutputType = {
    id: number | null
    repairRequestId: number | null
    url: string | null
    uploadedAt: Date | null
  }

  export type RepairImageMaxAggregateOutputType = {
    id: number | null
    repairRequestId: number | null
    url: string | null
    uploadedAt: Date | null
  }

  export type RepairImageCountAggregateOutputType = {
    id: number
    repairRequestId: number
    url: number
    uploadedAt: number
    _all: number
  }


  export type RepairImageAvgAggregateInputType = {
    id?: true
    repairRequestId?: true
  }

  export type RepairImageSumAggregateInputType = {
    id?: true
    repairRequestId?: true
  }

  export type RepairImageMinAggregateInputType = {
    id?: true
    repairRequestId?: true
    url?: true
    uploadedAt?: true
  }

  export type RepairImageMaxAggregateInputType = {
    id?: true
    repairRequestId?: true
    url?: true
    uploadedAt?: true
  }

  export type RepairImageCountAggregateInputType = {
    id?: true
    repairRequestId?: true
    url?: true
    uploadedAt?: true
    _all?: true
  }

  export type RepairImageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RepairImage to aggregate.
     */
    where?: RepairImageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RepairImages to fetch.
     */
    orderBy?: RepairImageOrderByWithRelationInput | RepairImageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RepairImageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RepairImages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RepairImages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RepairImages
    **/
    _count?: true | RepairImageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RepairImageAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RepairImageSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RepairImageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RepairImageMaxAggregateInputType
  }

  export type GetRepairImageAggregateType<T extends RepairImageAggregateArgs> = {
        [P in keyof T & keyof AggregateRepairImage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRepairImage[P]>
      : GetScalarType<T[P], AggregateRepairImage[P]>
  }




  export type RepairImageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RepairImageWhereInput
    orderBy?: RepairImageOrderByWithAggregationInput | RepairImageOrderByWithAggregationInput[]
    by: RepairImageScalarFieldEnum[] | RepairImageScalarFieldEnum
    having?: RepairImageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RepairImageCountAggregateInputType | true
    _avg?: RepairImageAvgAggregateInputType
    _sum?: RepairImageSumAggregateInputType
    _min?: RepairImageMinAggregateInputType
    _max?: RepairImageMaxAggregateInputType
  }

  export type RepairImageGroupByOutputType = {
    id: number
    repairRequestId: number
    url: string
    uploadedAt: Date
    _count: RepairImageCountAggregateOutputType | null
    _avg: RepairImageAvgAggregateOutputType | null
    _sum: RepairImageSumAggregateOutputType | null
    _min: RepairImageMinAggregateOutputType | null
    _max: RepairImageMaxAggregateOutputType | null
  }

  type GetRepairImageGroupByPayload<T extends RepairImageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RepairImageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RepairImageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RepairImageGroupByOutputType[P]>
            : GetScalarType<T[P], RepairImageGroupByOutputType[P]>
        }
      >
    >


  export type RepairImageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    repairRequestId?: boolean
    url?: boolean
    uploadedAt?: boolean
    repairRequest?: boolean | RepairRequestDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["repairImage"]>

  export type RepairImageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    repairRequestId?: boolean
    url?: boolean
    uploadedAt?: boolean
    repairRequest?: boolean | RepairRequestDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["repairImage"]>

  export type RepairImageSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    repairRequestId?: boolean
    url?: boolean
    uploadedAt?: boolean
    repairRequest?: boolean | RepairRequestDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["repairImage"]>

  export type RepairImageSelectScalar = {
    id?: boolean
    repairRequestId?: boolean
    url?: boolean
    uploadedAt?: boolean
  }

  export type RepairImageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "repairRequestId" | "url" | "uploadedAt", ExtArgs["result"]["repairImage"]>
  export type RepairImageInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    repairRequest?: boolean | RepairRequestDefaultArgs<ExtArgs>
  }
  export type RepairImageIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    repairRequest?: boolean | RepairRequestDefaultArgs<ExtArgs>
  }
  export type RepairImageIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    repairRequest?: boolean | RepairRequestDefaultArgs<ExtArgs>
  }

  export type $RepairImagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RepairImage"
    objects: {
      repairRequest: Prisma.$RepairRequestPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      repairRequestId: number
      url: string
      uploadedAt: Date
    }, ExtArgs["result"]["repairImage"]>
    composites: {}
  }

  type RepairImageGetPayload<S extends boolean | null | undefined | RepairImageDefaultArgs> = $Result.GetResult<Prisma.$RepairImagePayload, S>

  type RepairImageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RepairImageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RepairImageCountAggregateInputType | true
    }

  export interface RepairImageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RepairImage'], meta: { name: 'RepairImage' } }
    /**
     * Find zero or one RepairImage that matches the filter.
     * @param {RepairImageFindUniqueArgs} args - Arguments to find a RepairImage
     * @example
     * // Get one RepairImage
     * const repairImage = await prisma.repairImage.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RepairImageFindUniqueArgs>(args: SelectSubset<T, RepairImageFindUniqueArgs<ExtArgs>>): Prisma__RepairImageClient<$Result.GetResult<Prisma.$RepairImagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RepairImage that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RepairImageFindUniqueOrThrowArgs} args - Arguments to find a RepairImage
     * @example
     * // Get one RepairImage
     * const repairImage = await prisma.repairImage.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RepairImageFindUniqueOrThrowArgs>(args: SelectSubset<T, RepairImageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RepairImageClient<$Result.GetResult<Prisma.$RepairImagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RepairImage that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RepairImageFindFirstArgs} args - Arguments to find a RepairImage
     * @example
     * // Get one RepairImage
     * const repairImage = await prisma.repairImage.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RepairImageFindFirstArgs>(args?: SelectSubset<T, RepairImageFindFirstArgs<ExtArgs>>): Prisma__RepairImageClient<$Result.GetResult<Prisma.$RepairImagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RepairImage that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RepairImageFindFirstOrThrowArgs} args - Arguments to find a RepairImage
     * @example
     * // Get one RepairImage
     * const repairImage = await prisma.repairImage.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RepairImageFindFirstOrThrowArgs>(args?: SelectSubset<T, RepairImageFindFirstOrThrowArgs<ExtArgs>>): Prisma__RepairImageClient<$Result.GetResult<Prisma.$RepairImagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RepairImages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RepairImageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RepairImages
     * const repairImages = await prisma.repairImage.findMany()
     * 
     * // Get first 10 RepairImages
     * const repairImages = await prisma.repairImage.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const repairImageWithIdOnly = await prisma.repairImage.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RepairImageFindManyArgs>(args?: SelectSubset<T, RepairImageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RepairImagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RepairImage.
     * @param {RepairImageCreateArgs} args - Arguments to create a RepairImage.
     * @example
     * // Create one RepairImage
     * const RepairImage = await prisma.repairImage.create({
     *   data: {
     *     // ... data to create a RepairImage
     *   }
     * })
     * 
     */
    create<T extends RepairImageCreateArgs>(args: SelectSubset<T, RepairImageCreateArgs<ExtArgs>>): Prisma__RepairImageClient<$Result.GetResult<Prisma.$RepairImagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RepairImages.
     * @param {RepairImageCreateManyArgs} args - Arguments to create many RepairImages.
     * @example
     * // Create many RepairImages
     * const repairImage = await prisma.repairImage.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RepairImageCreateManyArgs>(args?: SelectSubset<T, RepairImageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RepairImages and returns the data saved in the database.
     * @param {RepairImageCreateManyAndReturnArgs} args - Arguments to create many RepairImages.
     * @example
     * // Create many RepairImages
     * const repairImage = await prisma.repairImage.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RepairImages and only return the `id`
     * const repairImageWithIdOnly = await prisma.repairImage.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RepairImageCreateManyAndReturnArgs>(args?: SelectSubset<T, RepairImageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RepairImagePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a RepairImage.
     * @param {RepairImageDeleteArgs} args - Arguments to delete one RepairImage.
     * @example
     * // Delete one RepairImage
     * const RepairImage = await prisma.repairImage.delete({
     *   where: {
     *     // ... filter to delete one RepairImage
     *   }
     * })
     * 
     */
    delete<T extends RepairImageDeleteArgs>(args: SelectSubset<T, RepairImageDeleteArgs<ExtArgs>>): Prisma__RepairImageClient<$Result.GetResult<Prisma.$RepairImagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RepairImage.
     * @param {RepairImageUpdateArgs} args - Arguments to update one RepairImage.
     * @example
     * // Update one RepairImage
     * const repairImage = await prisma.repairImage.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RepairImageUpdateArgs>(args: SelectSubset<T, RepairImageUpdateArgs<ExtArgs>>): Prisma__RepairImageClient<$Result.GetResult<Prisma.$RepairImagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RepairImages.
     * @param {RepairImageDeleteManyArgs} args - Arguments to filter RepairImages to delete.
     * @example
     * // Delete a few RepairImages
     * const { count } = await prisma.repairImage.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RepairImageDeleteManyArgs>(args?: SelectSubset<T, RepairImageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RepairImages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RepairImageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RepairImages
     * const repairImage = await prisma.repairImage.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RepairImageUpdateManyArgs>(args: SelectSubset<T, RepairImageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RepairImages and returns the data updated in the database.
     * @param {RepairImageUpdateManyAndReturnArgs} args - Arguments to update many RepairImages.
     * @example
     * // Update many RepairImages
     * const repairImage = await prisma.repairImage.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more RepairImages and only return the `id`
     * const repairImageWithIdOnly = await prisma.repairImage.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RepairImageUpdateManyAndReturnArgs>(args: SelectSubset<T, RepairImageUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RepairImagePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one RepairImage.
     * @param {RepairImageUpsertArgs} args - Arguments to update or create a RepairImage.
     * @example
     * // Update or create a RepairImage
     * const repairImage = await prisma.repairImage.upsert({
     *   create: {
     *     // ... data to create a RepairImage
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RepairImage we want to update
     *   }
     * })
     */
    upsert<T extends RepairImageUpsertArgs>(args: SelectSubset<T, RepairImageUpsertArgs<ExtArgs>>): Prisma__RepairImageClient<$Result.GetResult<Prisma.$RepairImagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RepairImages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RepairImageCountArgs} args - Arguments to filter RepairImages to count.
     * @example
     * // Count the number of RepairImages
     * const count = await prisma.repairImage.count({
     *   where: {
     *     // ... the filter for the RepairImages we want to count
     *   }
     * })
    **/
    count<T extends RepairImageCountArgs>(
      args?: Subset<T, RepairImageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RepairImageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RepairImage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RepairImageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RepairImageAggregateArgs>(args: Subset<T, RepairImageAggregateArgs>): Prisma.PrismaPromise<GetRepairImageAggregateType<T>>

    /**
     * Group by RepairImage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RepairImageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RepairImageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RepairImageGroupByArgs['orderBy'] }
        : { orderBy?: RepairImageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RepairImageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRepairImageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RepairImage model
   */
  readonly fields: RepairImageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RepairImage.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RepairImageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    repairRequest<T extends RepairRequestDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RepairRequestDefaultArgs<ExtArgs>>): Prisma__RepairRequestClient<$Result.GetResult<Prisma.$RepairRequestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the RepairImage model
   */
  interface RepairImageFieldRefs {
    readonly id: FieldRef<"RepairImage", 'Int'>
    readonly repairRequestId: FieldRef<"RepairImage", 'Int'>
    readonly url: FieldRef<"RepairImage", 'String'>
    readonly uploadedAt: FieldRef<"RepairImage", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * RepairImage findUnique
   */
  export type RepairImageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RepairImage
     */
    select?: RepairImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RepairImage
     */
    omit?: RepairImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepairImageInclude<ExtArgs> | null
    /**
     * Filter, which RepairImage to fetch.
     */
    where: RepairImageWhereUniqueInput
  }

  /**
   * RepairImage findUniqueOrThrow
   */
  export type RepairImageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RepairImage
     */
    select?: RepairImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RepairImage
     */
    omit?: RepairImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepairImageInclude<ExtArgs> | null
    /**
     * Filter, which RepairImage to fetch.
     */
    where: RepairImageWhereUniqueInput
  }

  /**
   * RepairImage findFirst
   */
  export type RepairImageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RepairImage
     */
    select?: RepairImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RepairImage
     */
    omit?: RepairImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepairImageInclude<ExtArgs> | null
    /**
     * Filter, which RepairImage to fetch.
     */
    where?: RepairImageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RepairImages to fetch.
     */
    orderBy?: RepairImageOrderByWithRelationInput | RepairImageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RepairImages.
     */
    cursor?: RepairImageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RepairImages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RepairImages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RepairImages.
     */
    distinct?: RepairImageScalarFieldEnum | RepairImageScalarFieldEnum[]
  }

  /**
   * RepairImage findFirstOrThrow
   */
  export type RepairImageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RepairImage
     */
    select?: RepairImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RepairImage
     */
    omit?: RepairImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepairImageInclude<ExtArgs> | null
    /**
     * Filter, which RepairImage to fetch.
     */
    where?: RepairImageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RepairImages to fetch.
     */
    orderBy?: RepairImageOrderByWithRelationInput | RepairImageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RepairImages.
     */
    cursor?: RepairImageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RepairImages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RepairImages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RepairImages.
     */
    distinct?: RepairImageScalarFieldEnum | RepairImageScalarFieldEnum[]
  }

  /**
   * RepairImage findMany
   */
  export type RepairImageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RepairImage
     */
    select?: RepairImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RepairImage
     */
    omit?: RepairImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepairImageInclude<ExtArgs> | null
    /**
     * Filter, which RepairImages to fetch.
     */
    where?: RepairImageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RepairImages to fetch.
     */
    orderBy?: RepairImageOrderByWithRelationInput | RepairImageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RepairImages.
     */
    cursor?: RepairImageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RepairImages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RepairImages.
     */
    skip?: number
    distinct?: RepairImageScalarFieldEnum | RepairImageScalarFieldEnum[]
  }

  /**
   * RepairImage create
   */
  export type RepairImageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RepairImage
     */
    select?: RepairImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RepairImage
     */
    omit?: RepairImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepairImageInclude<ExtArgs> | null
    /**
     * The data needed to create a RepairImage.
     */
    data: XOR<RepairImageCreateInput, RepairImageUncheckedCreateInput>
  }

  /**
   * RepairImage createMany
   */
  export type RepairImageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RepairImages.
     */
    data: RepairImageCreateManyInput | RepairImageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RepairImage createManyAndReturn
   */
  export type RepairImageCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RepairImage
     */
    select?: RepairImageSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RepairImage
     */
    omit?: RepairImageOmit<ExtArgs> | null
    /**
     * The data used to create many RepairImages.
     */
    data: RepairImageCreateManyInput | RepairImageCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepairImageIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * RepairImage update
   */
  export type RepairImageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RepairImage
     */
    select?: RepairImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RepairImage
     */
    omit?: RepairImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepairImageInclude<ExtArgs> | null
    /**
     * The data needed to update a RepairImage.
     */
    data: XOR<RepairImageUpdateInput, RepairImageUncheckedUpdateInput>
    /**
     * Choose, which RepairImage to update.
     */
    where: RepairImageWhereUniqueInput
  }

  /**
   * RepairImage updateMany
   */
  export type RepairImageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RepairImages.
     */
    data: XOR<RepairImageUpdateManyMutationInput, RepairImageUncheckedUpdateManyInput>
    /**
     * Filter which RepairImages to update
     */
    where?: RepairImageWhereInput
    /**
     * Limit how many RepairImages to update.
     */
    limit?: number
  }

  /**
   * RepairImage updateManyAndReturn
   */
  export type RepairImageUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RepairImage
     */
    select?: RepairImageSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RepairImage
     */
    omit?: RepairImageOmit<ExtArgs> | null
    /**
     * The data used to update RepairImages.
     */
    data: XOR<RepairImageUpdateManyMutationInput, RepairImageUncheckedUpdateManyInput>
    /**
     * Filter which RepairImages to update
     */
    where?: RepairImageWhereInput
    /**
     * Limit how many RepairImages to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepairImageIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * RepairImage upsert
   */
  export type RepairImageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RepairImage
     */
    select?: RepairImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RepairImage
     */
    omit?: RepairImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepairImageInclude<ExtArgs> | null
    /**
     * The filter to search for the RepairImage to update in case it exists.
     */
    where: RepairImageWhereUniqueInput
    /**
     * In case the RepairImage found by the `where` argument doesn't exist, create a new RepairImage with this data.
     */
    create: XOR<RepairImageCreateInput, RepairImageUncheckedCreateInput>
    /**
     * In case the RepairImage was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RepairImageUpdateInput, RepairImageUncheckedUpdateInput>
  }

  /**
   * RepairImage delete
   */
  export type RepairImageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RepairImage
     */
    select?: RepairImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RepairImage
     */
    omit?: RepairImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepairImageInclude<ExtArgs> | null
    /**
     * Filter which RepairImage to delete.
     */
    where: RepairImageWhereUniqueInput
  }

  /**
   * RepairImage deleteMany
   */
  export type RepairImageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RepairImages to delete
     */
    where?: RepairImageWhereInput
    /**
     * Limit how many RepairImages to delete.
     */
    limit?: number
  }

  /**
   * RepairImage without action
   */
  export type RepairImageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RepairImage
     */
    select?: RepairImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RepairImage
     */
    omit?: RepairImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepairImageInclude<ExtArgs> | null
  }


  /**
   * Model RepairDetail
   */

  export type AggregateRepairDetail = {
    _count: RepairDetailCountAggregateOutputType | null
    _avg: RepairDetailAvgAggregateOutputType | null
    _sum: RepairDetailSumAggregateOutputType | null
    _min: RepairDetailMinAggregateOutputType | null
    _max: RepairDetailMaxAggregateOutputType | null
  }

  export type RepairDetailAvgAggregateOutputType = {
    id: number | null
    repairRequestId: number | null
    technicianId: number | null
  }

  export type RepairDetailSumAggregateOutputType = {
    id: number | null
    repairRequestId: number | null
    technicianId: number | null
  }

  export type RepairDetailMinAggregateOutputType = {
    id: number | null
    repairRequestId: number | null
    notes: string | null
    technicianId: number | null
    updatedAt: Date | null
  }

  export type RepairDetailMaxAggregateOutputType = {
    id: number | null
    repairRequestId: number | null
    notes: string | null
    technicianId: number | null
    updatedAt: Date | null
  }

  export type RepairDetailCountAggregateOutputType = {
    id: number
    repairRequestId: number
    notes: number
    technicianId: number
    updatedAt: number
    _all: number
  }


  export type RepairDetailAvgAggregateInputType = {
    id?: true
    repairRequestId?: true
    technicianId?: true
  }

  export type RepairDetailSumAggregateInputType = {
    id?: true
    repairRequestId?: true
    technicianId?: true
  }

  export type RepairDetailMinAggregateInputType = {
    id?: true
    repairRequestId?: true
    notes?: true
    technicianId?: true
    updatedAt?: true
  }

  export type RepairDetailMaxAggregateInputType = {
    id?: true
    repairRequestId?: true
    notes?: true
    technicianId?: true
    updatedAt?: true
  }

  export type RepairDetailCountAggregateInputType = {
    id?: true
    repairRequestId?: true
    notes?: true
    technicianId?: true
    updatedAt?: true
    _all?: true
  }

  export type RepairDetailAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RepairDetail to aggregate.
     */
    where?: RepairDetailWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RepairDetails to fetch.
     */
    orderBy?: RepairDetailOrderByWithRelationInput | RepairDetailOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RepairDetailWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RepairDetails from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RepairDetails.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RepairDetails
    **/
    _count?: true | RepairDetailCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RepairDetailAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RepairDetailSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RepairDetailMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RepairDetailMaxAggregateInputType
  }

  export type GetRepairDetailAggregateType<T extends RepairDetailAggregateArgs> = {
        [P in keyof T & keyof AggregateRepairDetail]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRepairDetail[P]>
      : GetScalarType<T[P], AggregateRepairDetail[P]>
  }




  export type RepairDetailGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RepairDetailWhereInput
    orderBy?: RepairDetailOrderByWithAggregationInput | RepairDetailOrderByWithAggregationInput[]
    by: RepairDetailScalarFieldEnum[] | RepairDetailScalarFieldEnum
    having?: RepairDetailScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RepairDetailCountAggregateInputType | true
    _avg?: RepairDetailAvgAggregateInputType
    _sum?: RepairDetailSumAggregateInputType
    _min?: RepairDetailMinAggregateInputType
    _max?: RepairDetailMaxAggregateInputType
  }

  export type RepairDetailGroupByOutputType = {
    id: number
    repairRequestId: number
    notes: string | null
    technicianId: number | null
    updatedAt: Date
    _count: RepairDetailCountAggregateOutputType | null
    _avg: RepairDetailAvgAggregateOutputType | null
    _sum: RepairDetailSumAggregateOutputType | null
    _min: RepairDetailMinAggregateOutputType | null
    _max: RepairDetailMaxAggregateOutputType | null
  }

  type GetRepairDetailGroupByPayload<T extends RepairDetailGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RepairDetailGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RepairDetailGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RepairDetailGroupByOutputType[P]>
            : GetScalarType<T[P], RepairDetailGroupByOutputType[P]>
        }
      >
    >


  export type RepairDetailSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    repairRequestId?: boolean
    notes?: boolean
    technicianId?: boolean
    updatedAt?: boolean
    repairRequest?: boolean | RepairRequestDefaultArgs<ExtArgs>
    technician?: boolean | RepairDetail$technicianArgs<ExtArgs>
    parts?: boolean | RepairDetail$partsArgs<ExtArgs>
    _count?: boolean | RepairDetailCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["repairDetail"]>

  export type RepairDetailSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    repairRequestId?: boolean
    notes?: boolean
    technicianId?: boolean
    updatedAt?: boolean
    repairRequest?: boolean | RepairRequestDefaultArgs<ExtArgs>
    technician?: boolean | RepairDetail$technicianArgs<ExtArgs>
  }, ExtArgs["result"]["repairDetail"]>

  export type RepairDetailSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    repairRequestId?: boolean
    notes?: boolean
    technicianId?: boolean
    updatedAt?: boolean
    repairRequest?: boolean | RepairRequestDefaultArgs<ExtArgs>
    technician?: boolean | RepairDetail$technicianArgs<ExtArgs>
  }, ExtArgs["result"]["repairDetail"]>

  export type RepairDetailSelectScalar = {
    id?: boolean
    repairRequestId?: boolean
    notes?: boolean
    technicianId?: boolean
    updatedAt?: boolean
  }

  export type RepairDetailOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "repairRequestId" | "notes" | "technicianId" | "updatedAt", ExtArgs["result"]["repairDetail"]>
  export type RepairDetailInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    repairRequest?: boolean | RepairRequestDefaultArgs<ExtArgs>
    technician?: boolean | RepairDetail$technicianArgs<ExtArgs>
    parts?: boolean | RepairDetail$partsArgs<ExtArgs>
    _count?: boolean | RepairDetailCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type RepairDetailIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    repairRequest?: boolean | RepairRequestDefaultArgs<ExtArgs>
    technician?: boolean | RepairDetail$technicianArgs<ExtArgs>
  }
  export type RepairDetailIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    repairRequest?: boolean | RepairRequestDefaultArgs<ExtArgs>
    technician?: boolean | RepairDetail$technicianArgs<ExtArgs>
  }

  export type $RepairDetailPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RepairDetail"
    objects: {
      repairRequest: Prisma.$RepairRequestPayload<ExtArgs>
      technician: Prisma.$UserPayload<ExtArgs> | null
      parts: Prisma.$RepairPartPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      repairRequestId: number
      notes: string | null
      technicianId: number | null
      updatedAt: Date
    }, ExtArgs["result"]["repairDetail"]>
    composites: {}
  }

  type RepairDetailGetPayload<S extends boolean | null | undefined | RepairDetailDefaultArgs> = $Result.GetResult<Prisma.$RepairDetailPayload, S>

  type RepairDetailCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RepairDetailFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RepairDetailCountAggregateInputType | true
    }

  export interface RepairDetailDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RepairDetail'], meta: { name: 'RepairDetail' } }
    /**
     * Find zero or one RepairDetail that matches the filter.
     * @param {RepairDetailFindUniqueArgs} args - Arguments to find a RepairDetail
     * @example
     * // Get one RepairDetail
     * const repairDetail = await prisma.repairDetail.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RepairDetailFindUniqueArgs>(args: SelectSubset<T, RepairDetailFindUniqueArgs<ExtArgs>>): Prisma__RepairDetailClient<$Result.GetResult<Prisma.$RepairDetailPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RepairDetail that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RepairDetailFindUniqueOrThrowArgs} args - Arguments to find a RepairDetail
     * @example
     * // Get one RepairDetail
     * const repairDetail = await prisma.repairDetail.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RepairDetailFindUniqueOrThrowArgs>(args: SelectSubset<T, RepairDetailFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RepairDetailClient<$Result.GetResult<Prisma.$RepairDetailPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RepairDetail that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RepairDetailFindFirstArgs} args - Arguments to find a RepairDetail
     * @example
     * // Get one RepairDetail
     * const repairDetail = await prisma.repairDetail.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RepairDetailFindFirstArgs>(args?: SelectSubset<T, RepairDetailFindFirstArgs<ExtArgs>>): Prisma__RepairDetailClient<$Result.GetResult<Prisma.$RepairDetailPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RepairDetail that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RepairDetailFindFirstOrThrowArgs} args - Arguments to find a RepairDetail
     * @example
     * // Get one RepairDetail
     * const repairDetail = await prisma.repairDetail.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RepairDetailFindFirstOrThrowArgs>(args?: SelectSubset<T, RepairDetailFindFirstOrThrowArgs<ExtArgs>>): Prisma__RepairDetailClient<$Result.GetResult<Prisma.$RepairDetailPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RepairDetails that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RepairDetailFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RepairDetails
     * const repairDetails = await prisma.repairDetail.findMany()
     * 
     * // Get first 10 RepairDetails
     * const repairDetails = await prisma.repairDetail.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const repairDetailWithIdOnly = await prisma.repairDetail.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RepairDetailFindManyArgs>(args?: SelectSubset<T, RepairDetailFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RepairDetailPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RepairDetail.
     * @param {RepairDetailCreateArgs} args - Arguments to create a RepairDetail.
     * @example
     * // Create one RepairDetail
     * const RepairDetail = await prisma.repairDetail.create({
     *   data: {
     *     // ... data to create a RepairDetail
     *   }
     * })
     * 
     */
    create<T extends RepairDetailCreateArgs>(args: SelectSubset<T, RepairDetailCreateArgs<ExtArgs>>): Prisma__RepairDetailClient<$Result.GetResult<Prisma.$RepairDetailPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RepairDetails.
     * @param {RepairDetailCreateManyArgs} args - Arguments to create many RepairDetails.
     * @example
     * // Create many RepairDetails
     * const repairDetail = await prisma.repairDetail.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RepairDetailCreateManyArgs>(args?: SelectSubset<T, RepairDetailCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RepairDetails and returns the data saved in the database.
     * @param {RepairDetailCreateManyAndReturnArgs} args - Arguments to create many RepairDetails.
     * @example
     * // Create many RepairDetails
     * const repairDetail = await prisma.repairDetail.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RepairDetails and only return the `id`
     * const repairDetailWithIdOnly = await prisma.repairDetail.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RepairDetailCreateManyAndReturnArgs>(args?: SelectSubset<T, RepairDetailCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RepairDetailPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a RepairDetail.
     * @param {RepairDetailDeleteArgs} args - Arguments to delete one RepairDetail.
     * @example
     * // Delete one RepairDetail
     * const RepairDetail = await prisma.repairDetail.delete({
     *   where: {
     *     // ... filter to delete one RepairDetail
     *   }
     * })
     * 
     */
    delete<T extends RepairDetailDeleteArgs>(args: SelectSubset<T, RepairDetailDeleteArgs<ExtArgs>>): Prisma__RepairDetailClient<$Result.GetResult<Prisma.$RepairDetailPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RepairDetail.
     * @param {RepairDetailUpdateArgs} args - Arguments to update one RepairDetail.
     * @example
     * // Update one RepairDetail
     * const repairDetail = await prisma.repairDetail.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RepairDetailUpdateArgs>(args: SelectSubset<T, RepairDetailUpdateArgs<ExtArgs>>): Prisma__RepairDetailClient<$Result.GetResult<Prisma.$RepairDetailPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RepairDetails.
     * @param {RepairDetailDeleteManyArgs} args - Arguments to filter RepairDetails to delete.
     * @example
     * // Delete a few RepairDetails
     * const { count } = await prisma.repairDetail.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RepairDetailDeleteManyArgs>(args?: SelectSubset<T, RepairDetailDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RepairDetails.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RepairDetailUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RepairDetails
     * const repairDetail = await prisma.repairDetail.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RepairDetailUpdateManyArgs>(args: SelectSubset<T, RepairDetailUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RepairDetails and returns the data updated in the database.
     * @param {RepairDetailUpdateManyAndReturnArgs} args - Arguments to update many RepairDetails.
     * @example
     * // Update many RepairDetails
     * const repairDetail = await prisma.repairDetail.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more RepairDetails and only return the `id`
     * const repairDetailWithIdOnly = await prisma.repairDetail.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RepairDetailUpdateManyAndReturnArgs>(args: SelectSubset<T, RepairDetailUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RepairDetailPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one RepairDetail.
     * @param {RepairDetailUpsertArgs} args - Arguments to update or create a RepairDetail.
     * @example
     * // Update or create a RepairDetail
     * const repairDetail = await prisma.repairDetail.upsert({
     *   create: {
     *     // ... data to create a RepairDetail
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RepairDetail we want to update
     *   }
     * })
     */
    upsert<T extends RepairDetailUpsertArgs>(args: SelectSubset<T, RepairDetailUpsertArgs<ExtArgs>>): Prisma__RepairDetailClient<$Result.GetResult<Prisma.$RepairDetailPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RepairDetails.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RepairDetailCountArgs} args - Arguments to filter RepairDetails to count.
     * @example
     * // Count the number of RepairDetails
     * const count = await prisma.repairDetail.count({
     *   where: {
     *     // ... the filter for the RepairDetails we want to count
     *   }
     * })
    **/
    count<T extends RepairDetailCountArgs>(
      args?: Subset<T, RepairDetailCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RepairDetailCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RepairDetail.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RepairDetailAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RepairDetailAggregateArgs>(args: Subset<T, RepairDetailAggregateArgs>): Prisma.PrismaPromise<GetRepairDetailAggregateType<T>>

    /**
     * Group by RepairDetail.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RepairDetailGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RepairDetailGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RepairDetailGroupByArgs['orderBy'] }
        : { orderBy?: RepairDetailGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RepairDetailGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRepairDetailGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RepairDetail model
   */
  readonly fields: RepairDetailFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RepairDetail.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RepairDetailClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    repairRequest<T extends RepairRequestDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RepairRequestDefaultArgs<ExtArgs>>): Prisma__RepairRequestClient<$Result.GetResult<Prisma.$RepairRequestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    technician<T extends RepairDetail$technicianArgs<ExtArgs> = {}>(args?: Subset<T, RepairDetail$technicianArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    parts<T extends RepairDetail$partsArgs<ExtArgs> = {}>(args?: Subset<T, RepairDetail$partsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RepairPartPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the RepairDetail model
   */
  interface RepairDetailFieldRefs {
    readonly id: FieldRef<"RepairDetail", 'Int'>
    readonly repairRequestId: FieldRef<"RepairDetail", 'Int'>
    readonly notes: FieldRef<"RepairDetail", 'String'>
    readonly technicianId: FieldRef<"RepairDetail", 'Int'>
    readonly updatedAt: FieldRef<"RepairDetail", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * RepairDetail findUnique
   */
  export type RepairDetailFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RepairDetail
     */
    select?: RepairDetailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RepairDetail
     */
    omit?: RepairDetailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepairDetailInclude<ExtArgs> | null
    /**
     * Filter, which RepairDetail to fetch.
     */
    where: RepairDetailWhereUniqueInput
  }

  /**
   * RepairDetail findUniqueOrThrow
   */
  export type RepairDetailFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RepairDetail
     */
    select?: RepairDetailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RepairDetail
     */
    omit?: RepairDetailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepairDetailInclude<ExtArgs> | null
    /**
     * Filter, which RepairDetail to fetch.
     */
    where: RepairDetailWhereUniqueInput
  }

  /**
   * RepairDetail findFirst
   */
  export type RepairDetailFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RepairDetail
     */
    select?: RepairDetailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RepairDetail
     */
    omit?: RepairDetailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepairDetailInclude<ExtArgs> | null
    /**
     * Filter, which RepairDetail to fetch.
     */
    where?: RepairDetailWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RepairDetails to fetch.
     */
    orderBy?: RepairDetailOrderByWithRelationInput | RepairDetailOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RepairDetails.
     */
    cursor?: RepairDetailWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RepairDetails from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RepairDetails.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RepairDetails.
     */
    distinct?: RepairDetailScalarFieldEnum | RepairDetailScalarFieldEnum[]
  }

  /**
   * RepairDetail findFirstOrThrow
   */
  export type RepairDetailFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RepairDetail
     */
    select?: RepairDetailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RepairDetail
     */
    omit?: RepairDetailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepairDetailInclude<ExtArgs> | null
    /**
     * Filter, which RepairDetail to fetch.
     */
    where?: RepairDetailWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RepairDetails to fetch.
     */
    orderBy?: RepairDetailOrderByWithRelationInput | RepairDetailOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RepairDetails.
     */
    cursor?: RepairDetailWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RepairDetails from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RepairDetails.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RepairDetails.
     */
    distinct?: RepairDetailScalarFieldEnum | RepairDetailScalarFieldEnum[]
  }

  /**
   * RepairDetail findMany
   */
  export type RepairDetailFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RepairDetail
     */
    select?: RepairDetailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RepairDetail
     */
    omit?: RepairDetailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepairDetailInclude<ExtArgs> | null
    /**
     * Filter, which RepairDetails to fetch.
     */
    where?: RepairDetailWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RepairDetails to fetch.
     */
    orderBy?: RepairDetailOrderByWithRelationInput | RepairDetailOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RepairDetails.
     */
    cursor?: RepairDetailWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RepairDetails from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RepairDetails.
     */
    skip?: number
    distinct?: RepairDetailScalarFieldEnum | RepairDetailScalarFieldEnum[]
  }

  /**
   * RepairDetail create
   */
  export type RepairDetailCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RepairDetail
     */
    select?: RepairDetailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RepairDetail
     */
    omit?: RepairDetailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepairDetailInclude<ExtArgs> | null
    /**
     * The data needed to create a RepairDetail.
     */
    data: XOR<RepairDetailCreateInput, RepairDetailUncheckedCreateInput>
  }

  /**
   * RepairDetail createMany
   */
  export type RepairDetailCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RepairDetails.
     */
    data: RepairDetailCreateManyInput | RepairDetailCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RepairDetail createManyAndReturn
   */
  export type RepairDetailCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RepairDetail
     */
    select?: RepairDetailSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RepairDetail
     */
    omit?: RepairDetailOmit<ExtArgs> | null
    /**
     * The data used to create many RepairDetails.
     */
    data: RepairDetailCreateManyInput | RepairDetailCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepairDetailIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * RepairDetail update
   */
  export type RepairDetailUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RepairDetail
     */
    select?: RepairDetailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RepairDetail
     */
    omit?: RepairDetailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepairDetailInclude<ExtArgs> | null
    /**
     * The data needed to update a RepairDetail.
     */
    data: XOR<RepairDetailUpdateInput, RepairDetailUncheckedUpdateInput>
    /**
     * Choose, which RepairDetail to update.
     */
    where: RepairDetailWhereUniqueInput
  }

  /**
   * RepairDetail updateMany
   */
  export type RepairDetailUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RepairDetails.
     */
    data: XOR<RepairDetailUpdateManyMutationInput, RepairDetailUncheckedUpdateManyInput>
    /**
     * Filter which RepairDetails to update
     */
    where?: RepairDetailWhereInput
    /**
     * Limit how many RepairDetails to update.
     */
    limit?: number
  }

  /**
   * RepairDetail updateManyAndReturn
   */
  export type RepairDetailUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RepairDetail
     */
    select?: RepairDetailSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RepairDetail
     */
    omit?: RepairDetailOmit<ExtArgs> | null
    /**
     * The data used to update RepairDetails.
     */
    data: XOR<RepairDetailUpdateManyMutationInput, RepairDetailUncheckedUpdateManyInput>
    /**
     * Filter which RepairDetails to update
     */
    where?: RepairDetailWhereInput
    /**
     * Limit how many RepairDetails to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepairDetailIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * RepairDetail upsert
   */
  export type RepairDetailUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RepairDetail
     */
    select?: RepairDetailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RepairDetail
     */
    omit?: RepairDetailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepairDetailInclude<ExtArgs> | null
    /**
     * The filter to search for the RepairDetail to update in case it exists.
     */
    where: RepairDetailWhereUniqueInput
    /**
     * In case the RepairDetail found by the `where` argument doesn't exist, create a new RepairDetail with this data.
     */
    create: XOR<RepairDetailCreateInput, RepairDetailUncheckedCreateInput>
    /**
     * In case the RepairDetail was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RepairDetailUpdateInput, RepairDetailUncheckedUpdateInput>
  }

  /**
   * RepairDetail delete
   */
  export type RepairDetailDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RepairDetail
     */
    select?: RepairDetailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RepairDetail
     */
    omit?: RepairDetailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepairDetailInclude<ExtArgs> | null
    /**
     * Filter which RepairDetail to delete.
     */
    where: RepairDetailWhereUniqueInput
  }

  /**
   * RepairDetail deleteMany
   */
  export type RepairDetailDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RepairDetails to delete
     */
    where?: RepairDetailWhereInput
    /**
     * Limit how many RepairDetails to delete.
     */
    limit?: number
  }

  /**
   * RepairDetail.technician
   */
  export type RepairDetail$technicianArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * RepairDetail.parts
   */
  export type RepairDetail$partsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RepairPart
     */
    select?: RepairPartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RepairPart
     */
    omit?: RepairPartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepairPartInclude<ExtArgs> | null
    where?: RepairPartWhereInput
    orderBy?: RepairPartOrderByWithRelationInput | RepairPartOrderByWithRelationInput[]
    cursor?: RepairPartWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RepairPartScalarFieldEnum | RepairPartScalarFieldEnum[]
  }

  /**
   * RepairDetail without action
   */
  export type RepairDetailDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RepairDetail
     */
    select?: RepairDetailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RepairDetail
     */
    omit?: RepairDetailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepairDetailInclude<ExtArgs> | null
  }


  /**
   * Model RepairPart
   */

  export type AggregateRepairPart = {
    _count: RepairPartCountAggregateOutputType | null
    _avg: RepairPartAvgAggregateOutputType | null
    _sum: RepairPartSumAggregateOutputType | null
    _min: RepairPartMinAggregateOutputType | null
    _max: RepairPartMaxAggregateOutputType | null
  }

  export type RepairPartAvgAggregateOutputType = {
    id: number | null
    detailId: number | null
    price: number | null
    quantity: number | null
  }

  export type RepairPartSumAggregateOutputType = {
    id: number | null
    detailId: number | null
    price: number | null
    quantity: number | null
  }

  export type RepairPartMinAggregateOutputType = {
    id: number | null
    detailId: number | null
    partName: string | null
    price: number | null
    quantity: number | null
  }

  export type RepairPartMaxAggregateOutputType = {
    id: number | null
    detailId: number | null
    partName: string | null
    price: number | null
    quantity: number | null
  }

  export type RepairPartCountAggregateOutputType = {
    id: number
    detailId: number
    partName: number
    price: number
    quantity: number
    _all: number
  }


  export type RepairPartAvgAggregateInputType = {
    id?: true
    detailId?: true
    price?: true
    quantity?: true
  }

  export type RepairPartSumAggregateInputType = {
    id?: true
    detailId?: true
    price?: true
    quantity?: true
  }

  export type RepairPartMinAggregateInputType = {
    id?: true
    detailId?: true
    partName?: true
    price?: true
    quantity?: true
  }

  export type RepairPartMaxAggregateInputType = {
    id?: true
    detailId?: true
    partName?: true
    price?: true
    quantity?: true
  }

  export type RepairPartCountAggregateInputType = {
    id?: true
    detailId?: true
    partName?: true
    price?: true
    quantity?: true
    _all?: true
  }

  export type RepairPartAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RepairPart to aggregate.
     */
    where?: RepairPartWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RepairParts to fetch.
     */
    orderBy?: RepairPartOrderByWithRelationInput | RepairPartOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RepairPartWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RepairParts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RepairParts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RepairParts
    **/
    _count?: true | RepairPartCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RepairPartAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RepairPartSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RepairPartMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RepairPartMaxAggregateInputType
  }

  export type GetRepairPartAggregateType<T extends RepairPartAggregateArgs> = {
        [P in keyof T & keyof AggregateRepairPart]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRepairPart[P]>
      : GetScalarType<T[P], AggregateRepairPart[P]>
  }




  export type RepairPartGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RepairPartWhereInput
    orderBy?: RepairPartOrderByWithAggregationInput | RepairPartOrderByWithAggregationInput[]
    by: RepairPartScalarFieldEnum[] | RepairPartScalarFieldEnum
    having?: RepairPartScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RepairPartCountAggregateInputType | true
    _avg?: RepairPartAvgAggregateInputType
    _sum?: RepairPartSumAggregateInputType
    _min?: RepairPartMinAggregateInputType
    _max?: RepairPartMaxAggregateInputType
  }

  export type RepairPartGroupByOutputType = {
    id: number
    detailId: number
    partName: string
    price: number
    quantity: number
    _count: RepairPartCountAggregateOutputType | null
    _avg: RepairPartAvgAggregateOutputType | null
    _sum: RepairPartSumAggregateOutputType | null
    _min: RepairPartMinAggregateOutputType | null
    _max: RepairPartMaxAggregateOutputType | null
  }

  type GetRepairPartGroupByPayload<T extends RepairPartGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RepairPartGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RepairPartGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RepairPartGroupByOutputType[P]>
            : GetScalarType<T[P], RepairPartGroupByOutputType[P]>
        }
      >
    >


  export type RepairPartSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    detailId?: boolean
    partName?: boolean
    price?: boolean
    quantity?: boolean
    detail?: boolean | RepairDetailDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["repairPart"]>

  export type RepairPartSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    detailId?: boolean
    partName?: boolean
    price?: boolean
    quantity?: boolean
    detail?: boolean | RepairDetailDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["repairPart"]>

  export type RepairPartSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    detailId?: boolean
    partName?: boolean
    price?: boolean
    quantity?: boolean
    detail?: boolean | RepairDetailDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["repairPart"]>

  export type RepairPartSelectScalar = {
    id?: boolean
    detailId?: boolean
    partName?: boolean
    price?: boolean
    quantity?: boolean
  }

  export type RepairPartOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "detailId" | "partName" | "price" | "quantity", ExtArgs["result"]["repairPart"]>
  export type RepairPartInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    detail?: boolean | RepairDetailDefaultArgs<ExtArgs>
  }
  export type RepairPartIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    detail?: boolean | RepairDetailDefaultArgs<ExtArgs>
  }
  export type RepairPartIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    detail?: boolean | RepairDetailDefaultArgs<ExtArgs>
  }

  export type $RepairPartPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RepairPart"
    objects: {
      detail: Prisma.$RepairDetailPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      detailId: number
      partName: string
      price: number
      quantity: number
    }, ExtArgs["result"]["repairPart"]>
    composites: {}
  }

  type RepairPartGetPayload<S extends boolean | null | undefined | RepairPartDefaultArgs> = $Result.GetResult<Prisma.$RepairPartPayload, S>

  type RepairPartCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RepairPartFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RepairPartCountAggregateInputType | true
    }

  export interface RepairPartDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RepairPart'], meta: { name: 'RepairPart' } }
    /**
     * Find zero or one RepairPart that matches the filter.
     * @param {RepairPartFindUniqueArgs} args - Arguments to find a RepairPart
     * @example
     * // Get one RepairPart
     * const repairPart = await prisma.repairPart.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RepairPartFindUniqueArgs>(args: SelectSubset<T, RepairPartFindUniqueArgs<ExtArgs>>): Prisma__RepairPartClient<$Result.GetResult<Prisma.$RepairPartPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RepairPart that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RepairPartFindUniqueOrThrowArgs} args - Arguments to find a RepairPart
     * @example
     * // Get one RepairPart
     * const repairPart = await prisma.repairPart.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RepairPartFindUniqueOrThrowArgs>(args: SelectSubset<T, RepairPartFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RepairPartClient<$Result.GetResult<Prisma.$RepairPartPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RepairPart that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RepairPartFindFirstArgs} args - Arguments to find a RepairPart
     * @example
     * // Get one RepairPart
     * const repairPart = await prisma.repairPart.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RepairPartFindFirstArgs>(args?: SelectSubset<T, RepairPartFindFirstArgs<ExtArgs>>): Prisma__RepairPartClient<$Result.GetResult<Prisma.$RepairPartPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RepairPart that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RepairPartFindFirstOrThrowArgs} args - Arguments to find a RepairPart
     * @example
     * // Get one RepairPart
     * const repairPart = await prisma.repairPart.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RepairPartFindFirstOrThrowArgs>(args?: SelectSubset<T, RepairPartFindFirstOrThrowArgs<ExtArgs>>): Prisma__RepairPartClient<$Result.GetResult<Prisma.$RepairPartPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RepairParts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RepairPartFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RepairParts
     * const repairParts = await prisma.repairPart.findMany()
     * 
     * // Get first 10 RepairParts
     * const repairParts = await prisma.repairPart.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const repairPartWithIdOnly = await prisma.repairPart.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RepairPartFindManyArgs>(args?: SelectSubset<T, RepairPartFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RepairPartPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RepairPart.
     * @param {RepairPartCreateArgs} args - Arguments to create a RepairPart.
     * @example
     * // Create one RepairPart
     * const RepairPart = await prisma.repairPart.create({
     *   data: {
     *     // ... data to create a RepairPart
     *   }
     * })
     * 
     */
    create<T extends RepairPartCreateArgs>(args: SelectSubset<T, RepairPartCreateArgs<ExtArgs>>): Prisma__RepairPartClient<$Result.GetResult<Prisma.$RepairPartPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RepairParts.
     * @param {RepairPartCreateManyArgs} args - Arguments to create many RepairParts.
     * @example
     * // Create many RepairParts
     * const repairPart = await prisma.repairPart.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RepairPartCreateManyArgs>(args?: SelectSubset<T, RepairPartCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RepairParts and returns the data saved in the database.
     * @param {RepairPartCreateManyAndReturnArgs} args - Arguments to create many RepairParts.
     * @example
     * // Create many RepairParts
     * const repairPart = await prisma.repairPart.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RepairParts and only return the `id`
     * const repairPartWithIdOnly = await prisma.repairPart.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RepairPartCreateManyAndReturnArgs>(args?: SelectSubset<T, RepairPartCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RepairPartPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a RepairPart.
     * @param {RepairPartDeleteArgs} args - Arguments to delete one RepairPart.
     * @example
     * // Delete one RepairPart
     * const RepairPart = await prisma.repairPart.delete({
     *   where: {
     *     // ... filter to delete one RepairPart
     *   }
     * })
     * 
     */
    delete<T extends RepairPartDeleteArgs>(args: SelectSubset<T, RepairPartDeleteArgs<ExtArgs>>): Prisma__RepairPartClient<$Result.GetResult<Prisma.$RepairPartPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RepairPart.
     * @param {RepairPartUpdateArgs} args - Arguments to update one RepairPart.
     * @example
     * // Update one RepairPart
     * const repairPart = await prisma.repairPart.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RepairPartUpdateArgs>(args: SelectSubset<T, RepairPartUpdateArgs<ExtArgs>>): Prisma__RepairPartClient<$Result.GetResult<Prisma.$RepairPartPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RepairParts.
     * @param {RepairPartDeleteManyArgs} args - Arguments to filter RepairParts to delete.
     * @example
     * // Delete a few RepairParts
     * const { count } = await prisma.repairPart.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RepairPartDeleteManyArgs>(args?: SelectSubset<T, RepairPartDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RepairParts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RepairPartUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RepairParts
     * const repairPart = await prisma.repairPart.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RepairPartUpdateManyArgs>(args: SelectSubset<T, RepairPartUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RepairParts and returns the data updated in the database.
     * @param {RepairPartUpdateManyAndReturnArgs} args - Arguments to update many RepairParts.
     * @example
     * // Update many RepairParts
     * const repairPart = await prisma.repairPart.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more RepairParts and only return the `id`
     * const repairPartWithIdOnly = await prisma.repairPart.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RepairPartUpdateManyAndReturnArgs>(args: SelectSubset<T, RepairPartUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RepairPartPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one RepairPart.
     * @param {RepairPartUpsertArgs} args - Arguments to update or create a RepairPart.
     * @example
     * // Update or create a RepairPart
     * const repairPart = await prisma.repairPart.upsert({
     *   create: {
     *     // ... data to create a RepairPart
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RepairPart we want to update
     *   }
     * })
     */
    upsert<T extends RepairPartUpsertArgs>(args: SelectSubset<T, RepairPartUpsertArgs<ExtArgs>>): Prisma__RepairPartClient<$Result.GetResult<Prisma.$RepairPartPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RepairParts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RepairPartCountArgs} args - Arguments to filter RepairParts to count.
     * @example
     * // Count the number of RepairParts
     * const count = await prisma.repairPart.count({
     *   where: {
     *     // ... the filter for the RepairParts we want to count
     *   }
     * })
    **/
    count<T extends RepairPartCountArgs>(
      args?: Subset<T, RepairPartCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RepairPartCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RepairPart.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RepairPartAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RepairPartAggregateArgs>(args: Subset<T, RepairPartAggregateArgs>): Prisma.PrismaPromise<GetRepairPartAggregateType<T>>

    /**
     * Group by RepairPart.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RepairPartGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RepairPartGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RepairPartGroupByArgs['orderBy'] }
        : { orderBy?: RepairPartGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RepairPartGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRepairPartGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RepairPart model
   */
  readonly fields: RepairPartFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RepairPart.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RepairPartClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    detail<T extends RepairDetailDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RepairDetailDefaultArgs<ExtArgs>>): Prisma__RepairDetailClient<$Result.GetResult<Prisma.$RepairDetailPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the RepairPart model
   */
  interface RepairPartFieldRefs {
    readonly id: FieldRef<"RepairPart", 'Int'>
    readonly detailId: FieldRef<"RepairPart", 'Int'>
    readonly partName: FieldRef<"RepairPart", 'String'>
    readonly price: FieldRef<"RepairPart", 'Float'>
    readonly quantity: FieldRef<"RepairPart", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * RepairPart findUnique
   */
  export type RepairPartFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RepairPart
     */
    select?: RepairPartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RepairPart
     */
    omit?: RepairPartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepairPartInclude<ExtArgs> | null
    /**
     * Filter, which RepairPart to fetch.
     */
    where: RepairPartWhereUniqueInput
  }

  /**
   * RepairPart findUniqueOrThrow
   */
  export type RepairPartFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RepairPart
     */
    select?: RepairPartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RepairPart
     */
    omit?: RepairPartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepairPartInclude<ExtArgs> | null
    /**
     * Filter, which RepairPart to fetch.
     */
    where: RepairPartWhereUniqueInput
  }

  /**
   * RepairPart findFirst
   */
  export type RepairPartFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RepairPart
     */
    select?: RepairPartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RepairPart
     */
    omit?: RepairPartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepairPartInclude<ExtArgs> | null
    /**
     * Filter, which RepairPart to fetch.
     */
    where?: RepairPartWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RepairParts to fetch.
     */
    orderBy?: RepairPartOrderByWithRelationInput | RepairPartOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RepairParts.
     */
    cursor?: RepairPartWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RepairParts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RepairParts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RepairParts.
     */
    distinct?: RepairPartScalarFieldEnum | RepairPartScalarFieldEnum[]
  }

  /**
   * RepairPart findFirstOrThrow
   */
  export type RepairPartFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RepairPart
     */
    select?: RepairPartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RepairPart
     */
    omit?: RepairPartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepairPartInclude<ExtArgs> | null
    /**
     * Filter, which RepairPart to fetch.
     */
    where?: RepairPartWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RepairParts to fetch.
     */
    orderBy?: RepairPartOrderByWithRelationInput | RepairPartOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RepairParts.
     */
    cursor?: RepairPartWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RepairParts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RepairParts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RepairParts.
     */
    distinct?: RepairPartScalarFieldEnum | RepairPartScalarFieldEnum[]
  }

  /**
   * RepairPart findMany
   */
  export type RepairPartFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RepairPart
     */
    select?: RepairPartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RepairPart
     */
    omit?: RepairPartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepairPartInclude<ExtArgs> | null
    /**
     * Filter, which RepairParts to fetch.
     */
    where?: RepairPartWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RepairParts to fetch.
     */
    orderBy?: RepairPartOrderByWithRelationInput | RepairPartOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RepairParts.
     */
    cursor?: RepairPartWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RepairParts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RepairParts.
     */
    skip?: number
    distinct?: RepairPartScalarFieldEnum | RepairPartScalarFieldEnum[]
  }

  /**
   * RepairPart create
   */
  export type RepairPartCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RepairPart
     */
    select?: RepairPartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RepairPart
     */
    omit?: RepairPartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepairPartInclude<ExtArgs> | null
    /**
     * The data needed to create a RepairPart.
     */
    data: XOR<RepairPartCreateInput, RepairPartUncheckedCreateInput>
  }

  /**
   * RepairPart createMany
   */
  export type RepairPartCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RepairParts.
     */
    data: RepairPartCreateManyInput | RepairPartCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RepairPart createManyAndReturn
   */
  export type RepairPartCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RepairPart
     */
    select?: RepairPartSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RepairPart
     */
    omit?: RepairPartOmit<ExtArgs> | null
    /**
     * The data used to create many RepairParts.
     */
    data: RepairPartCreateManyInput | RepairPartCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepairPartIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * RepairPart update
   */
  export type RepairPartUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RepairPart
     */
    select?: RepairPartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RepairPart
     */
    omit?: RepairPartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepairPartInclude<ExtArgs> | null
    /**
     * The data needed to update a RepairPart.
     */
    data: XOR<RepairPartUpdateInput, RepairPartUncheckedUpdateInput>
    /**
     * Choose, which RepairPart to update.
     */
    where: RepairPartWhereUniqueInput
  }

  /**
   * RepairPart updateMany
   */
  export type RepairPartUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RepairParts.
     */
    data: XOR<RepairPartUpdateManyMutationInput, RepairPartUncheckedUpdateManyInput>
    /**
     * Filter which RepairParts to update
     */
    where?: RepairPartWhereInput
    /**
     * Limit how many RepairParts to update.
     */
    limit?: number
  }

  /**
   * RepairPart updateManyAndReturn
   */
  export type RepairPartUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RepairPart
     */
    select?: RepairPartSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RepairPart
     */
    omit?: RepairPartOmit<ExtArgs> | null
    /**
     * The data used to update RepairParts.
     */
    data: XOR<RepairPartUpdateManyMutationInput, RepairPartUncheckedUpdateManyInput>
    /**
     * Filter which RepairParts to update
     */
    where?: RepairPartWhereInput
    /**
     * Limit how many RepairParts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepairPartIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * RepairPart upsert
   */
  export type RepairPartUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RepairPart
     */
    select?: RepairPartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RepairPart
     */
    omit?: RepairPartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepairPartInclude<ExtArgs> | null
    /**
     * The filter to search for the RepairPart to update in case it exists.
     */
    where: RepairPartWhereUniqueInput
    /**
     * In case the RepairPart found by the `where` argument doesn't exist, create a new RepairPart with this data.
     */
    create: XOR<RepairPartCreateInput, RepairPartUncheckedCreateInput>
    /**
     * In case the RepairPart was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RepairPartUpdateInput, RepairPartUncheckedUpdateInput>
  }

  /**
   * RepairPart delete
   */
  export type RepairPartDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RepairPart
     */
    select?: RepairPartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RepairPart
     */
    omit?: RepairPartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepairPartInclude<ExtArgs> | null
    /**
     * Filter which RepairPart to delete.
     */
    where: RepairPartWhereUniqueInput
  }

  /**
   * RepairPart deleteMany
   */
  export type RepairPartDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RepairParts to delete
     */
    where?: RepairPartWhereInput
    /**
     * Limit how many RepairParts to delete.
     */
    limit?: number
  }

  /**
   * RepairPart without action
   */
  export type RepairPartDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RepairPart
     */
    select?: RepairPartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RepairPart
     */
    omit?: RepairPartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepairPartInclude<ExtArgs> | null
  }


  /**
   * Model Shipping
   */

  export type AggregateShipping = {
    _count: ShippingCountAggregateOutputType | null
    _avg: ShippingAvgAggregateOutputType | null
    _sum: ShippingSumAggregateOutputType | null
    _min: ShippingMinAggregateOutputType | null
    _max: ShippingMaxAggregateOutputType | null
  }

  export type ShippingAvgAggregateOutputType = {
    id: number | null
    repairRequestId: number | null
  }

  export type ShippingSumAggregateOutputType = {
    id: number | null
    repairRequestId: number | null
  }

  export type ShippingMinAggregateOutputType = {
    id: number | null
    repairRequestId: number | null
    company: string | null
    trackingNumber: string | null
    sentDate: Date | null
    status: string | null
  }

  export type ShippingMaxAggregateOutputType = {
    id: number | null
    repairRequestId: number | null
    company: string | null
    trackingNumber: string | null
    sentDate: Date | null
    status: string | null
  }

  export type ShippingCountAggregateOutputType = {
    id: number
    repairRequestId: number
    company: number
    trackingNumber: number
    sentDate: number
    status: number
    _all: number
  }


  export type ShippingAvgAggregateInputType = {
    id?: true
    repairRequestId?: true
  }

  export type ShippingSumAggregateInputType = {
    id?: true
    repairRequestId?: true
  }

  export type ShippingMinAggregateInputType = {
    id?: true
    repairRequestId?: true
    company?: true
    trackingNumber?: true
    sentDate?: true
    status?: true
  }

  export type ShippingMaxAggregateInputType = {
    id?: true
    repairRequestId?: true
    company?: true
    trackingNumber?: true
    sentDate?: true
    status?: true
  }

  export type ShippingCountAggregateInputType = {
    id?: true
    repairRequestId?: true
    company?: true
    trackingNumber?: true
    sentDate?: true
    status?: true
    _all?: true
  }

  export type ShippingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Shipping to aggregate.
     */
    where?: ShippingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Shippings to fetch.
     */
    orderBy?: ShippingOrderByWithRelationInput | ShippingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ShippingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Shippings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Shippings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Shippings
    **/
    _count?: true | ShippingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ShippingAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ShippingSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ShippingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ShippingMaxAggregateInputType
  }

  export type GetShippingAggregateType<T extends ShippingAggregateArgs> = {
        [P in keyof T & keyof AggregateShipping]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateShipping[P]>
      : GetScalarType<T[P], AggregateShipping[P]>
  }




  export type ShippingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ShippingWhereInput
    orderBy?: ShippingOrderByWithAggregationInput | ShippingOrderByWithAggregationInput[]
    by: ShippingScalarFieldEnum[] | ShippingScalarFieldEnum
    having?: ShippingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ShippingCountAggregateInputType | true
    _avg?: ShippingAvgAggregateInputType
    _sum?: ShippingSumAggregateInputType
    _min?: ShippingMinAggregateInputType
    _max?: ShippingMaxAggregateInputType
  }

  export type ShippingGroupByOutputType = {
    id: number
    repairRequestId: number
    company: string
    trackingNumber: string
    sentDate: Date
    status: string | null
    _count: ShippingCountAggregateOutputType | null
    _avg: ShippingAvgAggregateOutputType | null
    _sum: ShippingSumAggregateOutputType | null
    _min: ShippingMinAggregateOutputType | null
    _max: ShippingMaxAggregateOutputType | null
  }

  type GetShippingGroupByPayload<T extends ShippingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ShippingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ShippingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ShippingGroupByOutputType[P]>
            : GetScalarType<T[P], ShippingGroupByOutputType[P]>
        }
      >
    >


  export type ShippingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    repairRequestId?: boolean
    company?: boolean
    trackingNumber?: boolean
    sentDate?: boolean
    status?: boolean
    repairRequest?: boolean | RepairRequestDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["shipping"]>

  export type ShippingSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    repairRequestId?: boolean
    company?: boolean
    trackingNumber?: boolean
    sentDate?: boolean
    status?: boolean
    repairRequest?: boolean | RepairRequestDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["shipping"]>

  export type ShippingSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    repairRequestId?: boolean
    company?: boolean
    trackingNumber?: boolean
    sentDate?: boolean
    status?: boolean
    repairRequest?: boolean | RepairRequestDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["shipping"]>

  export type ShippingSelectScalar = {
    id?: boolean
    repairRequestId?: boolean
    company?: boolean
    trackingNumber?: boolean
    sentDate?: boolean
    status?: boolean
  }

  export type ShippingOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "repairRequestId" | "company" | "trackingNumber" | "sentDate" | "status", ExtArgs["result"]["shipping"]>
  export type ShippingInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    repairRequest?: boolean | RepairRequestDefaultArgs<ExtArgs>
  }
  export type ShippingIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    repairRequest?: boolean | RepairRequestDefaultArgs<ExtArgs>
  }
  export type ShippingIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    repairRequest?: boolean | RepairRequestDefaultArgs<ExtArgs>
  }

  export type $ShippingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Shipping"
    objects: {
      repairRequest: Prisma.$RepairRequestPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      repairRequestId: number
      company: string
      trackingNumber: string
      sentDate: Date
      status: string | null
    }, ExtArgs["result"]["shipping"]>
    composites: {}
  }

  type ShippingGetPayload<S extends boolean | null | undefined | ShippingDefaultArgs> = $Result.GetResult<Prisma.$ShippingPayload, S>

  type ShippingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ShippingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ShippingCountAggregateInputType | true
    }

  export interface ShippingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Shipping'], meta: { name: 'Shipping' } }
    /**
     * Find zero or one Shipping that matches the filter.
     * @param {ShippingFindUniqueArgs} args - Arguments to find a Shipping
     * @example
     * // Get one Shipping
     * const shipping = await prisma.shipping.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ShippingFindUniqueArgs>(args: SelectSubset<T, ShippingFindUniqueArgs<ExtArgs>>): Prisma__ShippingClient<$Result.GetResult<Prisma.$ShippingPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Shipping that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ShippingFindUniqueOrThrowArgs} args - Arguments to find a Shipping
     * @example
     * // Get one Shipping
     * const shipping = await prisma.shipping.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ShippingFindUniqueOrThrowArgs>(args: SelectSubset<T, ShippingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ShippingClient<$Result.GetResult<Prisma.$ShippingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Shipping that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShippingFindFirstArgs} args - Arguments to find a Shipping
     * @example
     * // Get one Shipping
     * const shipping = await prisma.shipping.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ShippingFindFirstArgs>(args?: SelectSubset<T, ShippingFindFirstArgs<ExtArgs>>): Prisma__ShippingClient<$Result.GetResult<Prisma.$ShippingPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Shipping that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShippingFindFirstOrThrowArgs} args - Arguments to find a Shipping
     * @example
     * // Get one Shipping
     * const shipping = await prisma.shipping.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ShippingFindFirstOrThrowArgs>(args?: SelectSubset<T, ShippingFindFirstOrThrowArgs<ExtArgs>>): Prisma__ShippingClient<$Result.GetResult<Prisma.$ShippingPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Shippings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShippingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Shippings
     * const shippings = await prisma.shipping.findMany()
     * 
     * // Get first 10 Shippings
     * const shippings = await prisma.shipping.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const shippingWithIdOnly = await prisma.shipping.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ShippingFindManyArgs>(args?: SelectSubset<T, ShippingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ShippingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Shipping.
     * @param {ShippingCreateArgs} args - Arguments to create a Shipping.
     * @example
     * // Create one Shipping
     * const Shipping = await prisma.shipping.create({
     *   data: {
     *     // ... data to create a Shipping
     *   }
     * })
     * 
     */
    create<T extends ShippingCreateArgs>(args: SelectSubset<T, ShippingCreateArgs<ExtArgs>>): Prisma__ShippingClient<$Result.GetResult<Prisma.$ShippingPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Shippings.
     * @param {ShippingCreateManyArgs} args - Arguments to create many Shippings.
     * @example
     * // Create many Shippings
     * const shipping = await prisma.shipping.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ShippingCreateManyArgs>(args?: SelectSubset<T, ShippingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Shippings and returns the data saved in the database.
     * @param {ShippingCreateManyAndReturnArgs} args - Arguments to create many Shippings.
     * @example
     * // Create many Shippings
     * const shipping = await prisma.shipping.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Shippings and only return the `id`
     * const shippingWithIdOnly = await prisma.shipping.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ShippingCreateManyAndReturnArgs>(args?: SelectSubset<T, ShippingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ShippingPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Shipping.
     * @param {ShippingDeleteArgs} args - Arguments to delete one Shipping.
     * @example
     * // Delete one Shipping
     * const Shipping = await prisma.shipping.delete({
     *   where: {
     *     // ... filter to delete one Shipping
     *   }
     * })
     * 
     */
    delete<T extends ShippingDeleteArgs>(args: SelectSubset<T, ShippingDeleteArgs<ExtArgs>>): Prisma__ShippingClient<$Result.GetResult<Prisma.$ShippingPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Shipping.
     * @param {ShippingUpdateArgs} args - Arguments to update one Shipping.
     * @example
     * // Update one Shipping
     * const shipping = await prisma.shipping.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ShippingUpdateArgs>(args: SelectSubset<T, ShippingUpdateArgs<ExtArgs>>): Prisma__ShippingClient<$Result.GetResult<Prisma.$ShippingPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Shippings.
     * @param {ShippingDeleteManyArgs} args - Arguments to filter Shippings to delete.
     * @example
     * // Delete a few Shippings
     * const { count } = await prisma.shipping.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ShippingDeleteManyArgs>(args?: SelectSubset<T, ShippingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Shippings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShippingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Shippings
     * const shipping = await prisma.shipping.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ShippingUpdateManyArgs>(args: SelectSubset<T, ShippingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Shippings and returns the data updated in the database.
     * @param {ShippingUpdateManyAndReturnArgs} args - Arguments to update many Shippings.
     * @example
     * // Update many Shippings
     * const shipping = await prisma.shipping.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Shippings and only return the `id`
     * const shippingWithIdOnly = await prisma.shipping.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ShippingUpdateManyAndReturnArgs>(args: SelectSubset<T, ShippingUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ShippingPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Shipping.
     * @param {ShippingUpsertArgs} args - Arguments to update or create a Shipping.
     * @example
     * // Update or create a Shipping
     * const shipping = await prisma.shipping.upsert({
     *   create: {
     *     // ... data to create a Shipping
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Shipping we want to update
     *   }
     * })
     */
    upsert<T extends ShippingUpsertArgs>(args: SelectSubset<T, ShippingUpsertArgs<ExtArgs>>): Prisma__ShippingClient<$Result.GetResult<Prisma.$ShippingPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Shippings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShippingCountArgs} args - Arguments to filter Shippings to count.
     * @example
     * // Count the number of Shippings
     * const count = await prisma.shipping.count({
     *   where: {
     *     // ... the filter for the Shippings we want to count
     *   }
     * })
    **/
    count<T extends ShippingCountArgs>(
      args?: Subset<T, ShippingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ShippingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Shipping.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShippingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ShippingAggregateArgs>(args: Subset<T, ShippingAggregateArgs>): Prisma.PrismaPromise<GetShippingAggregateType<T>>

    /**
     * Group by Shipping.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShippingGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ShippingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ShippingGroupByArgs['orderBy'] }
        : { orderBy?: ShippingGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ShippingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetShippingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Shipping model
   */
  readonly fields: ShippingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Shipping.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ShippingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    repairRequest<T extends RepairRequestDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RepairRequestDefaultArgs<ExtArgs>>): Prisma__RepairRequestClient<$Result.GetResult<Prisma.$RepairRequestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Shipping model
   */
  interface ShippingFieldRefs {
    readonly id: FieldRef<"Shipping", 'Int'>
    readonly repairRequestId: FieldRef<"Shipping", 'Int'>
    readonly company: FieldRef<"Shipping", 'String'>
    readonly trackingNumber: FieldRef<"Shipping", 'String'>
    readonly sentDate: FieldRef<"Shipping", 'DateTime'>
    readonly status: FieldRef<"Shipping", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Shipping findUnique
   */
  export type ShippingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shipping
     */
    select?: ShippingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Shipping
     */
    omit?: ShippingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShippingInclude<ExtArgs> | null
    /**
     * Filter, which Shipping to fetch.
     */
    where: ShippingWhereUniqueInput
  }

  /**
   * Shipping findUniqueOrThrow
   */
  export type ShippingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shipping
     */
    select?: ShippingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Shipping
     */
    omit?: ShippingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShippingInclude<ExtArgs> | null
    /**
     * Filter, which Shipping to fetch.
     */
    where: ShippingWhereUniqueInput
  }

  /**
   * Shipping findFirst
   */
  export type ShippingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shipping
     */
    select?: ShippingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Shipping
     */
    omit?: ShippingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShippingInclude<ExtArgs> | null
    /**
     * Filter, which Shipping to fetch.
     */
    where?: ShippingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Shippings to fetch.
     */
    orderBy?: ShippingOrderByWithRelationInput | ShippingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Shippings.
     */
    cursor?: ShippingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Shippings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Shippings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Shippings.
     */
    distinct?: ShippingScalarFieldEnum | ShippingScalarFieldEnum[]
  }

  /**
   * Shipping findFirstOrThrow
   */
  export type ShippingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shipping
     */
    select?: ShippingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Shipping
     */
    omit?: ShippingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShippingInclude<ExtArgs> | null
    /**
     * Filter, which Shipping to fetch.
     */
    where?: ShippingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Shippings to fetch.
     */
    orderBy?: ShippingOrderByWithRelationInput | ShippingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Shippings.
     */
    cursor?: ShippingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Shippings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Shippings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Shippings.
     */
    distinct?: ShippingScalarFieldEnum | ShippingScalarFieldEnum[]
  }

  /**
   * Shipping findMany
   */
  export type ShippingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shipping
     */
    select?: ShippingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Shipping
     */
    omit?: ShippingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShippingInclude<ExtArgs> | null
    /**
     * Filter, which Shippings to fetch.
     */
    where?: ShippingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Shippings to fetch.
     */
    orderBy?: ShippingOrderByWithRelationInput | ShippingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Shippings.
     */
    cursor?: ShippingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Shippings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Shippings.
     */
    skip?: number
    distinct?: ShippingScalarFieldEnum | ShippingScalarFieldEnum[]
  }

  /**
   * Shipping create
   */
  export type ShippingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shipping
     */
    select?: ShippingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Shipping
     */
    omit?: ShippingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShippingInclude<ExtArgs> | null
    /**
     * The data needed to create a Shipping.
     */
    data: XOR<ShippingCreateInput, ShippingUncheckedCreateInput>
  }

  /**
   * Shipping createMany
   */
  export type ShippingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Shippings.
     */
    data: ShippingCreateManyInput | ShippingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Shipping createManyAndReturn
   */
  export type ShippingCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shipping
     */
    select?: ShippingSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Shipping
     */
    omit?: ShippingOmit<ExtArgs> | null
    /**
     * The data used to create many Shippings.
     */
    data: ShippingCreateManyInput | ShippingCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShippingIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Shipping update
   */
  export type ShippingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shipping
     */
    select?: ShippingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Shipping
     */
    omit?: ShippingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShippingInclude<ExtArgs> | null
    /**
     * The data needed to update a Shipping.
     */
    data: XOR<ShippingUpdateInput, ShippingUncheckedUpdateInput>
    /**
     * Choose, which Shipping to update.
     */
    where: ShippingWhereUniqueInput
  }

  /**
   * Shipping updateMany
   */
  export type ShippingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Shippings.
     */
    data: XOR<ShippingUpdateManyMutationInput, ShippingUncheckedUpdateManyInput>
    /**
     * Filter which Shippings to update
     */
    where?: ShippingWhereInput
    /**
     * Limit how many Shippings to update.
     */
    limit?: number
  }

  /**
   * Shipping updateManyAndReturn
   */
  export type ShippingUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shipping
     */
    select?: ShippingSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Shipping
     */
    omit?: ShippingOmit<ExtArgs> | null
    /**
     * The data used to update Shippings.
     */
    data: XOR<ShippingUpdateManyMutationInput, ShippingUncheckedUpdateManyInput>
    /**
     * Filter which Shippings to update
     */
    where?: ShippingWhereInput
    /**
     * Limit how many Shippings to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShippingIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Shipping upsert
   */
  export type ShippingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shipping
     */
    select?: ShippingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Shipping
     */
    omit?: ShippingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShippingInclude<ExtArgs> | null
    /**
     * The filter to search for the Shipping to update in case it exists.
     */
    where: ShippingWhereUniqueInput
    /**
     * In case the Shipping found by the `where` argument doesn't exist, create a new Shipping with this data.
     */
    create: XOR<ShippingCreateInput, ShippingUncheckedCreateInput>
    /**
     * In case the Shipping was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ShippingUpdateInput, ShippingUncheckedUpdateInput>
  }

  /**
   * Shipping delete
   */
  export type ShippingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shipping
     */
    select?: ShippingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Shipping
     */
    omit?: ShippingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShippingInclude<ExtArgs> | null
    /**
     * Filter which Shipping to delete.
     */
    where: ShippingWhereUniqueInput
  }

  /**
   * Shipping deleteMany
   */
  export type ShippingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Shippings to delete
     */
    where?: ShippingWhereInput
    /**
     * Limit how many Shippings to delete.
     */
    limit?: number
  }

  /**
   * Shipping without action
   */
  export type ShippingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shipping
     */
    select?: ShippingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Shipping
     */
    omit?: ShippingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShippingInclude<ExtArgs> | null
  }


  /**
   * Model CloseRepair
   */

  export type AggregateCloseRepair = {
    _count: CloseRepairCountAggregateOutputType | null
    _avg: CloseRepairAvgAggregateOutputType | null
    _sum: CloseRepairSumAggregateOutputType | null
    _min: CloseRepairMinAggregateOutputType | null
    _max: CloseRepairMaxAggregateOutputType | null
  }

  export type CloseRepairAvgAggregateOutputType = {
    id: number | null
    repairRequestId: number | null
  }

  export type CloseRepairSumAggregateOutputType = {
    id: number | null
    repairRequestId: number | null
  }

  export type CloseRepairMinAggregateOutputType = {
    id: number | null
    repairRequestId: number | null
    finishedDate: Date | null
    receivedDate: Date | null
    receiptUrl: string | null
  }

  export type CloseRepairMaxAggregateOutputType = {
    id: number | null
    repairRequestId: number | null
    finishedDate: Date | null
    receivedDate: Date | null
    receiptUrl: string | null
  }

  export type CloseRepairCountAggregateOutputType = {
    id: number
    repairRequestId: number
    finishedDate: number
    receivedDate: number
    receiptUrl: number
    _all: number
  }


  export type CloseRepairAvgAggregateInputType = {
    id?: true
    repairRequestId?: true
  }

  export type CloseRepairSumAggregateInputType = {
    id?: true
    repairRequestId?: true
  }

  export type CloseRepairMinAggregateInputType = {
    id?: true
    repairRequestId?: true
    finishedDate?: true
    receivedDate?: true
    receiptUrl?: true
  }

  export type CloseRepairMaxAggregateInputType = {
    id?: true
    repairRequestId?: true
    finishedDate?: true
    receivedDate?: true
    receiptUrl?: true
  }

  export type CloseRepairCountAggregateInputType = {
    id?: true
    repairRequestId?: true
    finishedDate?: true
    receivedDate?: true
    receiptUrl?: true
    _all?: true
  }

  export type CloseRepairAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CloseRepair to aggregate.
     */
    where?: CloseRepairWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CloseRepairs to fetch.
     */
    orderBy?: CloseRepairOrderByWithRelationInput | CloseRepairOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CloseRepairWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CloseRepairs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CloseRepairs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CloseRepairs
    **/
    _count?: true | CloseRepairCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CloseRepairAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CloseRepairSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CloseRepairMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CloseRepairMaxAggregateInputType
  }

  export type GetCloseRepairAggregateType<T extends CloseRepairAggregateArgs> = {
        [P in keyof T & keyof AggregateCloseRepair]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCloseRepair[P]>
      : GetScalarType<T[P], AggregateCloseRepair[P]>
  }




  export type CloseRepairGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CloseRepairWhereInput
    orderBy?: CloseRepairOrderByWithAggregationInput | CloseRepairOrderByWithAggregationInput[]
    by: CloseRepairScalarFieldEnum[] | CloseRepairScalarFieldEnum
    having?: CloseRepairScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CloseRepairCountAggregateInputType | true
    _avg?: CloseRepairAvgAggregateInputType
    _sum?: CloseRepairSumAggregateInputType
    _min?: CloseRepairMinAggregateInputType
    _max?: CloseRepairMaxAggregateInputType
  }

  export type CloseRepairGroupByOutputType = {
    id: number
    repairRequestId: number
    finishedDate: Date
    receivedDate: Date | null
    receiptUrl: string | null
    _count: CloseRepairCountAggregateOutputType | null
    _avg: CloseRepairAvgAggregateOutputType | null
    _sum: CloseRepairSumAggregateOutputType | null
    _min: CloseRepairMinAggregateOutputType | null
    _max: CloseRepairMaxAggregateOutputType | null
  }

  type GetCloseRepairGroupByPayload<T extends CloseRepairGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CloseRepairGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CloseRepairGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CloseRepairGroupByOutputType[P]>
            : GetScalarType<T[P], CloseRepairGroupByOutputType[P]>
        }
      >
    >


  export type CloseRepairSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    repairRequestId?: boolean
    finishedDate?: boolean
    receivedDate?: boolean
    receiptUrl?: boolean
    repairRequest?: boolean | RepairRequestDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["closeRepair"]>

  export type CloseRepairSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    repairRequestId?: boolean
    finishedDate?: boolean
    receivedDate?: boolean
    receiptUrl?: boolean
    repairRequest?: boolean | RepairRequestDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["closeRepair"]>

  export type CloseRepairSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    repairRequestId?: boolean
    finishedDate?: boolean
    receivedDate?: boolean
    receiptUrl?: boolean
    repairRequest?: boolean | RepairRequestDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["closeRepair"]>

  export type CloseRepairSelectScalar = {
    id?: boolean
    repairRequestId?: boolean
    finishedDate?: boolean
    receivedDate?: boolean
    receiptUrl?: boolean
  }

  export type CloseRepairOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "repairRequestId" | "finishedDate" | "receivedDate" | "receiptUrl", ExtArgs["result"]["closeRepair"]>
  export type CloseRepairInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    repairRequest?: boolean | RepairRequestDefaultArgs<ExtArgs>
  }
  export type CloseRepairIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    repairRequest?: boolean | RepairRequestDefaultArgs<ExtArgs>
  }
  export type CloseRepairIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    repairRequest?: boolean | RepairRequestDefaultArgs<ExtArgs>
  }

  export type $CloseRepairPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CloseRepair"
    objects: {
      repairRequest: Prisma.$RepairRequestPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      repairRequestId: number
      finishedDate: Date
      receivedDate: Date | null
      receiptUrl: string | null
    }, ExtArgs["result"]["closeRepair"]>
    composites: {}
  }

  type CloseRepairGetPayload<S extends boolean | null | undefined | CloseRepairDefaultArgs> = $Result.GetResult<Prisma.$CloseRepairPayload, S>

  type CloseRepairCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CloseRepairFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CloseRepairCountAggregateInputType | true
    }

  export interface CloseRepairDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CloseRepair'], meta: { name: 'CloseRepair' } }
    /**
     * Find zero or one CloseRepair that matches the filter.
     * @param {CloseRepairFindUniqueArgs} args - Arguments to find a CloseRepair
     * @example
     * // Get one CloseRepair
     * const closeRepair = await prisma.closeRepair.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CloseRepairFindUniqueArgs>(args: SelectSubset<T, CloseRepairFindUniqueArgs<ExtArgs>>): Prisma__CloseRepairClient<$Result.GetResult<Prisma.$CloseRepairPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CloseRepair that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CloseRepairFindUniqueOrThrowArgs} args - Arguments to find a CloseRepair
     * @example
     * // Get one CloseRepair
     * const closeRepair = await prisma.closeRepair.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CloseRepairFindUniqueOrThrowArgs>(args: SelectSubset<T, CloseRepairFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CloseRepairClient<$Result.GetResult<Prisma.$CloseRepairPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CloseRepair that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CloseRepairFindFirstArgs} args - Arguments to find a CloseRepair
     * @example
     * // Get one CloseRepair
     * const closeRepair = await prisma.closeRepair.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CloseRepairFindFirstArgs>(args?: SelectSubset<T, CloseRepairFindFirstArgs<ExtArgs>>): Prisma__CloseRepairClient<$Result.GetResult<Prisma.$CloseRepairPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CloseRepair that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CloseRepairFindFirstOrThrowArgs} args - Arguments to find a CloseRepair
     * @example
     * // Get one CloseRepair
     * const closeRepair = await prisma.closeRepair.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CloseRepairFindFirstOrThrowArgs>(args?: SelectSubset<T, CloseRepairFindFirstOrThrowArgs<ExtArgs>>): Prisma__CloseRepairClient<$Result.GetResult<Prisma.$CloseRepairPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CloseRepairs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CloseRepairFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CloseRepairs
     * const closeRepairs = await prisma.closeRepair.findMany()
     * 
     * // Get first 10 CloseRepairs
     * const closeRepairs = await prisma.closeRepair.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const closeRepairWithIdOnly = await prisma.closeRepair.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CloseRepairFindManyArgs>(args?: SelectSubset<T, CloseRepairFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CloseRepairPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CloseRepair.
     * @param {CloseRepairCreateArgs} args - Arguments to create a CloseRepair.
     * @example
     * // Create one CloseRepair
     * const CloseRepair = await prisma.closeRepair.create({
     *   data: {
     *     // ... data to create a CloseRepair
     *   }
     * })
     * 
     */
    create<T extends CloseRepairCreateArgs>(args: SelectSubset<T, CloseRepairCreateArgs<ExtArgs>>): Prisma__CloseRepairClient<$Result.GetResult<Prisma.$CloseRepairPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CloseRepairs.
     * @param {CloseRepairCreateManyArgs} args - Arguments to create many CloseRepairs.
     * @example
     * // Create many CloseRepairs
     * const closeRepair = await prisma.closeRepair.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CloseRepairCreateManyArgs>(args?: SelectSubset<T, CloseRepairCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CloseRepairs and returns the data saved in the database.
     * @param {CloseRepairCreateManyAndReturnArgs} args - Arguments to create many CloseRepairs.
     * @example
     * // Create many CloseRepairs
     * const closeRepair = await prisma.closeRepair.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CloseRepairs and only return the `id`
     * const closeRepairWithIdOnly = await prisma.closeRepair.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CloseRepairCreateManyAndReturnArgs>(args?: SelectSubset<T, CloseRepairCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CloseRepairPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CloseRepair.
     * @param {CloseRepairDeleteArgs} args - Arguments to delete one CloseRepair.
     * @example
     * // Delete one CloseRepair
     * const CloseRepair = await prisma.closeRepair.delete({
     *   where: {
     *     // ... filter to delete one CloseRepair
     *   }
     * })
     * 
     */
    delete<T extends CloseRepairDeleteArgs>(args: SelectSubset<T, CloseRepairDeleteArgs<ExtArgs>>): Prisma__CloseRepairClient<$Result.GetResult<Prisma.$CloseRepairPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CloseRepair.
     * @param {CloseRepairUpdateArgs} args - Arguments to update one CloseRepair.
     * @example
     * // Update one CloseRepair
     * const closeRepair = await prisma.closeRepair.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CloseRepairUpdateArgs>(args: SelectSubset<T, CloseRepairUpdateArgs<ExtArgs>>): Prisma__CloseRepairClient<$Result.GetResult<Prisma.$CloseRepairPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CloseRepairs.
     * @param {CloseRepairDeleteManyArgs} args - Arguments to filter CloseRepairs to delete.
     * @example
     * // Delete a few CloseRepairs
     * const { count } = await prisma.closeRepair.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CloseRepairDeleteManyArgs>(args?: SelectSubset<T, CloseRepairDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CloseRepairs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CloseRepairUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CloseRepairs
     * const closeRepair = await prisma.closeRepair.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CloseRepairUpdateManyArgs>(args: SelectSubset<T, CloseRepairUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CloseRepairs and returns the data updated in the database.
     * @param {CloseRepairUpdateManyAndReturnArgs} args - Arguments to update many CloseRepairs.
     * @example
     * // Update many CloseRepairs
     * const closeRepair = await prisma.closeRepair.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CloseRepairs and only return the `id`
     * const closeRepairWithIdOnly = await prisma.closeRepair.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CloseRepairUpdateManyAndReturnArgs>(args: SelectSubset<T, CloseRepairUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CloseRepairPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CloseRepair.
     * @param {CloseRepairUpsertArgs} args - Arguments to update or create a CloseRepair.
     * @example
     * // Update or create a CloseRepair
     * const closeRepair = await prisma.closeRepair.upsert({
     *   create: {
     *     // ... data to create a CloseRepair
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CloseRepair we want to update
     *   }
     * })
     */
    upsert<T extends CloseRepairUpsertArgs>(args: SelectSubset<T, CloseRepairUpsertArgs<ExtArgs>>): Prisma__CloseRepairClient<$Result.GetResult<Prisma.$CloseRepairPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CloseRepairs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CloseRepairCountArgs} args - Arguments to filter CloseRepairs to count.
     * @example
     * // Count the number of CloseRepairs
     * const count = await prisma.closeRepair.count({
     *   where: {
     *     // ... the filter for the CloseRepairs we want to count
     *   }
     * })
    **/
    count<T extends CloseRepairCountArgs>(
      args?: Subset<T, CloseRepairCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CloseRepairCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CloseRepair.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CloseRepairAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CloseRepairAggregateArgs>(args: Subset<T, CloseRepairAggregateArgs>): Prisma.PrismaPromise<GetCloseRepairAggregateType<T>>

    /**
     * Group by CloseRepair.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CloseRepairGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CloseRepairGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CloseRepairGroupByArgs['orderBy'] }
        : { orderBy?: CloseRepairGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CloseRepairGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCloseRepairGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CloseRepair model
   */
  readonly fields: CloseRepairFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CloseRepair.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CloseRepairClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    repairRequest<T extends RepairRequestDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RepairRequestDefaultArgs<ExtArgs>>): Prisma__RepairRequestClient<$Result.GetResult<Prisma.$RepairRequestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CloseRepair model
   */
  interface CloseRepairFieldRefs {
    readonly id: FieldRef<"CloseRepair", 'Int'>
    readonly repairRequestId: FieldRef<"CloseRepair", 'Int'>
    readonly finishedDate: FieldRef<"CloseRepair", 'DateTime'>
    readonly receivedDate: FieldRef<"CloseRepair", 'DateTime'>
    readonly receiptUrl: FieldRef<"CloseRepair", 'String'>
  }
    

  // Custom InputTypes
  /**
   * CloseRepair findUnique
   */
  export type CloseRepairFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CloseRepair
     */
    select?: CloseRepairSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CloseRepair
     */
    omit?: CloseRepairOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CloseRepairInclude<ExtArgs> | null
    /**
     * Filter, which CloseRepair to fetch.
     */
    where: CloseRepairWhereUniqueInput
  }

  /**
   * CloseRepair findUniqueOrThrow
   */
  export type CloseRepairFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CloseRepair
     */
    select?: CloseRepairSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CloseRepair
     */
    omit?: CloseRepairOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CloseRepairInclude<ExtArgs> | null
    /**
     * Filter, which CloseRepair to fetch.
     */
    where: CloseRepairWhereUniqueInput
  }

  /**
   * CloseRepair findFirst
   */
  export type CloseRepairFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CloseRepair
     */
    select?: CloseRepairSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CloseRepair
     */
    omit?: CloseRepairOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CloseRepairInclude<ExtArgs> | null
    /**
     * Filter, which CloseRepair to fetch.
     */
    where?: CloseRepairWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CloseRepairs to fetch.
     */
    orderBy?: CloseRepairOrderByWithRelationInput | CloseRepairOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CloseRepairs.
     */
    cursor?: CloseRepairWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CloseRepairs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CloseRepairs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CloseRepairs.
     */
    distinct?: CloseRepairScalarFieldEnum | CloseRepairScalarFieldEnum[]
  }

  /**
   * CloseRepair findFirstOrThrow
   */
  export type CloseRepairFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CloseRepair
     */
    select?: CloseRepairSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CloseRepair
     */
    omit?: CloseRepairOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CloseRepairInclude<ExtArgs> | null
    /**
     * Filter, which CloseRepair to fetch.
     */
    where?: CloseRepairWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CloseRepairs to fetch.
     */
    orderBy?: CloseRepairOrderByWithRelationInput | CloseRepairOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CloseRepairs.
     */
    cursor?: CloseRepairWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CloseRepairs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CloseRepairs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CloseRepairs.
     */
    distinct?: CloseRepairScalarFieldEnum | CloseRepairScalarFieldEnum[]
  }

  /**
   * CloseRepair findMany
   */
  export type CloseRepairFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CloseRepair
     */
    select?: CloseRepairSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CloseRepair
     */
    omit?: CloseRepairOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CloseRepairInclude<ExtArgs> | null
    /**
     * Filter, which CloseRepairs to fetch.
     */
    where?: CloseRepairWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CloseRepairs to fetch.
     */
    orderBy?: CloseRepairOrderByWithRelationInput | CloseRepairOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CloseRepairs.
     */
    cursor?: CloseRepairWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CloseRepairs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CloseRepairs.
     */
    skip?: number
    distinct?: CloseRepairScalarFieldEnum | CloseRepairScalarFieldEnum[]
  }

  /**
   * CloseRepair create
   */
  export type CloseRepairCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CloseRepair
     */
    select?: CloseRepairSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CloseRepair
     */
    omit?: CloseRepairOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CloseRepairInclude<ExtArgs> | null
    /**
     * The data needed to create a CloseRepair.
     */
    data: XOR<CloseRepairCreateInput, CloseRepairUncheckedCreateInput>
  }

  /**
   * CloseRepair createMany
   */
  export type CloseRepairCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CloseRepairs.
     */
    data: CloseRepairCreateManyInput | CloseRepairCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CloseRepair createManyAndReturn
   */
  export type CloseRepairCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CloseRepair
     */
    select?: CloseRepairSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CloseRepair
     */
    omit?: CloseRepairOmit<ExtArgs> | null
    /**
     * The data used to create many CloseRepairs.
     */
    data: CloseRepairCreateManyInput | CloseRepairCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CloseRepairIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CloseRepair update
   */
  export type CloseRepairUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CloseRepair
     */
    select?: CloseRepairSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CloseRepair
     */
    omit?: CloseRepairOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CloseRepairInclude<ExtArgs> | null
    /**
     * The data needed to update a CloseRepair.
     */
    data: XOR<CloseRepairUpdateInput, CloseRepairUncheckedUpdateInput>
    /**
     * Choose, which CloseRepair to update.
     */
    where: CloseRepairWhereUniqueInput
  }

  /**
   * CloseRepair updateMany
   */
  export type CloseRepairUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CloseRepairs.
     */
    data: XOR<CloseRepairUpdateManyMutationInput, CloseRepairUncheckedUpdateManyInput>
    /**
     * Filter which CloseRepairs to update
     */
    where?: CloseRepairWhereInput
    /**
     * Limit how many CloseRepairs to update.
     */
    limit?: number
  }

  /**
   * CloseRepair updateManyAndReturn
   */
  export type CloseRepairUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CloseRepair
     */
    select?: CloseRepairSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CloseRepair
     */
    omit?: CloseRepairOmit<ExtArgs> | null
    /**
     * The data used to update CloseRepairs.
     */
    data: XOR<CloseRepairUpdateManyMutationInput, CloseRepairUncheckedUpdateManyInput>
    /**
     * Filter which CloseRepairs to update
     */
    where?: CloseRepairWhereInput
    /**
     * Limit how many CloseRepairs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CloseRepairIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * CloseRepair upsert
   */
  export type CloseRepairUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CloseRepair
     */
    select?: CloseRepairSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CloseRepair
     */
    omit?: CloseRepairOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CloseRepairInclude<ExtArgs> | null
    /**
     * The filter to search for the CloseRepair to update in case it exists.
     */
    where: CloseRepairWhereUniqueInput
    /**
     * In case the CloseRepair found by the `where` argument doesn't exist, create a new CloseRepair with this data.
     */
    create: XOR<CloseRepairCreateInput, CloseRepairUncheckedCreateInput>
    /**
     * In case the CloseRepair was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CloseRepairUpdateInput, CloseRepairUncheckedUpdateInput>
  }

  /**
   * CloseRepair delete
   */
  export type CloseRepairDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CloseRepair
     */
    select?: CloseRepairSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CloseRepair
     */
    omit?: CloseRepairOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CloseRepairInclude<ExtArgs> | null
    /**
     * Filter which CloseRepair to delete.
     */
    where: CloseRepairWhereUniqueInput
  }

  /**
   * CloseRepair deleteMany
   */
  export type CloseRepairDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CloseRepairs to delete
     */
    where?: CloseRepairWhereInput
    /**
     * Limit how many CloseRepairs to delete.
     */
    limit?: number
  }

  /**
   * CloseRepair without action
   */
  export type CloseRepairDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CloseRepair
     */
    select?: CloseRepairSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CloseRepair
     */
    omit?: CloseRepairOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CloseRepairInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    password: 'password',
    phone: 'phone',
    role: 'role',
    image: 'image',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const RepairRequestScalarFieldEnum: {
    id: 'id',
    printerModel: 'printerModel',
    serialNumber: 'serialNumber',
    customerId: 'customerId',
    address: 'address',
    issueDesc: 'issueDesc',
    accessories: 'accessories',
    requestDate: 'requestDate',
    contactInfo: 'contactInfo',
    status: 'status'
  };

  export type RepairRequestScalarFieldEnum = (typeof RepairRequestScalarFieldEnum)[keyof typeof RepairRequestScalarFieldEnum]


  export const RepairImageScalarFieldEnum: {
    id: 'id',
    repairRequestId: 'repairRequestId',
    url: 'url',
    uploadedAt: 'uploadedAt'
  };

  export type RepairImageScalarFieldEnum = (typeof RepairImageScalarFieldEnum)[keyof typeof RepairImageScalarFieldEnum]


  export const RepairDetailScalarFieldEnum: {
    id: 'id',
    repairRequestId: 'repairRequestId',
    notes: 'notes',
    technicianId: 'technicianId',
    updatedAt: 'updatedAt'
  };

  export type RepairDetailScalarFieldEnum = (typeof RepairDetailScalarFieldEnum)[keyof typeof RepairDetailScalarFieldEnum]


  export const RepairPartScalarFieldEnum: {
    id: 'id',
    detailId: 'detailId',
    partName: 'partName',
    price: 'price',
    quantity: 'quantity'
  };

  export type RepairPartScalarFieldEnum = (typeof RepairPartScalarFieldEnum)[keyof typeof RepairPartScalarFieldEnum]


  export const ShippingScalarFieldEnum: {
    id: 'id',
    repairRequestId: 'repairRequestId',
    company: 'company',
    trackingNumber: 'trackingNumber',
    sentDate: 'sentDate',
    status: 'status'
  };

  export type ShippingScalarFieldEnum = (typeof ShippingScalarFieldEnum)[keyof typeof ShippingScalarFieldEnum]


  export const CloseRepairScalarFieldEnum: {
    id: 'id',
    repairRequestId: 'repairRequestId',
    finishedDate: 'finishedDate',
    receivedDate: 'receivedDate',
    receiptUrl: 'receiptUrl'
  };

  export type CloseRepairScalarFieldEnum = (typeof CloseRepairScalarFieldEnum)[keyof typeof CloseRepairScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'Role[]'
   */
  export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'RepairStatus'
   */
  export type EnumRepairStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RepairStatus'>
    


  /**
   * Reference to a field of type 'RepairStatus[]'
   */
  export type ListEnumRepairStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RepairStatus[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: IntFilter<"User"> | number
    name?: StringNullableFilter<"User"> | string | null
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    phone?: StringNullableFilter<"User"> | string | null
    role?: EnumRoleFilter<"User"> | $Enums.Role
    image?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    repairRequests?: RepairRequestListRelationFilter
    assignedRepairs?: RepairDetailListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    email?: SortOrder
    password?: SortOrder
    phone?: SortOrderInput | SortOrder
    role?: SortOrder
    image?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    repairRequests?: RepairRequestOrderByRelationAggregateInput
    assignedRepairs?: RepairDetailOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringNullableFilter<"User"> | string | null
    password?: StringFilter<"User"> | string
    phone?: StringNullableFilter<"User"> | string | null
    role?: EnumRoleFilter<"User"> | $Enums.Role
    image?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    repairRequests?: RepairRequestListRelationFilter
    assignedRepairs?: RepairDetailListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    email?: SortOrder
    password?: SortOrder
    phone?: SortOrderInput | SortOrder
    role?: SortOrder
    image?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"User"> | number
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    phone?: StringNullableWithAggregatesFilter<"User"> | string | null
    role?: EnumRoleWithAggregatesFilter<"User"> | $Enums.Role
    image?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type RepairRequestWhereInput = {
    AND?: RepairRequestWhereInput | RepairRequestWhereInput[]
    OR?: RepairRequestWhereInput[]
    NOT?: RepairRequestWhereInput | RepairRequestWhereInput[]
    id?: IntFilter<"RepairRequest"> | number
    printerModel?: StringFilter<"RepairRequest"> | string
    serialNumber?: StringFilter<"RepairRequest"> | string
    customerId?: IntFilter<"RepairRequest"> | number
    address?: StringNullableFilter<"RepairRequest"> | string | null
    issueDesc?: StringFilter<"RepairRequest"> | string
    accessories?: StringNullableFilter<"RepairRequest"> | string | null
    requestDate?: DateTimeFilter<"RepairRequest"> | Date | string
    contactInfo?: StringNullableFilter<"RepairRequest"> | string | null
    status?: EnumRepairStatusFilter<"RepairRequest"> | $Enums.RepairStatus
    customer?: XOR<UserScalarRelationFilter, UserWhereInput>
    images?: RepairImageListRelationFilter
    details?: XOR<RepairDetailNullableScalarRelationFilter, RepairDetailWhereInput> | null
    shipping?: XOR<ShippingNullableScalarRelationFilter, ShippingWhereInput> | null
    closedJob?: XOR<CloseRepairNullableScalarRelationFilter, CloseRepairWhereInput> | null
  }

  export type RepairRequestOrderByWithRelationInput = {
    id?: SortOrder
    printerModel?: SortOrder
    serialNumber?: SortOrder
    customerId?: SortOrder
    address?: SortOrderInput | SortOrder
    issueDesc?: SortOrder
    accessories?: SortOrderInput | SortOrder
    requestDate?: SortOrder
    contactInfo?: SortOrderInput | SortOrder
    status?: SortOrder
    customer?: UserOrderByWithRelationInput
    images?: RepairImageOrderByRelationAggregateInput
    details?: RepairDetailOrderByWithRelationInput
    shipping?: ShippingOrderByWithRelationInput
    closedJob?: CloseRepairOrderByWithRelationInput
  }

  export type RepairRequestWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: RepairRequestWhereInput | RepairRequestWhereInput[]
    OR?: RepairRequestWhereInput[]
    NOT?: RepairRequestWhereInput | RepairRequestWhereInput[]
    printerModel?: StringFilter<"RepairRequest"> | string
    serialNumber?: StringFilter<"RepairRequest"> | string
    customerId?: IntFilter<"RepairRequest"> | number
    address?: StringNullableFilter<"RepairRequest"> | string | null
    issueDesc?: StringFilter<"RepairRequest"> | string
    accessories?: StringNullableFilter<"RepairRequest"> | string | null
    requestDate?: DateTimeFilter<"RepairRequest"> | Date | string
    contactInfo?: StringNullableFilter<"RepairRequest"> | string | null
    status?: EnumRepairStatusFilter<"RepairRequest"> | $Enums.RepairStatus
    customer?: XOR<UserScalarRelationFilter, UserWhereInput>
    images?: RepairImageListRelationFilter
    details?: XOR<RepairDetailNullableScalarRelationFilter, RepairDetailWhereInput> | null
    shipping?: XOR<ShippingNullableScalarRelationFilter, ShippingWhereInput> | null
    closedJob?: XOR<CloseRepairNullableScalarRelationFilter, CloseRepairWhereInput> | null
  }, "id">

  export type RepairRequestOrderByWithAggregationInput = {
    id?: SortOrder
    printerModel?: SortOrder
    serialNumber?: SortOrder
    customerId?: SortOrder
    address?: SortOrderInput | SortOrder
    issueDesc?: SortOrder
    accessories?: SortOrderInput | SortOrder
    requestDate?: SortOrder
    contactInfo?: SortOrderInput | SortOrder
    status?: SortOrder
    _count?: RepairRequestCountOrderByAggregateInput
    _avg?: RepairRequestAvgOrderByAggregateInput
    _max?: RepairRequestMaxOrderByAggregateInput
    _min?: RepairRequestMinOrderByAggregateInput
    _sum?: RepairRequestSumOrderByAggregateInput
  }

  export type RepairRequestScalarWhereWithAggregatesInput = {
    AND?: RepairRequestScalarWhereWithAggregatesInput | RepairRequestScalarWhereWithAggregatesInput[]
    OR?: RepairRequestScalarWhereWithAggregatesInput[]
    NOT?: RepairRequestScalarWhereWithAggregatesInput | RepairRequestScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"RepairRequest"> | number
    printerModel?: StringWithAggregatesFilter<"RepairRequest"> | string
    serialNumber?: StringWithAggregatesFilter<"RepairRequest"> | string
    customerId?: IntWithAggregatesFilter<"RepairRequest"> | number
    address?: StringNullableWithAggregatesFilter<"RepairRequest"> | string | null
    issueDesc?: StringWithAggregatesFilter<"RepairRequest"> | string
    accessories?: StringNullableWithAggregatesFilter<"RepairRequest"> | string | null
    requestDate?: DateTimeWithAggregatesFilter<"RepairRequest"> | Date | string
    contactInfo?: StringNullableWithAggregatesFilter<"RepairRequest"> | string | null
    status?: EnumRepairStatusWithAggregatesFilter<"RepairRequest"> | $Enums.RepairStatus
  }

  export type RepairImageWhereInput = {
    AND?: RepairImageWhereInput | RepairImageWhereInput[]
    OR?: RepairImageWhereInput[]
    NOT?: RepairImageWhereInput | RepairImageWhereInput[]
    id?: IntFilter<"RepairImage"> | number
    repairRequestId?: IntFilter<"RepairImage"> | number
    url?: StringFilter<"RepairImage"> | string
    uploadedAt?: DateTimeFilter<"RepairImage"> | Date | string
    repairRequest?: XOR<RepairRequestScalarRelationFilter, RepairRequestWhereInput>
  }

  export type RepairImageOrderByWithRelationInput = {
    id?: SortOrder
    repairRequestId?: SortOrder
    url?: SortOrder
    uploadedAt?: SortOrder
    repairRequest?: RepairRequestOrderByWithRelationInput
  }

  export type RepairImageWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: RepairImageWhereInput | RepairImageWhereInput[]
    OR?: RepairImageWhereInput[]
    NOT?: RepairImageWhereInput | RepairImageWhereInput[]
    repairRequestId?: IntFilter<"RepairImage"> | number
    url?: StringFilter<"RepairImage"> | string
    uploadedAt?: DateTimeFilter<"RepairImage"> | Date | string
    repairRequest?: XOR<RepairRequestScalarRelationFilter, RepairRequestWhereInput>
  }, "id">

  export type RepairImageOrderByWithAggregationInput = {
    id?: SortOrder
    repairRequestId?: SortOrder
    url?: SortOrder
    uploadedAt?: SortOrder
    _count?: RepairImageCountOrderByAggregateInput
    _avg?: RepairImageAvgOrderByAggregateInput
    _max?: RepairImageMaxOrderByAggregateInput
    _min?: RepairImageMinOrderByAggregateInput
    _sum?: RepairImageSumOrderByAggregateInput
  }

  export type RepairImageScalarWhereWithAggregatesInput = {
    AND?: RepairImageScalarWhereWithAggregatesInput | RepairImageScalarWhereWithAggregatesInput[]
    OR?: RepairImageScalarWhereWithAggregatesInput[]
    NOT?: RepairImageScalarWhereWithAggregatesInput | RepairImageScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"RepairImage"> | number
    repairRequestId?: IntWithAggregatesFilter<"RepairImage"> | number
    url?: StringWithAggregatesFilter<"RepairImage"> | string
    uploadedAt?: DateTimeWithAggregatesFilter<"RepairImage"> | Date | string
  }

  export type RepairDetailWhereInput = {
    AND?: RepairDetailWhereInput | RepairDetailWhereInput[]
    OR?: RepairDetailWhereInput[]
    NOT?: RepairDetailWhereInput | RepairDetailWhereInput[]
    id?: IntFilter<"RepairDetail"> | number
    repairRequestId?: IntFilter<"RepairDetail"> | number
    notes?: StringNullableFilter<"RepairDetail"> | string | null
    technicianId?: IntNullableFilter<"RepairDetail"> | number | null
    updatedAt?: DateTimeFilter<"RepairDetail"> | Date | string
    repairRequest?: XOR<RepairRequestScalarRelationFilter, RepairRequestWhereInput>
    technician?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    parts?: RepairPartListRelationFilter
  }

  export type RepairDetailOrderByWithRelationInput = {
    id?: SortOrder
    repairRequestId?: SortOrder
    notes?: SortOrderInput | SortOrder
    technicianId?: SortOrderInput | SortOrder
    updatedAt?: SortOrder
    repairRequest?: RepairRequestOrderByWithRelationInput
    technician?: UserOrderByWithRelationInput
    parts?: RepairPartOrderByRelationAggregateInput
  }

  export type RepairDetailWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    repairRequestId?: number
    AND?: RepairDetailWhereInput | RepairDetailWhereInput[]
    OR?: RepairDetailWhereInput[]
    NOT?: RepairDetailWhereInput | RepairDetailWhereInput[]
    notes?: StringNullableFilter<"RepairDetail"> | string | null
    technicianId?: IntNullableFilter<"RepairDetail"> | number | null
    updatedAt?: DateTimeFilter<"RepairDetail"> | Date | string
    repairRequest?: XOR<RepairRequestScalarRelationFilter, RepairRequestWhereInput>
    technician?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    parts?: RepairPartListRelationFilter
  }, "id" | "repairRequestId">

  export type RepairDetailOrderByWithAggregationInput = {
    id?: SortOrder
    repairRequestId?: SortOrder
    notes?: SortOrderInput | SortOrder
    technicianId?: SortOrderInput | SortOrder
    updatedAt?: SortOrder
    _count?: RepairDetailCountOrderByAggregateInput
    _avg?: RepairDetailAvgOrderByAggregateInput
    _max?: RepairDetailMaxOrderByAggregateInput
    _min?: RepairDetailMinOrderByAggregateInput
    _sum?: RepairDetailSumOrderByAggregateInput
  }

  export type RepairDetailScalarWhereWithAggregatesInput = {
    AND?: RepairDetailScalarWhereWithAggregatesInput | RepairDetailScalarWhereWithAggregatesInput[]
    OR?: RepairDetailScalarWhereWithAggregatesInput[]
    NOT?: RepairDetailScalarWhereWithAggregatesInput | RepairDetailScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"RepairDetail"> | number
    repairRequestId?: IntWithAggregatesFilter<"RepairDetail"> | number
    notes?: StringNullableWithAggregatesFilter<"RepairDetail"> | string | null
    technicianId?: IntNullableWithAggregatesFilter<"RepairDetail"> | number | null
    updatedAt?: DateTimeWithAggregatesFilter<"RepairDetail"> | Date | string
  }

  export type RepairPartWhereInput = {
    AND?: RepairPartWhereInput | RepairPartWhereInput[]
    OR?: RepairPartWhereInput[]
    NOT?: RepairPartWhereInput | RepairPartWhereInput[]
    id?: IntFilter<"RepairPart"> | number
    detailId?: IntFilter<"RepairPart"> | number
    partName?: StringFilter<"RepairPart"> | string
    price?: FloatFilter<"RepairPart"> | number
    quantity?: IntFilter<"RepairPart"> | number
    detail?: XOR<RepairDetailScalarRelationFilter, RepairDetailWhereInput>
  }

  export type RepairPartOrderByWithRelationInput = {
    id?: SortOrder
    detailId?: SortOrder
    partName?: SortOrder
    price?: SortOrder
    quantity?: SortOrder
    detail?: RepairDetailOrderByWithRelationInput
  }

  export type RepairPartWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: RepairPartWhereInput | RepairPartWhereInput[]
    OR?: RepairPartWhereInput[]
    NOT?: RepairPartWhereInput | RepairPartWhereInput[]
    detailId?: IntFilter<"RepairPart"> | number
    partName?: StringFilter<"RepairPart"> | string
    price?: FloatFilter<"RepairPart"> | number
    quantity?: IntFilter<"RepairPart"> | number
    detail?: XOR<RepairDetailScalarRelationFilter, RepairDetailWhereInput>
  }, "id">

  export type RepairPartOrderByWithAggregationInput = {
    id?: SortOrder
    detailId?: SortOrder
    partName?: SortOrder
    price?: SortOrder
    quantity?: SortOrder
    _count?: RepairPartCountOrderByAggregateInput
    _avg?: RepairPartAvgOrderByAggregateInput
    _max?: RepairPartMaxOrderByAggregateInput
    _min?: RepairPartMinOrderByAggregateInput
    _sum?: RepairPartSumOrderByAggregateInput
  }

  export type RepairPartScalarWhereWithAggregatesInput = {
    AND?: RepairPartScalarWhereWithAggregatesInput | RepairPartScalarWhereWithAggregatesInput[]
    OR?: RepairPartScalarWhereWithAggregatesInput[]
    NOT?: RepairPartScalarWhereWithAggregatesInput | RepairPartScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"RepairPart"> | number
    detailId?: IntWithAggregatesFilter<"RepairPart"> | number
    partName?: StringWithAggregatesFilter<"RepairPart"> | string
    price?: FloatWithAggregatesFilter<"RepairPart"> | number
    quantity?: IntWithAggregatesFilter<"RepairPart"> | number
  }

  export type ShippingWhereInput = {
    AND?: ShippingWhereInput | ShippingWhereInput[]
    OR?: ShippingWhereInput[]
    NOT?: ShippingWhereInput | ShippingWhereInput[]
    id?: IntFilter<"Shipping"> | number
    repairRequestId?: IntFilter<"Shipping"> | number
    company?: StringFilter<"Shipping"> | string
    trackingNumber?: StringFilter<"Shipping"> | string
    sentDate?: DateTimeFilter<"Shipping"> | Date | string
    status?: StringNullableFilter<"Shipping"> | string | null
    repairRequest?: XOR<RepairRequestScalarRelationFilter, RepairRequestWhereInput>
  }

  export type ShippingOrderByWithRelationInput = {
    id?: SortOrder
    repairRequestId?: SortOrder
    company?: SortOrder
    trackingNumber?: SortOrder
    sentDate?: SortOrder
    status?: SortOrderInput | SortOrder
    repairRequest?: RepairRequestOrderByWithRelationInput
  }

  export type ShippingWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    repairRequestId?: number
    AND?: ShippingWhereInput | ShippingWhereInput[]
    OR?: ShippingWhereInput[]
    NOT?: ShippingWhereInput | ShippingWhereInput[]
    company?: StringFilter<"Shipping"> | string
    trackingNumber?: StringFilter<"Shipping"> | string
    sentDate?: DateTimeFilter<"Shipping"> | Date | string
    status?: StringNullableFilter<"Shipping"> | string | null
    repairRequest?: XOR<RepairRequestScalarRelationFilter, RepairRequestWhereInput>
  }, "id" | "repairRequestId">

  export type ShippingOrderByWithAggregationInput = {
    id?: SortOrder
    repairRequestId?: SortOrder
    company?: SortOrder
    trackingNumber?: SortOrder
    sentDate?: SortOrder
    status?: SortOrderInput | SortOrder
    _count?: ShippingCountOrderByAggregateInput
    _avg?: ShippingAvgOrderByAggregateInput
    _max?: ShippingMaxOrderByAggregateInput
    _min?: ShippingMinOrderByAggregateInput
    _sum?: ShippingSumOrderByAggregateInput
  }

  export type ShippingScalarWhereWithAggregatesInput = {
    AND?: ShippingScalarWhereWithAggregatesInput | ShippingScalarWhereWithAggregatesInput[]
    OR?: ShippingScalarWhereWithAggregatesInput[]
    NOT?: ShippingScalarWhereWithAggregatesInput | ShippingScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Shipping"> | number
    repairRequestId?: IntWithAggregatesFilter<"Shipping"> | number
    company?: StringWithAggregatesFilter<"Shipping"> | string
    trackingNumber?: StringWithAggregatesFilter<"Shipping"> | string
    sentDate?: DateTimeWithAggregatesFilter<"Shipping"> | Date | string
    status?: StringNullableWithAggregatesFilter<"Shipping"> | string | null
  }

  export type CloseRepairWhereInput = {
    AND?: CloseRepairWhereInput | CloseRepairWhereInput[]
    OR?: CloseRepairWhereInput[]
    NOT?: CloseRepairWhereInput | CloseRepairWhereInput[]
    id?: IntFilter<"CloseRepair"> | number
    repairRequestId?: IntFilter<"CloseRepair"> | number
    finishedDate?: DateTimeFilter<"CloseRepair"> | Date | string
    receivedDate?: DateTimeNullableFilter<"CloseRepair"> | Date | string | null
    receiptUrl?: StringNullableFilter<"CloseRepair"> | string | null
    repairRequest?: XOR<RepairRequestScalarRelationFilter, RepairRequestWhereInput>
  }

  export type CloseRepairOrderByWithRelationInput = {
    id?: SortOrder
    repairRequestId?: SortOrder
    finishedDate?: SortOrder
    receivedDate?: SortOrderInput | SortOrder
    receiptUrl?: SortOrderInput | SortOrder
    repairRequest?: RepairRequestOrderByWithRelationInput
  }

  export type CloseRepairWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    repairRequestId?: number
    AND?: CloseRepairWhereInput | CloseRepairWhereInput[]
    OR?: CloseRepairWhereInput[]
    NOT?: CloseRepairWhereInput | CloseRepairWhereInput[]
    finishedDate?: DateTimeFilter<"CloseRepair"> | Date | string
    receivedDate?: DateTimeNullableFilter<"CloseRepair"> | Date | string | null
    receiptUrl?: StringNullableFilter<"CloseRepair"> | string | null
    repairRequest?: XOR<RepairRequestScalarRelationFilter, RepairRequestWhereInput>
  }, "id" | "repairRequestId">

  export type CloseRepairOrderByWithAggregationInput = {
    id?: SortOrder
    repairRequestId?: SortOrder
    finishedDate?: SortOrder
    receivedDate?: SortOrderInput | SortOrder
    receiptUrl?: SortOrderInput | SortOrder
    _count?: CloseRepairCountOrderByAggregateInput
    _avg?: CloseRepairAvgOrderByAggregateInput
    _max?: CloseRepairMaxOrderByAggregateInput
    _min?: CloseRepairMinOrderByAggregateInput
    _sum?: CloseRepairSumOrderByAggregateInput
  }

  export type CloseRepairScalarWhereWithAggregatesInput = {
    AND?: CloseRepairScalarWhereWithAggregatesInput | CloseRepairScalarWhereWithAggregatesInput[]
    OR?: CloseRepairScalarWhereWithAggregatesInput[]
    NOT?: CloseRepairScalarWhereWithAggregatesInput | CloseRepairScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"CloseRepair"> | number
    repairRequestId?: IntWithAggregatesFilter<"CloseRepair"> | number
    finishedDate?: DateTimeWithAggregatesFilter<"CloseRepair"> | Date | string
    receivedDate?: DateTimeNullableWithAggregatesFilter<"CloseRepair"> | Date | string | null
    receiptUrl?: StringNullableWithAggregatesFilter<"CloseRepair"> | string | null
  }

  export type UserCreateInput = {
    name?: string | null
    email: string
    password: string
    phone?: string | null
    role?: $Enums.Role
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    repairRequests?: RepairRequestCreateNestedManyWithoutCustomerInput
    assignedRepairs?: RepairDetailCreateNestedManyWithoutTechnicianInput
  }

  export type UserUncheckedCreateInput = {
    id?: number
    name?: string | null
    email: string
    password: string
    phone?: string | null
    role?: $Enums.Role
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    repairRequests?: RepairRequestUncheckedCreateNestedManyWithoutCustomerInput
    assignedRepairs?: RepairDetailUncheckedCreateNestedManyWithoutTechnicianInput
  }

  export type UserUpdateInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    repairRequests?: RepairRequestUpdateManyWithoutCustomerNestedInput
    assignedRepairs?: RepairDetailUpdateManyWithoutTechnicianNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    repairRequests?: RepairRequestUncheckedUpdateManyWithoutCustomerNestedInput
    assignedRepairs?: RepairDetailUncheckedUpdateManyWithoutTechnicianNestedInput
  }

  export type UserCreateManyInput = {
    id?: number
    name?: string | null
    email: string
    password: string
    phone?: string | null
    role?: $Enums.Role
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RepairRequestCreateInput = {
    printerModel: string
    serialNumber: string
    address?: string | null
    issueDesc: string
    accessories?: string | null
    requestDate?: Date | string
    contactInfo?: string | null
    status?: $Enums.RepairStatus
    customer: UserCreateNestedOneWithoutRepairRequestsInput
    images?: RepairImageCreateNestedManyWithoutRepairRequestInput
    details?: RepairDetailCreateNestedOneWithoutRepairRequestInput
    shipping?: ShippingCreateNestedOneWithoutRepairRequestInput
    closedJob?: CloseRepairCreateNestedOneWithoutRepairRequestInput
  }

  export type RepairRequestUncheckedCreateInput = {
    id?: number
    printerModel: string
    serialNumber: string
    customerId: number
    address?: string | null
    issueDesc: string
    accessories?: string | null
    requestDate?: Date | string
    contactInfo?: string | null
    status?: $Enums.RepairStatus
    images?: RepairImageUncheckedCreateNestedManyWithoutRepairRequestInput
    details?: RepairDetailUncheckedCreateNestedOneWithoutRepairRequestInput
    shipping?: ShippingUncheckedCreateNestedOneWithoutRepairRequestInput
    closedJob?: CloseRepairUncheckedCreateNestedOneWithoutRepairRequestInput
  }

  export type RepairRequestUpdateInput = {
    printerModel?: StringFieldUpdateOperationsInput | string
    serialNumber?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    issueDesc?: StringFieldUpdateOperationsInput | string
    accessories?: NullableStringFieldUpdateOperationsInput | string | null
    requestDate?: DateTimeFieldUpdateOperationsInput | Date | string
    contactInfo?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumRepairStatusFieldUpdateOperationsInput | $Enums.RepairStatus
    customer?: UserUpdateOneRequiredWithoutRepairRequestsNestedInput
    images?: RepairImageUpdateManyWithoutRepairRequestNestedInput
    details?: RepairDetailUpdateOneWithoutRepairRequestNestedInput
    shipping?: ShippingUpdateOneWithoutRepairRequestNestedInput
    closedJob?: CloseRepairUpdateOneWithoutRepairRequestNestedInput
  }

  export type RepairRequestUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    printerModel?: StringFieldUpdateOperationsInput | string
    serialNumber?: StringFieldUpdateOperationsInput | string
    customerId?: IntFieldUpdateOperationsInput | number
    address?: NullableStringFieldUpdateOperationsInput | string | null
    issueDesc?: StringFieldUpdateOperationsInput | string
    accessories?: NullableStringFieldUpdateOperationsInput | string | null
    requestDate?: DateTimeFieldUpdateOperationsInput | Date | string
    contactInfo?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumRepairStatusFieldUpdateOperationsInput | $Enums.RepairStatus
    images?: RepairImageUncheckedUpdateManyWithoutRepairRequestNestedInput
    details?: RepairDetailUncheckedUpdateOneWithoutRepairRequestNestedInput
    shipping?: ShippingUncheckedUpdateOneWithoutRepairRequestNestedInput
    closedJob?: CloseRepairUncheckedUpdateOneWithoutRepairRequestNestedInput
  }

  export type RepairRequestCreateManyInput = {
    id?: number
    printerModel: string
    serialNumber: string
    customerId: number
    address?: string | null
    issueDesc: string
    accessories?: string | null
    requestDate?: Date | string
    contactInfo?: string | null
    status?: $Enums.RepairStatus
  }

  export type RepairRequestUpdateManyMutationInput = {
    printerModel?: StringFieldUpdateOperationsInput | string
    serialNumber?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    issueDesc?: StringFieldUpdateOperationsInput | string
    accessories?: NullableStringFieldUpdateOperationsInput | string | null
    requestDate?: DateTimeFieldUpdateOperationsInput | Date | string
    contactInfo?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumRepairStatusFieldUpdateOperationsInput | $Enums.RepairStatus
  }

  export type RepairRequestUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    printerModel?: StringFieldUpdateOperationsInput | string
    serialNumber?: StringFieldUpdateOperationsInput | string
    customerId?: IntFieldUpdateOperationsInput | number
    address?: NullableStringFieldUpdateOperationsInput | string | null
    issueDesc?: StringFieldUpdateOperationsInput | string
    accessories?: NullableStringFieldUpdateOperationsInput | string | null
    requestDate?: DateTimeFieldUpdateOperationsInput | Date | string
    contactInfo?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumRepairStatusFieldUpdateOperationsInput | $Enums.RepairStatus
  }

  export type RepairImageCreateInput = {
    url: string
    uploadedAt?: Date | string
    repairRequest: RepairRequestCreateNestedOneWithoutImagesInput
  }

  export type RepairImageUncheckedCreateInput = {
    id?: number
    repairRequestId: number
    url: string
    uploadedAt?: Date | string
  }

  export type RepairImageUpdateInput = {
    url?: StringFieldUpdateOperationsInput | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    repairRequest?: RepairRequestUpdateOneRequiredWithoutImagesNestedInput
  }

  export type RepairImageUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    repairRequestId?: IntFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RepairImageCreateManyInput = {
    id?: number
    repairRequestId: number
    url: string
    uploadedAt?: Date | string
  }

  export type RepairImageUpdateManyMutationInput = {
    url?: StringFieldUpdateOperationsInput | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RepairImageUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    repairRequestId?: IntFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RepairDetailCreateInput = {
    notes?: string | null
    updatedAt?: Date | string
    repairRequest: RepairRequestCreateNestedOneWithoutDetailsInput
    technician?: UserCreateNestedOneWithoutAssignedRepairsInput
    parts?: RepairPartCreateNestedManyWithoutDetailInput
  }

  export type RepairDetailUncheckedCreateInput = {
    id?: number
    repairRequestId: number
    notes?: string | null
    technicianId?: number | null
    updatedAt?: Date | string
    parts?: RepairPartUncheckedCreateNestedManyWithoutDetailInput
  }

  export type RepairDetailUpdateInput = {
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    repairRequest?: RepairRequestUpdateOneRequiredWithoutDetailsNestedInput
    technician?: UserUpdateOneWithoutAssignedRepairsNestedInput
    parts?: RepairPartUpdateManyWithoutDetailNestedInput
  }

  export type RepairDetailUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    repairRequestId?: IntFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    technicianId?: NullableIntFieldUpdateOperationsInput | number | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    parts?: RepairPartUncheckedUpdateManyWithoutDetailNestedInput
  }

  export type RepairDetailCreateManyInput = {
    id?: number
    repairRequestId: number
    notes?: string | null
    technicianId?: number | null
    updatedAt?: Date | string
  }

  export type RepairDetailUpdateManyMutationInput = {
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RepairDetailUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    repairRequestId?: IntFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    technicianId?: NullableIntFieldUpdateOperationsInput | number | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RepairPartCreateInput = {
    partName: string
    price: number
    quantity?: number
    detail: RepairDetailCreateNestedOneWithoutPartsInput
  }

  export type RepairPartUncheckedCreateInput = {
    id?: number
    detailId: number
    partName: string
    price: number
    quantity?: number
  }

  export type RepairPartUpdateInput = {
    partName?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    detail?: RepairDetailUpdateOneRequiredWithoutPartsNestedInput
  }

  export type RepairPartUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    detailId?: IntFieldUpdateOperationsInput | number
    partName?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
  }

  export type RepairPartCreateManyInput = {
    id?: number
    detailId: number
    partName: string
    price: number
    quantity?: number
  }

  export type RepairPartUpdateManyMutationInput = {
    partName?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
  }

  export type RepairPartUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    detailId?: IntFieldUpdateOperationsInput | number
    partName?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
  }

  export type ShippingCreateInput = {
    company: string
    trackingNumber: string
    sentDate: Date | string
    status?: string | null
    repairRequest: RepairRequestCreateNestedOneWithoutShippingInput
  }

  export type ShippingUncheckedCreateInput = {
    id?: number
    repairRequestId: number
    company: string
    trackingNumber: string
    sentDate: Date | string
    status?: string | null
  }

  export type ShippingUpdateInput = {
    company?: StringFieldUpdateOperationsInput | string
    trackingNumber?: StringFieldUpdateOperationsInput | string
    sentDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: NullableStringFieldUpdateOperationsInput | string | null
    repairRequest?: RepairRequestUpdateOneRequiredWithoutShippingNestedInput
  }

  export type ShippingUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    repairRequestId?: IntFieldUpdateOperationsInput | number
    company?: StringFieldUpdateOperationsInput | string
    trackingNumber?: StringFieldUpdateOperationsInput | string
    sentDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ShippingCreateManyInput = {
    id?: number
    repairRequestId: number
    company: string
    trackingNumber: string
    sentDate: Date | string
    status?: string | null
  }

  export type ShippingUpdateManyMutationInput = {
    company?: StringFieldUpdateOperationsInput | string
    trackingNumber?: StringFieldUpdateOperationsInput | string
    sentDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ShippingUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    repairRequestId?: IntFieldUpdateOperationsInput | number
    company?: StringFieldUpdateOperationsInput | string
    trackingNumber?: StringFieldUpdateOperationsInput | string
    sentDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CloseRepairCreateInput = {
    finishedDate: Date | string
    receivedDate?: Date | string | null
    receiptUrl?: string | null
    repairRequest: RepairRequestCreateNestedOneWithoutClosedJobInput
  }

  export type CloseRepairUncheckedCreateInput = {
    id?: number
    repairRequestId: number
    finishedDate: Date | string
    receivedDate?: Date | string | null
    receiptUrl?: string | null
  }

  export type CloseRepairUpdateInput = {
    finishedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    receivedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    receiptUrl?: NullableStringFieldUpdateOperationsInput | string | null
    repairRequest?: RepairRequestUpdateOneRequiredWithoutClosedJobNestedInput
  }

  export type CloseRepairUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    repairRequestId?: IntFieldUpdateOperationsInput | number
    finishedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    receivedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    receiptUrl?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CloseRepairCreateManyInput = {
    id?: number
    repairRequestId: number
    finishedDate: Date | string
    receivedDate?: Date | string | null
    receiptUrl?: string | null
  }

  export type CloseRepairUpdateManyMutationInput = {
    finishedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    receivedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    receiptUrl?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CloseRepairUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    repairRequestId?: IntFieldUpdateOperationsInput | number
    finishedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    receivedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    receiptUrl?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type RepairRequestListRelationFilter = {
    every?: RepairRequestWhereInput
    some?: RepairRequestWhereInput
    none?: RepairRequestWhereInput
  }

  export type RepairDetailListRelationFilter = {
    every?: RepairDetailWhereInput
    some?: RepairDetailWhereInput
    none?: RepairDetailWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type RepairRequestOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RepairDetailOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    phone?: SortOrder
    role?: SortOrder
    image?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    phone?: SortOrder
    role?: SortOrder
    image?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    phone?: SortOrder
    role?: SortOrder
    image?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type EnumRepairStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.RepairStatus | EnumRepairStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RepairStatus[] | ListEnumRepairStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.RepairStatus[] | ListEnumRepairStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumRepairStatusFilter<$PrismaModel> | $Enums.RepairStatus
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type RepairImageListRelationFilter = {
    every?: RepairImageWhereInput
    some?: RepairImageWhereInput
    none?: RepairImageWhereInput
  }

  export type RepairDetailNullableScalarRelationFilter = {
    is?: RepairDetailWhereInput | null
    isNot?: RepairDetailWhereInput | null
  }

  export type ShippingNullableScalarRelationFilter = {
    is?: ShippingWhereInput | null
    isNot?: ShippingWhereInput | null
  }

  export type CloseRepairNullableScalarRelationFilter = {
    is?: CloseRepairWhereInput | null
    isNot?: CloseRepairWhereInput | null
  }

  export type RepairImageOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RepairRequestCountOrderByAggregateInput = {
    id?: SortOrder
    printerModel?: SortOrder
    serialNumber?: SortOrder
    customerId?: SortOrder
    address?: SortOrder
    issueDesc?: SortOrder
    accessories?: SortOrder
    requestDate?: SortOrder
    contactInfo?: SortOrder
    status?: SortOrder
  }

  export type RepairRequestAvgOrderByAggregateInput = {
    id?: SortOrder
    customerId?: SortOrder
  }

  export type RepairRequestMaxOrderByAggregateInput = {
    id?: SortOrder
    printerModel?: SortOrder
    serialNumber?: SortOrder
    customerId?: SortOrder
    address?: SortOrder
    issueDesc?: SortOrder
    accessories?: SortOrder
    requestDate?: SortOrder
    contactInfo?: SortOrder
    status?: SortOrder
  }

  export type RepairRequestMinOrderByAggregateInput = {
    id?: SortOrder
    printerModel?: SortOrder
    serialNumber?: SortOrder
    customerId?: SortOrder
    address?: SortOrder
    issueDesc?: SortOrder
    accessories?: SortOrder
    requestDate?: SortOrder
    contactInfo?: SortOrder
    status?: SortOrder
  }

  export type RepairRequestSumOrderByAggregateInput = {
    id?: SortOrder
    customerId?: SortOrder
  }

  export type EnumRepairStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RepairStatus | EnumRepairStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RepairStatus[] | ListEnumRepairStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.RepairStatus[] | ListEnumRepairStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumRepairStatusWithAggregatesFilter<$PrismaModel> | $Enums.RepairStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRepairStatusFilter<$PrismaModel>
    _max?: NestedEnumRepairStatusFilter<$PrismaModel>
  }

  export type RepairRequestScalarRelationFilter = {
    is?: RepairRequestWhereInput
    isNot?: RepairRequestWhereInput
  }

  export type RepairImageCountOrderByAggregateInput = {
    id?: SortOrder
    repairRequestId?: SortOrder
    url?: SortOrder
    uploadedAt?: SortOrder
  }

  export type RepairImageAvgOrderByAggregateInput = {
    id?: SortOrder
    repairRequestId?: SortOrder
  }

  export type RepairImageMaxOrderByAggregateInput = {
    id?: SortOrder
    repairRequestId?: SortOrder
    url?: SortOrder
    uploadedAt?: SortOrder
  }

  export type RepairImageMinOrderByAggregateInput = {
    id?: SortOrder
    repairRequestId?: SortOrder
    url?: SortOrder
    uploadedAt?: SortOrder
  }

  export type RepairImageSumOrderByAggregateInput = {
    id?: SortOrder
    repairRequestId?: SortOrder
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type RepairPartListRelationFilter = {
    every?: RepairPartWhereInput
    some?: RepairPartWhereInput
    none?: RepairPartWhereInput
  }

  export type RepairPartOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RepairDetailCountOrderByAggregateInput = {
    id?: SortOrder
    repairRequestId?: SortOrder
    notes?: SortOrder
    technicianId?: SortOrder
    updatedAt?: SortOrder
  }

  export type RepairDetailAvgOrderByAggregateInput = {
    id?: SortOrder
    repairRequestId?: SortOrder
    technicianId?: SortOrder
  }

  export type RepairDetailMaxOrderByAggregateInput = {
    id?: SortOrder
    repairRequestId?: SortOrder
    notes?: SortOrder
    technicianId?: SortOrder
    updatedAt?: SortOrder
  }

  export type RepairDetailMinOrderByAggregateInput = {
    id?: SortOrder
    repairRequestId?: SortOrder
    notes?: SortOrder
    technicianId?: SortOrder
    updatedAt?: SortOrder
  }

  export type RepairDetailSumOrderByAggregateInput = {
    id?: SortOrder
    repairRequestId?: SortOrder
    technicianId?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type RepairDetailScalarRelationFilter = {
    is?: RepairDetailWhereInput
    isNot?: RepairDetailWhereInput
  }

  export type RepairPartCountOrderByAggregateInput = {
    id?: SortOrder
    detailId?: SortOrder
    partName?: SortOrder
    price?: SortOrder
    quantity?: SortOrder
  }

  export type RepairPartAvgOrderByAggregateInput = {
    id?: SortOrder
    detailId?: SortOrder
    price?: SortOrder
    quantity?: SortOrder
  }

  export type RepairPartMaxOrderByAggregateInput = {
    id?: SortOrder
    detailId?: SortOrder
    partName?: SortOrder
    price?: SortOrder
    quantity?: SortOrder
  }

  export type RepairPartMinOrderByAggregateInput = {
    id?: SortOrder
    detailId?: SortOrder
    partName?: SortOrder
    price?: SortOrder
    quantity?: SortOrder
  }

  export type RepairPartSumOrderByAggregateInput = {
    id?: SortOrder
    detailId?: SortOrder
    price?: SortOrder
    quantity?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type ShippingCountOrderByAggregateInput = {
    id?: SortOrder
    repairRequestId?: SortOrder
    company?: SortOrder
    trackingNumber?: SortOrder
    sentDate?: SortOrder
    status?: SortOrder
  }

  export type ShippingAvgOrderByAggregateInput = {
    id?: SortOrder
    repairRequestId?: SortOrder
  }

  export type ShippingMaxOrderByAggregateInput = {
    id?: SortOrder
    repairRequestId?: SortOrder
    company?: SortOrder
    trackingNumber?: SortOrder
    sentDate?: SortOrder
    status?: SortOrder
  }

  export type ShippingMinOrderByAggregateInput = {
    id?: SortOrder
    repairRequestId?: SortOrder
    company?: SortOrder
    trackingNumber?: SortOrder
    sentDate?: SortOrder
    status?: SortOrder
  }

  export type ShippingSumOrderByAggregateInput = {
    id?: SortOrder
    repairRequestId?: SortOrder
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type CloseRepairCountOrderByAggregateInput = {
    id?: SortOrder
    repairRequestId?: SortOrder
    finishedDate?: SortOrder
    receivedDate?: SortOrder
    receiptUrl?: SortOrder
  }

  export type CloseRepairAvgOrderByAggregateInput = {
    id?: SortOrder
    repairRequestId?: SortOrder
  }

  export type CloseRepairMaxOrderByAggregateInput = {
    id?: SortOrder
    repairRequestId?: SortOrder
    finishedDate?: SortOrder
    receivedDate?: SortOrder
    receiptUrl?: SortOrder
  }

  export type CloseRepairMinOrderByAggregateInput = {
    id?: SortOrder
    repairRequestId?: SortOrder
    finishedDate?: SortOrder
    receivedDate?: SortOrder
    receiptUrl?: SortOrder
  }

  export type CloseRepairSumOrderByAggregateInput = {
    id?: SortOrder
    repairRequestId?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type RepairRequestCreateNestedManyWithoutCustomerInput = {
    create?: XOR<RepairRequestCreateWithoutCustomerInput, RepairRequestUncheckedCreateWithoutCustomerInput> | RepairRequestCreateWithoutCustomerInput[] | RepairRequestUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: RepairRequestCreateOrConnectWithoutCustomerInput | RepairRequestCreateOrConnectWithoutCustomerInput[]
    createMany?: RepairRequestCreateManyCustomerInputEnvelope
    connect?: RepairRequestWhereUniqueInput | RepairRequestWhereUniqueInput[]
  }

  export type RepairDetailCreateNestedManyWithoutTechnicianInput = {
    create?: XOR<RepairDetailCreateWithoutTechnicianInput, RepairDetailUncheckedCreateWithoutTechnicianInput> | RepairDetailCreateWithoutTechnicianInput[] | RepairDetailUncheckedCreateWithoutTechnicianInput[]
    connectOrCreate?: RepairDetailCreateOrConnectWithoutTechnicianInput | RepairDetailCreateOrConnectWithoutTechnicianInput[]
    createMany?: RepairDetailCreateManyTechnicianInputEnvelope
    connect?: RepairDetailWhereUniqueInput | RepairDetailWhereUniqueInput[]
  }

  export type RepairRequestUncheckedCreateNestedManyWithoutCustomerInput = {
    create?: XOR<RepairRequestCreateWithoutCustomerInput, RepairRequestUncheckedCreateWithoutCustomerInput> | RepairRequestCreateWithoutCustomerInput[] | RepairRequestUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: RepairRequestCreateOrConnectWithoutCustomerInput | RepairRequestCreateOrConnectWithoutCustomerInput[]
    createMany?: RepairRequestCreateManyCustomerInputEnvelope
    connect?: RepairRequestWhereUniqueInput | RepairRequestWhereUniqueInput[]
  }

  export type RepairDetailUncheckedCreateNestedManyWithoutTechnicianInput = {
    create?: XOR<RepairDetailCreateWithoutTechnicianInput, RepairDetailUncheckedCreateWithoutTechnicianInput> | RepairDetailCreateWithoutTechnicianInput[] | RepairDetailUncheckedCreateWithoutTechnicianInput[]
    connectOrCreate?: RepairDetailCreateOrConnectWithoutTechnicianInput | RepairDetailCreateOrConnectWithoutTechnicianInput[]
    createMany?: RepairDetailCreateManyTechnicianInputEnvelope
    connect?: RepairDetailWhereUniqueInput | RepairDetailWhereUniqueInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type RepairRequestUpdateManyWithoutCustomerNestedInput = {
    create?: XOR<RepairRequestCreateWithoutCustomerInput, RepairRequestUncheckedCreateWithoutCustomerInput> | RepairRequestCreateWithoutCustomerInput[] | RepairRequestUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: RepairRequestCreateOrConnectWithoutCustomerInput | RepairRequestCreateOrConnectWithoutCustomerInput[]
    upsert?: RepairRequestUpsertWithWhereUniqueWithoutCustomerInput | RepairRequestUpsertWithWhereUniqueWithoutCustomerInput[]
    createMany?: RepairRequestCreateManyCustomerInputEnvelope
    set?: RepairRequestWhereUniqueInput | RepairRequestWhereUniqueInput[]
    disconnect?: RepairRequestWhereUniqueInput | RepairRequestWhereUniqueInput[]
    delete?: RepairRequestWhereUniqueInput | RepairRequestWhereUniqueInput[]
    connect?: RepairRequestWhereUniqueInput | RepairRequestWhereUniqueInput[]
    update?: RepairRequestUpdateWithWhereUniqueWithoutCustomerInput | RepairRequestUpdateWithWhereUniqueWithoutCustomerInput[]
    updateMany?: RepairRequestUpdateManyWithWhereWithoutCustomerInput | RepairRequestUpdateManyWithWhereWithoutCustomerInput[]
    deleteMany?: RepairRequestScalarWhereInput | RepairRequestScalarWhereInput[]
  }

  export type RepairDetailUpdateManyWithoutTechnicianNestedInput = {
    create?: XOR<RepairDetailCreateWithoutTechnicianInput, RepairDetailUncheckedCreateWithoutTechnicianInput> | RepairDetailCreateWithoutTechnicianInput[] | RepairDetailUncheckedCreateWithoutTechnicianInput[]
    connectOrCreate?: RepairDetailCreateOrConnectWithoutTechnicianInput | RepairDetailCreateOrConnectWithoutTechnicianInput[]
    upsert?: RepairDetailUpsertWithWhereUniqueWithoutTechnicianInput | RepairDetailUpsertWithWhereUniqueWithoutTechnicianInput[]
    createMany?: RepairDetailCreateManyTechnicianInputEnvelope
    set?: RepairDetailWhereUniqueInput | RepairDetailWhereUniqueInput[]
    disconnect?: RepairDetailWhereUniqueInput | RepairDetailWhereUniqueInput[]
    delete?: RepairDetailWhereUniqueInput | RepairDetailWhereUniqueInput[]
    connect?: RepairDetailWhereUniqueInput | RepairDetailWhereUniqueInput[]
    update?: RepairDetailUpdateWithWhereUniqueWithoutTechnicianInput | RepairDetailUpdateWithWhereUniqueWithoutTechnicianInput[]
    updateMany?: RepairDetailUpdateManyWithWhereWithoutTechnicianInput | RepairDetailUpdateManyWithWhereWithoutTechnicianInput[]
    deleteMany?: RepairDetailScalarWhereInput | RepairDetailScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type RepairRequestUncheckedUpdateManyWithoutCustomerNestedInput = {
    create?: XOR<RepairRequestCreateWithoutCustomerInput, RepairRequestUncheckedCreateWithoutCustomerInput> | RepairRequestCreateWithoutCustomerInput[] | RepairRequestUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: RepairRequestCreateOrConnectWithoutCustomerInput | RepairRequestCreateOrConnectWithoutCustomerInput[]
    upsert?: RepairRequestUpsertWithWhereUniqueWithoutCustomerInput | RepairRequestUpsertWithWhereUniqueWithoutCustomerInput[]
    createMany?: RepairRequestCreateManyCustomerInputEnvelope
    set?: RepairRequestWhereUniqueInput | RepairRequestWhereUniqueInput[]
    disconnect?: RepairRequestWhereUniqueInput | RepairRequestWhereUniqueInput[]
    delete?: RepairRequestWhereUniqueInput | RepairRequestWhereUniqueInput[]
    connect?: RepairRequestWhereUniqueInput | RepairRequestWhereUniqueInput[]
    update?: RepairRequestUpdateWithWhereUniqueWithoutCustomerInput | RepairRequestUpdateWithWhereUniqueWithoutCustomerInput[]
    updateMany?: RepairRequestUpdateManyWithWhereWithoutCustomerInput | RepairRequestUpdateManyWithWhereWithoutCustomerInput[]
    deleteMany?: RepairRequestScalarWhereInput | RepairRequestScalarWhereInput[]
  }

  export type RepairDetailUncheckedUpdateManyWithoutTechnicianNestedInput = {
    create?: XOR<RepairDetailCreateWithoutTechnicianInput, RepairDetailUncheckedCreateWithoutTechnicianInput> | RepairDetailCreateWithoutTechnicianInput[] | RepairDetailUncheckedCreateWithoutTechnicianInput[]
    connectOrCreate?: RepairDetailCreateOrConnectWithoutTechnicianInput | RepairDetailCreateOrConnectWithoutTechnicianInput[]
    upsert?: RepairDetailUpsertWithWhereUniqueWithoutTechnicianInput | RepairDetailUpsertWithWhereUniqueWithoutTechnicianInput[]
    createMany?: RepairDetailCreateManyTechnicianInputEnvelope
    set?: RepairDetailWhereUniqueInput | RepairDetailWhereUniqueInput[]
    disconnect?: RepairDetailWhereUniqueInput | RepairDetailWhereUniqueInput[]
    delete?: RepairDetailWhereUniqueInput | RepairDetailWhereUniqueInput[]
    connect?: RepairDetailWhereUniqueInput | RepairDetailWhereUniqueInput[]
    update?: RepairDetailUpdateWithWhereUniqueWithoutTechnicianInput | RepairDetailUpdateWithWhereUniqueWithoutTechnicianInput[]
    updateMany?: RepairDetailUpdateManyWithWhereWithoutTechnicianInput | RepairDetailUpdateManyWithWhereWithoutTechnicianInput[]
    deleteMany?: RepairDetailScalarWhereInput | RepairDetailScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutRepairRequestsInput = {
    create?: XOR<UserCreateWithoutRepairRequestsInput, UserUncheckedCreateWithoutRepairRequestsInput>
    connectOrCreate?: UserCreateOrConnectWithoutRepairRequestsInput
    connect?: UserWhereUniqueInput
  }

  export type RepairImageCreateNestedManyWithoutRepairRequestInput = {
    create?: XOR<RepairImageCreateWithoutRepairRequestInput, RepairImageUncheckedCreateWithoutRepairRequestInput> | RepairImageCreateWithoutRepairRequestInput[] | RepairImageUncheckedCreateWithoutRepairRequestInput[]
    connectOrCreate?: RepairImageCreateOrConnectWithoutRepairRequestInput | RepairImageCreateOrConnectWithoutRepairRequestInput[]
    createMany?: RepairImageCreateManyRepairRequestInputEnvelope
    connect?: RepairImageWhereUniqueInput | RepairImageWhereUniqueInput[]
  }

  export type RepairDetailCreateNestedOneWithoutRepairRequestInput = {
    create?: XOR<RepairDetailCreateWithoutRepairRequestInput, RepairDetailUncheckedCreateWithoutRepairRequestInput>
    connectOrCreate?: RepairDetailCreateOrConnectWithoutRepairRequestInput
    connect?: RepairDetailWhereUniqueInput
  }

  export type ShippingCreateNestedOneWithoutRepairRequestInput = {
    create?: XOR<ShippingCreateWithoutRepairRequestInput, ShippingUncheckedCreateWithoutRepairRequestInput>
    connectOrCreate?: ShippingCreateOrConnectWithoutRepairRequestInput
    connect?: ShippingWhereUniqueInput
  }

  export type CloseRepairCreateNestedOneWithoutRepairRequestInput = {
    create?: XOR<CloseRepairCreateWithoutRepairRequestInput, CloseRepairUncheckedCreateWithoutRepairRequestInput>
    connectOrCreate?: CloseRepairCreateOrConnectWithoutRepairRequestInput
    connect?: CloseRepairWhereUniqueInput
  }

  export type RepairImageUncheckedCreateNestedManyWithoutRepairRequestInput = {
    create?: XOR<RepairImageCreateWithoutRepairRequestInput, RepairImageUncheckedCreateWithoutRepairRequestInput> | RepairImageCreateWithoutRepairRequestInput[] | RepairImageUncheckedCreateWithoutRepairRequestInput[]
    connectOrCreate?: RepairImageCreateOrConnectWithoutRepairRequestInput | RepairImageCreateOrConnectWithoutRepairRequestInput[]
    createMany?: RepairImageCreateManyRepairRequestInputEnvelope
    connect?: RepairImageWhereUniqueInput | RepairImageWhereUniqueInput[]
  }

  export type RepairDetailUncheckedCreateNestedOneWithoutRepairRequestInput = {
    create?: XOR<RepairDetailCreateWithoutRepairRequestInput, RepairDetailUncheckedCreateWithoutRepairRequestInput>
    connectOrCreate?: RepairDetailCreateOrConnectWithoutRepairRequestInput
    connect?: RepairDetailWhereUniqueInput
  }

  export type ShippingUncheckedCreateNestedOneWithoutRepairRequestInput = {
    create?: XOR<ShippingCreateWithoutRepairRequestInput, ShippingUncheckedCreateWithoutRepairRequestInput>
    connectOrCreate?: ShippingCreateOrConnectWithoutRepairRequestInput
    connect?: ShippingWhereUniqueInput
  }

  export type CloseRepairUncheckedCreateNestedOneWithoutRepairRequestInput = {
    create?: XOR<CloseRepairCreateWithoutRepairRequestInput, CloseRepairUncheckedCreateWithoutRepairRequestInput>
    connectOrCreate?: CloseRepairCreateOrConnectWithoutRepairRequestInput
    connect?: CloseRepairWhereUniqueInput
  }

  export type EnumRepairStatusFieldUpdateOperationsInput = {
    set?: $Enums.RepairStatus
  }

  export type UserUpdateOneRequiredWithoutRepairRequestsNestedInput = {
    create?: XOR<UserCreateWithoutRepairRequestsInput, UserUncheckedCreateWithoutRepairRequestsInput>
    connectOrCreate?: UserCreateOrConnectWithoutRepairRequestsInput
    upsert?: UserUpsertWithoutRepairRequestsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutRepairRequestsInput, UserUpdateWithoutRepairRequestsInput>, UserUncheckedUpdateWithoutRepairRequestsInput>
  }

  export type RepairImageUpdateManyWithoutRepairRequestNestedInput = {
    create?: XOR<RepairImageCreateWithoutRepairRequestInput, RepairImageUncheckedCreateWithoutRepairRequestInput> | RepairImageCreateWithoutRepairRequestInput[] | RepairImageUncheckedCreateWithoutRepairRequestInput[]
    connectOrCreate?: RepairImageCreateOrConnectWithoutRepairRequestInput | RepairImageCreateOrConnectWithoutRepairRequestInput[]
    upsert?: RepairImageUpsertWithWhereUniqueWithoutRepairRequestInput | RepairImageUpsertWithWhereUniqueWithoutRepairRequestInput[]
    createMany?: RepairImageCreateManyRepairRequestInputEnvelope
    set?: RepairImageWhereUniqueInput | RepairImageWhereUniqueInput[]
    disconnect?: RepairImageWhereUniqueInput | RepairImageWhereUniqueInput[]
    delete?: RepairImageWhereUniqueInput | RepairImageWhereUniqueInput[]
    connect?: RepairImageWhereUniqueInput | RepairImageWhereUniqueInput[]
    update?: RepairImageUpdateWithWhereUniqueWithoutRepairRequestInput | RepairImageUpdateWithWhereUniqueWithoutRepairRequestInput[]
    updateMany?: RepairImageUpdateManyWithWhereWithoutRepairRequestInput | RepairImageUpdateManyWithWhereWithoutRepairRequestInput[]
    deleteMany?: RepairImageScalarWhereInput | RepairImageScalarWhereInput[]
  }

  export type RepairDetailUpdateOneWithoutRepairRequestNestedInput = {
    create?: XOR<RepairDetailCreateWithoutRepairRequestInput, RepairDetailUncheckedCreateWithoutRepairRequestInput>
    connectOrCreate?: RepairDetailCreateOrConnectWithoutRepairRequestInput
    upsert?: RepairDetailUpsertWithoutRepairRequestInput
    disconnect?: RepairDetailWhereInput | boolean
    delete?: RepairDetailWhereInput | boolean
    connect?: RepairDetailWhereUniqueInput
    update?: XOR<XOR<RepairDetailUpdateToOneWithWhereWithoutRepairRequestInput, RepairDetailUpdateWithoutRepairRequestInput>, RepairDetailUncheckedUpdateWithoutRepairRequestInput>
  }

  export type ShippingUpdateOneWithoutRepairRequestNestedInput = {
    create?: XOR<ShippingCreateWithoutRepairRequestInput, ShippingUncheckedCreateWithoutRepairRequestInput>
    connectOrCreate?: ShippingCreateOrConnectWithoutRepairRequestInput
    upsert?: ShippingUpsertWithoutRepairRequestInput
    disconnect?: ShippingWhereInput | boolean
    delete?: ShippingWhereInput | boolean
    connect?: ShippingWhereUniqueInput
    update?: XOR<XOR<ShippingUpdateToOneWithWhereWithoutRepairRequestInput, ShippingUpdateWithoutRepairRequestInput>, ShippingUncheckedUpdateWithoutRepairRequestInput>
  }

  export type CloseRepairUpdateOneWithoutRepairRequestNestedInput = {
    create?: XOR<CloseRepairCreateWithoutRepairRequestInput, CloseRepairUncheckedCreateWithoutRepairRequestInput>
    connectOrCreate?: CloseRepairCreateOrConnectWithoutRepairRequestInput
    upsert?: CloseRepairUpsertWithoutRepairRequestInput
    disconnect?: CloseRepairWhereInput | boolean
    delete?: CloseRepairWhereInput | boolean
    connect?: CloseRepairWhereUniqueInput
    update?: XOR<XOR<CloseRepairUpdateToOneWithWhereWithoutRepairRequestInput, CloseRepairUpdateWithoutRepairRequestInput>, CloseRepairUncheckedUpdateWithoutRepairRequestInput>
  }

  export type RepairImageUncheckedUpdateManyWithoutRepairRequestNestedInput = {
    create?: XOR<RepairImageCreateWithoutRepairRequestInput, RepairImageUncheckedCreateWithoutRepairRequestInput> | RepairImageCreateWithoutRepairRequestInput[] | RepairImageUncheckedCreateWithoutRepairRequestInput[]
    connectOrCreate?: RepairImageCreateOrConnectWithoutRepairRequestInput | RepairImageCreateOrConnectWithoutRepairRequestInput[]
    upsert?: RepairImageUpsertWithWhereUniqueWithoutRepairRequestInput | RepairImageUpsertWithWhereUniqueWithoutRepairRequestInput[]
    createMany?: RepairImageCreateManyRepairRequestInputEnvelope
    set?: RepairImageWhereUniqueInput | RepairImageWhereUniqueInput[]
    disconnect?: RepairImageWhereUniqueInput | RepairImageWhereUniqueInput[]
    delete?: RepairImageWhereUniqueInput | RepairImageWhereUniqueInput[]
    connect?: RepairImageWhereUniqueInput | RepairImageWhereUniqueInput[]
    update?: RepairImageUpdateWithWhereUniqueWithoutRepairRequestInput | RepairImageUpdateWithWhereUniqueWithoutRepairRequestInput[]
    updateMany?: RepairImageUpdateManyWithWhereWithoutRepairRequestInput | RepairImageUpdateManyWithWhereWithoutRepairRequestInput[]
    deleteMany?: RepairImageScalarWhereInput | RepairImageScalarWhereInput[]
  }

  export type RepairDetailUncheckedUpdateOneWithoutRepairRequestNestedInput = {
    create?: XOR<RepairDetailCreateWithoutRepairRequestInput, RepairDetailUncheckedCreateWithoutRepairRequestInput>
    connectOrCreate?: RepairDetailCreateOrConnectWithoutRepairRequestInput
    upsert?: RepairDetailUpsertWithoutRepairRequestInput
    disconnect?: RepairDetailWhereInput | boolean
    delete?: RepairDetailWhereInput | boolean
    connect?: RepairDetailWhereUniqueInput
    update?: XOR<XOR<RepairDetailUpdateToOneWithWhereWithoutRepairRequestInput, RepairDetailUpdateWithoutRepairRequestInput>, RepairDetailUncheckedUpdateWithoutRepairRequestInput>
  }

  export type ShippingUncheckedUpdateOneWithoutRepairRequestNestedInput = {
    create?: XOR<ShippingCreateWithoutRepairRequestInput, ShippingUncheckedCreateWithoutRepairRequestInput>
    connectOrCreate?: ShippingCreateOrConnectWithoutRepairRequestInput
    upsert?: ShippingUpsertWithoutRepairRequestInput
    disconnect?: ShippingWhereInput | boolean
    delete?: ShippingWhereInput | boolean
    connect?: ShippingWhereUniqueInput
    update?: XOR<XOR<ShippingUpdateToOneWithWhereWithoutRepairRequestInput, ShippingUpdateWithoutRepairRequestInput>, ShippingUncheckedUpdateWithoutRepairRequestInput>
  }

  export type CloseRepairUncheckedUpdateOneWithoutRepairRequestNestedInput = {
    create?: XOR<CloseRepairCreateWithoutRepairRequestInput, CloseRepairUncheckedCreateWithoutRepairRequestInput>
    connectOrCreate?: CloseRepairCreateOrConnectWithoutRepairRequestInput
    upsert?: CloseRepairUpsertWithoutRepairRequestInput
    disconnect?: CloseRepairWhereInput | boolean
    delete?: CloseRepairWhereInput | boolean
    connect?: CloseRepairWhereUniqueInput
    update?: XOR<XOR<CloseRepairUpdateToOneWithWhereWithoutRepairRequestInput, CloseRepairUpdateWithoutRepairRequestInput>, CloseRepairUncheckedUpdateWithoutRepairRequestInput>
  }

  export type RepairRequestCreateNestedOneWithoutImagesInput = {
    create?: XOR<RepairRequestCreateWithoutImagesInput, RepairRequestUncheckedCreateWithoutImagesInput>
    connectOrCreate?: RepairRequestCreateOrConnectWithoutImagesInput
    connect?: RepairRequestWhereUniqueInput
  }

  export type RepairRequestUpdateOneRequiredWithoutImagesNestedInput = {
    create?: XOR<RepairRequestCreateWithoutImagesInput, RepairRequestUncheckedCreateWithoutImagesInput>
    connectOrCreate?: RepairRequestCreateOrConnectWithoutImagesInput
    upsert?: RepairRequestUpsertWithoutImagesInput
    connect?: RepairRequestWhereUniqueInput
    update?: XOR<XOR<RepairRequestUpdateToOneWithWhereWithoutImagesInput, RepairRequestUpdateWithoutImagesInput>, RepairRequestUncheckedUpdateWithoutImagesInput>
  }

  export type RepairRequestCreateNestedOneWithoutDetailsInput = {
    create?: XOR<RepairRequestCreateWithoutDetailsInput, RepairRequestUncheckedCreateWithoutDetailsInput>
    connectOrCreate?: RepairRequestCreateOrConnectWithoutDetailsInput
    connect?: RepairRequestWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutAssignedRepairsInput = {
    create?: XOR<UserCreateWithoutAssignedRepairsInput, UserUncheckedCreateWithoutAssignedRepairsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAssignedRepairsInput
    connect?: UserWhereUniqueInput
  }

  export type RepairPartCreateNestedManyWithoutDetailInput = {
    create?: XOR<RepairPartCreateWithoutDetailInput, RepairPartUncheckedCreateWithoutDetailInput> | RepairPartCreateWithoutDetailInput[] | RepairPartUncheckedCreateWithoutDetailInput[]
    connectOrCreate?: RepairPartCreateOrConnectWithoutDetailInput | RepairPartCreateOrConnectWithoutDetailInput[]
    createMany?: RepairPartCreateManyDetailInputEnvelope
    connect?: RepairPartWhereUniqueInput | RepairPartWhereUniqueInput[]
  }

  export type RepairPartUncheckedCreateNestedManyWithoutDetailInput = {
    create?: XOR<RepairPartCreateWithoutDetailInput, RepairPartUncheckedCreateWithoutDetailInput> | RepairPartCreateWithoutDetailInput[] | RepairPartUncheckedCreateWithoutDetailInput[]
    connectOrCreate?: RepairPartCreateOrConnectWithoutDetailInput | RepairPartCreateOrConnectWithoutDetailInput[]
    createMany?: RepairPartCreateManyDetailInputEnvelope
    connect?: RepairPartWhereUniqueInput | RepairPartWhereUniqueInput[]
  }

  export type RepairRequestUpdateOneRequiredWithoutDetailsNestedInput = {
    create?: XOR<RepairRequestCreateWithoutDetailsInput, RepairRequestUncheckedCreateWithoutDetailsInput>
    connectOrCreate?: RepairRequestCreateOrConnectWithoutDetailsInput
    upsert?: RepairRequestUpsertWithoutDetailsInput
    connect?: RepairRequestWhereUniqueInput
    update?: XOR<XOR<RepairRequestUpdateToOneWithWhereWithoutDetailsInput, RepairRequestUpdateWithoutDetailsInput>, RepairRequestUncheckedUpdateWithoutDetailsInput>
  }

  export type UserUpdateOneWithoutAssignedRepairsNestedInput = {
    create?: XOR<UserCreateWithoutAssignedRepairsInput, UserUncheckedCreateWithoutAssignedRepairsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAssignedRepairsInput
    upsert?: UserUpsertWithoutAssignedRepairsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAssignedRepairsInput, UserUpdateWithoutAssignedRepairsInput>, UserUncheckedUpdateWithoutAssignedRepairsInput>
  }

  export type RepairPartUpdateManyWithoutDetailNestedInput = {
    create?: XOR<RepairPartCreateWithoutDetailInput, RepairPartUncheckedCreateWithoutDetailInput> | RepairPartCreateWithoutDetailInput[] | RepairPartUncheckedCreateWithoutDetailInput[]
    connectOrCreate?: RepairPartCreateOrConnectWithoutDetailInput | RepairPartCreateOrConnectWithoutDetailInput[]
    upsert?: RepairPartUpsertWithWhereUniqueWithoutDetailInput | RepairPartUpsertWithWhereUniqueWithoutDetailInput[]
    createMany?: RepairPartCreateManyDetailInputEnvelope
    set?: RepairPartWhereUniqueInput | RepairPartWhereUniqueInput[]
    disconnect?: RepairPartWhereUniqueInput | RepairPartWhereUniqueInput[]
    delete?: RepairPartWhereUniqueInput | RepairPartWhereUniqueInput[]
    connect?: RepairPartWhereUniqueInput | RepairPartWhereUniqueInput[]
    update?: RepairPartUpdateWithWhereUniqueWithoutDetailInput | RepairPartUpdateWithWhereUniqueWithoutDetailInput[]
    updateMany?: RepairPartUpdateManyWithWhereWithoutDetailInput | RepairPartUpdateManyWithWhereWithoutDetailInput[]
    deleteMany?: RepairPartScalarWhereInput | RepairPartScalarWhereInput[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type RepairPartUncheckedUpdateManyWithoutDetailNestedInput = {
    create?: XOR<RepairPartCreateWithoutDetailInput, RepairPartUncheckedCreateWithoutDetailInput> | RepairPartCreateWithoutDetailInput[] | RepairPartUncheckedCreateWithoutDetailInput[]
    connectOrCreate?: RepairPartCreateOrConnectWithoutDetailInput | RepairPartCreateOrConnectWithoutDetailInput[]
    upsert?: RepairPartUpsertWithWhereUniqueWithoutDetailInput | RepairPartUpsertWithWhereUniqueWithoutDetailInput[]
    createMany?: RepairPartCreateManyDetailInputEnvelope
    set?: RepairPartWhereUniqueInput | RepairPartWhereUniqueInput[]
    disconnect?: RepairPartWhereUniqueInput | RepairPartWhereUniqueInput[]
    delete?: RepairPartWhereUniqueInput | RepairPartWhereUniqueInput[]
    connect?: RepairPartWhereUniqueInput | RepairPartWhereUniqueInput[]
    update?: RepairPartUpdateWithWhereUniqueWithoutDetailInput | RepairPartUpdateWithWhereUniqueWithoutDetailInput[]
    updateMany?: RepairPartUpdateManyWithWhereWithoutDetailInput | RepairPartUpdateManyWithWhereWithoutDetailInput[]
    deleteMany?: RepairPartScalarWhereInput | RepairPartScalarWhereInput[]
  }

  export type RepairDetailCreateNestedOneWithoutPartsInput = {
    create?: XOR<RepairDetailCreateWithoutPartsInput, RepairDetailUncheckedCreateWithoutPartsInput>
    connectOrCreate?: RepairDetailCreateOrConnectWithoutPartsInput
    connect?: RepairDetailWhereUniqueInput
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type RepairDetailUpdateOneRequiredWithoutPartsNestedInput = {
    create?: XOR<RepairDetailCreateWithoutPartsInput, RepairDetailUncheckedCreateWithoutPartsInput>
    connectOrCreate?: RepairDetailCreateOrConnectWithoutPartsInput
    upsert?: RepairDetailUpsertWithoutPartsInput
    connect?: RepairDetailWhereUniqueInput
    update?: XOR<XOR<RepairDetailUpdateToOneWithWhereWithoutPartsInput, RepairDetailUpdateWithoutPartsInput>, RepairDetailUncheckedUpdateWithoutPartsInput>
  }

  export type RepairRequestCreateNestedOneWithoutShippingInput = {
    create?: XOR<RepairRequestCreateWithoutShippingInput, RepairRequestUncheckedCreateWithoutShippingInput>
    connectOrCreate?: RepairRequestCreateOrConnectWithoutShippingInput
    connect?: RepairRequestWhereUniqueInput
  }

  export type RepairRequestUpdateOneRequiredWithoutShippingNestedInput = {
    create?: XOR<RepairRequestCreateWithoutShippingInput, RepairRequestUncheckedCreateWithoutShippingInput>
    connectOrCreate?: RepairRequestCreateOrConnectWithoutShippingInput
    upsert?: RepairRequestUpsertWithoutShippingInput
    connect?: RepairRequestWhereUniqueInput
    update?: XOR<XOR<RepairRequestUpdateToOneWithWhereWithoutShippingInput, RepairRequestUpdateWithoutShippingInput>, RepairRequestUncheckedUpdateWithoutShippingInput>
  }

  export type RepairRequestCreateNestedOneWithoutClosedJobInput = {
    create?: XOR<RepairRequestCreateWithoutClosedJobInput, RepairRequestUncheckedCreateWithoutClosedJobInput>
    connectOrCreate?: RepairRequestCreateOrConnectWithoutClosedJobInput
    connect?: RepairRequestWhereUniqueInput
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type RepairRequestUpdateOneRequiredWithoutClosedJobNestedInput = {
    create?: XOR<RepairRequestCreateWithoutClosedJobInput, RepairRequestUncheckedCreateWithoutClosedJobInput>
    connectOrCreate?: RepairRequestCreateOrConnectWithoutClosedJobInput
    upsert?: RepairRequestUpsertWithoutClosedJobInput
    connect?: RepairRequestWhereUniqueInput
    update?: XOR<XOR<RepairRequestUpdateToOneWithWhereWithoutClosedJobInput, RepairRequestUpdateWithoutClosedJobInput>, RepairRequestUncheckedUpdateWithoutClosedJobInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumRepairStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.RepairStatus | EnumRepairStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RepairStatus[] | ListEnumRepairStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.RepairStatus[] | ListEnumRepairStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumRepairStatusFilter<$PrismaModel> | $Enums.RepairStatus
  }

  export type NestedEnumRepairStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RepairStatus | EnumRepairStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RepairStatus[] | ListEnumRepairStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.RepairStatus[] | ListEnumRepairStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumRepairStatusWithAggregatesFilter<$PrismaModel> | $Enums.RepairStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRepairStatusFilter<$PrismaModel>
    _max?: NestedEnumRepairStatusFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type RepairRequestCreateWithoutCustomerInput = {
    printerModel: string
    serialNumber: string
    address?: string | null
    issueDesc: string
    accessories?: string | null
    requestDate?: Date | string
    contactInfo?: string | null
    status?: $Enums.RepairStatus
    images?: RepairImageCreateNestedManyWithoutRepairRequestInput
    details?: RepairDetailCreateNestedOneWithoutRepairRequestInput
    shipping?: ShippingCreateNestedOneWithoutRepairRequestInput
    closedJob?: CloseRepairCreateNestedOneWithoutRepairRequestInput
  }

  export type RepairRequestUncheckedCreateWithoutCustomerInput = {
    id?: number
    printerModel: string
    serialNumber: string
    address?: string | null
    issueDesc: string
    accessories?: string | null
    requestDate?: Date | string
    contactInfo?: string | null
    status?: $Enums.RepairStatus
    images?: RepairImageUncheckedCreateNestedManyWithoutRepairRequestInput
    details?: RepairDetailUncheckedCreateNestedOneWithoutRepairRequestInput
    shipping?: ShippingUncheckedCreateNestedOneWithoutRepairRequestInput
    closedJob?: CloseRepairUncheckedCreateNestedOneWithoutRepairRequestInput
  }

  export type RepairRequestCreateOrConnectWithoutCustomerInput = {
    where: RepairRequestWhereUniqueInput
    create: XOR<RepairRequestCreateWithoutCustomerInput, RepairRequestUncheckedCreateWithoutCustomerInput>
  }

  export type RepairRequestCreateManyCustomerInputEnvelope = {
    data: RepairRequestCreateManyCustomerInput | RepairRequestCreateManyCustomerInput[]
    skipDuplicates?: boolean
  }

  export type RepairDetailCreateWithoutTechnicianInput = {
    notes?: string | null
    updatedAt?: Date | string
    repairRequest: RepairRequestCreateNestedOneWithoutDetailsInput
    parts?: RepairPartCreateNestedManyWithoutDetailInput
  }

  export type RepairDetailUncheckedCreateWithoutTechnicianInput = {
    id?: number
    repairRequestId: number
    notes?: string | null
    updatedAt?: Date | string
    parts?: RepairPartUncheckedCreateNestedManyWithoutDetailInput
  }

  export type RepairDetailCreateOrConnectWithoutTechnicianInput = {
    where: RepairDetailWhereUniqueInput
    create: XOR<RepairDetailCreateWithoutTechnicianInput, RepairDetailUncheckedCreateWithoutTechnicianInput>
  }

  export type RepairDetailCreateManyTechnicianInputEnvelope = {
    data: RepairDetailCreateManyTechnicianInput | RepairDetailCreateManyTechnicianInput[]
    skipDuplicates?: boolean
  }

  export type RepairRequestUpsertWithWhereUniqueWithoutCustomerInput = {
    where: RepairRequestWhereUniqueInput
    update: XOR<RepairRequestUpdateWithoutCustomerInput, RepairRequestUncheckedUpdateWithoutCustomerInput>
    create: XOR<RepairRequestCreateWithoutCustomerInput, RepairRequestUncheckedCreateWithoutCustomerInput>
  }

  export type RepairRequestUpdateWithWhereUniqueWithoutCustomerInput = {
    where: RepairRequestWhereUniqueInput
    data: XOR<RepairRequestUpdateWithoutCustomerInput, RepairRequestUncheckedUpdateWithoutCustomerInput>
  }

  export type RepairRequestUpdateManyWithWhereWithoutCustomerInput = {
    where: RepairRequestScalarWhereInput
    data: XOR<RepairRequestUpdateManyMutationInput, RepairRequestUncheckedUpdateManyWithoutCustomerInput>
  }

  export type RepairRequestScalarWhereInput = {
    AND?: RepairRequestScalarWhereInput | RepairRequestScalarWhereInput[]
    OR?: RepairRequestScalarWhereInput[]
    NOT?: RepairRequestScalarWhereInput | RepairRequestScalarWhereInput[]
    id?: IntFilter<"RepairRequest"> | number
    printerModel?: StringFilter<"RepairRequest"> | string
    serialNumber?: StringFilter<"RepairRequest"> | string
    customerId?: IntFilter<"RepairRequest"> | number
    address?: StringNullableFilter<"RepairRequest"> | string | null
    issueDesc?: StringFilter<"RepairRequest"> | string
    accessories?: StringNullableFilter<"RepairRequest"> | string | null
    requestDate?: DateTimeFilter<"RepairRequest"> | Date | string
    contactInfo?: StringNullableFilter<"RepairRequest"> | string | null
    status?: EnumRepairStatusFilter<"RepairRequest"> | $Enums.RepairStatus
  }

  export type RepairDetailUpsertWithWhereUniqueWithoutTechnicianInput = {
    where: RepairDetailWhereUniqueInput
    update: XOR<RepairDetailUpdateWithoutTechnicianInput, RepairDetailUncheckedUpdateWithoutTechnicianInput>
    create: XOR<RepairDetailCreateWithoutTechnicianInput, RepairDetailUncheckedCreateWithoutTechnicianInput>
  }

  export type RepairDetailUpdateWithWhereUniqueWithoutTechnicianInput = {
    where: RepairDetailWhereUniqueInput
    data: XOR<RepairDetailUpdateWithoutTechnicianInput, RepairDetailUncheckedUpdateWithoutTechnicianInput>
  }

  export type RepairDetailUpdateManyWithWhereWithoutTechnicianInput = {
    where: RepairDetailScalarWhereInput
    data: XOR<RepairDetailUpdateManyMutationInput, RepairDetailUncheckedUpdateManyWithoutTechnicianInput>
  }

  export type RepairDetailScalarWhereInput = {
    AND?: RepairDetailScalarWhereInput | RepairDetailScalarWhereInput[]
    OR?: RepairDetailScalarWhereInput[]
    NOT?: RepairDetailScalarWhereInput | RepairDetailScalarWhereInput[]
    id?: IntFilter<"RepairDetail"> | number
    repairRequestId?: IntFilter<"RepairDetail"> | number
    notes?: StringNullableFilter<"RepairDetail"> | string | null
    technicianId?: IntNullableFilter<"RepairDetail"> | number | null
    updatedAt?: DateTimeFilter<"RepairDetail"> | Date | string
  }

  export type UserCreateWithoutRepairRequestsInput = {
    name?: string | null
    email: string
    password: string
    phone?: string | null
    role?: $Enums.Role
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    assignedRepairs?: RepairDetailCreateNestedManyWithoutTechnicianInput
  }

  export type UserUncheckedCreateWithoutRepairRequestsInput = {
    id?: number
    name?: string | null
    email: string
    password: string
    phone?: string | null
    role?: $Enums.Role
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    assignedRepairs?: RepairDetailUncheckedCreateNestedManyWithoutTechnicianInput
  }

  export type UserCreateOrConnectWithoutRepairRequestsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutRepairRequestsInput, UserUncheckedCreateWithoutRepairRequestsInput>
  }

  export type RepairImageCreateWithoutRepairRequestInput = {
    url: string
    uploadedAt?: Date | string
  }

  export type RepairImageUncheckedCreateWithoutRepairRequestInput = {
    id?: number
    url: string
    uploadedAt?: Date | string
  }

  export type RepairImageCreateOrConnectWithoutRepairRequestInput = {
    where: RepairImageWhereUniqueInput
    create: XOR<RepairImageCreateWithoutRepairRequestInput, RepairImageUncheckedCreateWithoutRepairRequestInput>
  }

  export type RepairImageCreateManyRepairRequestInputEnvelope = {
    data: RepairImageCreateManyRepairRequestInput | RepairImageCreateManyRepairRequestInput[]
    skipDuplicates?: boolean
  }

  export type RepairDetailCreateWithoutRepairRequestInput = {
    notes?: string | null
    updatedAt?: Date | string
    technician?: UserCreateNestedOneWithoutAssignedRepairsInput
    parts?: RepairPartCreateNestedManyWithoutDetailInput
  }

  export type RepairDetailUncheckedCreateWithoutRepairRequestInput = {
    id?: number
    notes?: string | null
    technicianId?: number | null
    updatedAt?: Date | string
    parts?: RepairPartUncheckedCreateNestedManyWithoutDetailInput
  }

  export type RepairDetailCreateOrConnectWithoutRepairRequestInput = {
    where: RepairDetailWhereUniqueInput
    create: XOR<RepairDetailCreateWithoutRepairRequestInput, RepairDetailUncheckedCreateWithoutRepairRequestInput>
  }

  export type ShippingCreateWithoutRepairRequestInput = {
    company: string
    trackingNumber: string
    sentDate: Date | string
    status?: string | null
  }

  export type ShippingUncheckedCreateWithoutRepairRequestInput = {
    id?: number
    company: string
    trackingNumber: string
    sentDate: Date | string
    status?: string | null
  }

  export type ShippingCreateOrConnectWithoutRepairRequestInput = {
    where: ShippingWhereUniqueInput
    create: XOR<ShippingCreateWithoutRepairRequestInput, ShippingUncheckedCreateWithoutRepairRequestInput>
  }

  export type CloseRepairCreateWithoutRepairRequestInput = {
    finishedDate: Date | string
    receivedDate?: Date | string | null
    receiptUrl?: string | null
  }

  export type CloseRepairUncheckedCreateWithoutRepairRequestInput = {
    id?: number
    finishedDate: Date | string
    receivedDate?: Date | string | null
    receiptUrl?: string | null
  }

  export type CloseRepairCreateOrConnectWithoutRepairRequestInput = {
    where: CloseRepairWhereUniqueInput
    create: XOR<CloseRepairCreateWithoutRepairRequestInput, CloseRepairUncheckedCreateWithoutRepairRequestInput>
  }

  export type UserUpsertWithoutRepairRequestsInput = {
    update: XOR<UserUpdateWithoutRepairRequestsInput, UserUncheckedUpdateWithoutRepairRequestsInput>
    create: XOR<UserCreateWithoutRepairRequestsInput, UserUncheckedCreateWithoutRepairRequestsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutRepairRequestsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutRepairRequestsInput, UserUncheckedUpdateWithoutRepairRequestsInput>
  }

  export type UserUpdateWithoutRepairRequestsInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    assignedRepairs?: RepairDetailUpdateManyWithoutTechnicianNestedInput
  }

  export type UserUncheckedUpdateWithoutRepairRequestsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    assignedRepairs?: RepairDetailUncheckedUpdateManyWithoutTechnicianNestedInput
  }

  export type RepairImageUpsertWithWhereUniqueWithoutRepairRequestInput = {
    where: RepairImageWhereUniqueInput
    update: XOR<RepairImageUpdateWithoutRepairRequestInput, RepairImageUncheckedUpdateWithoutRepairRequestInput>
    create: XOR<RepairImageCreateWithoutRepairRequestInput, RepairImageUncheckedCreateWithoutRepairRequestInput>
  }

  export type RepairImageUpdateWithWhereUniqueWithoutRepairRequestInput = {
    where: RepairImageWhereUniqueInput
    data: XOR<RepairImageUpdateWithoutRepairRequestInput, RepairImageUncheckedUpdateWithoutRepairRequestInput>
  }

  export type RepairImageUpdateManyWithWhereWithoutRepairRequestInput = {
    where: RepairImageScalarWhereInput
    data: XOR<RepairImageUpdateManyMutationInput, RepairImageUncheckedUpdateManyWithoutRepairRequestInput>
  }

  export type RepairImageScalarWhereInput = {
    AND?: RepairImageScalarWhereInput | RepairImageScalarWhereInput[]
    OR?: RepairImageScalarWhereInput[]
    NOT?: RepairImageScalarWhereInput | RepairImageScalarWhereInput[]
    id?: IntFilter<"RepairImage"> | number
    repairRequestId?: IntFilter<"RepairImage"> | number
    url?: StringFilter<"RepairImage"> | string
    uploadedAt?: DateTimeFilter<"RepairImage"> | Date | string
  }

  export type RepairDetailUpsertWithoutRepairRequestInput = {
    update: XOR<RepairDetailUpdateWithoutRepairRequestInput, RepairDetailUncheckedUpdateWithoutRepairRequestInput>
    create: XOR<RepairDetailCreateWithoutRepairRequestInput, RepairDetailUncheckedCreateWithoutRepairRequestInput>
    where?: RepairDetailWhereInput
  }

  export type RepairDetailUpdateToOneWithWhereWithoutRepairRequestInput = {
    where?: RepairDetailWhereInput
    data: XOR<RepairDetailUpdateWithoutRepairRequestInput, RepairDetailUncheckedUpdateWithoutRepairRequestInput>
  }

  export type RepairDetailUpdateWithoutRepairRequestInput = {
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    technician?: UserUpdateOneWithoutAssignedRepairsNestedInput
    parts?: RepairPartUpdateManyWithoutDetailNestedInput
  }

  export type RepairDetailUncheckedUpdateWithoutRepairRequestInput = {
    id?: IntFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    technicianId?: NullableIntFieldUpdateOperationsInput | number | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    parts?: RepairPartUncheckedUpdateManyWithoutDetailNestedInput
  }

  export type ShippingUpsertWithoutRepairRequestInput = {
    update: XOR<ShippingUpdateWithoutRepairRequestInput, ShippingUncheckedUpdateWithoutRepairRequestInput>
    create: XOR<ShippingCreateWithoutRepairRequestInput, ShippingUncheckedCreateWithoutRepairRequestInput>
    where?: ShippingWhereInput
  }

  export type ShippingUpdateToOneWithWhereWithoutRepairRequestInput = {
    where?: ShippingWhereInput
    data: XOR<ShippingUpdateWithoutRepairRequestInput, ShippingUncheckedUpdateWithoutRepairRequestInput>
  }

  export type ShippingUpdateWithoutRepairRequestInput = {
    company?: StringFieldUpdateOperationsInput | string
    trackingNumber?: StringFieldUpdateOperationsInput | string
    sentDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ShippingUncheckedUpdateWithoutRepairRequestInput = {
    id?: IntFieldUpdateOperationsInput | number
    company?: StringFieldUpdateOperationsInput | string
    trackingNumber?: StringFieldUpdateOperationsInput | string
    sentDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CloseRepairUpsertWithoutRepairRequestInput = {
    update: XOR<CloseRepairUpdateWithoutRepairRequestInput, CloseRepairUncheckedUpdateWithoutRepairRequestInput>
    create: XOR<CloseRepairCreateWithoutRepairRequestInput, CloseRepairUncheckedCreateWithoutRepairRequestInput>
    where?: CloseRepairWhereInput
  }

  export type CloseRepairUpdateToOneWithWhereWithoutRepairRequestInput = {
    where?: CloseRepairWhereInput
    data: XOR<CloseRepairUpdateWithoutRepairRequestInput, CloseRepairUncheckedUpdateWithoutRepairRequestInput>
  }

  export type CloseRepairUpdateWithoutRepairRequestInput = {
    finishedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    receivedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    receiptUrl?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CloseRepairUncheckedUpdateWithoutRepairRequestInput = {
    id?: IntFieldUpdateOperationsInput | number
    finishedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    receivedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    receiptUrl?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type RepairRequestCreateWithoutImagesInput = {
    printerModel: string
    serialNumber: string
    address?: string | null
    issueDesc: string
    accessories?: string | null
    requestDate?: Date | string
    contactInfo?: string | null
    status?: $Enums.RepairStatus
    customer: UserCreateNestedOneWithoutRepairRequestsInput
    details?: RepairDetailCreateNestedOneWithoutRepairRequestInput
    shipping?: ShippingCreateNestedOneWithoutRepairRequestInput
    closedJob?: CloseRepairCreateNestedOneWithoutRepairRequestInput
  }

  export type RepairRequestUncheckedCreateWithoutImagesInput = {
    id?: number
    printerModel: string
    serialNumber: string
    customerId: number
    address?: string | null
    issueDesc: string
    accessories?: string | null
    requestDate?: Date | string
    contactInfo?: string | null
    status?: $Enums.RepairStatus
    details?: RepairDetailUncheckedCreateNestedOneWithoutRepairRequestInput
    shipping?: ShippingUncheckedCreateNestedOneWithoutRepairRequestInput
    closedJob?: CloseRepairUncheckedCreateNestedOneWithoutRepairRequestInput
  }

  export type RepairRequestCreateOrConnectWithoutImagesInput = {
    where: RepairRequestWhereUniqueInput
    create: XOR<RepairRequestCreateWithoutImagesInput, RepairRequestUncheckedCreateWithoutImagesInput>
  }

  export type RepairRequestUpsertWithoutImagesInput = {
    update: XOR<RepairRequestUpdateWithoutImagesInput, RepairRequestUncheckedUpdateWithoutImagesInput>
    create: XOR<RepairRequestCreateWithoutImagesInput, RepairRequestUncheckedCreateWithoutImagesInput>
    where?: RepairRequestWhereInput
  }

  export type RepairRequestUpdateToOneWithWhereWithoutImagesInput = {
    where?: RepairRequestWhereInput
    data: XOR<RepairRequestUpdateWithoutImagesInput, RepairRequestUncheckedUpdateWithoutImagesInput>
  }

  export type RepairRequestUpdateWithoutImagesInput = {
    printerModel?: StringFieldUpdateOperationsInput | string
    serialNumber?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    issueDesc?: StringFieldUpdateOperationsInput | string
    accessories?: NullableStringFieldUpdateOperationsInput | string | null
    requestDate?: DateTimeFieldUpdateOperationsInput | Date | string
    contactInfo?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumRepairStatusFieldUpdateOperationsInput | $Enums.RepairStatus
    customer?: UserUpdateOneRequiredWithoutRepairRequestsNestedInput
    details?: RepairDetailUpdateOneWithoutRepairRequestNestedInput
    shipping?: ShippingUpdateOneWithoutRepairRequestNestedInput
    closedJob?: CloseRepairUpdateOneWithoutRepairRequestNestedInput
  }

  export type RepairRequestUncheckedUpdateWithoutImagesInput = {
    id?: IntFieldUpdateOperationsInput | number
    printerModel?: StringFieldUpdateOperationsInput | string
    serialNumber?: StringFieldUpdateOperationsInput | string
    customerId?: IntFieldUpdateOperationsInput | number
    address?: NullableStringFieldUpdateOperationsInput | string | null
    issueDesc?: StringFieldUpdateOperationsInput | string
    accessories?: NullableStringFieldUpdateOperationsInput | string | null
    requestDate?: DateTimeFieldUpdateOperationsInput | Date | string
    contactInfo?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumRepairStatusFieldUpdateOperationsInput | $Enums.RepairStatus
    details?: RepairDetailUncheckedUpdateOneWithoutRepairRequestNestedInput
    shipping?: ShippingUncheckedUpdateOneWithoutRepairRequestNestedInput
    closedJob?: CloseRepairUncheckedUpdateOneWithoutRepairRequestNestedInput
  }

  export type RepairRequestCreateWithoutDetailsInput = {
    printerModel: string
    serialNumber: string
    address?: string | null
    issueDesc: string
    accessories?: string | null
    requestDate?: Date | string
    contactInfo?: string | null
    status?: $Enums.RepairStatus
    customer: UserCreateNestedOneWithoutRepairRequestsInput
    images?: RepairImageCreateNestedManyWithoutRepairRequestInput
    shipping?: ShippingCreateNestedOneWithoutRepairRequestInput
    closedJob?: CloseRepairCreateNestedOneWithoutRepairRequestInput
  }

  export type RepairRequestUncheckedCreateWithoutDetailsInput = {
    id?: number
    printerModel: string
    serialNumber: string
    customerId: number
    address?: string | null
    issueDesc: string
    accessories?: string | null
    requestDate?: Date | string
    contactInfo?: string | null
    status?: $Enums.RepairStatus
    images?: RepairImageUncheckedCreateNestedManyWithoutRepairRequestInput
    shipping?: ShippingUncheckedCreateNestedOneWithoutRepairRequestInput
    closedJob?: CloseRepairUncheckedCreateNestedOneWithoutRepairRequestInput
  }

  export type RepairRequestCreateOrConnectWithoutDetailsInput = {
    where: RepairRequestWhereUniqueInput
    create: XOR<RepairRequestCreateWithoutDetailsInput, RepairRequestUncheckedCreateWithoutDetailsInput>
  }

  export type UserCreateWithoutAssignedRepairsInput = {
    name?: string | null
    email: string
    password: string
    phone?: string | null
    role?: $Enums.Role
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    repairRequests?: RepairRequestCreateNestedManyWithoutCustomerInput
  }

  export type UserUncheckedCreateWithoutAssignedRepairsInput = {
    id?: number
    name?: string | null
    email: string
    password: string
    phone?: string | null
    role?: $Enums.Role
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    repairRequests?: RepairRequestUncheckedCreateNestedManyWithoutCustomerInput
  }

  export type UserCreateOrConnectWithoutAssignedRepairsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAssignedRepairsInput, UserUncheckedCreateWithoutAssignedRepairsInput>
  }

  export type RepairPartCreateWithoutDetailInput = {
    partName: string
    price: number
    quantity?: number
  }

  export type RepairPartUncheckedCreateWithoutDetailInput = {
    id?: number
    partName: string
    price: number
    quantity?: number
  }

  export type RepairPartCreateOrConnectWithoutDetailInput = {
    where: RepairPartWhereUniqueInput
    create: XOR<RepairPartCreateWithoutDetailInput, RepairPartUncheckedCreateWithoutDetailInput>
  }

  export type RepairPartCreateManyDetailInputEnvelope = {
    data: RepairPartCreateManyDetailInput | RepairPartCreateManyDetailInput[]
    skipDuplicates?: boolean
  }

  export type RepairRequestUpsertWithoutDetailsInput = {
    update: XOR<RepairRequestUpdateWithoutDetailsInput, RepairRequestUncheckedUpdateWithoutDetailsInput>
    create: XOR<RepairRequestCreateWithoutDetailsInput, RepairRequestUncheckedCreateWithoutDetailsInput>
    where?: RepairRequestWhereInput
  }

  export type RepairRequestUpdateToOneWithWhereWithoutDetailsInput = {
    where?: RepairRequestWhereInput
    data: XOR<RepairRequestUpdateWithoutDetailsInput, RepairRequestUncheckedUpdateWithoutDetailsInput>
  }

  export type RepairRequestUpdateWithoutDetailsInput = {
    printerModel?: StringFieldUpdateOperationsInput | string
    serialNumber?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    issueDesc?: StringFieldUpdateOperationsInput | string
    accessories?: NullableStringFieldUpdateOperationsInput | string | null
    requestDate?: DateTimeFieldUpdateOperationsInput | Date | string
    contactInfo?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumRepairStatusFieldUpdateOperationsInput | $Enums.RepairStatus
    customer?: UserUpdateOneRequiredWithoutRepairRequestsNestedInput
    images?: RepairImageUpdateManyWithoutRepairRequestNestedInput
    shipping?: ShippingUpdateOneWithoutRepairRequestNestedInput
    closedJob?: CloseRepairUpdateOneWithoutRepairRequestNestedInput
  }

  export type RepairRequestUncheckedUpdateWithoutDetailsInput = {
    id?: IntFieldUpdateOperationsInput | number
    printerModel?: StringFieldUpdateOperationsInput | string
    serialNumber?: StringFieldUpdateOperationsInput | string
    customerId?: IntFieldUpdateOperationsInput | number
    address?: NullableStringFieldUpdateOperationsInput | string | null
    issueDesc?: StringFieldUpdateOperationsInput | string
    accessories?: NullableStringFieldUpdateOperationsInput | string | null
    requestDate?: DateTimeFieldUpdateOperationsInput | Date | string
    contactInfo?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumRepairStatusFieldUpdateOperationsInput | $Enums.RepairStatus
    images?: RepairImageUncheckedUpdateManyWithoutRepairRequestNestedInput
    shipping?: ShippingUncheckedUpdateOneWithoutRepairRequestNestedInput
    closedJob?: CloseRepairUncheckedUpdateOneWithoutRepairRequestNestedInput
  }

  export type UserUpsertWithoutAssignedRepairsInput = {
    update: XOR<UserUpdateWithoutAssignedRepairsInput, UserUncheckedUpdateWithoutAssignedRepairsInput>
    create: XOR<UserCreateWithoutAssignedRepairsInput, UserUncheckedCreateWithoutAssignedRepairsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAssignedRepairsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAssignedRepairsInput, UserUncheckedUpdateWithoutAssignedRepairsInput>
  }

  export type UserUpdateWithoutAssignedRepairsInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    repairRequests?: RepairRequestUpdateManyWithoutCustomerNestedInput
  }

  export type UserUncheckedUpdateWithoutAssignedRepairsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    repairRequests?: RepairRequestUncheckedUpdateManyWithoutCustomerNestedInput
  }

  export type RepairPartUpsertWithWhereUniqueWithoutDetailInput = {
    where: RepairPartWhereUniqueInput
    update: XOR<RepairPartUpdateWithoutDetailInput, RepairPartUncheckedUpdateWithoutDetailInput>
    create: XOR<RepairPartCreateWithoutDetailInput, RepairPartUncheckedCreateWithoutDetailInput>
  }

  export type RepairPartUpdateWithWhereUniqueWithoutDetailInput = {
    where: RepairPartWhereUniqueInput
    data: XOR<RepairPartUpdateWithoutDetailInput, RepairPartUncheckedUpdateWithoutDetailInput>
  }

  export type RepairPartUpdateManyWithWhereWithoutDetailInput = {
    where: RepairPartScalarWhereInput
    data: XOR<RepairPartUpdateManyMutationInput, RepairPartUncheckedUpdateManyWithoutDetailInput>
  }

  export type RepairPartScalarWhereInput = {
    AND?: RepairPartScalarWhereInput | RepairPartScalarWhereInput[]
    OR?: RepairPartScalarWhereInput[]
    NOT?: RepairPartScalarWhereInput | RepairPartScalarWhereInput[]
    id?: IntFilter<"RepairPart"> | number
    detailId?: IntFilter<"RepairPart"> | number
    partName?: StringFilter<"RepairPart"> | string
    price?: FloatFilter<"RepairPart"> | number
    quantity?: IntFilter<"RepairPart"> | number
  }

  export type RepairDetailCreateWithoutPartsInput = {
    notes?: string | null
    updatedAt?: Date | string
    repairRequest: RepairRequestCreateNestedOneWithoutDetailsInput
    technician?: UserCreateNestedOneWithoutAssignedRepairsInput
  }

  export type RepairDetailUncheckedCreateWithoutPartsInput = {
    id?: number
    repairRequestId: number
    notes?: string | null
    technicianId?: number | null
    updatedAt?: Date | string
  }

  export type RepairDetailCreateOrConnectWithoutPartsInput = {
    where: RepairDetailWhereUniqueInput
    create: XOR<RepairDetailCreateWithoutPartsInput, RepairDetailUncheckedCreateWithoutPartsInput>
  }

  export type RepairDetailUpsertWithoutPartsInput = {
    update: XOR<RepairDetailUpdateWithoutPartsInput, RepairDetailUncheckedUpdateWithoutPartsInput>
    create: XOR<RepairDetailCreateWithoutPartsInput, RepairDetailUncheckedCreateWithoutPartsInput>
    where?: RepairDetailWhereInput
  }

  export type RepairDetailUpdateToOneWithWhereWithoutPartsInput = {
    where?: RepairDetailWhereInput
    data: XOR<RepairDetailUpdateWithoutPartsInput, RepairDetailUncheckedUpdateWithoutPartsInput>
  }

  export type RepairDetailUpdateWithoutPartsInput = {
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    repairRequest?: RepairRequestUpdateOneRequiredWithoutDetailsNestedInput
    technician?: UserUpdateOneWithoutAssignedRepairsNestedInput
  }

  export type RepairDetailUncheckedUpdateWithoutPartsInput = {
    id?: IntFieldUpdateOperationsInput | number
    repairRequestId?: IntFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    technicianId?: NullableIntFieldUpdateOperationsInput | number | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RepairRequestCreateWithoutShippingInput = {
    printerModel: string
    serialNumber: string
    address?: string | null
    issueDesc: string
    accessories?: string | null
    requestDate?: Date | string
    contactInfo?: string | null
    status?: $Enums.RepairStatus
    customer: UserCreateNestedOneWithoutRepairRequestsInput
    images?: RepairImageCreateNestedManyWithoutRepairRequestInput
    details?: RepairDetailCreateNestedOneWithoutRepairRequestInput
    closedJob?: CloseRepairCreateNestedOneWithoutRepairRequestInput
  }

  export type RepairRequestUncheckedCreateWithoutShippingInput = {
    id?: number
    printerModel: string
    serialNumber: string
    customerId: number
    address?: string | null
    issueDesc: string
    accessories?: string | null
    requestDate?: Date | string
    contactInfo?: string | null
    status?: $Enums.RepairStatus
    images?: RepairImageUncheckedCreateNestedManyWithoutRepairRequestInput
    details?: RepairDetailUncheckedCreateNestedOneWithoutRepairRequestInput
    closedJob?: CloseRepairUncheckedCreateNestedOneWithoutRepairRequestInput
  }

  export type RepairRequestCreateOrConnectWithoutShippingInput = {
    where: RepairRequestWhereUniqueInput
    create: XOR<RepairRequestCreateWithoutShippingInput, RepairRequestUncheckedCreateWithoutShippingInput>
  }

  export type RepairRequestUpsertWithoutShippingInput = {
    update: XOR<RepairRequestUpdateWithoutShippingInput, RepairRequestUncheckedUpdateWithoutShippingInput>
    create: XOR<RepairRequestCreateWithoutShippingInput, RepairRequestUncheckedCreateWithoutShippingInput>
    where?: RepairRequestWhereInput
  }

  export type RepairRequestUpdateToOneWithWhereWithoutShippingInput = {
    where?: RepairRequestWhereInput
    data: XOR<RepairRequestUpdateWithoutShippingInput, RepairRequestUncheckedUpdateWithoutShippingInput>
  }

  export type RepairRequestUpdateWithoutShippingInput = {
    printerModel?: StringFieldUpdateOperationsInput | string
    serialNumber?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    issueDesc?: StringFieldUpdateOperationsInput | string
    accessories?: NullableStringFieldUpdateOperationsInput | string | null
    requestDate?: DateTimeFieldUpdateOperationsInput | Date | string
    contactInfo?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumRepairStatusFieldUpdateOperationsInput | $Enums.RepairStatus
    customer?: UserUpdateOneRequiredWithoutRepairRequestsNestedInput
    images?: RepairImageUpdateManyWithoutRepairRequestNestedInput
    details?: RepairDetailUpdateOneWithoutRepairRequestNestedInput
    closedJob?: CloseRepairUpdateOneWithoutRepairRequestNestedInput
  }

  export type RepairRequestUncheckedUpdateWithoutShippingInput = {
    id?: IntFieldUpdateOperationsInput | number
    printerModel?: StringFieldUpdateOperationsInput | string
    serialNumber?: StringFieldUpdateOperationsInput | string
    customerId?: IntFieldUpdateOperationsInput | number
    address?: NullableStringFieldUpdateOperationsInput | string | null
    issueDesc?: StringFieldUpdateOperationsInput | string
    accessories?: NullableStringFieldUpdateOperationsInput | string | null
    requestDate?: DateTimeFieldUpdateOperationsInput | Date | string
    contactInfo?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumRepairStatusFieldUpdateOperationsInput | $Enums.RepairStatus
    images?: RepairImageUncheckedUpdateManyWithoutRepairRequestNestedInput
    details?: RepairDetailUncheckedUpdateOneWithoutRepairRequestNestedInput
    closedJob?: CloseRepairUncheckedUpdateOneWithoutRepairRequestNestedInput
  }

  export type RepairRequestCreateWithoutClosedJobInput = {
    printerModel: string
    serialNumber: string
    address?: string | null
    issueDesc: string
    accessories?: string | null
    requestDate?: Date | string
    contactInfo?: string | null
    status?: $Enums.RepairStatus
    customer: UserCreateNestedOneWithoutRepairRequestsInput
    images?: RepairImageCreateNestedManyWithoutRepairRequestInput
    details?: RepairDetailCreateNestedOneWithoutRepairRequestInput
    shipping?: ShippingCreateNestedOneWithoutRepairRequestInput
  }

  export type RepairRequestUncheckedCreateWithoutClosedJobInput = {
    id?: number
    printerModel: string
    serialNumber: string
    customerId: number
    address?: string | null
    issueDesc: string
    accessories?: string | null
    requestDate?: Date | string
    contactInfo?: string | null
    status?: $Enums.RepairStatus
    images?: RepairImageUncheckedCreateNestedManyWithoutRepairRequestInput
    details?: RepairDetailUncheckedCreateNestedOneWithoutRepairRequestInput
    shipping?: ShippingUncheckedCreateNestedOneWithoutRepairRequestInput
  }

  export type RepairRequestCreateOrConnectWithoutClosedJobInput = {
    where: RepairRequestWhereUniqueInput
    create: XOR<RepairRequestCreateWithoutClosedJobInput, RepairRequestUncheckedCreateWithoutClosedJobInput>
  }

  export type RepairRequestUpsertWithoutClosedJobInput = {
    update: XOR<RepairRequestUpdateWithoutClosedJobInput, RepairRequestUncheckedUpdateWithoutClosedJobInput>
    create: XOR<RepairRequestCreateWithoutClosedJobInput, RepairRequestUncheckedCreateWithoutClosedJobInput>
    where?: RepairRequestWhereInput
  }

  export type RepairRequestUpdateToOneWithWhereWithoutClosedJobInput = {
    where?: RepairRequestWhereInput
    data: XOR<RepairRequestUpdateWithoutClosedJobInput, RepairRequestUncheckedUpdateWithoutClosedJobInput>
  }

  export type RepairRequestUpdateWithoutClosedJobInput = {
    printerModel?: StringFieldUpdateOperationsInput | string
    serialNumber?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    issueDesc?: StringFieldUpdateOperationsInput | string
    accessories?: NullableStringFieldUpdateOperationsInput | string | null
    requestDate?: DateTimeFieldUpdateOperationsInput | Date | string
    contactInfo?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumRepairStatusFieldUpdateOperationsInput | $Enums.RepairStatus
    customer?: UserUpdateOneRequiredWithoutRepairRequestsNestedInput
    images?: RepairImageUpdateManyWithoutRepairRequestNestedInput
    details?: RepairDetailUpdateOneWithoutRepairRequestNestedInput
    shipping?: ShippingUpdateOneWithoutRepairRequestNestedInput
  }

  export type RepairRequestUncheckedUpdateWithoutClosedJobInput = {
    id?: IntFieldUpdateOperationsInput | number
    printerModel?: StringFieldUpdateOperationsInput | string
    serialNumber?: StringFieldUpdateOperationsInput | string
    customerId?: IntFieldUpdateOperationsInput | number
    address?: NullableStringFieldUpdateOperationsInput | string | null
    issueDesc?: StringFieldUpdateOperationsInput | string
    accessories?: NullableStringFieldUpdateOperationsInput | string | null
    requestDate?: DateTimeFieldUpdateOperationsInput | Date | string
    contactInfo?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumRepairStatusFieldUpdateOperationsInput | $Enums.RepairStatus
    images?: RepairImageUncheckedUpdateManyWithoutRepairRequestNestedInput
    details?: RepairDetailUncheckedUpdateOneWithoutRepairRequestNestedInput
    shipping?: ShippingUncheckedUpdateOneWithoutRepairRequestNestedInput
  }

  export type RepairRequestCreateManyCustomerInput = {
    id?: number
    printerModel: string
    serialNumber: string
    address?: string | null
    issueDesc: string
    accessories?: string | null
    requestDate?: Date | string
    contactInfo?: string | null
    status?: $Enums.RepairStatus
  }

  export type RepairDetailCreateManyTechnicianInput = {
    id?: number
    repairRequestId: number
    notes?: string | null
    updatedAt?: Date | string
  }

  export type RepairRequestUpdateWithoutCustomerInput = {
    printerModel?: StringFieldUpdateOperationsInput | string
    serialNumber?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    issueDesc?: StringFieldUpdateOperationsInput | string
    accessories?: NullableStringFieldUpdateOperationsInput | string | null
    requestDate?: DateTimeFieldUpdateOperationsInput | Date | string
    contactInfo?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumRepairStatusFieldUpdateOperationsInput | $Enums.RepairStatus
    images?: RepairImageUpdateManyWithoutRepairRequestNestedInput
    details?: RepairDetailUpdateOneWithoutRepairRequestNestedInput
    shipping?: ShippingUpdateOneWithoutRepairRequestNestedInput
    closedJob?: CloseRepairUpdateOneWithoutRepairRequestNestedInput
  }

  export type RepairRequestUncheckedUpdateWithoutCustomerInput = {
    id?: IntFieldUpdateOperationsInput | number
    printerModel?: StringFieldUpdateOperationsInput | string
    serialNumber?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    issueDesc?: StringFieldUpdateOperationsInput | string
    accessories?: NullableStringFieldUpdateOperationsInput | string | null
    requestDate?: DateTimeFieldUpdateOperationsInput | Date | string
    contactInfo?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumRepairStatusFieldUpdateOperationsInput | $Enums.RepairStatus
    images?: RepairImageUncheckedUpdateManyWithoutRepairRequestNestedInput
    details?: RepairDetailUncheckedUpdateOneWithoutRepairRequestNestedInput
    shipping?: ShippingUncheckedUpdateOneWithoutRepairRequestNestedInput
    closedJob?: CloseRepairUncheckedUpdateOneWithoutRepairRequestNestedInput
  }

  export type RepairRequestUncheckedUpdateManyWithoutCustomerInput = {
    id?: IntFieldUpdateOperationsInput | number
    printerModel?: StringFieldUpdateOperationsInput | string
    serialNumber?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    issueDesc?: StringFieldUpdateOperationsInput | string
    accessories?: NullableStringFieldUpdateOperationsInput | string | null
    requestDate?: DateTimeFieldUpdateOperationsInput | Date | string
    contactInfo?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumRepairStatusFieldUpdateOperationsInput | $Enums.RepairStatus
  }

  export type RepairDetailUpdateWithoutTechnicianInput = {
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    repairRequest?: RepairRequestUpdateOneRequiredWithoutDetailsNestedInput
    parts?: RepairPartUpdateManyWithoutDetailNestedInput
  }

  export type RepairDetailUncheckedUpdateWithoutTechnicianInput = {
    id?: IntFieldUpdateOperationsInput | number
    repairRequestId?: IntFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    parts?: RepairPartUncheckedUpdateManyWithoutDetailNestedInput
  }

  export type RepairDetailUncheckedUpdateManyWithoutTechnicianInput = {
    id?: IntFieldUpdateOperationsInput | number
    repairRequestId?: IntFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RepairImageCreateManyRepairRequestInput = {
    id?: number
    url: string
    uploadedAt?: Date | string
  }

  export type RepairImageUpdateWithoutRepairRequestInput = {
    url?: StringFieldUpdateOperationsInput | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RepairImageUncheckedUpdateWithoutRepairRequestInput = {
    id?: IntFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RepairImageUncheckedUpdateManyWithoutRepairRequestInput = {
    id?: IntFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RepairPartCreateManyDetailInput = {
    id?: number
    partName: string
    price: number
    quantity?: number
  }

  export type RepairPartUpdateWithoutDetailInput = {
    partName?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
  }

  export type RepairPartUncheckedUpdateWithoutDetailInput = {
    id?: IntFieldUpdateOperationsInput | number
    partName?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
  }

  export type RepairPartUncheckedUpdateManyWithoutDetailInput = {
    id?: IntFieldUpdateOperationsInput | number
    partName?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}