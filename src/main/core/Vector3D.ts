export class Vector3D {
    public x: number;
    public y: number;
    public z: number;

    constructor(x: number, y: number, z: number) {
        this.x = this.cast(x);
        this.y = this.cast(y);
        this.z = this.cast(z);
    }

    public mag(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }

    public add(v: number | Vector3D): Vector3D {
        if (typeof v === "number") v = new Vector3D(v, v, v);
        return new Vector3D(this.x + v.x, this.y + v.y, this.z + v.z);
    }

    public sub(v: number | Vector3D): Vector3D {
        if (typeof v === "number") v = new Vector3D(v, v, v);
        return new Vector3D(this.x - v.x, this.y - v.y, this.z - v.z);
    }

    public mult(v: number | Vector3D): Vector3D {
        if (typeof v === "number") v = new Vector3D(v, v, v);
        return new Vector3D(this.x * v.x, this.y * v.y, this.z * v.z);
    }

    public div(v: number | Vector3D): Vector3D {
        if (typeof v === "number") v = new Vector3D(v, v, v);
        return new Vector3D(this.x / v.x, this.y / v.y, this.z / v.z);
    }

    public pow(v: number | Vector3D): Vector3D {
        if (typeof v === "number") v = new Vector3D(v, v, v);
        return new Vector3D(Math.pow(this.x, v.x), Math.pow(this.y, v.y), Math.pow(this.z, v.z));
    }

    public min(v: number | Vector3D): Vector3D {
        if (typeof v === "number") v = new Vector3D(v, v, v);
        return new Vector3D(Math.min(this.x, v.x), Math.min(this.y, v.y), Math.min(this.z, v.z));
    }

    public max(v: number | Vector3D): Vector3D {
        if (typeof v === "number") v = new Vector3D(v, v, v);
        return new Vector3D(Math.max(this.x, v.x), Math.max(this.y, v.y), Math.max(this.z, v.z));
    }

    public abs(): Vector3D {
        return new Vector3D(Math.abs(this.x), Math.abs(this.y), Math.abs(this.z));
    }

    public dot(v: Vector3D): number {
        return this.x * v.x + this.y * v.y + this.z * v.z;
    }

    public cross(vector: Vector3D): Vector3D {
        const x = this.y * vector.z - this.z * vector.y;
        const y = this.z * vector.x - this.x * vector.z;
        const z = this.x * vector.y - this.y * vector.x;
        return new Vector3D(x, y, z);
    }

    public length(): number {
        return Math.sqrt(this.dot(this));
    }

    protected cast(n: number): number {
        return n;
    }

    public toString(): string {
        return `(${this.x}, ${this.y}, ${this.z})`;
    }
}

export class VectorI3D extends Vector3D {
    protected cast(n: number): number {
        return Math.floor(n);
    }
}

export class Color extends Vector3D {
    public constructor(r: number, g: number, b: number) {
        super(r, g, b);
    }

    set r(value: number) {
        this.x = value;
    }

    get r(): number {
        return this.x;
    }

    set g(value: number) {
        this.y = value;
    }

    get g(): number {
        return this.y;
    }

    set b(value: number) {
        this.z = value;
    }

    get b(): number {
        return this.z;
    }
}