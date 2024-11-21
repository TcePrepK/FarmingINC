/* ------------------- Crop Data Types ------------------- */

export type CropData = {
    name: string;
    desc: string;
    growthTime: number;
    unlocked?: boolean;
}

export type InventoryStageData = {
    name: string;
    color: string;
    crops: Array<CropData>;
}

export type CropDataType = {
    stages: Array<InventoryStageData>;
}

/* ------------------- Technology Data Types ------------------- */

export type TechnologyData = Array<TechNodeData>;

export type TechNodeData = {
    x: number;
    y: number;
    name: string;
    desc: string;
    requires: Array<string>;
}

/* ------------------- General Data Types ------------------- */

export type GeneralDataType = {
    cropData: CropDataType;
    technologyData: TechnologyData;
}
