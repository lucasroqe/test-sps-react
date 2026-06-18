import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button"

export function Users() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Lista de Usuários</h1>
      <Button>
        <Link to="/users/new">
          Criar novo usuário
        </Link>
      </Button>
    </div>
  )
}