import * as React from "react"
import { useNavigate, useParams } from "react-router-dom"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import formSchema from "@/lib/zod";
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

export function UserEdit() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEditing = !!id

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  React.useEffect(() => {
    if (isEditing) {
      form.reset()
    }
  }, [id, isEditing, form])

  function onSubmit() {
    toast.success("Editado com sucesso")
    navigate("/users")
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
                    <Input
                      {...field}
                      id="form-user-name"
                      type="text"
                      aria-invalid={fieldState.invalid}
                      placeholder="Nome completo"
                    />
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
                    <Input
                      {...field}
                      id="form-user-email"
                      type="email"
                      aria-invalid={fieldState.invalid}
                      placeholder="usuario@spsgroup.com.br"
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
                    <FieldLabel htmlFor="form-user-password">
                      {isEditing ? "Nova Senha (opcional)" : "Senha"}
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-user-password"
                      type="password"
                      aria-invalid={fieldState.invalid}
                      placeholder="****"
                    />
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