import { z } from 'zod'

const AppConfigSchema = z.object({
  api: z.object({
    apiPort: z.coerce.number(),
  }),
  authorization: z.object({
    jwt: z.object({
      JWT_SECRET: z.string(),
      JWT_EXPIRES_IN: z.any(), // Todo we should not use any
    }),
  }),
})

export type AppConfigType = z.infer<typeof AppConfigSchema>

export default async function getAppConfig(): Promise<AppConfigType> {
  const configObject: AppConfigType = {
    api: {
      apiPort: Number(process.env.PORT),
    },
    authorization: {
      jwt: {
        JWT_SECRET: process.env.JWT_SECRET,
        JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
      },
    },
  }

  // Todo Async parse is good exactly for places where performance is important (example: cold starts with cloud lambda).
  //  But for this case it not critical
  // const result = await AppConfigSchema.parseAsync(configObject)
  return AppConfigSchema.parse(configObject)
}
