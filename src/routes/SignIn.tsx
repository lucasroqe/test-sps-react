import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import { signinSchema } from "@/lib/zod"
import { z } from "zod";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useNavigate } from "react-router-dom";
import { authService } from "@/services/authService"

export function SignIn() {
  const navigate = useNavigate()
  
  const form = useForm<z.infer<typeof signinSchema>>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

 async function onSubmit(data: z.infer<typeof signinSchema>) {
    try {
      await authService.login(data.email, data.password)
      toast.success("Logado com sucesso")
      navigate("/users")
    } catch (err: any) {
      toast.error(err.response?.data?.message ?? "Falha no login")
    }
  }

  return (
    <div className="flex h-screen items-center justify-center p-4">
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Entre com suas credenciais para acessar sua conta.</CardDescription>
      </CardHeader>
      <CardContent>
        <form id="form-login" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-login-email">Email</FieldLabel>
                  <Input
                    {...field}
                    id="form-login-email"
                    type="email"
                    aria-invalid={fieldState.invalid}
                    placeholder="admin@spsgroup.com.br"
                    autoComplete="email"
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-login-password">Senha</FieldLabel>
                  <Input
                    {...field}
                    id="form-login-password"
                    type="password"
                    aria-invalid={fieldState.invalid}
                    placeholder="1234"
                    autoComplete="current-password"
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button type="submit" form="form-login" disabled={form.formState.isSubmitting}>
            Sign In
          </Button>
        </Field>
      </CardFooter>
    </Card>
    </div>
  )
}