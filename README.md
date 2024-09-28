# WikiRacer

WikiRacer is a program that solves the Wikipedia link race problem. The objective of the problem is to find the shortest path from one Wikipedia page to another by only navigating through the links within Wikipedia articles.

## Installation

Follow these steps to set up and run the WikiRacer project on your machine:

### Prerequisites

- Ensure that you have [Node.js](https://nodejs.org/) installed.
- Ensure that you have [Yarn](https://yarnpkg.com/) installed globally. If not, you can install it using the following command:

```bash
npm install -g yarn
```

### Step 1: Clone the repository

Clone this GitHub repository to your local machine:

```bash
git clone https://github.com/YasseinBilal/wikiracer.git
```

### Step 2: Install dependencies

Navigate to the project directory and install the required dependencies using Yarn:

```bash
cd wikiracer
yarn
```

### Step 3: Run the application

After installing the dependencies, you can start the application using the following command:

```bash
yarn start
```

This will run the WikiRacer program and allow you to interact with the app.

---

## Solution Explanation

### Problem Approach

The WikiRacer problem is solved using a graph traversal technique known as **Breadth-First Search (BFS)**. Here’s a step-by-step explanation of the approach:

1. **Graph Representation**: Each Wikipedia article is treated as a node, and a link from one article to another is considered an edge between nodes.
2. **BFS Algorithm**: Since we need to find the shortest path from the start article to the target article, BFS is the ideal choice because it explores all nodes at the present depth level before moving on to nodes at the next depth level.
3. **Queue-based Search**: A queue is used to explore each article and its neighboring links (outgoing links). Starting from the source article, we enqueue all its linked articles, then repeat the process for each article, gradually expanding the search until the target is found.
4. **Tracking the Path**: To ensure we know the path taken to reach the target, we track the path for each visited node (article). This path is updated as BFS explores new nodes.
5. **Early Stopping**: The algorithm terminates as soon as the target article is found, ensuring that the solution is optimal (i.e., the shortest path).

### Optimization Techniques

Several optimization strategies are employed to improve the efficiency of the solution:

1. **Caching/Visited Set**: A `visited` set is used to ensure that the same Wikipedia page is not visited more than once during the search, reducing redundant work.
2. **Parallel Requesting (if applicable)**: To speed up the fetching of links from Wikipedia pages, the code may employ parallel API calls to fetch links from multiple pages at once, minimizing waiting time.
3. **Link Pruning**: Not all links on a Wikipedia page are equally useful for the search. Some optimizations can include pruning unnecessary links, such as those pointing to non-article pages, to reduce the search space.
4. **Heuristic Filtering**: A heuristic could be used to prioritize certain links based on relevance to the target, though this approach may depend on specific enhancements to the basic BFS algorithm.

---

## Conclusion

The WikiRacer project is a classic example of applying graph search algorithms to solve real-world navigation problems. Through BFS and a series of optimizations, the program efficiently finds the shortest path between two Wikipedia articles.
