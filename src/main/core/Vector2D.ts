export class Vector2D {
    public readonly x: number;
    public readonly y: number;

    public constructor(x: number, y: number) {
        this.x = this.cast(x);
        this.y = this.cast(y);
    }

    public add(v: number | Vector2D): Vector2D {
        if (typeof v === "number") v = new Vector2D(v, v);
        return new Vector2D(this.x + v.x, this.y + v.y);
    }

    public sub(v: number | Vector2D): Vector2D {
        if (typeof v === "number") v = new Vector2D(v, v);
        return new Vector2D(this.x - v.x, this.y - v.y);
    }

    public mult(v: number | Vector2D): Vector2D {
        if (typeof v === "number") v = new Vector2D(v, v);
        return new Vector2D(this.x * v.x, this.y * v.y);
    }

    public div(v: number | Vector2D): Vector2D {
        if (typeof v === "number") v = new Vector2D(v, v);
        return new Vector2D(this.x / v.x, this.y / v.y);
    }

    public pow(v: number | Vector2D): Vector2D {
        if (typeof v === "number") v = new Vector2D(v, v);
        return new Vector2D(Math.pow(this.x, v.x), Math.pow(this.y, v.y));
    }

    public min(v: number | Vector2D): Vector2D {
        if (typeof v === "number") v = new Vector2D(v, v);
        return new Vector2D(Math.min(this.x, v.x), Math.min(this.y, v.y));
    }

    public max(v: number | Vector2D): Vector2D {
        if (typeof v === "number") v = new Vector2D(v, v);
        return new Vector2D(Math.max(this.x, v.x), Math.max(this.y, v.y));
    }

    public abs(): Vector2D {
        return new Vector2D(Math.abs(this.x), Math.abs(this.y));
    }

    public floor(): Vector2D {
        return new Vector2D(Math.floor(this.x), Math.floor(this.y));
    }

    public mag(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    public dot(v: Vector2D): number {
        return this.x * v.x + this.y * v.y;
    }

    protected cast(n: number): number {
        return n;
    }

    public toString(): string {
        return `(${this.x}, ${this.y})`;
    }
}

export class VectorI2D extends Vector2D {
    protected cast(n: number): number {
        return Math.floor(n);
    }
}
