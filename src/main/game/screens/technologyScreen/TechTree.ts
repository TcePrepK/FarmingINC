import { createDiv, getElementById } from "../../../core/HTMLUtils";
import { ButtonType } from "../../../core/MouseAttachment";
import { Vector2D } from "../../../core/Vector2D";
import { TechnologyData } from "../../types/GeneralDataTypes";
import { InitializableObject } from "../../types/InitializableObject";
import { TechNode } from "./TechNode";
import { TechnologyCurrency } from "./TechnologyCurrency";

// eslint-disable-next-line
const TechData: TechnologyData = require("../GeneralData.json").technologyData;

export class TechTree extends InitializableObject {
    public static readonly allNodes: Array<TechNode> = [];
    public static readonly nodesByName: Map<string, TechNode> = new Map();

    public static readonly curreny: TechnologyCurrency;
    // Possible node indexes with less than 2 uses
    private readonly nodeLeaves: Array<number> = [];

    private readonly nodeAttractors: Array<Vector2D> = [];
    private readonly activeNodes: Set<TechNode> = new Set();

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

            const boundingSize = 100;
            for (let i = 0; i < 1000; i++) {
                const randX = (Math.random() - 0.5) * boundingSize;
                const randY = Math.random() * -boundingSize - 50;
                this.nodeAttractors.push(new Vector2D(randX, randY));
            }

            let i = 0;
            do {
                this.nodeLeaves.push(size);
            } while (i++ < maxUses);

            TechTree.nodesByName.set(name, techNode);
            TechTree.allNodes.push(techNode);

            techNode.createElement(techTree);
            techNode.initialize();

            if (!prevNode) return;
            this.activeNodes.add(techNode);

            this.nodeLeaves.splice(this.nodeLeaves.findIndex(a => a === prevIndex), 1);
            if (!this.nodeLeaves.includes(prevIndex)) {
                this.activeNodes.delete(prevNode);
                prevNode.staticPoint = true;
            }
        }
    }

    public update(): void {
        for (const node of this.activeNodes) {
            node.attractTowards(this.nodeAttractors);
        }

        for (const node of this.activeNodes) {
            node.killAttractors(this.nodeAttractors);
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
        //
        // for (let i = TechTree.allNodes.length - 1; i >= 1; i--) {
        //     TechTree.allNodes[i].maintainChains();
        // }
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

        for (const attractor of this.nodeAttractors) {
            ctx.beginPath();
            ctx.arc(attractor.x, attractor.y, 5, 0, 2 * Math.PI);
            ctx.fillStyle = "#f00";
            ctx.fill();
        }
    }

    public updateWorldTransform(centerX: number, centerY: number): void {
        TechTree.nodesByName.forEach(node => node.updateWorldTransform(centerX, centerY));
    }
}