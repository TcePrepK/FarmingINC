export type Buyable = {
    price: number;
    id: string;
    effect?: (...args: never[]) => void;
}

export type Stage = {
    id: string;
    buyables: Buyable[];
}

export type Template = {
    stages: Stage[];
}

export function getTemplate(): Template {
    return {
        stages: [
            {
                id: "stage-1",
                buyables: [
                    {
                        id: "buyable-1",
                        price: 100,
                        effect: () => console.log("Effect 1")
                    },
                    {
                        id: "buyable-2",
                        price: 200,
                        effect: () => console.log("Effect 2")
                    }
                ]
            }
        ]
    }
}