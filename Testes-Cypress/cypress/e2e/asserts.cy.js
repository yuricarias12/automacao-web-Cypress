/// <reference types="cypress" />

//Checagens de igualdade de váriaveis simples
it('Igualdade', () => {
    const a = 1;

    
    //expect = utilizado para verificar se uma variavel é igual ao parametro passado.
    //espero que A igual a 1
    expect(a).equal(1);
    expect(a, 'deveria ser 1').equal(1);

    //Espero que A seja igual A 1 de forma mais légivel
    expect(a).to.be.equal(1);

    //Para negar o resultado. Espero que A não seja igual a B
    expect('a').not.to.be.equal('b');

})


//Checagem lógica, verdadeiro ou falso
it('Logico', () => {
    const a = true;
    const b = null;
    let c;

    expect(a).to.be.true;
    expect(b).to.be.null;
    expect(a).not.to.be.null;
    expect(c).to.be.undefined;

})


//Verifica igualdade de Objetos
it('Objetos', () => {
    const obj = {
        a: 1,
        b: 2
    }

    expect(obj).to.be.equal(obj);

    //Deep, utilizado para verificar as propriedades do objeto
    expect(obj).to.be.deep.equal({a: 1, b: 2 })

    //Forma de comparar mais reduzida
    expect(obj).eql({a: 1, b: 2 })

    //Verifica se existe alguma propriedade no objeto
    expect(obj).include({ a: 1 });

    //Verifica se o objeto possui uma propriedade especifica
    //Verifica se o objeto possui uma propriedade B e que o valor seja 2
    expect(obj).to.have.property('b' , 2)

    expect(obj).to.be.not.empty

    //Verifica se o objeto é vazio
    expect({}).to.be.empty

})


it('Arrays', () => {
    const arr = [1, 2, 3]

    //Espera que o Array possua os seguintes membros
    expect(arr).to.have.members([1, 2, 3]);

    //Verifica se alguns membros estão inclusos no Array
    expect(arr).to.include.members([1, 3]);

    expect(arr).to.not.be.empty

    expect([]).to.be.empty
    
})


it('Tipos', () => {
    const num = 1
    const str = 'String'

    expect(num).to.be.a('number');
    expect(str).to.be.a('string');
    expect({}).to.be.an('object')
    expect([]).to.be.an('array')
})

it('String', () => {
    const str = 'String de teste'

    expect(str).to.be.equal('String de teste')
    expect(str).to.not.be.equal('String de t')
    expect(str).to.have.length(15)
    expect(str).to.have.contains('teste')
    //Deve iniciar com String
    expect(str).to.match(/^String/)
    //Deve finalizar com teste
    expect(str).to.match(/teste$/)
    //Verifica se existem apenas letras
    expect(str).to.match(/\w+/)
    //Verifica se não contém números
    expect(str).to.match(/\D+/)

})


it('Numeros', () => {
    const number = 4
    const floatNumber = 5.2123

    expect(number).to.be.equal(4)
    expect(number).to.be.above(3)
    expect(number).to.be.below(7)

    expect(floatNumber).to.be.equal(5.2123)
    //Proximo De com a precisão de 0.1
    expect(floatNumber).to.be.closeTo(5.2, 0.1)

    expect(floatNumber).to.be.above(5)
    

})

