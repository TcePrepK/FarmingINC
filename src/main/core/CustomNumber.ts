export class CustomNumber {
    private mantissa!: number;
    private exponent!: number;

    private attachedElements: HTMLElement[] = [];

    public constructor(mantis = 0, exp = 0) {
        this.setParts(mantis, exp);
    }

    /* ---------------------- HTML Utils ---------------------- */

    public attachElement(element: HTMLElement): void {
        this.attachedElements.push(element);
        element.innerText = this.toString();
    }

    private updateElements(): void {
        for (const element of this.attachedElements) {
            element.innerText = this.toString();
        }
    }

    /* ---------------------- Static Methods ---------------------- */

    public static fromNumber(value: number): CustomNumber {
        if (isNaN(value) || !isFinite(value)) {
            throw new Error("Invalid number.");
        }
        const [mult, pow] = value.toExponential().split("e").map(Number);
        return new CustomNumber(mult, pow);
    }

    public static fromString(value: string): CustomNumber {
        const [mult, pow] = value.split("e").map(Number);
        return new CustomNumber(mult, pow);
    }

    public toString(): string {
        if (this.exponent < 6) {
            const rounded = Math.round(this.mantissa * Math.pow(10, this.exponent));
            return `${rounded}`;
        }
        return `${this.mantissa.toFixed(2)}e${this.exponent}`;
    }

    /* ---------------------- Operations ---------------------- */

    private setParts(mantissa: number, exponent: number): void {
        if (isNaN(mantissa) || isNaN(exponent) || !isFinite(mantissa) || !isFinite(exponent)) {
            throw new Error("Invalid number parts.");
        }
        this.mantissa = mantissa;
        this.exponent = exponent;
        this.normalize();
        this.updateElements();
    }

    private normalize(): void {
        let newMantissa = this.mantissa;
        let newExponent = this.exponent;

        if (!Number.isInteger(newExponent)) {
            const integerPart = Math.floor(newExponent);
            const fractionalPart = newExponent - integerPart;
            newMantissa *= Math.pow(10, fractionalPart);
            newExponent = integerPart;
        }

        if (newMantissa === 0) {
            newMantissa = 0;
        } else {
            while (Math.abs(newMantissa) >= 10) {
                newMantissa /= 10;
                newExponent++;
            }
            while (Math.abs(newMantissa) < 1 && newMantissa !== 0) {
                newMantissa *= 10;
                newExponent--;
            }
            newMantissa = parseFloat(newMantissa.toFixed(6)); // Limit to 6 decimal places
        }

        this.mantissa = newMantissa;
        this.exponent = newExponent;
    }

    public equals(other: CustomNumber): boolean {
        return this.mantissa === other.mantissa && this.exponent === other.exponent;
    }

    public greaterThan(other: CustomNumber): boolean {
        return this.mantissa > other.mantissa || (this.mantissa === other.mantissa && this.exponent > other.exponent);
    }

    public greaterThanScalar(scalar: number): boolean {
        return this.greaterThan(CustomNumber.fromNumber(scalar));
    }

    public lessThan(other: CustomNumber): boolean {
        return this.mantissa < other.mantissa || (this.mantissa === other.mantissa && this.exponent < other.exponent);
    }

    public lessThanScalar(scalar: number): boolean {
        return this.lessThan(CustomNumber.fromNumber(scalar));
    }

    public add(other: CustomNumber): void {
        let larger: CustomNumber;
        let smaller: CustomNumber;

        if (this.exponent > other.exponent) {
            larger = this;
            smaller = other;
        } else {
            larger = other;
            smaller = this;
        }

        const diff = larger.exponent - smaller.exponent;
        const adjustedSmallerMult = smaller.mantissa * Math.pow(10, -diff);
        const resultMult = larger.mantissa + adjustedSmallerMult;

        this.setParts(resultMult, larger.exponent);
    }

    public sub(other: CustomNumber): void {
        this.add(new CustomNumber(-other.mantissa, other.exponent));
    }

    public mult(other: CustomNumber): void {
        const newMantissa = this.mantissa * other.mantissa;
        const newExponent = this.exponent + other.exponent;
        this.setParts(newMantissa, newExponent);
    }

    public div(other: CustomNumber): void {
        if (other.mantissa === 0) throw new Error("Division by zero.");
        const newMantissa = this.mantissa / other.mantissa;
        const newExponent = this.exponent - other.exponent;
        this.setParts(newMantissa, newExponent);
    }

    public pow(other: CustomNumber): void {
        const logBase10This = Math.log10(this.mantissa) + this.exponent;
        const log10Result = (logBase10This * other.mantissa) * Math.pow(10, other.exponent);
        const resultMantissa = Math.pow(10, log10Result % 1);
        const resultExponent = Math.floor(log10Result);
        this.setParts(resultMantissa, resultExponent);
    }

    public addScalar(scalar: number): void {
        this.add(new CustomNumber(scalar, 0));
    }

    public subScalar(scalar: number): void {
        this.sub(new CustomNumber(scalar, 0));
    }

    public multScalar(scalar: number): void {
        this.mult(new CustomNumber(scalar, 0));
    }

    public divScalar(scalar: number): void {
        this.div(new CustomNumber(scalar, 0));
    }

    public powScalar(scalar: number): void {
        const resultMantissa = Math.pow(this.mantissa, scalar);
        const resultPow = this.exponent * scalar;
        this.setParts(resultMantissa, resultPow);
    }

    public log10(): CustomNumber {
        const resultMult = Math.log10(this.mantissa) + this.exponent;
        return new CustomNumber(resultMult, 0);
    }

    public ln(): CustomNumber {
        const resultMult = Math.log(this.mantissa) + this.exponent * Math.LN10;
        return new CustomNumber(resultMult, 0);
    }
}