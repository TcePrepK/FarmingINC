import {Vector2D} from "./Vector2D";
import {Vector3D} from "./Vector3D";

type PossibleNumbers = number | (number & Vector2D) | (number & Vector3D) | Vector2D | Vector3D;

export class Utils {
    public static add(a: PossibleNumbers, b: PossibleNumbers): PossibleNumbers {
        const [vec, num] = this.fixTypes(a, b);
        if (typeof vec === "number") return vec + num;
        return vec.add(num);
    }

    public static sub(a: PossibleNumbers, b: PossibleNumbers): PossibleNumbers {
        const [vec, num] = this.fixTypes(a, b);
        if (typeof vec === "number") return vec - num;
        return vec.sub(num);
    }

    public static mult(a: PossibleNumbers, b: PossibleNumbers): PossibleNumbers {
        const [vec, num] = this.fixTypes(a, b);
        if (typeof vec === "number") return vec * num;
        return vec.mult(num);
    }

    public static div(a: PossibleNumbers, b: PossibleNumbers): PossibleNumbers {
        const [vec, num] = this.fixTypes(a, b);
        if (typeof vec === "number") return vec / num;
        return vec.div(num);
    }

    public static min(a: PossibleNumbers, b: PossibleNumbers): PossibleNumbers {
        const [vec, num] = this.fixTypes(a, b);
        if (typeof vec === "number") return Math.min(vec, num);
        return vec.min(num);
    }

    public static max(a: PossibleNumbers, b: PossibleNumbers): PossibleNumbers {
        const [vec, num] = this.fixTypes(a, b);
        if (typeof vec === "number") return Math.max(vec, num);
        return vec.max(num);
    }

    public static abs(a: PossibleNumbers): PossibleNumbers {
        if (typeof a === "number") return Math.abs(a);
        return a.abs();
    }

    public static mag(a: PossibleNumbers): PossibleNumbers {
        if (typeof a === "number") return Math.abs(a);
        return a.mag();
    }

    public static size(a: PossibleNumbers): number {
        if (typeof a === "number") return 1;
        return Object.keys(a).length;
    }

    //------------------------------ Helper Methods ------------------------------//

    /**
     * If they are not compatible, it returns [0, 0],
     * otherwise it returns as it follows:
     * first element: the bigger type (vec3/vec2/number)
     * second element: the smaller type (vec3/vec2/number)
     * @param a
     * @param b
     * @private
     */
    private static fixTypes(a: PossibleNumbers, b: PossibleNumbers): [PossibleNumbers, number | (number & Vector2D) | (number & Vector3D)] {
        if (this.testTypes(a, b)) return [0, 0];
        if (typeof a === "number" && typeof b === "number") return [a, b];
        if (typeof a === "number") return [b, a];
        if (typeof b === "number") return [a, b];
        return [0, 0];
    }

    /**
     * Checks if the types of the two objects are compatible.
     * If they are compatible, it returns false, otherwise it returns true.
     * @param a
     * @param b
     * @private
     */
    private static testTypes(a: PossibleNumbers, b: PossibleNumbers): boolean {
        if (typeof a === "number" || typeof b === "number") return false;
        return Object.keys(a).length !== Object.keys(b).length;
    }
}