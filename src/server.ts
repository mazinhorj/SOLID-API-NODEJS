import { app } from './app'
import { env } from './env'

const theAuthor = 'Osmar Menezes da Silva (Mazinho)'

app
  .listen({
    host: '0.0.0.0',
    port: env.PORT,
  })
  .then(() => {
    console.log(
      `-> Desenvolvido por ${theAuthor} \n-> ✅ Servidor rodando em http://localhost:${env.PORT}`,
    )
  })
