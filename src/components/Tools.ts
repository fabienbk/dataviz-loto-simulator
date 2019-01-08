export function getTicketPrice(nums: number, chances: number): number | undefined {
    let prices = [
        /*         5      6     7        8       9
        /*1*/ [ 2.20, 13.20, 46.20, 123.20, 277.20    ],
        /*2*/ [ 4.40, 26.40, 92.40, 246.40,  undefined],
        /*3*/ [ 6.00, 39.60, 138.60, 369.60, undefined],
        /*4*/ [ 8.80, 52.80, 184.80, undefined, undefined],
        /*5*/ [11.00, 66.00, 231.00, undefined, undefined],
        /*6*/ [13.20, 79.20, 277.20, undefined, undefined],
        /*7*/ [15.40, 92.40, 323.40, undefined, undefined],
        /*8*/ [17.60, 105.60, 369.60, undefined, undefined],
        /*9*/ [19.80, 118.80, undefined, undefined, undefined],
        /*10*/ [22.00, 132.00, undefined, undefined, undefined] 
    ]
    
    return prices[chances-1][nums-5];
}
    
/*
2 numéros: 5 (10)
3 numéros: 20 (50)
4 numéros: 500 (1000)
5 numéros: 100 000 (2 000 000)
*/