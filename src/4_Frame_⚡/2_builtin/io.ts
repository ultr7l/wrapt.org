import { ObjectType } from "wrapt.co_re/lib/Domain [╍🌐╍🧭╍]/object/object-type.enum";
import { BuiltinFunctionObject, StringObject } from "wrapt.co_re/lib/Model [╍⬡╍ꙮ╍▦╍]/object/1_0_object";
import { makeBuiltinClass } from "wrapt.co_re/lib/Model [╍⬡╍ꙮ╍▦╍]/util/3_builtin_util";
import { Modifier } from "../../01_1_ELEMENT/1_token_💧/2_1_token";
import { platformSpecificCall } from "../../3_Operation_☀/3_util_(🔥)/2_platform-utils";
import { readStdInSync } from "../../3_Operation_☀/3_util_(🔥)/4_1_node-io-util";
import { readLineFromDocument } from "../../3_Operation_☀/3_util_(🔥)/4_2_browser-io-util";
import { nodeObjects } from "../4_io/1_file-system/2_compatibility";
import { _File } from "./file";




var readLn = new BuiltinFunctionObject(

   "readLine", [                ObjectType.STRING              ], 
    function   (context, scope, browserPromptText: StringObject) 
    {
        var args = [];
        
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }

        return platformSpecificCall(scope, 
            function () {
                return new String( readStdInSync(nodeObjects.Buffer, nodeObjects.fs, nodeObjects.process));
            }, 
            function () {
                return readLineFromDocument(browserPromptText.Value);
            },
            []
        );
    },

    null, null, false
);




export const io = makeBuiltinClass(
    "File",
    [
        ["File", _File, [Modifier.PUBLIC]]
    ],
    [
         
        // ["HTTP", HTTP], 
        // ["Socket", Socket], 
        ["readLine", readLn, [Modifier.PUBLIC]]
    ]
);
