import { Root } from "../../Root";
import { BaseBuyable } from "../../types/BaseBuyable";

export class SeedUpgrade extends BaseBuyable {
    public constructor(root: Root, name: string, desc: string) {
        super(root, name, desc, 0, root.structure.seed.currency);
    }
}