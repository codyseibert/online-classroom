import { createRouter } from "./context";
import { z } from 'zod';
import { TeacherSignUpSchema, StudentSignUpSchema } from "../../common/validation/auth";
export const useRouter = createRouter()
    .mutation("studentSignUp", {
        input: StudentSignUpSchema,
        resolve: async ({ input, ctx }) => {
            const { username, email, school } = input;
            return `${username} is now a student.`
        }
    })
    .mutation("teacherSignUp", {
        input: TeacherSignUpSchema,
        resolve: async ({ input, ctx }) => {
            const { username, email, school, subject } = input;
            return `${username} from ${school} signed up as a teacher in ${subject}`
        }
    })