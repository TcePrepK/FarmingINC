import { createDiv, getElementById } from "../../../core/HTMLUtils";
import { ButtonType } from "../../../core/MouseAttachment";
import { TechnologyData } from "../../types/GeneralDataTypes";
import { InitializableObject } from "../../types/InitializableObject";
import { TechNode } from "./TechNode";

// eslint-disable-next-line
const TechData: TechnologyData = require("../GeneralData.json").technologyData;

export class TechTree extends InitializableObject {
    public static readonly allNodes: Array<TechNode> = [];
    public static readonly nodesByName: Map<string, TechNode> = new Map();

    // Possible node indexes with less than 2 uses
    private readonly nodeLeaves: Array<number> = [];

    public initialize(): void {
        const screenElement = getElementById("technology-screen");
        const techTree = createDiv({ id: "technology-tree", parent: screenElement });
        // TechData.forEach(node => {
        //     const techNode = new TechNode(this.root, node.x, node.y, node.name, node.desc, node.requires);
        //     TechTree.nodesByName.set(node.name, techNode);
        //
        //     techNode.createElement(techTree);
        //     techNode.initialize();
        // });

        /* ------ DEBUG ------ */

        this.root.windowMouse.onClick = button => {
            if (button !== ButtonType.LEFT) return;

            const size = TechTree.nodesByName.size;
            const name = "test" + size;

            const prevIndex = this.nodeLeaves[Math.floor(Math.random() * this.nodeLeaves.length)];
            const prevName = "test" + prevIndex;

            const prevNode = TechTree.allNodes[prevIndex];
            const posX = prevNode?.x ?? 0;
            const posY = prevNode?.y ?? 0;

            const techNode = new TechNode(this.root, posX, posY, size === 0, name, name, [prevName]);
            const maxUses = Math.log2(-techNode.y / 100);

            let i = 0;
            do {
                this.nodeLeaves.push(size);
            } while (i++ < maxUses);

            TechTree.nodesByName.set(name, techNode);
            TechTree.allNodes.push(techNode);

            // techNode.prevX += Math.random() * 20 - 10;
            techNode.x += prevNode?.velX ?? 0;
            techNode.y += prevNode?.velY ?? 0;

            techNode.createElement(techTree);
            techNode.initialize();

            if (!prevNode) return;

            this.nodeLeaves.splice(this.nodeLeaves.findIndex(a => a === prevIndex), 1);
        }
    }

    public update(): void {
        for (let i = 0; i < TechTree.allNodes.length; i++) {
            TechTree.allNodes[i].update();
        }

        for (let i = 0; i < TechTree.allNodes.length; i++) {
            const node1 = TechTree.allNodes[i];
            for (let j = i + 1; j < TechTree.allNodes.length; j++) {
                const node2 = TechTree.allNodes[j];

                node1.pushNode(node2);
            }
        }

        for (let i = 1; i < TechTree.allNodes.length; i++) {
            TechTree.allNodes[i].maintainChains();
        }

        for (let i = TechTree.allNodes.length - 1; i >= 1; i--) {
            TechTree.allNodes[i].maintainChains();
        }
    }

    public drawLines(ctx: CanvasRenderingContext2D): void {
        for (const node of TechTree.allNodes) {
            for (const other of node.requires) {
                const otherNode = TechTree.nodesByName.get(other)!;
                if (!otherNode) continue;

                ctx.beginPath();
                ctx.moveTo(node.x, node.y);
                ctx.lineTo(otherNode.x, otherNode.y);
                ctx.stroke();
            }
        }
    }

    public updateWorldTransform(centerX: number, centerY: number): void {
        TechTree.nodesByName.forEach(node => node.updateWorldTransform(centerX, centerY));
    }
}