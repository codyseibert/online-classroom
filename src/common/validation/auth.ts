import { z } from 'zod';

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
});

export const StudentSignUpSchema = loginSchema.extend({
    username: z.string(),
    school: z.string(),
});

export const TeacherSignUpSchema = StudentSignUpSchema.extend({
    subject: z.string()
})

export type login = z.infer<typeof loginSchema>;
export type SSignUp = z.infer<typeof StudentSignUpSchema>;