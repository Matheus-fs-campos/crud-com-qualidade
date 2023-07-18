const  pessoas = [
    'matheus',
    'Ana',
    'julia',
    'ranger vermelho',
];

const output = pessoas.filter((pessoa) => {
    const termToFilterNormalized = "A".toLowerCase();
    const pessoaNormalized = pessoa.toLowerCase();
    return pessoaNormalized.includes(termToFilterNormalized);
});

console.log(output);