export type BasicOperation = (n: CustomNumber) => CustomNumber;

export class CustomNumber {
    private mantissa!: number;
    private exponent!: number;

    private constructor(mantis = 0, exp = 0) {
        this.setParts(mantis, exp);
    }

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

    //---------------------- Operations ----------------------//

    private setParts(mantissa: number, exponent: number): void {
        if (isNaN(mantissa) || isNaN(exponent) || !isFinite(mantissa) || !isFinite(exponent)) {
            throw new Error("Invalid number parts.");
        }
        this.mantissa = mantissa;
        this.exponent = Math.floor(exponent);
        this.normalize();
    }

    private normalize(): void {
        if (this.mantissa === 0) {
            this.exponent = 0;
        } else {
            while (Math.abs(this.mantissa) >= 10) {
                this.mantissa /= 10;
                this.exponent++;
            }
            while (Math.abs(this.mantissa) < 1 && this.mantissa !== 0) {
                this.mantissa *= 10;
                this.exponent--;
            }
            this.mantissa = parseFloat(this.mantissa.toFixed(6)); // Limit to 6 decimal places
        }
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

    public add(other: CustomNumber): CustomNumber {
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

        return new CustomNumber(resultMult, larger.exponent);
    }

    public sub(other: CustomNumber): CustomNumber {
        return this.add(new CustomNumber(-other.mantissa, other.exponent));
    }

    public mult(other: CustomNumber): CustomNumber {
        const resultMult = this.mantissa * other.mantissa;
        const resultPow = this.exponent + other.exponent;
        return new CustomNumber(resultMult, resultPow);
    }

    public div(other: CustomNumber): CustomNumber {
        if (other.mantissa === 0) throw new Error("Division by zero.");
        const resultMult = this.mantissa / other.mantissa;
        const resultPow = this.exponent - other.exponent;
        return new CustomNumber(resultMult, resultPow);
    }

    public pow(other: CustomNumber): CustomNumber {
        const baseLog = Math.log(this.mantissa) + this.exponent * Math.LN10;
        const resultLog = baseLog * (other.mantissa * Math.pow(10, other.exponent));
        const resultExp = Math.exp(resultLog);
        return CustomNumber.fromNumber(resultExp);
    }

    public addScalar(scalar: number): CustomNumber {
        return this.add(new CustomNumber(scalar, 0));
    }

    public subScalar(scalar: number): CustomNumber {
        return this.sub(new CustomNumber(scalar, 0));
    }

    public multScalar(scalar: number): CustomNumber {
        return this.mult(new CustomNumber(scalar, 0));
    }

    public divScalar(scalar: number): CustomNumber {
        return this.div(new CustomNumber(scalar, 0));
    }

    public powScalar(scalar: number): CustomNumber {
        const resultMantissa = Math.pow(this.mantissa, scalar);
        const resultPow = this.exponent * scalar;
        return new CustomNumber(resultMantissa, resultPow);
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