it('sem testes...', () => { })

// função 'getSomething' retorna uma Promise que resolve para o número 13 após 1 segundo.
const getSomething = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(13);
        }, 1000)
    })
}

// Esta função 'system' imprime 'init', chama a função 'getSomething' e, após a resolução da Promise,
// imprime 'Something is {valor da Promise}'.
const system = () => {
    console.log('init');
    getSomething().then(some => {
        console.log(`Something is ${some}`)
    })
    console.log('end')
}

// Aqui, a função 'system' é chamada. O que acontece é que 'init' é impresso, 'getSomething' é chamado
// e o código continua a executar. 'end' é impresso antes que a Promise seja resolvida e 'Something is 13'
// é impresso quando a Promise é resolvida após 1 segundo.
system();


//Promises
//Promises são um recurso do JavaScript para lidar com operações assíncronas. Elas representam um valor que pode estar disponível agora, no futuro ou nunca. 
//Promises permitem que você escreva código assíncrono de maneira mais legível e organizada, evitando o "callback hell" (aninhamento excessivo de callbacks).
//Promises são objetos que representam a eventual conclusão (ou falha) de uma operação assíncrona.

//Uma Promise pode estar em um dos três estados:

//Pending (Pendente): Estado inicial, ainda não resolvida nem rejeitada.
//Fulfilled (Resolvida): A operação foi concluída com sucesso e a Promise tem um valor resultante.
//Rejected (Rejeitada): A operação falhou e a Promise tem um motivo de falha (erro).