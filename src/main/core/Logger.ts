export class Logger {
    private readonly name!: string;
    readonly symbol: string | undefined;

    private renderName = true;
    private renderSymbol = true;

    public constructor(name: string, symbol?: string) {
        this.name = name;
        this.symbol = symbol;
    }

    public log(...messages: unknown[]): void {
        const texts = new Array<string>();
        const objects = new Array<unknown>();

        for (const msg of messages) {
            if (typeof msg === "string") texts.push(msg);
            else objects.push(msg);
        }

        console.log(this.getFixed(...texts), ...objects);
    }

    public warn(...messages: unknown[]): void {
        const texts = new Array<string>();
        const objects = new Array<unknown>();

        for (const msg of messages) {
            if (typeof msg === "string") texts.push(msg);
            else objects.push(msg);
        }

        console.warn(this.getFixed(...texts), ...objects);
    }

    public error(...messages: unknown[]): void {
        const texts = new Array<string>();
        const objects = new Array<unknown>();

        for (const msg of messages) {
            if (typeof msg === "string") texts.push(msg);
            else objects.push(msg);
        }

        console.error(this.getFixed(...texts), ...objects);
    }

    public throw(...messages: string[]): void {
        throw this.getFixed(...messages);
    }

    public toggleName(): void {
        this.renderName = !this.renderName;
    }

    public toggleSymbol(): void {
        this.renderSymbol = !this.renderSymbol;
    }

    private getFixed(...msg: string[]): string {
        if (this.renderSymbol && this.symbol) {
            if (this.renderName) return `${this.symbol} [${this.name}] ${msg} ${this.symbol}`;
            return `${this.symbol} ${msg} ${this.symbol}`;
        }
        if (this.renderName) return `[${this.name}] ${msg}`;
        return `${msg}`;
    }
}