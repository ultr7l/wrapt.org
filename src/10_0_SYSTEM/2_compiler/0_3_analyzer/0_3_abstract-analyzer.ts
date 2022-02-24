
import { ParseTreeAnalysis } from "wrapt.co_re/src/Domain [╍🌐╍🧭╍]/4_0_0_meta";
import { Node, Expression } from "wrapt.co_re/src/Domain [╍🌐╍🧭╍]/syntax/0_1_0_structure-concept";
import { ExpressionAnalysisDiagnosticContext } from "./0_1_analyzer-structure";

/**
 *  Inspects a Graph disguised as 
 *                   [ 
 *                      a tree-structure 
 *                      containing indirection (Identifiers)
 *                   ]: 
 */
export abstract class AbstractAnalyzer<
                            NodeType extends Node = Expression, 
                            TreeAnalysis          = ParseTreeAnalysis, 
                            DiagnosticContext     = ExpressionAnalysisDiagnosticContext
                >
{
    
    constructor(private diagnosticContext: { new(): DiagnosticContext }) {
           
    }
    
    abstract analyzeNode(node: NodeType, analysis: TreeAnalysis): TreeAnalysis;


    public initAnalysis(): DiagnosticContext {
        return new this.diagnosticContext();
    }
}