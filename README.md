<p align="center">
 <img width="100px" src="https://raw.githubusercontent.com/hebertcisco/ts-npm-package-boilerplate/main/.github/images/favicon512x512-npm.png" align="center" alt=":package: ts-npm-package-boilerplate" />
 <h2 align="center">@cling/utils</h2>
 <p align="center">common utils</p>



# Getting started

## Installation

> npm i github:pruge/cling-utils

## :: Default

#### cn
```ts
import { cn } from '@cling/utils';

const isOpen = true
<div className={cn(isOpen ? 'text-red-500' : 'text-black')}>
</div>
```
#### toCapitalize
```ts
import { toCapitalize } from '@cling/utils';

const label = toCapitalize('home')
// Home
```

#### isEmpty
```ts
import { isEmpty } from '@cling/utils';

const label = ''
if (isEmpty(label)) {
  console.log('empty')
}
```

#### getValue
```ts
import { getValue } from '@cling/utils';

const label = ''
const labelWithDefault = getValue(label, 'default')
```

## :: legnedstate

#### findByKey
```ts
import {findByKey} from '@cling/utils'
import {observable} from '@legendapp/state'

type Item = {
  id: string
  name: string
  tag: string
}

const items$ = observable(syncedCrud({
  list: ... ,
  create: ... ,

  as: 'object'
}))

items$.push({
  id: '1',
  name: 'home',
  tag: 'button',
})

const item = findByKey<Item>(items$, 'tag', 'button')
// or
const id = '1'
const item = items$[id].get()
```

## :: error

#### AuthorizationError < BaseError < CustomError
```ts
import {AuthorizationError} from '@cling/utils'

throw new AuthorizationError('Unauthorized', 401)
```

#### isCustomError
```ts
import {AuthorizationError} from '@cling/utils'

const error =  new AuthorizationError('Unauthorized', 401)

if (isCustomError(error)) {
  console.log(error.message)
}
```

#### isZodError
```ts
import {isZodError} from '@cling/utils'

const schema = z.object({
  name: z.string(),
  age: z.number(),
})

try {
  schema.parse({
    name: 'John Doe',
    age: '30',
  })
} catch (error) {
  if (isZodError(error)) {
    console.log(error.message)
  }
}
```

#### isPrismaError : PrismaClientKnownRequestError
```ts
import {isPrismaError} from '@cling/utils'
import {prisma} from '@cling/prisma'


try {
  await prisma.user.create({
    data: {
      name: 'John Doe'
    }
  })
} catch (error) {
  if (isPrismaError(error)) {
    console.log(error.message)
  }
}
```

#### getPrettyError
```ts
import {getPrettyError} from '@cling/utils'


try {

  throw new AuthorizationError('Unauthorized', 401)
  throw zodError...
  throw prismaError...

} catch (error) {

  const {code, message} = getPrettyError(error)
  return Response.json(
    {
      success: false,
      message: message,
    },
    {status: code},
  )
}
```

## 📝 License

Copyright © 2022 [Prugehada](https://github.com/pruge).<br />
This project is [MIT](LICENSE) licensed.
