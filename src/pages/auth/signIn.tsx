import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'

import { ThemeToggle } from '@/components/theme/themeToggle'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import BandaImg from '../../assets/banda.png'
import { Logo } from '../../components/Logo'

const signInForm = z.object({
  email: z.string().email(),
})

type SignInForm = z.infer<typeof signInForm>

export function SignIn() {
  const navigate = useNavigate()
  const { handleSubmit, register } = useForm<SignInForm>({
    resolver: zodResolver(signInForm),
  })

  function handleSignIn({ email }: SignInForm) {
    console.log(email)
    navigate('/dashboard')
  }

  return (
    <div className="relative mx-auto flex h-screen flex-col items-center justify-center px-6 py-8">
      <div className="absolute right-2 top-2">
        <ThemeToggle variant="auto" />
      </div>
      <div className="flex max-w-[1140px] flex-col items-center">
        <Logo className="h-[149px] w-[143px]" />
        <strong className="mt-6 text-center">
          Repertório Musical - Igreja Batista Reformada de Brasília
        </strong>
        <span className="my-12 max-w-[60%] text-center">
          Sistema de gerenciamento das escalas e do repertório da Igreja Batista
          Reformada de Brasília
        </span>
        <span className="max-w-[60%] text-center text-xs">
          Login via <strong>magic link</strong>. Informe seu e-mail cadastrado e
          receba o link de acesso.
        </span>
        <form
          onSubmit={handleSubmit(handleSignIn)}
          className="mt-8 flex flex-col items-center gap-3"
        >
          <Input placeholder="e-mail" {...register('email')} />
          <Button type="submit">Link de acesso por e-mail</Button>
        </form>
        <div className="absolute bottom-0 left-0 z-[-999]">
          <img src={BandaImg} alt="" />
        </div>
      </div>
    </div>
  )
}
