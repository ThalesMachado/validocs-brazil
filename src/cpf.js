/* https://campuscode.com.br/conteudos/o-calculo-do-digito-verificador-do-cpf-e-do-cnpj#:~:text=O%20c%C3%A1lculo%20de%20valida%C3%A7%C3%A3o%20do,2%20e%20somamos%20esse%20resultado. */

const REGEX_FORMATO_CPF = /^(\d{11}|\d{3}\.\d{3}\.\d{3}\-\d{2})$/gm
const REGEX_CPF_CARACTERES_ESPECIAIS = /(\.)*(\-)*/gm
const REGEX_CPF_NUMEROS_REPETIDOS = /\b(\d)\1{10}\b|\b(\d)\2{2}\.\2{3}\.\2{3}\-\2{2}\b/gm

const calcularSomatorio = (digitos = [], peso = 10) => {
    digitos[0] = digitos[0] * peso
    return digitos.reduce((acumulado, atual) => {
        peso--
        const posicaoAtual = atual * peso
        //console.log('Atual: ' + atual + ' Acumulado: ' + acumulado + ' Peso: ' + peso + ' Posição: ' + posicaoAtual)
        return posicaoAtual + acumulado
    })
}

const calcularPrimeiroDigito = (cpf = '') => {
    const sequencialFormatado = cpf.replace(REGEX_CPF_CARACTERES_ESPECIAIS, '')
        .slice(0,9).split('').map(digito => parseInt(digito))
    const restanteDivisao = calcularSomatorio(sequencialFormatado) % 11
    return (restanteDivisao >= 10) || (0 >= restanteDivisao >= 1) ? 0 : (11 - restanteDivisao % 11)
}

const calcularSegundoDigito = (cpf = '') => {
    const primeiroDigito = calcularPrimeiroDigito(cpf)
    const sequencialFormatado = cpf.replace(REGEX_CPF_CARACTERES_ESPECIAIS, '')
        .slice(0,9).concat(primeiroDigito).split('').map(digito => parseInt(digito))
    const restanteDivisao = calcularSomatorio(sequencialFormatado, 11) % 11
    return (restanteDivisao >= 10) || (0 >= restanteDivisao >= 1) ? 0 : (11 - restanteDivisao % 11)
} 

const calcularDigitos = (cpf = '') => {
    const primeiroDigito = calcularPrimeiroDigito(cpf)
    const sequencialFormatado = cpf.replace(REGEX_CPF_CARACTERES_ESPECIAIS, '')
        .slice(0,9).concat(primeiroDigito).split('').map(digito => parseInt(digito))
    const restanteDivisao = calcularSomatorio(sequencialFormatado, 11) % 11
    const segundoDigito = (restanteDivisao >= 10) || (0 >= restanteDivisao >= 1) ? 0 : (11 - restanteDivisao % 11)
    return `${primeiroDigito}${segundoDigito}`
} 

const verificarFormato = (cpf = '') => {
    if(!REGEX_FORMATO_CPF.test(cpf))
        return false
    else if (REGEX_CPF_NUMEROS_REPETIDOS.test(cpf))
        return false
    else return true
}

const validar = (cpf ='') => {
    if (!verificarFormato(cpf))
        return false
    else return (cpf.replace(REGEX_CPF_CARACTERES_ESPECIAIS, '').substring(9) == calcularDigitos(cpf))
}

module.exports = {
    calcularSomatorio,
    calcularPrimeiroDigito,
    calcularSegundoDigito,
    calcularDigitos,
    verificarFormato,
    validar
}