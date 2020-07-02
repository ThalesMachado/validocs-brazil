/* https://campuscode.com.br/conteudos/o-calculo-do-digito-verificador-do-cpf-e-do-cnpj#:~:text=O%20c%C3%A1lculo%20de%20valida%C3%A7%C3%A3o%20do,2%20e%20somamos%20esse%20resultado. */

const REGEX_FORMATO_CPF = /^(\d{11}|\d{3}\.\d{3}\.\d{3}\-\d{2})$/gm
const REGEX_CPF_CARACTERES_ESPECIAIS = /(\.)*(\-)*/gm
const REGEX_CPF_NUMEROS_REPETIDOS = /\b(\d)\1{10}\b|\b(\d)\2{2}\.\2{3}\.\2{3}\-\2{2}\b/gm