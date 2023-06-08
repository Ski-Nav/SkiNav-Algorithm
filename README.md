# SkiNav-Algorithm

## Introduction

The SkiNav-Algorithm incorporates the primary routing algorithm employed in SkiNav, enabling the determination of the most efficient path to guide users. Additionally, this repository handles the extraction of data from our database and transforms it into a format usable by both the algorithm and the front-end.

## Directory Structure

```
├── README.md
├── index.ts
└── src
    ├── cfg
    │   └── trailStatusUrls.ts // APIs for updating trails status
    ├── lib
    │   ├── Edge.ts // Data structure of lifts and runs
    │   ├── Navigation.ts // Primary routing and data parsing functions
    │   └── Node.ts // Data structure of nodes
    └── util
        └── priorityQueue.ts
```


## Usage

```
cd ./SkiNam-Algorithm/
npm install
npx ts-node index.ts
```
