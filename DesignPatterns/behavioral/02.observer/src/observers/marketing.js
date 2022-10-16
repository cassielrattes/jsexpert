export default class Marketing {
    // importante lembrar que o [update] e responsavel por gerenciar sues erros/exceptions
    // nao deve se ter await no notify porque a responsabilidade do notify e so emitir eventos
    // so notificar todo mundo

    update({ id, userName }) {
        console.log(`[${id}]: [marketing] will send an welcome email to [${userName}]`);
    }
}