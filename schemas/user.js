import z from 'zod'

const UserSchema = z.object({
  first_name: z.string({
    invalid_type_error: 'name must be a string',
    required_error: 'name is required.'
  }),

  user_handle: z.string(),
  email_adrres: z.string(),
  user_pasword: z.string().min(0).max(10).default(5),
  last_name: z.string()

})

export function validateUser (input) {
  return UserSchema.safeParse(input)
}

export function validatePartialUser (input) {
  return UserSchema.partial().safeParse(input)
}
