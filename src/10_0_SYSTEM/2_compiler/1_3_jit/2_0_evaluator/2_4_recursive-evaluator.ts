import { InspectionType } from "wrapt.co_re/src/Model [╍⬡╍ꙮ╍▦╍]/object/0_1_object-structure";
import { Environment } from "wrapt.co_re/src/Model [╍⬡╍ꙮ╍▦╍]/object/1_4_0_environment";
import { forceSingleLine } from "wrapt.co_re/src/Model [╍⬡╍ꙮ╍▦╍]/util/1_ubiquitous-util";
import { Program } from "../../../../03_0_Structure_🌴/1_ast/1_0_1_root";

import { Parser }       from "../../../1_parser/1_1_parser/3_1_1_parser";
import { EvalFunction, EvalProgramFunction } from "../0_0_jit-compiler-structure/0_3_3_eval-types";



export class RecursiveEvaluator {
    private evalProgram: EvalProgramFunction;
    private eval: EvalFunction;

    private parser: Parser;

    constructor (_parser, evalFunction: EvalFunction, evalProgramFunction: EvalProgramFunction) {
        this.parser = _parser;
        this.eval = evalFunction;
        this.evalProgram = evalProgramFunction;
    }

    public makeEnvironment(outer: Environment) { 
        return new Environment(outer); 
    }

    public parse(code: string, onError: (errors: string[]) => void): Program {
        code = /\n/.test(code) ? forceSingleLine(code) : code;
        
        // if ((this.tokenizer as TokenizerOne).loadSourceCode) {
        //     (this.tokenizer as TokenizerOne).loadSourceCode(code);
        // }

        const program = (this.parser as Parser).parseProgram();

        if (this.parser.errors.length != 0) {
            onError && onError(this.parser.errors);
            return;
        }

        return program;
    }

    public evaluateProgram(program: Program, env: Environment, onErrors?: Function): InspectionType | null {
        if (program == undefined || program.Values == undefined) {
            return null;
        }

        const evaluated = this.evalProgram(program, env);
        if (evaluated != null) {
            if (evaluated.Inspect) {
                return evaluated.Inspect();
            } else {
                return null;
            }
        }
    }

    public parseAndEvaluate(text: string, env: Environment, onErrors: (errors: string[]) => void, joinNewLines = true): InspectionType | null {
       
        // if ((this.tokenizer as TokenizerOne).loadSourceCode) {
        //     text = joinNewLines ? forceSingleLine(text) : text;
        //     (this.tokenizer as TokenizerOne).loadSourceCode(text);
        // }
        
        let program = this.parser.parseProgram();

        if (this.parser.errors.length != 0) {
            onErrors && onErrors(this.parser.errors);
            return;
        }

        const evaluated = this.eval(program, env, null, this.parser.diagnosticContext);

        if (evaluated != null) {
            if (evaluated.Inspect) {
                return evaluated.Inspect();
            } else {
                return null;
            }
        }
    }
}


export function makeRuntimeEnvironment(evalFunction: EvalFunction, evalProgram: EvalProgramFunction) {
    return new RecursiveEvaluator(new Parser(), evalFunction, evalProgram);
};