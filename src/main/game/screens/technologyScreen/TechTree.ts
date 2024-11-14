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

        let minY = 0;
        const height = 20;
        this.root.windowMouse.onClick = button => {
            if (button !== ButtonType.LEFT) return;

            const techNode = new TechNode(this.root, 0, minY - height, "test", "test", []);
            TechTree.nodesByName.set(TechTree.nodesByName.size + "test", techNode);
            TechTree.allNodes.push(techNode);

            techNode.x += (Math.random() * 2 - 1) * 0.1;
            // techNode.prevY += 0.1;

            minY = Math.min(minY, techNode.y - height);

            techNode.createElement(techTree);
            techNode.initialize();
        }
    }

    public update(dt: number): void {
        for (let i = 1; i < TechTree.allNodes.length; i++) {
            TechTree.allNodes[i].update(dt);
        }

        for (let i = 0; i < TechTree.allNodes.length; i++) {
            for (let j = 0; j < TechTree.allNodes.length; j++) {
                const node1 = TechTree.allNodes[i];
                const node2 = TechTree.allNodes[j];
                if (node1 === node2) continue;

                node1.pushNode(node2);
            }
        }
    }

    public updateWorldTransform(centerX: number, centerY: number): void {
        TechTree.nodesByName.forEach(node => node.updateWorldTransform(centerX, centerY));
    }
}