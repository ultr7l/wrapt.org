import { Statement } from "../../../1_Structure_🌴/1_ast/0_1_0_structure-concept";

import { Program }                from "../../../1_Structure_🌴/1_ast/1_0_1_root";
import { AbstractBlockStatement } from "../../../1_Structure_🌴/1_ast/2_meta_ast_🧩/abstract-statement";

// import { SyntaxGraph }            from "../../../1_Structure_🌴/3_abstract-syntax-graph_🎈/0_graph-root";


/**
* Identifies data-flow within AST and produces SyntaxGraph
*/
export class SyntaxGraphUnParser {

    public buildSyntaxGraphFromParseTree(parseTree: Program): SyntaxGraph {
        const newProgram = new Program([]);
        const changes = [] as AbstractBlockStatement[];
        const dataNodes = [], dataEdges = [];

        const graph = new SyntaxGraph(dataNodes, dataEdges, newProgram, changes);

        newProgram.Values = parseTree.Values.map(
            statement => this.scanStatementForDataFlow(statement, graph))

        return graph;
    }

    private scanStatementForDataFlow(statement: Statement, graph: SyntaxGraph): Statement {
        //

        return { ...statement } as Statement;
    }
}