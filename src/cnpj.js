//TODO: Funções assíncronas

const REGEX_FORMATO_CNPJ = /^(\d{14}|\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2})$/gm
const REGEX_CNPJ_NUMEROS_REPETIDOS = /^\b(\d)\1{13}\b|\b(\d)\2{1}\.\2{3}\.\2{3}\/\2{4}\-\2{2}\b$/gm
const REGEX_CARACTERES_ESPECIAIS = /(\.)*(\-)*(\/)*/gm

const calculaSomatorio = (arrayCNPJ = []) => {
    arrayCNPJ[0] = arrayCNPJ[0] * 2
    let peso = 3
    return arrayCNPJ.reduce((acumulador, atual, index) => {
        const posicaoAtual = atual * peso
        peso = (peso != 9) ? peso + 1 : 2
        return acumulador + posicaoAtual
    })
}

const calculaSomatorioAsync = async (arrayCNPJ = []) => {
    arrayCNPJ[0] = arrayCNPJ[0] * 2
    let peso = 3
    return await arrayCNPJ.reduce((acumulador, atual, index) => {
        const posicaoAtual = atual * peso
        peso = (peso != 9) ? peso + 1 : 2
        return acumulador + posicaoAtual
    })
}

const calculaPrimeiroDigito = (cnpj = '') => {
    const cnpjFormatado = cnpj.replace(REGEX_CARACTERES_ESPECIAIS, '')
        .slice(0, 12).split('').reverse().map((item) => parseInt(item))
    const totalCalculo = calculaSomatorio(cnpjFormatado) % 11
    return totalCalculo == 0 || totalCalculo == 1 ? 0 : 11 - totalCalculo

}

const calculaPrimeiroDigitoAsync = async (cnpj = '') => {
    const cnpjFormatado = cnpj.replace(REGEX_CARACTERES_ESPECIAIS, '')
        .slice(0, 12).split('').reverse().map((item) => parseInt(item))
    return await calculaSomatorioAsync(cnpjFormatado)
    .then((somatorio) => {
        return somatorio % 11
    }).then((totalCalculado) => {
        return totalCalculado == 0 || totalCalculado == 1 ? 0 : 11 - totalCalculado
    }).catch((err) => err)

}

const calculaSegundoDigito = (cnpj = '') => {
    const primeiroDigito = calculaPrimeiroDigito(cnpj)
    const cnpjFormatado = cnpj.replace(REGEX_CARACTERES_ESPECIAIS, '')
        .slice(0, 12).concat(primeiroDigito).split('').reverse().map((item) => parseInt(item))
    const totalCalculo = calculaSomatorio(cnpjFormatado) % 11
    return totalCalculo == 0 || totalCalculo == 1 ? 0 : 11 - totalCalculo

}

const calculaSegundoDigitoAsync = async (cnpj = '') => {
    return await calculaPrimeiroDigitoAsync(cnpj)
    .then(primeiroDigito => {
        const cnpjFormatado = cnpj.replace(REGEX_CARACTERES_ESPECIAIS, '')
        .slice(0, 12).concat(primeiroDigito).split('').reverse().map((item) => parseInt(item))
        return calculaSomatorioAsync(cnpjFormatado)
    }).then(somatorio => {
        return somatorio % 11
    }).then(totalCalculado => {
        return totalCalculado == 0 || totalCalculado == 1 ? 0 : 11 - totalCalculado
    }).catch((err) => err)
}

const calculaDigitos = (cnpj = '') => {
    const primeiroDigito = calculaPrimeiroDigito(cnpj)
    const segundoDigito = calculaSegundoDigito(cnpj)
    return `${primeiroDigito}${segundoDigito}`
}

const calculaDigitosAsync = async (cnpj = '') =>{
    return await calculaPrimeiroDigitoAsync(cnpj)
    .then(primeiroDigito => {
        return calculaSegundoDigitoAsync(cnpj)
        .then(segundoDigito => {
            return `${primeiroDigito}${segundoDigito}`
        }).catch((err) => err)
    }).catch((err) => err)
}

const verificaFormato = (cnpj) => {
    if (!REGEX_FORMATO_CNPJ.test(cnpj)) {
        return false
    } else if (!REGEX_CNPJ_NUMEROS_REPETIDOS.test(cnpj)) {
        return false
    } else return true
}

const valida = (cnpj = '') => {
    if (!verificaFormato(cnpj))
        return false
    else return (cnpj.replace(REGEX_CARACTERES_ESPECIAIS, '').substring(12) == calculaDigitos(cnpj))
}

module.exports = {
    verificaFormato,
    valida,
    calculaPrimeiroDigito,
    calculaSegundoDigito,
    calculaDigitos
}