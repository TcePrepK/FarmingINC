export class Rectangle {
    public x = 0;
    public y = 0;
    public width = 0;
    public height = 0;

    public constructor(x: number, y: number, width: number, height: number) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    /**
     * Checks if the given point is inside the rectangle
     * @param x
     * @param y
     */
    public contains(x: number, y: number): boolean {
        return x >= this.x && x < this.x + this.width && y >= this.y && y < this.y + this.height;
    }

    /**
     * Checks if the given rectangle is inside the rectangle
     * @param rect
     */
    public containsRect(rect: Rectangle): boolean {
        return this.contains(rect.x, rect.y) && this.contains(rect.x + rect.width, rect.y + rect.height);
    }

    /**
     * Checks if the given rectangle intersects with the rectangle
     * @param rect
     */
    public intersects(rect: Rectangle): boolean {
        return this.x < rect.x + rect.width && this.x + this.width > rect.x && this.y < rect.y + rect.height && this.y + this.height > rect.y;
    }

    /**
     * Expands the rectangle by the given amount
     * @param x
     * @param y
     */
    public expandBy(x: number, y: number): Rectangle {
        return new Rectangle(this.x - x, this.y - y, this.width + 2 * x, this.height + 2 * y);
    }

    /**
     * Scales the rectangle by the given amount
     * @param scale
     */
    public scaleBy(scale: number): Rectangle {
        return new Rectangle(this.x * scale, this.y * scale, this.width * scale, this.height * scale);
    }

    /**
     * Floors the rectangle
     */
    public floor(): Rectangle {
        return new Rectangle(Math.floor(this.x), Math.floor(this.y), Math.floor(this.width), Math.floor(this.height));
    }

    public get top(): number {
        return this.y;
    }

    public get right(): number {
        return this.x + this.width;
    }

    public get bottom(): number {
        return this.y + this.height;
    }

    public get left(): number {
        return this.x;
    }
}