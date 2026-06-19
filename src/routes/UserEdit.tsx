import * as React from "react"
import { useNavigate, useParams } from "react-router-dom"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { userSchema } from "@/lib/zod"
import { userService } from "@/services/userService"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function UserEdit() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEditing = !!id

  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: "",
      email: "",
      type: "user",
      password: "",
    },
  })

  React.useEffect(() => {
    if (!id) return
    userService.get(id).then((user) => {
      if (!user) {
        navigate("/users")
        return
      }
      form.reset({ name: user.name, email: user.email, type: user.type, password: "" })
    })
  }, [id])

  async function onSubmit(values: z.infer<typeof userSchema>) {
    if (!isEditing && !values.password) {
      form.setError("password", { message: "Senha obrigatória" })
      return
    }

    try {
      if (isEditing) {
        await userService.update(id!, {
          name: values.name,
          email: values.email,
          type: values.type,
        })
      } else {
        await userService.create(values)
      }
      navigate("/users")
    } catch (err: any) {
      toast.error(err.response?.data?.message ?? "Erro ao salvar")
    }
  }

  return (
    <div className="flex h-screen items-center justify-center p-4">
      <Card className="w-full sm:max-w-md">
        <CardHeader>
          <CardTitle>{isEditing ? "Editar Usuário" : "Novo Usuário"}</CardTitle>
          <CardDescription>
            {isEditing
              ? "Altere os dados do usuário selecionado."
              : "Preencha os dados para cadastrar um novo usuário."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form id="form-user" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-user-name">Nome</FieldLabel>
                    <Input {...field} id="form-user-name" type="text" placeholder="Nome completo" />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-user-email">Email</FieldLabel>
                    <Input {...field} id="form-user-email" type="email" placeholder="usuario@spsgroup.com.br" />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <Controller
                name="type"
                control={form.control}
                render={({ field }) => (
                  <Field>
                    <FieldLabel htmlFor="form-user-type">Tipo</FieldLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger id="form-user-type">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="user">user</SelectItem>
                        <SelectItem value="admin">admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>
                )}
              />
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-user-password">
                      {isEditing ? "Nova Senha (opcional)" : "Senha"}
                    </FieldLabel>
                    <Input {...field} id="form-user-password" type="password" placeholder="****" />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" type="button" onClick={() => navigate("/users")}>
            Cancelar
          </Button>
          <Button type="submit" form="form-user">
            {isEditing ? "Salvar Alterações" : "Cadastrar"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}