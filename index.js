const express = require('express')
const app = express()
const path = require('path')

const convert = require('./lib/convert')
const apiBCB = require('./lib/api.bcb')

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))


console.log('Diretório de visualizações:', path.join(__dirname, 'views'))

app.get('/', async(req, res) => {
    const cotacao = await apiBCB.getCotacao()
    console.log('Cotação:', cotacao)
    res.render('home' , {	
        cotacao
    })
});

app.get('/cotacao', (req, res) => {
    const { cotacao, quantidade } = req.query

    
    console.log('Cotação (string):', cotacao)
    console.log('Quantidade (string):', quantidade)

    
    if (!cotacao || isNaN(cotacao) || !quantidade || isNaN(quantidade)) {
        return res.render('erro', {
            mensagem: 'Cotação e quantidade devem ser números válidos'
        });
    }

    const cotacaoNum = parseFloat(cotacao);
    const quantidadeNum = parseFloat(quantidade);

    // Log dos valores convertidos
    console.log('Cotação (numérica):', cotacaoNum);
    console.log('Quantidade (numérica):', quantidadeNum);

    const conversao = convert.convert(cotacaoNum, quantidadeNum);
    res.render('cotacao', {
        cotacao: convert.toMoney(cotacaoNum),
        quantidade: convert.toMoney(quantidadeNum),
        conversao: convert.toMoney(conversao)
    });
});

app.listen(3000, err => {
    if (err) {
        console.log('Não foi possível iniciar');
    } else {
        console.log('ConvertMate está online');
    }
});
