import { zodResolver } from '@hookform/resolvers/zod'
import { LoaderCircle } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'

import { ThemeToggle } from '@/components/theme/themeToggle'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import supabase from '@/lib/supabaseClient'
import { cn } from '@/lib/utils'

import BandaImg from '../../assets/banda.png'
import { Logo } from '../../components/Logo'

const signInForm = z.object({
  email: z.string().email(),
  password: z.string().min(8, 'A senha precisa ter pelo menos 8 caracteres.'),
})

type SignInForm = z.infer<typeof signInForm>

export function SignIn() {
  const [error, setError] = useState('')
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<SignInForm>({
    resolver: zodResolver(signInForm),
  })
  const navigate = useNavigate()

  async function handleSignIn({ email, password }: SignInForm) {
    setError('')
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) {
      setError('Credenciais inválidas')
      return
    }
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
        <form
          onSubmit={handleSubmit(handleSignIn)}
          className="mt-4 flex flex-col items-center gap-3 rounded-md bg-muted p-4"
        >
          <span className="text-center text-sm font-semibold">
            Solicite seu acesso com o administrador caso ainda não o tenha
          </span>
          <Input
            className={cn(error && 'border-red-500')}
            placeholder="Seu e-mail"
            {...register('email')}
          />
          <Input
            className={cn(errors.password || (error && 'border-red-500'))}
            placeholder="Sua senha"
            type="password"
            {...register('password')}
          />
          {errors.password && (
            <span className="w-full text-left text-xs font-bold text-red-500">
              {errors.password.message}
            </span>
          )}
          <Button className="mt-2 w-full" type="submit" disabled={isSubmitting}>
            {isSubmitting && <LoaderCircle className="animate-spin" />}
            Fazer Login
          </Button>
          {error && (
            <span className="w-full text-left text-xs font-bold text-red-500">
              {error}
            </span>
          )}
        </form>
        <div className="absolute bottom-0 left-0 z-[-999]">
          <img src={BandaImg} alt="" />
        </div>
      </div>
    </div>
  )
}
