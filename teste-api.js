const axios = require('axios');

const url = "https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao='01-14-2015'&$top=100&$format=json";

axios
    .get(url)
    .then(res => {
        console.log(res.data); 
        if (res.data && res.data.value && Array.isArray(res.data.value)) {
            console.log(res.data.value[0]);
        } else {
            console.log('A resposta não contém a propriedade "value" ou "value" não é um array.');
        }
    })
    .catch(err => {
        console.error('Erro ao fazer a requisição:', err.message);
        if (err.response) {
            console.error('Dados da resposta de erro:', err.response.data);
            console.error('Status da resposta de erro:', err.response.status);
            console.error('Cabeçalhos da resposta de erro:', err.response.headers);
        }
    });