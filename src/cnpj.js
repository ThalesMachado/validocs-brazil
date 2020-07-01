const REGEX_FORMATO_CNPJ = /^(\d{14}|\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2})$/gm
const REGEX_CNPJ_NUMEROS_REPETIDOS = /^\b(\d)\1{13}\b|\b(\d)\2{1}\.\2{3}\.\2{3}\/\2{4}\-\2{2}\b$/gm

const calculaPrimeiroDigito = (cnpj = '') => {
    const cnpjLimpo = cnpj.replace(/(\.)*(\-)*(\/)*/gm, '').slice(0, 12).split('').reverse()
    cnpjLimpo[0] = cnpjLimpo[0] * 2
    let peso = 3
    const totalCalculo = cnpjLimpo.reduce(
        (acumulador, atual, index) => {                  
            const posicaoAtual = atual * peso
            peso = (peso != 9) ? peso + 1 : 2
            return acumulador + posicaoAtual
        }) % 11
    return totalCalculo == 0 || totalCalculo == 1 ? 0 : 11 - totalCalculo 
    
}

//TODO Incluirgerado de segundo digito verificvador
//TODO Criar Método de validação de CNPJ com Dígito

const cnpj = {
    checkSync: (cnpj) =>{
        if(!REGEX_FORMATO_CNPJ.test(cnpj)){
            return false
        } else if(!REGEX_CNPJ_NUMEROS_REPETIDOS.test(cnpj)){
            return false
        }
    }
}

module.exports = cnpj