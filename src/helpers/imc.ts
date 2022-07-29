export type level = {
    title:string;
    color:string;
    icon: 'down' | 'up';
    imc: number[];
    yourImc?: number;
}

export const levels: level[] = [
    { title:'Magreza', color:'#96A3Ab', icon:'down', imc:[0, 18.50] },
    { title:'Normal', color:'#0EAD69', icon:'up', imc:[18.51, 24.99] },
    { title:'Sobrepeso', color:'#E2B039', icon:'down', imc:[25, 30] },
    { title:'Obesidade', color:'#C3423F', icon:'down', imc:[30.01, 99] }
]

export const calculateImc = (height: number, weight:number) => {
    let imc = weight / ( height * height );

    for( let i in levels ) {
        if( imc >= levels[i].imc[0] && imc < levels[i].imc[1] ) {
            let copyLevels: level = {...levels[i]}; 
            copyLevels.yourImc = parseFloat(imc.toFixed(2));
            return copyLevels;
        }
    }

    return null;
}