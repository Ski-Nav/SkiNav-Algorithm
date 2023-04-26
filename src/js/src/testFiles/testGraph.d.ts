import { edge } from "../models/edge";
export declare var testGraph1: {
    "1": {
        "2": edge;
        "3": edge;
        "4": edge;
    };
    "2": {
        "5": edge;
        "10": edge;
    };
    "3": {
        "10": edge;
    };
    "4": {
        "10": edge;
        "12": edge;
    };
    "5": {
        "6": edge;
        "8": edge;
    };
    "6": {
        "7": edge;
    };
    "7": {};
    "8": {
        "7": edge;
        "11": edge;
    };
    "10": {
        "11": edge;
    };
    "11": {
        "4": edge;
        "13": edge;
    };
    "12": {
        "11": edge;
        "13": edge;
    };
    "13": {
        "1": edge;
    };
};
export declare var testGraph2: {
    start: {
        A: edge;
        B: edge;
    };
    A: {
        start: edge;
        C: edge;
        D: edge;
    };
    B: {
        A: edge;
        D: edge;
    };
    C: {
        D: edge;
        end: edge;
    };
    D: {
        end: edge;
    };
    end: {};
};
