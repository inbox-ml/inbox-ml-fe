import { redirect } from '@tanstack/react-router'

function redirectDoDefaultChild(){
  throw redirect({to: "/main/newMail"})
}

export const Route = createFileRoute({
  loader: redirectDoDefaultChild
})
