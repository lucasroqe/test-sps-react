import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function Home() {
  const navigate = useNavigate()

  function handleLogout() {
    localStorage.removeItem("token")
    navigate("/signin")
  }

  return (
    <div className="flex h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Dashboard</CardTitle>
          <CardDescription>Bem-vindo ao painel de controle.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Button onClick={() => navigate("/users")} className="w-full">
            Gerenciar Usuários
          </Button>
          <Button variant="outline" onClick={handleLogout} className="w-full">
            Sair
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}